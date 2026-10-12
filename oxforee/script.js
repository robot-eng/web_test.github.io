/**
 * FINAL SCRIPT.JS v4 - Full Version with Advanced Multi-Filter
 */

// Global Error Handler
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error(`Error: ${msg} at line ${lineNo}`);
    return false;
};

const APP = {
    state: {
        words: [],
        filtered: [],
        settings: { 
            // เริ่มต้นเป็นค่าว่าง [] หมายถึง "Show All" ตามที่คุณต้องการ
            levels: [] 
        },
        progress: {},
        selectedLetter: 'ALL'
    },

    BATCH_SIZE: 50,
    renderCount: 50,

    init() {
        console.log("🚀 App Launching v4...");
        this.initTheme();
        this.loadData();
        this.loadProgress(); 
        this.initAlphabet();
        this.setupEvents();

        this.updateFilterUI(); // อัปเดตสีปุ่มเริ่มต้น
        this.updateStats();
        this.applyFilters();
    },

    initTheme() {
        const saved = localStorage.getItem('oxford_theme') || 'light';
        this.setTheme(saved);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('oxford_theme', theme);
        this.state.theme = theme;
        document.querySelectorAll('.theme-opt').forEach(opt => {
            opt.classList.toggle('active', opt.id === `theme-${theme}`);
        });
    },

    loadData() {
        try {
            if (typeof OXFORD_DATA !== 'undefined') {
                this.state.words = OXFORD_DATA.map((w, i) => ({ ...w, id: i }));
                console.log(`Loaded ${this.state.words.length} words`);
            } else {
                const vEl = document.getElementById('vocabList');
                if (vEl) vEl.innerHTML = '<div style="text-align:center;padding:40px;color:red;">Error: Data not loaded. Check data.js</div>';
            }
        } catch (e) { console.error('Error in loadData:', e); }
    },

    loadProgress() {
        try {
            const saved = localStorage.getItem('oxford_progress_v4');
            if (saved) this.state.progress = JSON.parse(saved);
        } catch (e) { console.error(e); }
        this.updateStats();
    },

    saveProgress() {
        localStorage.setItem('oxford_progress_v4', JSON.stringify(this.state.progress));
        this.updateStats();
    },

    updateStats() {
        const total = this.state.words.length;
        const pValues = Object.values(this.state.progress);
        const mastered = pValues.filter(p => p.mastery >= 80).length;
        const review = pValues.filter(p => p.mastery > 0 && p.mastery < 80).length;

        const setTxt = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.textContent = txt;
        };
        setTxt('totalCount', total);
        setTxt('masteredCount', mastered);
        setTxt('reviewCount', review);
        setTxt('streakCount', 12); // Mock streak

        const bar = document.getElementById('mainProgressFill');
        if (bar) {
            const pct = total > 0 ? (mastered / total) * 100 : 0;
            bar.style.width = `${pct}%`;
        }
    },

    initAlphabet() {
        const container = document.getElementById('alphabetRow');
        if (!container) return;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let html = '';
        letters.forEach(l => {
            html += `<button class="filter-chip" onclick="APP.toggleLetter('${l}')">${l}</button>`;
        });
        container.innerHTML += html;
    },

    // --- ระบบตัวกรองใหม่ที่คุณต้องการ ---

    toggleLevel(type) {
        if (type === 'ALL') {
            // ล้างค่าทั้งหมดกลับไปสู่สถานะเริ่มต้น (โชว์ทั้งหมด)
            this.state.settings.levels = [];
        } else if (type === 'CORE') {
            // ปุ่ม "Must Know" (A1 + A2)
            this.state.settings.levels = ['A1', 'A2'];
        } else {
            // การเลือกแบบทีละอัน (A1, B1, ...)
            const index = this.state.settings.levels.indexOf(type);
            if (index > -1) {
                this.state.settings.levels.splice(index, 1); // ถ้าเลือกอยู่แล้ว ให้เอาออก
            } else {
                this.state.settings.levels.push(type); // ถ้ายังไม่เลือก ให้เพิ่มเข้า list
            }
        }
        
        this.updateFilterUI();
        this.applyFilters();
    },

    toggleLetter(letter) {
        this.state.selectedLetter = letter;
        // หากกดปุ่ม All ตรงตัวอักษร ให้รีเซ็ตการเลือก Level ทั้งหมดด้วย
        if (letter === 'ALL') {
            this.state.settings.levels = [];
        }
        this.updateFilterUI();
        this.applyFilters();
    },

    updateFilterUI() {
        // 1. ปุ่มระดับภาษา A1-C2 (หาจาก data-level ใน HTML)
        document.querySelectorAll('.filter-chip[data-level]').forEach(btn => {
            const lvl = btn.getAttribute('data-level');
            btn.classList.toggle('active', this.state.settings.levels.includes(lvl));
        });

        // 2. ปุ่ม All A-Z
        const allBtn = document.getElementById('filter-all');
        if (allBtn) {
            const isNoLevel = this.state.settings.levels.length === 0;
            const isAllLetter = this.state.selectedLetter === 'ALL';
            allBtn.classList.toggle('active', isNoLevel && isAllLetter);
        }

        // 3. ปุ่มตัวอักษร A-Z
        document.querySelectorAll('#alphabetRow .filter-chip').forEach(c => {
            if (c.textContent === this.state.selectedLetter) c.classList.add('active');
            else if (this.state.selectedLetter === 'ALL' && c.textContent.includes('All')) c.classList.add('active');
            else c.classList.remove('active');
        });

        // 4. ปุ่ม Must Know
        const coreBtn = document.getElementById('filter-core');
        if (coreBtn) {
            const isCore = this.state.settings.levels.includes('A1') && this.state.settings.levels.length <= 2;
            coreBtn.classList.toggle('active', isCore);
        }
    },

    applyFilters() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const letter = this.state.selectedLetter;
        const selectedLevels = this.state.settings.levels;

        this.state.filtered = this.state.words.filter(w => {
            // 1. Level Filter
            if (selectedLevels.length > 0) {
                const wLevel = w.level || 'Unknown';
                const isMatch = selectedLevels.some(l => wLevel.includes(l));
                if (!isMatch) return false;
            }

            // 2. Alphabet Filter
            if (letter !== 'ALL') {
                if (!w.word.toLowerCase().startsWith(letter.toLowerCase())) return false;
            }

            // 3. Search Query
            if (query) {
                const matchWord = w.word.toLowerCase().includes(query);
                const matchTrans = w.translate && w.translate.toLowerCase().includes(query);
                if (!matchWord && !matchTrans) return false;
            }
            return true;
        });

        this.renderCount = this.BATCH_SIZE;
        this.renderList();

        const emptyState = document.getElementById('emptyState');
        if (emptyState) emptyState.classList.toggle('hidden', this.state.filtered.length > 0);
    },

    // --- ระบบแสดงผลและการจัดการ Modal ---

    renderList() {
        const listEl = document.getElementById('vocabList');
        if (!listEl) return;

        const items = this.state.filtered.slice(0, this.renderCount);
        if (items.length === 0) {
            listEl.innerHTML = '';
            return;
        }

        listEl.innerHTML = items.map(item => {
            const levelClass = (item.level && item.level.substring(0, 2)) || 'Unknown';
            const displayEx = item.examples && item.examples.length ? item.examples[0] : null;

            return `
            <div class="vocab-card" onclick="APP.openDetail(${item.id})">
                <div class="card-top">
                    <div class="word-row">
                        <span class="word-text">${item.word}</span>
                        <button class="sound-btn" onclick="APP.speak('${item.word.replace(/'/g, "\\'")}', event)">🔊</button>
                    </div>
                    <span class="lvl-badge lvl-${levelClass}">${item.level || 'NA'}</span>
                </div>
                <div style="margin-top:6px;">
                    <div style="display:flex; align-items:baseline; gap:6px;">
                        <span class="pos-tag">${item.pos}</span>
                        <div class="meaning">${item.translate || '-'}</div>
                    </div>
                    ${displayEx ? `<div class="example">"${displayEx}"</div>` : ''}
                </div>
            </div>`;
        }).join('');
    },

    loadMore() {
        if (this.renderCount >= this.state.filtered.length) return;
        this.renderCount += this.BATCH_SIZE;
        this.renderList();
    },

    speak(text, e) {
        if (e) e.stopPropagation();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-GB';
        speechSynthesis.speak(u);
    },

    openDetail(id) {
        const item = this.state.words.find(w => w.id === id);
        if (!item) return;
        const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
        setTxt('modalWord', item.word);
        setTxt('modalPos', item.pos);
        setTxt('modalTrans', item.translate || '-');
        setTxt('modalEx', (item.examples && item.examples[0]) ? `"${item.examples[0]}"` : '-');

        const lvlEl = document.getElementById('modalLevel');
        if (lvlEl) {
            lvlEl.textContent = item.level || 'NA';
            lvlEl.className = `lvl-badge lvl-${item.level ? item.level.substring(0, 2) : ''}`;
        }

        const meaningsCont = document.getElementById('modalMeanings');
        if (item.meanings && item.meanings.length > 0) {
            document.getElementById('modalDefSection').style.display = 'block';
            meaningsCont.innerHTML = item.meanings.map((m, i) => `<div style="margin-bottom:8px; display:flex; gap:8px;"><span style="opacity:0.5; font-weight:700;">${i+1}.</span><span>${m}</span></div>`).join('');
        } else {
            document.getElementById('modalDefSection').style.display = 'none';
        }
        document.getElementById('detailModal').classList.add('active');
    },

    // --- FLASHCARDS & QUIZ (คงเดิมไว้ทั้งหมดตามต้นฉบับ) ---

    startFlashcards() {
        const pool = this.state.filtered.filter(w => w.translate && w.translate.length > 1);
        if (pool.length === 0) { alert('No valid words to review!'); return; }
        this.fcQueue = pool.sort(() => Math.random() - 0.5);
        this.fcIndex = 0;
        document.getElementById('flashcardModal').classList.add('active');
        this.showFlashcard();
    },

    showFlashcard() {
        if (this.fcIndex >= this.fcQueue.length) {
            alert('Review Session Complete!');
            document.getElementById('flashcardModal').classList.remove('active');
            return;
        }
        const item = this.fcQueue[this.fcIndex];
        const card = document.getElementById('fcCard');
        card.innerHTML = `<div style="text-align:center;"><h2 style="font-size:32px; font-weight:800; margin-bottom:8px;">${item.word}</h2><span class="pos-tag">${item.pos}</span><div class="muted" style="margin-top:20px; font-size:14px;">(Tap to Flip)</div></div>`;
        card.onclick = () => {
            card.innerHTML = `<div style="text-align:center;"><div class="muted" style="font-size:18px; margin-bottom:10px;">${item.word}</div><h2 class="primary-text" style="font-size:28px; font-weight:700;">${item.translate}</h2></div>`;
            card.onclick = null;
        };
    },

    handleFlashcard(remembered) {
        const item = this.fcQueue[this.fcIndex];
        if (!this.state.progress[item.id]) this.state.progress[item.id] = { mastery: 0, reviews: 0 };
        const p = this.state.progress[item.id];
        p.mastery = remembered ? Math.min(100, (p.mastery || 0) + 20) : Math.max(0, (p.mastery || 0) - 20);
        this.saveProgress();
        this.fcIndex++;
        this.showFlashcard();
    },

    startQuiz() {
        this.nextQuizQuestion();
        document.getElementById('quizModal').classList.add('active');
    },

    nextQuizQuestion() {
        const pool = (this.state.filtered.length > 4 ? this.state.filtered : this.state.words).filter(w => w.translate && w.translate.trim().length > 1);
        if (pool.length < 4) { alert('Need more words!'); return; }
        this.quizItem = pool[Math.floor(Math.random() * pool.length)];
        const options = [this.quizItem];
        while (options.length < 4) {
            const r = pool[Math.floor(Math.random() * pool.length)];
            if (!options.includes(r)) options.push(r);
        }
        options.sort(() => Math.random() - 0.5);
        document.getElementById('quizQuestion').innerHTML = `"${this.quizItem.translate}" คือคำว่า?`;
        const optContainer = document.getElementById('quizOptions');
        optContainer.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt';
            btn.textContent = opt.word;
            btn.onclick = () => this.handleQuizAnswer(opt === this.quizItem, btn);
            optContainer.appendChild(btn);
        });
    },

    handleQuizAnswer(isCorrect, btn) {
        if (isCorrect) {
            btn.classList.add('btn-remember');
            this.speak(this.quizItem.word);
            if (!this.state.progress[this.quizItem.id]) this.state.progress[this.quizItem.id] = { mastery: 0 };
            this.state.progress[this.quizItem.id].mastery = Math.min(100, (this.state.progress[this.quizItem.id].mastery || 0) + 10);
            this.saveProgress();
            setTimeout(() => this.nextQuizQuestion(), 1200);
        } else {
            btn.classList.add('btn-forgot');
        }
    },

    setupEvents() {
        document.getElementById('searchInput')?.addEventListener('input', () => this.applyFilters());
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) this.loadMore();
        });
    },

    clearFilters() {
        this.toggleLevel('ALL');
    }
};

window.switchPage = function (pageId) {
    location.href = pageId === 'infor' ? 'infor.html' : 'index.html';
};

document.addEventListener('DOMContentLoaded', () => APP.init());