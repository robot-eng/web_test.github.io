/**
 * FINAL SCRIPT.JS v3 - Premium UI Logic
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
        settings: { levels: ['A1', 'A2', 'B1', 'B2', 'Unknown'] },
        progress: {},
        selectedLetter: 'ALL'
    },

    BATCH_SIZE: 50,
    renderCount: 50,

    init() {
        console.log("🚀 App Launching v3...");
        this.initTheme(); // Load saved theme
        this.loadData();
        this.loadProgress(); // Will trigger updateStats
        this.initAlphabet();
        this.setupEvents();

        // Initial Filter Apply
        // If we want "Must Know" off by default, ensure settings.levels represents all by default?
        // Actually, let's stick to default ALL.
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

        // Update Selector UI
        document.querySelectorAll('.theme-opt').forEach(opt => {
            opt.classList.toggle('active', opt.id === `theme-${theme}`);
        });
    },

    loadData() {
        if (typeof OXFORD_DATA !== 'undefined') {
            this.state.words = OXFORD_DATA.map((w, i) => ({ ...w, id: i }));
            console.log(`Loaded ${this.state.words.length} words`);
        } else {
            document.getElementById('vocabList').innerHTML = '<div style="text-align:center;padding:40px;color:red;">Error: Data not loaded. Check data.js</div>';
        }
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
        this.updateStats(); // Update UI immediately
    },

    updateStats() {
        const total = this.state.words.length;
        const pValues = Object.values(this.state.progress);
        const mastered = pValues.filter(p => p.mastery >= 80).length;
        const review = pValues.filter(p => p.mastery > 0 && p.mastery < 80).length;

        // Text Updates
        const setTxt = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.textContent = txt;
        };
        setTxt('totalCount', total);
        setTxt('masteredCount', mastered);
        setTxt('reviewCount', review);
        setTxt('streakCount', this.calculateStreak());

        // Progress Bar
        const bar = document.getElementById('mainProgressFill');
        if (bar) {
            const pct = total > 0 ? (mastered / total) * 100 : 0;
            bar.style.width = `${pct}%`;
        }
    },

    calculateStreak() {
        // Mock streak logic for now, or use real dates if available
        return 12;
    },

    initAlphabet() {
        const container = document.getElementById('alphabetRow');
        if (!container) return;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        // We already have "All A-Z" button statically. Just add letters.

        let html = '';
        letters.forEach(l => {
            html += `<button class="filter-chip" onclick="APP.toggleLetter('${l}')">${l}</button>`;
        });
        container.innerHTML += html;
    },

    toggleLetter(letter) {
        this.state.selectedLetter = letter;

        // UI Update
        const allChips = document.querySelectorAll('#alphabetRow .filter-chip');
        allChips.forEach(c => {
            if (c.textContent.includes('All') && letter === 'ALL') c.classList.add('active');
            else if (c.textContent === letter) c.classList.add('active');
            else c.classList.remove('active');
        });

        this.applyFilters();
    },

    toggleLevel(type) {
        if (type === 'CORE') {
            const btn = document.getElementById('filter-core');
            const isActive = btn.classList.contains('active');

            if (!isActive) {
                // Turn ON Core Mode: Only A1/A2 or tagged "core"
                this.state.settings.levels = ['CORE'];
                btn.classList.add('active');
            } else {
                // Turn OFF: Revert to All
                this.state.settings.levels = ['A1', 'A2', 'B1', 'B2', 'Unknown'];
                btn.classList.remove('active');
            }
        }
        this.applyFilters();
    },

    setupEvents() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }

        // Scroll Infinite Load
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                this.loadMore();
            }
        });
    },

    applyFilters() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const levelMode = this.state.settings.levels[0] === 'CORE' ? 'CORE' : 'ALL';
        const letter = this.state.selectedLetter;

        this.state.filtered = this.state.words.filter(w => {
            // Level Check
            const wLevel = w.level || 'Unknown';
            if (levelMode === 'CORE') {
                // Logic: A1 is core.
                if (!wLevel.includes('A1')) return false;
            }

            // Alphabet Check
            if (letter !== 'ALL') {
                if (!w.word.toLowerCase().startsWith(letter.toLowerCase())) return false;
            }

            // Query Check
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
        if (emptyState) {
            emptyState.classList.toggle('hidden', this.state.filtered.length > 0);
        }
    },

    renderList() {
        const listEl = document.getElementById('vocabList');
        if (!listEl) return;

        const items = this.state.filtered.slice(0, this.renderCount);
        if (items.length === 0) {
            listEl.innerHTML = '';
            return;
        }

        const html = items.map(item => {
            const levelClass = (item.level && item.level.substring(0, 2)) || 'Unknown';
            const displayTrans = item.translate || '<span class="empty-translation">-</span>';
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
                        <div class="meaning">${displayTrans}</div>
                    </div>
                    ${displayEx ? `<div class="example">"${displayEx}"</div>` : ''}
                </div>
            </div>`;
        }).join('');

        listEl.innerHTML = html;
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
        const defSection = document.getElementById('modalDefSection');

        if (item.meanings && item.meanings.length > 0) {
            defSection.style.display = 'block';
            meaningsCont.innerHTML = item.meanings.map((m, i) => `
                <div style="margin-bottom:8px; display:flex; gap:8px;">
                    <span style="opacity:0.5; font-weight:700;">${i + 1}.</span>
                    <span>${m}</span>
                </div>`).join('');
        } else {
            defSection.style.display = 'none';
        }

        document.getElementById('detailModal').classList.add('active');
    },

    // === FLASHCARDS ===
    startFlashcards() {
        const pool = this.state.filtered.filter(w => w.translate && w.translate.length > 1);
        if (pool.length === 0) { alert('No valid words to review!'); return; }

        // Sort by least mastery or random? Random for now.
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

        // Reset State
          card.innerHTML = `
              <div style="text-align:center;">
                  <h2 style="font-size:32px; font-weight:800; margin-bottom:8px;">${item.word}</h2>
                  <span class="pos-tag">${item.pos}</span>
                  <div class="muted" style="margin-top:20px; font-size:14px;">(Tap to Flip)</div>
              </div>
          `;
          card.onclick = () => {
                card.innerHTML = `
                     <div style="text-align:center;">
                         <div class="muted" style="font-size:18px; margin-bottom:10px;">${item.word}</div>
                         <h2 class="primary-text" style="font-size:28px; font-weight:700;">${item.translate}</h2>
                     </div>
                 `;
                card.onclick = null; // Prevent double flip
          };
    },

    handleFlashcard(remembered) {
        const item = this.fcQueue[this.fcIndex];

        if (!this.state.progress[item.id]) this.state.progress[item.id] = { mastery: 0, reviews: 0 };
        const p = this.state.progress[item.id];

        if (remembered) p.mastery = Math.min(100, (p.mastery || 0) + 20);
        else p.mastery = Math.max(0, (p.mastery || 0) - 20);

        p.reviews = (p.reviews || 0) + 1;
        this.saveProgress();

        this.fcIndex++;
        this.showFlashcard();
    },

    resetReviewQueue() {
        if (confirm('Reset all words currently in review (0-80% mastery)?')) {
            Object.values(this.state.progress).forEach(p => {
                if (p.mastery > 0 && p.mastery < 80) p.mastery = 0;
            });
            this.saveProgress();
        }
    },

    // === QUIZ ===
    startQuiz() {
        this.nextQuizQuestion();
        document.getElementById('quizModal').classList.add('active');
    },

    nextQuizQuestion() {
        const pool = (this.state.filtered.length > 0 ? this.state.filtered : this.state.words)
            .filter(w => w.translate && w.translate.trim().length > 1);

        if (pool.length < 4) {
            alert('Need more words with translations for Quiz!');
            document.getElementById('quizModal').classList.remove('active');
            return;
        }

        this.quizItem = pool[Math.floor(Math.random() * pool.length)];

        const options = [this.quizItem];
        while (options.length < 4) {
            const r = pool[Math.floor(Math.random() * pool.length)];
            if (!options.includes(r) && r.word !== this.quizItem.word) options.push(r);
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

    clearFilters() {
        this.state.selectedLetter = 'ALL';
        this.state.settings.levels = ['A1', 'A2', 'B1', 'B2', 'Unknown'];
        document.getElementById('filter-core').classList.remove('active');
        document.getElementById('searchInput').value = '';
        this.applyFilters();
    }
};

// Global Page Switcher (Simplified for Multi-page)
window.switchPage = function (pageId) {
    if (pageId === 'vocab') {
        location.href = 'index.html';
    } else if (pageId === 'infor') {
        location.href = 'infor.html';
    }
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    // Both pages need basic init (progress, stats)
    APP.init();
    console.log("🚀 App initialized in " + (location.pathname.includes('infor') ? 'Encyclopedia' : 'Vocab') + " mode.");
});
