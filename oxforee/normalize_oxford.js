const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'oxford-3000.json');
const out = path.join(__dirname, 'oxford-3000-normalized.json');

if (!fs.existsSync(src)) {
  console.error('Source file not found:', src);
  process.exit(1);
}

const raw = fs.readFileSync(src, 'utf8');
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error('Error parsing JSON:', e.message);
  process.exit(2);
}

let normalized;
if (Array.isArray(data) && data.length && typeof data[0] === 'string') {
  normalized = data.map(w => ({
    word: w,
    reading: '',
    pos: '',
    translate: '',
    examples: []
  }));
} else if (Array.isArray(data) && typeof data[0] === 'object') {
  normalized = data.map(it => ({
    word: it.word || it.lexeme || it.text || '',
    reading: it.reading || it.pron || '',
    pos: it.pos || it.type || '',
    translate: it.translate || it.meaning || '',
    examples: Array.isArray(it.examples) ? it.examples : (it.example ? [it.example] : [])
  }));
} else {
  console.error('Unexpected JSON format. Expected array.');
  process.exit(3);
}

fs.writeFileSync(out, JSON.stringify(normalized, null, 2), 'utf8');
console.log('Wrote normalized file to', out);
