import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const pdfPath = resolve(process.argv[2] ?? 'The_Oxford_3000 (1).pdf');
const outputPath = resolve('src/data/oxford3000.json');
const text = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8' });
const entries = new Map();
const validHeadword = /^[\p{L}]+(?:[ '-][\p{L}]+|[0-9])*(?: \([^)]+\))?$/u;

for (const line of text.split(/\r?\n/)) {
  for (const cell of line.split(/\s{2,}/)) {
    const value = cell.trim();
    const level = value.match(/\b(A1|A2|B1|B2)\b/u)?.[1];
    if (!level) continue;

    const specialHeadword = value.startsWith('a, an indefinite article')
      ? 'a, an indefinite article'
      : value.startsWith('the definite article')
        ? 'the definite article'
        : null;
    const match = value.match(/^(.*?)\s+((?:n|v|adj|adv|pron|prep|conj|det|exclam|noun)\.|number\b|auxiliary\b|modal\b)/u);
    const headword = (specialHeadword ?? match?.[1]?.trim())?.replace(/[™®]/gu, '').replace(/[’‘]/gu, "'");
    if (!headword) continue;
    const headwords = headword === 'a, an indefinite article'
      ? ['a', 'an']
      : headword === 'the definite article'
        ? ['the']
        : [headword];
    const marker = match?.[2] ?? 'article';
    const partOfSpeech = /^(?:n|noun)\./u.test(marker) ? 'noun'
      : /^v\./u.test(marker) ? 'verb'
        : /^adj\./u.test(marker) ? 'adjective'
          : /^adv\./u.test(marker) ? 'adverb'
            : /^pron\./u.test(marker) ? 'pronoun'
              : /^prep\./u.test(marker) ? 'preposition'
                : /^conj\./u.test(marker) ? 'conjunction'
                  : /^det\./u.test(marker) ? 'determiner'
                    : /^exclam\./u.test(marker) ? 'interjection'
                      : 'number';

    for (const word of headwords) {
      if (!validHeadword.test(word)) continue;
      if (!entries.has(word)) entries.set(word, { word, level, partOfSpeech });
    }
  }
}

const vocabulary = [...entries.values()];
if (vocabulary.length !== 3000) {
  throw new Error(`Expected exactly 3000 unique headwords, found ${vocabulary.length}.`);
}

const preservedFields = ['meaning', 'example', 'exampleTranslation', 'exampleSource'];
const previousVocabulary = existsSync(outputPath)
  ? new Map(JSON.parse(readFileSync(outputPath, 'utf8')).map((entry) => [entry.word, entry]))
  : new Map();
const enrichedVocabulary = vocabulary.map((entry) => {
  const previous = previousVocabulary.get(entry.word) ?? {};
  const preserved = Object.fromEntries(
    preservedFields
      .filter((field) => previous[field] !== undefined)
      .map((field) => [field, previous[field]]),
  );
  return { ...entry, ...preserved };
});

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(enrichedVocabulary, null, 2)}\n`);
console.log(`Wrote ${enrichedVocabulary.length} unique words to ${outputPath}`);