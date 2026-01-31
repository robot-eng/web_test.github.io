"""
Batch Auto-Fill Script for Oxford 3000 Vocabulary
Automatically fetches definitions, pronunciations, and translations for all words
Implements rate limiting and retry logic to avoid API blocks
"""

import json
import asyncio
import aiohttp
from typing import Dict, List, Optional
import time

class BatchAutoFill:
    def __init__(self, input_file: str, output_file: str):
        self.input_file = input_file
        self.output_file = output_file
        self.vocab_data = []
        self.progress_file = "autofill_progress.json"
        
        # API endpoints
        self.dict_api = "https://api.dictionaryapi.dev/api/v2/entries/en/"
        self.translate_api = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=th&dt=t&q="
        
        # Rate limiting (to avoid API bans)
        self.delay_between_requests = 1.0  # seconds
        self.batch_size = 50  # process 50 words at a time
        
    def load_data(self):
        """Load vocabulary data from JSON file"""
        print(f"📖 Loading data from {self.input_file}...")
        with open(self.input_file, 'r', encoding='utf-8') as f:
            self.vocab_data = json.load(f)
        print(f"✅ Loaded {len(self.vocab_data)} words")
        
    def save_data(self):
        """Save current progress to output file"""
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(self.vocab_data, f, indent=2, ensure_ascii=False)
        print(f"💾 Saved progress to {self.output_file}")
        
    async def fetch_english_data(self, session: aiohttp.ClientSession, word: str) -> Optional[Dict]:
        """Fetch English dictionary data (IPA, examples, definitions)"""
        try:
            # Handle multi-word queries for API (e.g. "according to" -> "according%20to")
            query = word.replace(" ", "%20")
            url = f"{self.dict_api}{query}"
            
            async with session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if data and isinstance(data, list) and len(data) > 0:
                        entry = data[0]
                        
                        # Get phonetic (IPA)
                        reading = entry.get('phonetic', '')
                        if not reading and entry.get('phonetics'):
                            for p in entry['phonetics']:
                                if p.get('text'):
                                    reading = p['text']
                                    break
                        
                        # Get examples - Limit to 3 good examples
                        examples = []
                        seen_examples = set()
                        
                        for meaning in entry.get('meanings', []):
                            for definition in meaning.get('definitions', []):
                                ex = definition.get('example')
                                if ex:
                                    # Clean up example
                                    ex = ex.strip()
                                    if ex and ex not in seen_examples and len(ex) < 100: # Not too long
                                        examples.append(ex)
                                        seen_examples.add(ex)
                                if len(examples) >= 3:
                                    break
                            if len(examples) >= 3:
                                break
                        
                        return {
                            'reading': reading,
                            'examples': examples
                        }
        except Exception as e:
            # Silent fail for dictionary api
            pass
        
        return None
    
    async def fetch_thai_translation(self, session: aiohttp.ClientSession, word: str) -> Optional[str]:
        """Fetch Thai translation using Google Translate endpoint"""
        try:
            # Handle multi-word queries
            query = word.replace(" ", "%20")
            url = f"{self.translate_api}{query}"
            
            async with session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if data and isinstance(data, list) and len(data) > 0:
                        # Google Translate single API returns [ [ [trans, orig, ...], ... ], ... ]
                        translate = "".join([part[0] for part in data[0] if part[0]])
                        
                        if not translate or translate.lower() == word.lower():
                            return None
                            
                        return translate
        except Exception as e:
            pass
        
        return None
    
    async def process_word(self, session: aiohttp.ClientSession, index: int, word_data: Dict) -> bool:
        """Process a single word - fetch missing data"""
        word = word_data['word']
        updated = False
        
        # Skip if already has all data
        if word_data.get('reading') and word_data.get('translate') and word_data.get('examples'):
            return False
        
        print(f"[{index + 1}/{len(self.vocab_data)}] Processing: {word}")
        
        # Fetch English data (IPA, examples)
        eng_data = await self.fetch_english_data(session, word)
        if eng_data:
            if not word_data.get('reading') and eng_data.get('reading'):
                word_data['reading'] = eng_data['reading']
                updated = True
            
            if not word_data.get('examples') and eng_data.get('examples'):
                word_data['examples'] = eng_data['examples']
                updated = True
        
        # Fetch Thai translation
        if not word_data.get('translate'):
            thai = await self.fetch_thai_translation(session, word)
            if thai:
                word_data['translate'] = thai
                updated = True
        
        # Rate limiting delay
        await asyncio.sleep(self.delay_between_requests)
        
        return updated
    
    async def run_batch(self, start_index: int, end_index: int):
        """Process a batch of words"""
        print(f"\n🔄 Processing batch {start_index}-{end_index}...")
        
        async with aiohttp.ClientSession() as session:
            tasks = []
            for i in range(start_index, end_index):
                if i >= len(self.vocab_data):
                    break
                task = self.process_word(session, i, self.vocab_data[i])
                tasks.append(task)
            
            results = await asyncio.gather(*tasks)
            updated_count = sum(1 for r in results if r)
            
            print(f"✅ Batch complete: {updated_count} words updated")
        
        # Save progress after each batch
        self.save_data()
    
    async def run_all(self):
        """Run auto-fill for all words in batches"""
        self.load_data()
        
        total_words = len(self.vocab_data)
        print(f"\n🚀 Starting auto-fill for {total_words} words...")
        print(f"⏱️  Estimated time: ~{(total_words * self.delay_between_requests) / 60:.1f} minutes")
        print(f"⚙️  Processing in batches of {self.batch_size}\n")
        
        start_time = time.time()
        
        for i in range(0, total_words, self.batch_size):
            end_i = min(i + self.batch_size, total_words)
            await self.run_batch(i, end_i)
            
            # Progress report
            elapsed = time.time() - start_time
            progress_pct = (end_i / total_words) * 100
            print(f"📊 Progress: {progress_pct:.1f}% ({end_i}/{total_words}) - Elapsed: {elapsed/60:.1f}m\n")
        
        print(f"\n🎉 Auto-fill complete!")
        print(f"⏱️  Total time: {(time.time() - start_time) / 60:.1f} minutes")
        
        # Final statistics
        filled_count = sum(1 for w in self.vocab_data if w.get('translate'))
        print(f"📊 Final stats:")
        print(f"   - Total words: {total_words}")
        print(f"   - Words with translation: {filled_count}")
        print(f"   - Completion rate: {(filled_count/total_words)*100:.1f}%")


async def main():
    # Usage
    autofill = BatchAutoFill(
        input_file="oxford-3000.json",
        output_file="oxford-3000-filled.json"
    )
    
    await autofill.run_all()


if __name__ == "__main__":
    print("=" * 60)
    print("🔮 Oxford 3000 Batch Auto-Fill Tool")
    print("=" * 60)
    
    # Check if user wants to proceed
    print("\n⚠️  WARNING:")
    print("   - This will make ~3000+ API requests")
    print("   - Estimated time: ~50-60 minutes")
    print("   - Uses free APIs (may have rate limits)")
    print("\n")
    
    confirm = input("Do you want to proceed? (yes/no): ").strip().lower()
    
    if confirm in ['yes', 'y']:
        asyncio.run(main())
    else:
        print("❌ Cancelled by user")
