import json
import urllib.request
import urllib.parse
import time
import sys
import re

# Set encoding for Windows console
if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# Configuration
INPUT_FILE = 'oxford-3000-filled.json'
OUTPUT_FILE = 'oxford-3000-filled.json' # Overwrite with cleaned data
JS_OUTPUT_FILE = 'data.js'

# High-Quality Manual Map for Common/Problematic Words
MANUAL_MAP = {
    "a": "หนึ่ง / ก",
    "an": "หนึ่ง / ก",
    "the": "นี่ / นั้น",
    "about": "เกี่ยวกับ / ประมาณ",
    "across": "ข้าม / ตลอด",
    "against": "ต่อต้าน / พิง / กับ",
    "all": "ทั้งหมด / ทุกสิ่ง",
    "and": "และ",
    "as": "เหมือน / ในฐานะ",
    "at": "ที่",
    "aim": "จุดมุ่งหมาย / เป้าหมาย",
    "addition": "การเพิ่ม / ส่วนเพิ่มเติม",
    "alcohol": "แอลกอฮอล์",
    "ankle": "ข้อเท้า",
    "assess": "ประเมิน",
    "atmosphere": "บรรยากาศ",
    "awful": "แย่มาก / น่ากลัว",
    "benefit": "ประโยชน์ / ผลประโยชน์",
    "blame": "ตำหนิ / กล่าวโทษ",
    "blank": "ว่าง / ช่องว่าง",
    "block": "กั้น / บล็อก / ก้อน",
    "bond": "ข้อผูกมัด / พันธะ",
    "boyfriend": "แฟนหนุ่ม",
    "breast": "หน้าอก / เต้านม",
    "call": "เรียก / โทร",
    "capital": "เมืองหลวง / เงินทุน",
    "coast": "ชายฝั่ง",
    "combine": "ผสม / รวมกัน",
    "convince": "โน้มน้าว / ทำให้เชื่อ",
    "actually": "จริงๆ แล้ว",
    "according to": "ตาม / ตามที่",
    "active": "คล่องแคล่ว / กระตือรือร้น",
    "advance": "ล่วงหน้า / พัฒนา",
    "acceptable": "ยอมรับได้",
    "access": "เข้าถึง / ทางเข้า",
    "accident": "อุบัติเหตุ",
    "accommodation": "ที่พัก",
    "accompany": "ไปเป็นเพื่อน / มาพร้อมกับ",
    "account": "บัญชี / รายงาน",
    "accurate": "แม่นยำ / ถูกต้อง",
    "accuse": "กล่าวหา / กล่าวโทษ",
    "achieve": "บรรลุ / สำเร็จ",
    "achievement": "ความสำเร็จ",
    "acknowledge": "ยอมรับ / รับทราบ",
    "acquire": "ได้รับ / ได้มา",
    "act": "แสดง / กระทำ / กฎหมาย",
    "action": "การกระทำ",
    "after": "หลังจาก",
    "already": "เรียบร้อยแล้ว",
    "apple": "แอปเปิ้ล",
    "association": "สมาคม",
    "balance": "สมดุล / ยอดคงเหลือ",
    "ban": "ห้าม / สั่งห้าม",
    "base": "ฐาน / พื้นฐาน",
    "based": "อิงตาม / ขึ้นอยู่กับ",
    "beer": "เบียร์",
}

def is_thai(text):
    """Check if text contains primarily Thai characters"""
    if not text: return False
    # Thai Unicode range: \u0e00-\u0e7f
    thai_chars = re.findall(r'[\u0e00-\u0e7f]', text)
    return len(thai_chars) > (len(text) * 0.5) # At least 50% Thai

def clean_translation(text):
    """Clean up translation text"""
    if not text: return ""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove excessive whitespace
    text = " ".join(text.split())
    # Remove suspicious suffixes or prefixes often found in bad scrapes
    text = re.sub(r'Name=.*Comment', '', text)
    text = re.sub(r'usa\. kgm', '', text)
    text = re.sub(r'kumbinsihin', '', text) # Tagalog
    # Remove romanized Thai if it follows Thai text
    # e.g. "ข้อเท้า k̄ĥx thêā" -> "ข้อเท้า"
    # This is tricky, but we can try to find the start of latin chars after Thai
    match = re.search(r'([\u0e00-\u0e7f]+)\s+[a-z̄]', text)
    if match:
        text = match.group(1).strip()
    
    # If it's too long, it's probably a definition instead of a translation
    if len(text) > 80:
        # Try to take the first sentence or part before / or ,
        parts = re.split(r'[/,;.]', text)
        if parts:
            text = parts[0].strip()
            
    return text.strip()

def fetch_translation(text):
    """Fetch Thai translation for a given word using Google Translate"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data and data[0]:
                translated = "".join([part[0] for part in data[0] if part[0]])
                return clean_translation(translated)
    except Exception as e:
        pass
    return None

def main():
    print(f"🚀 Starting Translation Restoration...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated_count = 0
    cleaned_count = 0
    
    for i, item in enumerate(data):
        word = item['word'].strip()
        current_trans = item.get('translate', '').strip()
        
        needs_update = False
        new_trans = None
        
        # 1. Check for manual override
        if word.lower() in MANUAL_MAP:
            new_trans = MANUAL_MAP[word.lower()]
            if new_trans != current_trans:
                needs_update = True
        
        # 2. Check for empty or corrupted current translation
        elif not current_trans or current_trans == "-" or not is_thai(current_trans) or len(current_trans) > 100:
            needs_update = True
            print(f"[{i+1}/3000] Word '{word}' needs repair. Current: '{current_trans}'")
            new_trans = fetch_translation(word)
            if not new_trans:
                print(f"   ⚠️ Failed to fetch translation for '{word}'")
            else:
                print(f"   ✅ New: '{new_trans}'")
                time.sleep(0.5) # Rate limiting
        
        # 3. Basic cleaning for existing ones
        else:
            cleaned = clean_translation(current_trans)
            if cleaned != current_trans:
                item['translate'] = cleaned
                cleaned_count += 1
        
        if needs_update and new_trans:
            item['translate'] = new_trans
            updated_count += 1
            
        # Periodic save
        if (i + 1) % 100 == 0:
            print(f"📊 Progress: {i+1}/3000 words processed...")
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)

    # Final save
    print(f"\n✅ Restoration Complete!")
    print(f"   - Words updated: {updated_count}")
    print(f"   - Words cleaned: {cleaned_count}")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Sync with data.js
    js_content = f"const OXFORD_DATA = {json.dumps(data, indent=2, ensure_ascii=False)};"
    with open(JS_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"💾 Synced with {JS_OUTPUT_FILE}")

if __name__ == "__main__":
    main()
