import json
import urllib.request
import urllib.parse
import time
import re
import sys

# Set encoding for Windows console
if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# Configuration
INPUT_FILE = 'oxford-3000-filled.json' # Reading from filled to fix it
OUTPUT_FILE = 'data.js'
# We will iterate through ALL data to check for suspicious items
# But only doing full API calls on broken ones to save time/quota if any

def fetch_translation(text, retries=2):
    """Fetch Thai translation for a given sentence or word"""
    if not text: return None
    for _ in range(retries):
        try:
            headers = {'User-Agent': 'Mozilla/5.0'}
            # Use Google Translate API (Unofficial but effective for small batches)
            url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&q={urllib.parse.quote(text)}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
                if data and data[0]:
                    translated = "".join([part[0] for part in data[0] if part[0]])
                    return translated.strip()
        except Exception:
            time.sleep(1)
    return None

def is_suspicious(item):
    """Check if an item has suspicious data"""
    word = item.get('word', '')
    trans = item.get('translate', '')
    
    # 1. Contains XML/HTML tags
    if re.search(r'<[^>]+>', trans): return True, "HTML Tags"
    
    # 2. Contains English phonetic junk in Thai
    if re.search(r'[A-Za-z]+.*[A-Za-z]+', trans) and len(re.findall(r'[ก-๙]', trans)) < 2: 
        # If mostly English alphabet in translation field
        return True, "English in Translation"
        
    # 3. Translation too long (likely a definition dump)
    if len(trans) > 100: return True, "Too Long"
    
    # 4. Specific known bad words
    if word in ['aim', 'assess', 'ankle', 'boyfriend', 'breast', 'call', 'capital', 'coast']:
        return True, "Known Bad Word"
        
    return False, ""

def sanitize_text(text):
    if not text: return ""
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', '', text)
    # Remove weird chars
    clean = clean.replace('Name=', '').replace('Comment', '')
    return clean.strip()

def main():
    print("Loading data...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    fixed_count = 0
    
    # Pre-defined manual fixes for the reported broken words
    MANUAL_FIXES = {
        "aim": "เป้าหมาย / จุดมุ่งหมาย",
        "assess": "ประเมิน",
        "ankle": "ข้อเท้า",
        "atmosphere": "บรรยากาศ",
        "awful": "แย่มาก",
        "benefit": "ประโยชน์",
        "blame": "กล่าวโทษ",
        "blank": "ว่างเปล่า",
        "block": "ปิดกั้น / ท่อนไม้",
        "bond": "ข้อผูกมัด / พันธะ",
        "boyfriend": "แฟนหนุ่ม",
        "breast": "หน้าอก",
        "call": "เรียก / โทรหา",
        "can1 modal": "สามารถ",
        "capital": "เมืองหลวง / เงินทุน",
        "coast": "ชายฝั่ง",
        "combine": "รวมกัน",
        "convince": "โน้มน้าวใจ",
        "kilogram": "กิโลกรัม"
    }

    print(f"Scanning {len(data)} words for issues...")
    
    for i, item in enumerate(data):
        word = item['word'].lower().strip()
        is_bad, reason = is_suspicious(item)
        
        # Also apply manual fixes if in list
        if word in MANUAL_FIXES:
            print(f"[FIXING] {word} (Manual Map)")
            item['translate'] = MANUAL_FIXES[word]
            fixed_count += 1
            if 'meanings' not in item or not item['meanings']:
                 item['meanings'] = [MANUAL_FIXES[word]]
            continue
            
        if is_bad:
            print(f"[FIXING] {word}: {reason} -> '{item['translate'][:30]}...'")
            
            # Step 1: Sanitize existing if it's just tags
            if reason == "HTML Tags":
                item['translate'] = sanitize_text(item['translate'])
                
            # Step 2: Re-translate if english or garbage
            if reason in ["English in Translation", "Too Long", "Known Bad Word"] or not item['translate']:
                new_trans = fetch_translation(word)
                if new_trans:
                    print(f"   -> New: {new_trans}")
                    item['translate'] = new_trans
                    item['meanings'] = [new_trans] # Reset meanings to be safe
                else:
                    print("   -> Failed to fetch.")
            
            fixed_count += 1
            time.sleep(0.5) # Rate limit

    print(f"Repaired {fixed_count} words.")
    
    # Save output
    js_content = f"const OXFORD_DATA = {json.dumps(data, indent=2, ensure_ascii=False)};"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
