import argparse
import json
import re
import sys
import tempfile
import time
import urllib.error
import urllib.request
import zipfile
from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
VOCABULARY_PATH = ROOT / "src" / "data" / "oxford3000.json"
SOURCE_URL = "https://raw.githubusercontent.com/windwerfer/volubilis_dict/main/data/vol_mundo_01.11.2025.xlsx"
TATOEBA_URL = "https://api.tatoeba.org/v1/sentences"
MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
POS_PREFIXES = {
    "noun": "n.",
    "verb": "v.",
    "adjective": "adj.",
    "adverb": "adv.",
    "pronoun": "pron.",
    "preposition": "prep.",
    "conjunction": "conj.",
    "determiner": "det.",
    "interjection": "exclam.",
}
ARTICLE_MEANINGS = {
    "a": "คำนำหน้านามไม่ชี้เฉพาะ ใช้กับคำนามเอกพจน์",
    "an": "คำนำหน้านามไม่ชี้เฉพาะ ใช้หน้าคำนามที่ขึ้นต้นด้วยเสียงสระ",
    "the": "คำนำหน้านามชี้เฉพาะ",
}


def normalize(value):
    return re.sub(r"\s+", " ", value.strip().casefold().replace("’", "'"))


def read_cell(cell, shared_strings):
    value = cell.find(f"{{{MAIN_NS}}}v")
    if cell.get("t") == "s" and value is not None:
        return shared_strings[int(value.text)]
    if cell.get("t") == "inlineStr":
        return "".join(node.text or "" for node in cell.iter(f"{{{MAIN_NS}}}t"))
    return value.text if value is not None else ""


def read_workbook(path):
    namespace = {"main": MAIN_NS}
    with zipfile.ZipFile(path) as workbook:
        strings_path = "xl/sharedStrings.xml"
        shared_strings = []
        if strings_path in workbook.namelist():
            shared_root = ElementTree.fromstring(workbook.read(strings_path))
            shared_strings = [
                "".join(node.text or "" for node in entry.iter(f"{{{MAIN_NS}}}t"))
                for entry in shared_root
            ]

        sheet_root = ElementTree.fromstring(workbook.read("xl/worksheets/sheet1.xml"))
        rows = sheet_root.findall(".//main:sheetData/main:row", namespace)
        for row in rows:
            values = {}
            for cell in row.findall("main:c", namespace):
                match = re.match(r"[A-Z]+", cell.get("r", ""))
                if match:
                    values[match.group()] = read_cell(cell, shared_strings)
            yield values


def build_meanings(workbook_path, vocabulary):
    candidates = defaultdict(list)
    for row in read_workbook(workbook_path):
        thai = row.get("D", "").strip()
        english = row.get("E", "").strip()
        source_pos = row.get("G", "").strip().casefold()
        if not thai or not english:
            continue
        for gloss in re.split(r"\s*[;,/]\s*", english):
            key = normalize(gloss)
            if key:
                candidates[key].append((thai, source_pos))

    meanings = {}
    for entry in vocabulary:
        word = normalize(entry["word"])
        if word in ARTICLE_MEANINGS:
            meanings[entry["word"]] = ARTICLE_MEANINGS[word]
            continue
        matches = candidates.get(word, [])
        expected_prefix = POS_PREFIXES.get(entry.get("partOfSpeech"))
        compatible = [item for item in matches if expected_prefix and item[1].startswith(expected_prefix)]
        selected = compatible or matches
        unique = list(dict.fromkeys(thai for thai, _ in selected))
        if unique:
            meanings[entry["word"]] = "; ".join(unique[:4])
    return meanings


def fetch_tatoeba_sentences():
    params = (
        "lang=eng&trans%3Alang=tha&trans%3Ais_direct=yes&"
        "trans%3Ais_unapproved=no&trans%3Ais_orphan=no&"
        "is_unapproved=no&is_orphan=no&sort=words&limit=50"
    )
    url = f"{TATOEBA_URL}?{params}"
    while url:
        request = urllib.request.Request(url, headers={"User-Agent": "TypeMemo vocabulary importer"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                page = json.load(response)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
            print(f"Tatoeba request failed: {error}", file=sys.stderr)
            break

        yield from page.get("data", [])
        url = page.get("paging", {}).get("next")
        if url:
            time.sleep(0.12)


def add_examples(vocabulary):
    patterns = {
        entry["word"]: re.compile(rf"(?<![A-Za-z]){re.escape(entry['word'])}(?![A-Za-z])", re.IGNORECASE)
        for entry in vocabulary
        if re.fullmatch(r"[A-Za-z]+(?:[' -][A-Za-z]+)*", entry["word"])
    }
    by_word = {entry["word"]: entry for entry in vocabulary}
    assigned = set()

    for sentence in fetch_tatoeba_sentences():
        text = sentence.get("text", "").strip()
        if not 3 <= len(text.split()) <= 16 or "\ufffd" in text:
            continue
        translations = [
            translation for translation in sentence.get("translations", [])
            if translation.get("lang") == "tha"
            and translation.get("is_direct")
            and not translation.get("is_unapproved")
            and translation.get("owner")
            and "\ufffd" not in translation.get("text", "")
            and re.search(r"[\u0e00-\u0e7f]", translation.get("text", ""))
        ]
        if not translations:
            continue

        for word, pattern in patterns.items():
            if word in assigned or not pattern.search(text):
                continue
            translation = translations[0]
            by_word[word]["example"] = text
            by_word[word]["exampleTranslation"] = translation["text"]
            by_word[word]["exampleSource"] = {
                "sentenceId": sentence["id"],
                "sentenceOwner": sentence.get("owner"),
                "translationOwner": translation["owner"],
                "sentenceLicense": sentence.get("license", "CC BY 2.0 FR"),
                "translationLicense": translation.get("license", "CC BY 2.0 FR"),
            }
            assigned.add(word)

    return assigned


def main():
    parser = argparse.ArgumentParser(description="Add Volubilis meanings and attributed Tatoeba examples to Oxford 3000.")
    parser.add_argument("workbook", nargs="?", help="Path to the Volubilis XLSX workbook; downloads the published copy if omitted.")
    parser.add_argument("--dry-run", action="store_true", help="Report dictionary matching coverage without changing files.")
    parser.add_argument("--meanings-only", action="store_true", help="Update meanings without downloading Tatoeba examples.")
    args = parser.parse_args()

    workbook_path = Path(args.workbook) if args.workbook else None
    temporary_path = None
    if workbook_path is None:
        request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "TypeMemo vocabulary importer"})
        with urllib.request.urlopen(request, timeout=60) as response:
            temporary = tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False)
            temporary.write(response.read())
            temporary.close()
            temporary_path = Path(temporary.name)
            workbook_path = temporary_path

    try:
        vocabulary = json.loads(VOCABULARY_PATH.read_text(encoding="utf-8"))
        meanings = build_meanings(workbook_path, vocabulary)
        print(f"Volubilis meanings: {len(meanings)} / {len(vocabulary)}")
        if args.dry_run:
            return

        for entry in vocabulary:
            if entry["word"] in meanings:
                entry["meaning"] = meanings[entry["word"]]
        if args.meanings_only:
            VOCABULARY_PATH.write_text(
                f"{json.dumps(vocabulary, ensure_ascii=False, indent=2)}\n",
                encoding="utf-8",
            )
            print(f"Updated meanings in {VOCABULARY_PATH}")
            return

        examples = add_examples(vocabulary)
        print(f"Tatoeba examples: {len(examples)} / {len(vocabulary)}")
        VOCABULARY_PATH.write_text(
            f"{json.dumps(vocabulary, ensure_ascii=False, indent=2)}\n",
            encoding="utf-8",
        )
        print(f"Updated {VOCABULARY_PATH}")
    finally:
        if temporary_path:
            temporary_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()