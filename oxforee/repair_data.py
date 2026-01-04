import json
import urllib.request
import urllib.parse
import time
import random
import sys

# Set encoding for Windows console
if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# Configuration
INPUT_FILE = 'oxford-3000.json'
OUTPUT_FILE = 'data.js'
LIMIT = 50 # Repair top 50 words for demo

def fetch_translation(text):
    """Fetch Thai translation for a given sentence or word"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and data[0]:
                translated = "".join([part[0] for part in data[0] if part[0]])
                return translated
    except Exception as e:
        pass
    return None

def fetch_rich_data(word):
    """Fetch multiple meanings and examples from Dictionary API"""
    results = {'meanings': [], 'examples': []}
    try:
        url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{urllib.parse.quote(word)}"
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode('utf-8'))
            if isinstance(data, list) and len(data) > 0:
                entry = data[0]
                
                # Extract up to 3 distinct meanings (definitions)
                defs = []
                for meaning in entry.get('meanings', []):
                    for dem in meaning.get('definitions', []):
                        definition = dem.get('definition')
                        if definition and definition not in defs:
                            defs.append(definition)
                        
                        example = dem.get('example')
                        if example and example not in results['examples']:
                            results['examples'].append(example)
                        
                        if len(defs) >= 3 and len(results['examples']) >= 3: break
                    if len(defs) >= 3 and len(results['examples']) >= 3: break
                
                # Translate definitions to Thai
                for d in defs[:3]:
                    th = fetch_translation(d)
                    if th: results['meanings'].append(th)
                    time.sleep(0.2)
                    
    except Exception as e:
        pass
    return results

# Small manual overrides for basic words that machine translators fail at (making them too descriptive)
MANUAL_MAP = {
    "a": "หนึ่ง / ก",
    "an": "หนึ่ง / ก",
    "the": "นี่ / นั้น",
    "about": "เกี่ยวกับ / ประมาณ",
    "across": "ข้าม / ตลอด",
}

def main():
    print(f"Starting Precision Data Repair for top {LIMIT} words...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    repaired_data = []
    
    for i, item in enumerate(data[:LIMIT]):
        word = item['word'].lower().strip()
        print(f"[{i+1}/{LIMIT}] Processing: {word}")
        
        # 1. Fetch Primary Translation (Concise)
        if word in MANUAL_MAP:
            primary_th = MANUAL_MAP[word]
        else:
            primary_th = fetch_translation(word)
        
        # 2. Fetch Rich Definitions & Examples
        rich = fetch_rich_data(word)
        
        # Build Final item
        item['word'] = word
        item['translate'] = primary_th if primary_th else " - "
        item['meanings'] = rich['meanings'] if rich['meanings'] else [primary_th]
        item['examples'] = rich['examples'] if rich['examples'] else item.get('examples', [])
        
        # Basic cleanup
        item['level'] = item.get('level', 'A1')
        item['pos'] = item.get('pos', 'n.')
        item['mastery'] = 0
        item['reviews'] = 0
            
        repaired_data.append(item)
        time.sleep(1.0) # Slower to be safer & more precise
        
    print("Combining with remaining data...")
    for item in data[LIMIT:]:
        repaired_data.append(item)
        
    js_content = f"const OXFORD_DATA = {json.dumps(repaired_data, indent=2, ensure_ascii=False)};"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Repair Complete! Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
