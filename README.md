# Kham Khoi Jam

A Thai-English vocabulary notebook built with React, Vite, and Firebase Cloud Firestore.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. Node.js 20.19+ is required.

## Data

- Firebase Cloud Firestore (`words` collection) stores vocabulary and spaced-repetition progress online in real time.
- `data/vocabulary.example.json` provides starter seed words if the Firebase database is new.
- `data/dictionary.json` contains curated offline entries.
- `data/lexitron-etlex.dat` provides offline English-to-Thai translations. Its original license and required acknowledgement are in `data/LEXITRON-LICENSE.txt` and `data/LEXITRON-LICENSE-th.txt`.
- WordNet supplies offline English definitions. Its license is in `data/WORDNET-LICENSE.txt`.

The LEXiTRON-derived source is copyrighted by NECTEC. This product is created by the adaptation of LEXiTRON developed by NECTEC (http://www.nectec.or.th/). LEXiTRON data does not provide English definitions or example sentences; WordNet supplies definitions, and the app uses an available WordNet phrase as an example when possible.

Thai readings are approximate transliterations generated from the CMU Pronouncing Dictionary (ARPABET), with curated overrides for common words. See `data/CMU-PRONOUNCING-LICENSE.txt`.

## GitHub

The local vocabulary file is excluded from commits. Create a private or public GitHub repository, then connect and push it with:

```sh
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Do not publish personal vocabulary unless you intend to share it.

## GitHub Pages build

This repository's `kham-khoi-jam/site/` folder contains the static build for GitHub Pages. The public build stores words in each visitor's browser; it cannot write to the server-side JSON file. Its offline lookup index contains 35,000+ English-Thai entries and is downloaded only when adding the first word. To rebuild it, run `npm run build:pages`; this generates `public/pages-dictionary.json` from the bundled LEXiTRON and WordNet sources. The Node API and full offline dictionaries remain available with `npm run dev`.