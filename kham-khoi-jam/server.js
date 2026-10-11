import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import path from 'node:path';
import iconv from 'iconv-lite';

const dataDirectory = fileURLToPath(new URL('./data/', import.meta.url));
const wordsFile = path.join(dataDirectory, 'vocabulary.json');
const wordsTemplateFile = path.join(dataDirectory, 'vocabulary.example.json');
const dictionaryFile = path.join(dataDirectory, 'dictionary.json');
const lexiconFile = path.join(dataDirectory, 'lexitron-etlex.dat');
const port = Number(process.env.API_PORT || 3001);
const require = createRequire(import.meta.url);
const wordnet = require('wordnet');
const lexicon = new Map();

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function readWords() {
  return readJson(wordsFile, readJson(wordsTemplateFile, []));
}

async function writeWords(words) {
  const temporaryFile = `${wordsFile}.${process.pid}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
  await rename(temporaryFile, wordsFile);
}

function sendJson(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(value));
}

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 16_384) throw new Error('คำขอมีขนาดใหญ่เกินไป');
  }
  return JSON.parse(body || '{}');
}

function readTag(record, tag) {
  return record.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'))?.[1]?.trim() || '';
}

function partOfSpeechLabels(definitions) {
  const labels = {
    noun: 'คำนาม (noun)',
    verb: 'คำกริยา (verb)',
    adjective: 'คำคุณศัพท์ (adjective)',
    'adjective satellite': 'คำคุณศัพท์ (adjective)',
    adverb: 'คำกริยาวิเศษณ์ (adverb)',
  };
  return [...new Set(definitions.map((entry) => labels[entry.meta.synsetType]).filter(Boolean))].join(' / ');
}

function exampleForWord(gloss, word) {
  const candidates = [...gloss.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  return candidates.find((candidate) => candidate.toLocaleLowerCase().split(/[^a-z]+/).includes(word.toLocaleLowerCase())) || '';
}

async function loadLexicon() {
  const source = iconv.decode(await readFile(lexiconFile), 'win874');
  const recordPattern = /<Doc>([\s\S]*?)<\/Doc>/gi;
  let match;
  while ((match = recordPattern.exec(source)) !== null) {
    const record = match[1];
    const word = readTag(record, 'eentry').toLocaleLowerCase();
    const thaiMeaning = readTag(record, 'tentry');
    if (!word || !thaiMeaning) continue;
    const entry = { thaiMeaning, partOfSpeech: readTag(record, 'ecat') };
    const translations = lexicon.get(word) || [];
    if (!translations.some((item) => item.thaiMeaning === thaiMeaning)) translations.push(entry);
    lexicon.set(word, translations);
  }
}

async function enrichWord(word) {
  const dictionary = await readJson(dictionaryFile, []);
  const normalizedWord = word.toLocaleLowerCase();
  const curatedEntry = dictionary.find((entry) => entry.word.toLocaleLowerCase() === normalizedWord);
  const lexiconEntries = lexicon.get(normalizedWord) || [];
  const definitions = await wordnet.lookup(word, true);
  const definition = definitions?.[0];
  const englishMeaning = curatedEntry?.englishMeaning || definition?.glossary?.split('; "')[0].trim();
  const thaiMeaning = curatedEntry?.thaiMeaning || [...new Set(lexiconEntries.map((entry) => entry.thaiMeaning))].slice(0, 3).join('; ');
  const partOfSpeech = curatedEntry?.partOfSpeech || partOfSpeechLabels(definitions || []);

  if (!englishMeaning || !thaiMeaning || !partOfSpeech) {
    throw new Error('ยังไม่พบข้อมูลคำนี้ครบทั้งอังกฤษและไทย สามารถกรอกข้อมูลเองได้');
  }

  const quotedExample = definition?.glossary ? exampleForWord(definition.glossary, word) : '';
  const example = curatedEntry?.example || (quotedExample
    ? `${quotedExample.charAt(0).toLocaleUpperCase()}${quotedExample.slice(1)}.`
    : '');

  return {
    word,
    englishMeaning,
    thaiMeaning,
    partOfSpeech,
    example,
    category: curatedEntry?.category || ({ N: 'ทั่วไป', V: 'การทำงาน', ADJ: 'ทั่วไป', ADV: 'ทั่วไป' }[lexiconEntries[0]?.partOfSpeech] || 'ทั่วไป'),
  };
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/api/words') {
    const words = await readWords();
    const withPartsOfSpeech = await Promise.all(words.map(async (word) => {
      if (word.partOfSpeech) return word;
      const definitions = await wordnet.lookup(word.word, true);
      return { ...word, partOfSpeech: partOfSpeechLabels(definitions || []) };
    }));
    return sendJson(response, 200, withPartsOfSpeech);
  }

  if (request.method === 'POST' && url.pathname === '/api/words') {
    const body = await readBody(request);
    const word = typeof body.word === 'string' ? body.word.trim() : '';
    if (!/^[a-z][a-z'-]{0,78}$/i.test(word)) {
      return sendJson(response, 400, { error: 'กรอกคำศัพท์ภาษาอังกฤษหนึ่งคำ' });
    }

    const words = await readWords();
    if (words.some((entry) => entry.word.toLocaleLowerCase() === word.toLocaleLowerCase())) {
      return sendJson(response, 409, { error: 'คำนี้อยู่ในคลังแล้ว' });
    }

    let details;
    try {
      if (body.englishMeaning !== undefined || body.thaiMeaning !== undefined) {
        const englishMeaning = String(body.englishMeaning || '').trim();
        const thaiMeaning = String(body.thaiMeaning || '').trim();
        const partOfSpeech = String(body.partOfSpeech || '').trim();
        if (!englishMeaning || !thaiMeaning || !partOfSpeech) {
          return sendJson(response, 400, { error: 'กรอกความหมายอังกฤษ คำแปลไทย และชนิดคำให้ครบ' });
        }
        details = {
          word,
          englishMeaning,
          thaiMeaning,
          partOfSpeech,
          example: String(body.example || '').trim(),
          category: String(body.category || 'ทั่วไป'),
        };
      } else {
        details = await enrichWord(word);
      }
    } catch (error) {
      return sendJson(response, 422, { error: error.message || 'ค้นหาคำศัพท์ไม่สำเร็จ' });
    }

    const newWord = {
      ...details,
      id: randomUUID(),
      streak: 0,
      interval: 0,
      nextReview: Date.now(),
    };
    words.unshift(newWord);
    await writeWords(words);
    return sendJson(response, 201, { word: newWord });
  }

  const wordRoute = url.pathname.match(/^\/api\/words\/([^/]+)$/);
  if (wordRoute) {
    const id = decodeURIComponent(wordRoute[1]);
    const words = await readWords();
    const index = words.findIndex((entry) => entry.id === id);
    if (index === -1) return sendJson(response, 404, { error: 'ไม่พบคำศัพท์นี้' });

    if (request.method === 'DELETE') {
      words.splice(index, 1);
      await writeWords(words);
      return sendJson(response, 200, { ok: true });
    }

    if (request.method === 'PATCH') {
      const update = await readBody(request);
      words[index] = {
        ...words[index],
        streak: Math.max(0, Number(update.streak) || 0),
        interval: Math.max(0, Number(update.interval) || 0),
        nextReview: Math.max(0, Number(update.nextReview) || 0),
      };
      await writeWords(words);
      return sendJson(response, 200, { word: words[index] });
    }
  }

  return sendJson(response, 404, { error: 'ไม่พบเส้นทางนี้' });
}

loadLexicon()
  .then(() => wordnet.init())
  .then(() => {
    createServer((request, response) => {
      handleRequest(request, response).catch((error) => {
        console.error(error);
        if (!response.headersSent) sendJson(response, 500, { error: 'เกิดข้อผิดพลาดในการจัดเก็บคำศัพท์' });
        else response.end();
      });
    }).listen(port, '127.0.0.1', () => {
      console.log(`Offline dictionaries ready (${lexicon.size.toLocaleString()} Thai headwords)`);
      console.log(`Vocabulary JSON API listening on http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.error('Could not initialize offline dictionaries.', error);
    process.exitCode = 1;
  });