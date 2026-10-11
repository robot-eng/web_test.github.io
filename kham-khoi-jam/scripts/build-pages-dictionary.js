import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import iconv from 'iconv-lite';

const require = createRequire(import.meta.url);
const wordnetDb = require('wordnet-db');
const rootDirectory = fileURLToPath(new URL('../', import.meta.url));
const sourceFile = path.join(rootDirectory, 'data', 'lexitron-etlex.dat');
const outputDirectory = path.join(rootDirectory, 'public');
const outputFile = path.join(outputDirectory, 'pages-dictionary.json');

function readTag(record, tag) {
  return record.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'))?.[1]?.trim() || '';
}

function readEnglishGloss(gloss) {
  return gloss.split(/;\s*"/, 1)[0].trim();
}

function categoryFor(partOfSpeech) {
  if (partOfSpeech === 'v') return 'การทำงาน';
  return 'ทั่วไป';
}

async function loadWordNet() {
  const glossesByOffset = new Map();
  const lemmasByPartOfSpeech = new Map();

  for (const [partOfSpeech, fileSuffix] of [['n', 'noun'], ['v', 'verb'], ['a', 'adj'], ['s', 'adj'], ['r', 'adv']]) {
    const dataFile = path.join(wordnetDb.path, `data.${fileSuffix}`);
    const dataLines = (await readFile(dataFile, 'utf8')).split('\n');
    for (const line of dataLines) {
      if (!/^\d{8}\s/.test(line)) continue;
      const separator = line.indexOf('|');
      if (separator === -1) continue;
      glossesByOffset.set(line.slice(0, 8), line.slice(separator + 1).trim());
    }

    const indexFile = path.join(wordnetDb.path, `index.${fileSuffix}`);
    const indexLines = (await readFile(indexFile, 'utf8')).split('\n');
    for (const line of indexLines) {
      if (!line || line.startsWith('  ')) continue;
      const fields = line.trim().split(/\s+/);
      const lemma = fields[0].replaceAll('_', ' ').toLocaleLowerCase();
      const linePartOfSpeech = fields[1];
      const synsetCount = Number(fields[2]);
      const pointerCount = Number(fields[3]);
      if (!lemma || !/^[a-z][a-z'-]{0,78}$/i.test(lemma)) continue;
      const offsetsStart = 4 + pointerCount + 2;
      const offsets = fields.slice(offsetsStart, offsetsStart + synsetCount);
      const meanings = offsets.map((offset) => glossesByOffset.get(offset)).filter(Boolean);
      if (meanings.length) lemmasByPartOfSpeech.set(`${lemma}\t${linePartOfSpeech}`, meanings);
    }
  }

  const byLemma = new Map();
  for (const [key, meanings] of lemmasByPartOfSpeech) {
    const [lemma, partOfSpeech] = key.split('\t');
    const existing = byLemma.get(lemma) || { meanings: [], partOfSpeech };
    for (const meaning of meanings) {
      const normalized = readEnglishGloss(meaning);
      if (normalized && !existing.meanings.includes(normalized) && existing.meanings.length < 3) {
        existing.meanings.push(normalized);
      }
    }
    byLemma.set(lemma, existing);
  }
  return byLemma;
}

async function buildDictionary() {
  const source = iconv.decode(await readFile(sourceFile), 'win874');
  const wordNet = await loadWordNet();
  const entries = new Map();

  for (const match of source.matchAll(/<Doc>([\s\S]*?)<\/Doc>/gi)) {
    const record = match[1];
    const word = readTag(record, 'eentry').toLocaleLowerCase();
    const thaiMeaning = readTag(record, 'tentry');
    const partOfSpeech = readTag(record, 'ecat');
    if (!word || !thaiMeaning || !/^[a-z][a-z'-]{0,78}$/i.test(word)) continue;

    const existing = entries.get(word) || { thaiMeanings: [], partOfSpeech };
    if (!existing.thaiMeanings.includes(thaiMeaning) && existing.thaiMeanings.length < 3) {
      existing.thaiMeanings.push(thaiMeaning);
    }
    entries.set(word, existing);
  }

  const output = {};
  for (const [word, entry] of entries) {
    const wordNetEntry = wordNet.get(word);
    const englishMeaning = wordNetEntry?.meanings.join(' / ') || '';
    const firstExample = wordNetEntry?.meanings
      .map((meaning) => meaning.match(/"([^"]+)"/)?.[1])
      .find(Boolean);
    const example = firstExample
      ? `${firstExample.charAt(0).toLocaleUpperCase()}${firstExample.slice(1)}.`
      : '';
    output[word] = [englishMeaning, entry.thaiMeanings.join('; '), categoryFor(wordNetEntry?.partOfSpeech), example];
  }

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(output)}\n`, 'utf8');
  const withEnglishDefinition = Object.values(output).filter(([englishMeaning]) => englishMeaning).length;
  console.log(`Generated ${Object.keys(output).length.toLocaleString()} English-Thai entries; ${withEnglishDefinition.toLocaleString()} include WordNet definitions.`);
}

buildDictionary().catch((error) => {
  console.error('Could not generate the Pages dictionary.', error);
  process.exitCode = 1;
});