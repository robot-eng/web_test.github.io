import { dictionary as pronunciations } from 'cmu-pronouncing-dictionary';

const thaiReadingOverrides = new Map([
  ['council', 'เคาน์ซิล'],
  ['orientation', 'ออเรียนเทชัน'],
  ['implement', 'อิมพลิเมนต์'],
  ['inspired', 'อินสไพเอิร์ด'],
  ['serendipity', 'เซเรนดิพิที'],
  ['enrollment', 'เอนโรลเมนต์'],
  ['computer', 'คอมพิวเตอร์'],
  ['lucent', 'ลูเซนต์'],
  ['ephemeral', 'อิเฟเมอรัล'],
  ['tranquil', 'แทรงควิล'],
  ['curious', 'คิวเรียส'],
  ['diligent', 'ดิลิเจนต์'],
  ['luminous', 'ลูมินัส'],
  ['abundant', 'อะบันเดินต์'],
  ['wanderlust', 'วอนเดอร์ลัสต์'],
  ['resilient', 'รีซิลเลียนต์'],
  ['wander', 'วอนเดอร์'],
  ['tender', 'เทนเดอร์'],
  ['contemplate', 'คอนเทมเพลต'],
]);

const vowelPhonemes = new Set(['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW']);
const initialConsonants = {
  B: 'บ', CH: 'ช', D: 'ด', DH: 'ด', F: 'ฟ', G: 'ก', HH: 'ฮ', JH: 'จ', K: 'ค', L: 'ล',
  M: 'ม', N: 'น', NG: 'ง', P: 'พ', R: 'ร', S: 'ส', SH: 'ช', T: 'ท', TH: 'ธ', V: 'ว',
  W: 'ว', Y: 'ย', Z: 'ซ', ZH: 'ช',
};
const finalConsonants = {
  B: 'บ', CH: 'ช', D: 'ด', DH: 'ด', F: 'ฟ', G: 'ก', JH: 'ช', K: 'ก', L: 'ล', M: 'ม',
  N: 'น', NG: 'ง', P: 'ป', R: 'ร์', S: 'ส', SH: 'ช', T: 'ต', TH: 'ต', V: 'ฟ', Z: 'ส', ZH: 'ช',
};
const vowelSpellings = {
  AA: (onset) => `${onset || 'อ'}า`,
  AE: (onset) => `แ${onset || 'อ'}`,
  AH: (onset) => `${onset || 'อ'}ะ`,
  AO: (onset) => `${onset || 'อ'}อ`,
  AW: (onset) => `เ${onset || 'อ'}า`,
  AY: (onset) => `ไ${onset || 'อ'}`,
  EH: (onset) => `เ${onset || 'อ'}ะ`,
  ER: (onset) => `เ${onset || 'อ'}อร์`,
  EY: (onset) => `เ${onset || 'อ'}`,
  IH: (onset) => `${onset || 'อ'}ิ`,
  IY: (onset) => `${onset || 'อ'}ี`,
  OW: (onset) => `โ${onset || 'อ'}`,
  OY: (onset) => `${onset}อย`,
  UH: (onset) => `${onset || 'อ'}ุ`,
  UW: (onset) => `${onset || 'อ'}ู`,
  AY_ER: (onset) => `ไ${onset || 'อ'}เออร์`,
};
const allowedOnsets = new Set([
  'B R', 'B L', 'K R', 'K L', 'K W', 'D R', 'D W', 'F R', 'F L', 'G R', 'G L', 'P R', 'P L', 'P Y',
  'S P', 'S T', 'S K', 'S M', 'S N', 'S L', 'S W', 'S P R', 'S P L', 'S T R', 'S K R', 'S K W',
  'T R', 'T W', 'V R', 'SH R', 'TH R', 'HH Y',
]);

function splitCodaAndOnset(cluster) {
  if (!cluster.length) return { coda: [], onset: [] };
  for (let onsetLength = Math.min(3, cluster.length); onsetLength > 1; onsetLength -= 1) {
    const onset = cluster.slice(-onsetLength);
    if (allowedOnsets.has(onset.join(' '))) return { coda: cluster.slice(0, -onsetLength), onset };
  }
  return { coda: cluster.slice(0, -1), onset: cluster.slice(-1) };
}

function syllabify(phonemes) {
  const nuclei = [];
  for (let index = 0; index < phonemes.length; index += 1) {
    const phoneme = phonemes[index];
    if (!vowelPhonemes.has(phoneme)) continue;
    const previous = nuclei.at(-1);
    if (phoneme === 'ER' && previous?.vowel === 'AY' && previous.end === index - 1) {
      previous.vowel = 'AY_ER';
      previous.end = index;
    } else {
      nuclei.push({ vowel: phoneme, start: index, end: index });
    }
  }
  if (!nuclei.length) return '';

  const syllables = [];
  let previousEnd = -1;
  for (let index = 0; index < nuclei.length; index += 1) {
    const nucleus = nuclei[index];
    const between = phonemes.slice(previousEnd + 1, nucleus.start);
    const split = index === 0 ? { coda: [], onset: between } : splitCodaAndOnset(between);
    const nextStart = nuclei[index + 1]?.start ?? phonemes.length;
    const trailing = phonemes.slice(nucleus.end + 1, nextStart);
    const trailingSplit = index === nuclei.length - 1 ? { coda: trailing, onset: [] } : splitCodaAndOnset(trailing);
    const onset = split.onset.map((phoneme) => initialConsonants[phoneme] || '').join('');
    const coda = [...split.coda, ...trailingSplit.coda].map((phoneme) => finalConsonants[phoneme] || '').join('');
    syllables.push(`${vowelSpellings[nucleus.vowel](onset)}${coda}`);
    previousEnd = nucleus.end;
  }
  return syllables.join('');
}

export function thaiReadingFor(word) {
  const normalized = String(word || '').toLocaleLowerCase();
  if (thaiReadingOverrides.has(normalized)) return thaiReadingOverrides.get(normalized);
  const pronunciation = pronunciations[normalized]?.split(',')[0];
  if (!pronunciation) return '';
  const phonemes = pronunciation.trim().split(/\s+/).map((phoneme) => phoneme.replace(/[012]$/, ''));
  return syllabify(phonemes);
}