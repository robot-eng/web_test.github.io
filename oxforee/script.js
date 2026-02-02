/**
 * FINAL SCRIPT.JS v3.1 – FIXED MULTI CEFR FILTER
 */

// Global Error Handler
window.onerror = function (msg, url, lineNo) {
    console.error(`❌ Error: ${msg} at line ${lineNo}`);
    return false;
};

const APP = {
    state: {
        words: [],
        filtered: [],
        settings: {
            // default = ALL
            levels: []
        },
        progress: {},
        selectedLetter: 'ALL'
    },

    BATCH_SIZE: 50,
    renderCount: 50,

    /* ================= INIT ================= */
    init() {
        console.log("🚀 App Launching v3.1...");
        this.initTheme();
        this.loadData();
        this.loadProgress();
        this.initAlphabet();
        this.setupEvents();
        this.applyFilters();
    },

    /* ================= THEME ================= */
    initTheme() {
        const saved = localStorage.getItem('oxford_theme') || 'light';
        this.setTheme(saved);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('oxford_theme', theme);
        document.querySelectorAll('.theme-opt')
            .forEach(o => o.classList.toggle('active', o.id === `theme-${theme}`));
    },

    /* ================= DATA ================= */
    loadData() {
        if (typeof OXFORD_DATA === 'undefined') {
            console.error('OXFORD_DATA missing');
            return;
        }
        this.state.words = OXFORD_DATA.map((w, i) => ({ ...w, id: i }));
        console.log(`📚 Loaded ${this.state.words.length} words`);
    },

    loadProgress() {
        try {
            this.state.progress =
                JSON.parse(localStorage.getItem('oxford_progress_v4')) || {};
        } catch { }
        this.updateStats();
    },

    saveProgress() {
        localStorage.setItem('oxford_progress_v4', JSON.stringify(this.state.progress));
        this.updateStats();
    },

    /* ================= STATS ================= */
    updateStats() {
        const total = this.state.words.length;
        const p = Object.values(this.state.progress);
        const mastered = p.filter(v => v.mastery >= 80).length;
        const review = p.filter(v => v.mastery > 0 && v.mastery < 80).length;

        const set = (id, v) => {
            const el = document.getElementById(id);
            if (el) el.textContent = v;
        };

        set('totalCount', total);
        set('masteredCount', mastered);
        set('reviewCount', review);

        const bar = document.getElementById('mainProgressFill');
        if (bar) bar.style.width = total ? `${(mastered / total) * 100}%` : '0%';
    },

    /* ================= ALPHABET ================= */
    initAlphabet() {
        const row = document.getElementById('alphabetRow');
        if (!row) return;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        row.innerHTML =
            `<button class="filter-chip active" onclick="APP.toggleLetter('ALL')">All</button>` +
            letters.map(l =>
                `<button class="filter-chip" onclick="APP.toggleLetter('${l}')">${l}</button>`
            ).join('');
    },

    toggleLetter(letter) {
        this.state.selectedLetter = letter;
        document.querySelectorAll('#alphabetRow .filter-chip')
            .forEach(b => b.classList.toggle('active', b.textContent === letter || (letter === 'ALL' && b.textContent === 'All')));
        this.applyFilters();
    },

    /* ================= LEVEL FILTER ================= */
    toggleLevel(type) {
        const btnCore = document.getElementById('filter-core');

        // === CORE ===
        if (type === 'CORE') {
            const active = btnCore.classList.contains('active');

            this.state.settings.levels = active ? [] : ['CORE'];
            btnCore.classList.toggle('active', !active);

            document.querySelectorAll('[data-level]')
                .forEach(b => b.classList.remove('active'));

            this.applyFilters();
            return;
        }

        // === CEFR ===
        btnCore.classList.remove('active');

        let levels = [...this.state.settings.levels];

        // ถ้ายังไม่เคยเลือกอะไร = ALL → reset ก่อน
        if (levels.length === 0) levels = [];

        if (levels.includes(type)) {
            levels = levels.filter(l => l !== type);
        } else {
            levels.push(type);
        }

        this.state.settings.levels = levels;

        document.querySelectorAll('[data-level]').forEach(b =>
            b.classList.toggle('active', levels.includes(b.dataset.level))
        );

        this.applyFilters();
    },
    /* ================= FILTER CORE ================= */
    applyFilters() {
        const query =
            document.getElementById('searchInput')?.value.toLowerCase().trim() || '';

        const activeLevels = this.state.settings.levels;
        const letter = this.state.selectedLetter;

        this.state.filtered = this.state.words.filter(w => {
            const wLevel = (w.level || 'Unknown').toUpperCase();

            // === CORE (A1 only) ===
            if (activeLevels.includes('CORE')) {
                if (!wLevel.includes('A1')) return false;
            }

            // === CEFR multi-select ===
            if (activeLevels.length > 0 && !activeLevels.includes('CORE')) {
                if (!activeLevels.some(lv => wLevel.includes(lv))) return false;
            }

            // === Alphabet ===
            if (letter !== 'ALL') {
                if (!w.word.toLowerCase().startsWith(letter.toLowerCase()))
                    return false;
            }

            // === Search ===
            if (query) {
                const hit =
                    w.word.toLowerCase().includes(query) ||
                    (w.translate && w.translate.toLowerCase().includes(query));
                if (!hit) return false;
            }

            return true;
        });

        this.renderCount = this.BATCH_SIZE;
        this.renderList();

        document.getElementById('emptyState')
            ?.classList.toggle('hidden', this.state.filtered.length > 0);
    },


    /* ================= RENDER ================= */
    renderList() {
        const el = document.getElementById('vocabList');
        if (!el) return;

        el.innerHTML = this.state.filtered
            .slice(0, this.renderCount)
            .map(w => `
                <div class="vocab-card" onclick="APP.openDetail(${w.id})">
                    <div class="card-top">
                        <span class="word-text">${w.word}</span>
                        <span class="lvl-badge lvl-${(w.level || '').substring(0, 2)}">${w.level || 'NA'}</span>
                    </div>
                    <div class="meaning">${w.translate || '-'}</div>
                </div>
            `).join('');
    },

    loadMore() {
        if (this.renderCount >= this.state.filtered.length) return;
        this.renderCount += this.BATCH_SIZE;
        this.renderList();
    },

    /* ================= FLASHCARD / QUIZ ================= */
    startFlashcards() {
        if (this.state.filtered.length === 0) {
            alert('ไม่มีคำให้ทบทวน');
            return;
        }
        document.getElementById('flashcardModal')?.classList.add('active');
    },

    startQuiz() {
        if (this.state.filtered.length < 4) {
            alert('คำศัพท์ไม่พอสำหรับ Quiz');
            return;
        }
        document.getElementById('quizModal')?.classList.add('active');
        this.nextQuizQuestion();
    },

    nextQuizQuestion() {
        const pool = this.state.filtered.filter(w => w.translate);
        if (pool.length < 4) return;

        this.quizItem = pool[Math.floor(Math.random() * pool.length)];
        const opts = [this.quizItem];

        while (opts.length < 4) {
            const r = pool[Math.floor(Math.random() * pool.length)];
            if (!opts.includes(r)) opts.push(r);
        }

        opts.sort(() => Math.random() - 0.5);

        document.getElementById('quizQuestion').textContent =
            `"${this.quizItem.translate}" คือคำว่า?`;

        const box = document.getElementById('quizOptions');
        box.innerHTML = '';
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'quiz-opt';
            b.textContent = o.word;
            b.onclick = () => this.nextQuizQuestion();
            box.appendChild(b);
        });
    },

    /* ================= UTILS ================= */
    setupEvents() {
        document.getElementById('searchInput')
            ?.addEventListener('input', () => this.applyFilters());

        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >
                document.body.offsetHeight - 500)
                this.loadMore();
        });
    },

    openDetail(id) {
        const w = this.state.words.find(x => x.id === id);
        if (!w) return;
        document.getElementById('modalWord').textContent = w.word;
        document.getElementById('modalTrans').textContent = w.translate || '-';
        document.getElementById('modalLevel').textContent = w.level || 'NA';
        document.getElementById('detailModal')?.classList.add('active');
    }
};

/* ================= START ================= */
document.addEventListener('DOMContentLoaded', () => {
    APP.init();
});
