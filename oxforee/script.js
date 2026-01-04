/**
 * FINAL SCRIPT.JS v2
 * Fully functional with Error Handling
 */

// Global Error Handler for Mobile/User Debugging
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const errorBox = document.createElement('div');
    errorBox.style.position = 'fixed';
    errorBox.style.bottom = '0';
    errorBox.style.left = '0';
    errorBox.style.width = '100%';
    errorBox.style.background = 'red';
    errorBox.style.color = 'white';
    errorBox.style.padding = '10px';
    errorBox.style.zIndex = '9999';
    errorBox.style.fontSize = '12px';
    errorBox.innerText = `Error: ${msg} at line ${lineNo}`;
    document.body.appendChild(errorBox);
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
        console.log("🚀 App Launching...");
        this.loadData();
        this.loadProgress();
        this.initAlphabet();
        this.setupEvents();
        this.applyFilters();
    },

    initAlphabet() {
        const container = document.getElementById('alphabetFilter');
        if (!container) return;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        let html = `<button class="letter-btn active all" onclick="APP.filterByLetter('ALL', this)">ALL</button>`;
        letters.forEach(l => {
            html += `<button class="letter-btn" onclick="APP.filterByLetter('${l}', this)">${l}</button>`;
        });

        container.innerHTML = html;
    },

    filterByLetter(letter, btn) {
        this.state.selectedLetter = letter;

        // UI Feedback
        document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.applyFilters();
    },

    loadData() {
        if (typeof OXFORD_DATA !== 'undefined') {
            this.state.words = OXFORD_DATA.map((w, i) => ({ ...w, id: i }));
            console.log(`Loaded ${this.state.words.length} words`);
        } else {
            console.error("Data missing!");
            document.getElementById('vocabList').innerHTML = '<div style="text-align:center;padding:20px;color:red;">Error: Data.js not loaded or variable missing.</div>';
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
        this.updateStats();
    },

    setupEvents() {
        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const val = e.target.value.toLowerCase();
                const clearBtn = document.getElementById('clearSearch');
                if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
                this.applyFilters();
            });
        }

        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearBtn.style.display = 'none';
                this.applyFilters();
            });
        }

        // Filters
        const filters = document.getElementById('levelFilters');
        if (filters) {
            filters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-chip')) {
                    const lvl = e.target.dataset.level;
                    e.target.classList.toggle('active');
                    if (e.target.classList.contains('active')) {
                        if (!this.state.settings.levels.includes(lvl)) this.state.settings.levels.push(lvl);
                    } else {
                        this.state.settings.levels = this.state.settings.levels.filter(l => l !== lvl);
                    }
                    this.applyFilters();
                }
            });
        }

        // Buttons
        const reviewBtn = document.getElementById('startReviewBtn');
        if (reviewBtn) reviewBtn.addEventListener('click', () => this.startFlashcards());

        const quizBtn = document.getElementById('startQuizBtn');
        if (quizBtn) quizBtn.addEventListener('click', () => this.startQuiz());

        const resetBtn = document.getElementById('resetDataBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            if (confirm('Reset all progress?')) {
                this.state.progress = {};
                this.saveProgress();
                this.applyFilters();
            }
        });

        // Scroll
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                this.loadMore();
            }
        });
    },

    speak(text, e) {
        if (e) e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        speechSynthesis.speak(utterance);
    },

    applyFilters() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const levels = this.state.settings.levels;

        // Apply Alphabet Filter
        const letter = this.state.selectedLetter;
        this.state.filtered = this.state.words.filter(w => {
            // Level
            const wLevel = w.level || 'Unknown';
            const levelMatch = levels.some(l => wLevel.includes(l));
            if (!levelMatch) return false;

            // Alphabet
            if (letter !== 'ALL') {
                if (!w.word.toLowerCase().startsWith(letter.toLowerCase())) return false;
            }

            // Query
            if (!query) return true;
            return w.word.toLowerCase().includes(query) ||
                (w.translate && w.translate.toLowerCase().includes(query));
        });

        this.renderCount = this.BATCH_SIZE;
        this.renderList();

        const emptyState = document.getElementById('emptyState');
        if (emptyState) emptyState.style.display = this.state.filtered.length === 0 ? 'block' : 'none';
    },

    renderList() {
        const listEl = document.getElementById('vocabList');
        if (!listEl) return;

        const items = this.state.filtered.slice(0, this.renderCount);

        if (items.length === 0) {
            listEl.innerHTML = '';
            // Don't show error here, rely on emptyState logic
            return;
        }

        const html = items.map(item => {
            const levelClass = (item.level && item.level.substring(0, 2)) || 'Unknown';
            const displayTrans = item.translate || '<span style="color:#ddd;">-</span>';
            const displayEx = item.examples && item.examples.length ? item.examples[0] : null;

            return `
            <div class="vocab-card" onclick="APP.openDetail(${item.id})">
                <div class="card-top">
                    <div class="word-group">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span class="word-text">${item.word}</span>
                            <button class="btn-audio" onclick="APP.speak('${item.word.replace(/'/g, "\\'")}', event)">🔊</button>
                        </div>
                        <span class="pos-text">${item.pos}</span>
                    </div>
                    <span class="level-badge ${levelClass}">${item.level || 'NA'}</span>
                </div>
                <div class="card-content">
                    <div class="meaning-text">${displayTrans}</div>
                    ${displayEx ? `<div class="example-box">"${displayEx}"</div>` : ''}
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

    updateStats() {
        const total = this.state.words.length;
        // Check progress
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
    },

    // --- DETAIL MODAL ---
    openDetail(id) {
        const item = this.state.words.find(w => w.id === id);
        if (!item) return;

        const setTxt = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.textContent = txt;
        };

        setTxt('modalWord', item.word);
        setTxt('modalPos', item.pos);
        setTxt('modalLevel', item.level || 'NA');

        const lvlBadge = document.getElementById('modalLevel');
        if (lvlBadge) lvlBadge.className = `modal-badge level ${item.level ? item.level.substring(0, 2) : ''}`;

        // Multi-tier meanings rendering
        const transCont = document.getElementById('modalTrans');
        const meaningsCont = document.getElementById('modalMeanings');
        const defSection = document.getElementById('modalDefSection');

        if (transCont) {
            transCont.textContent = item.translate || '-';
        }

        if (meaningsCont && defSection) {
            const meanings = item.meanings || [];
            if (meanings.length > 0) {
                meaningsCont.innerHTML = meanings.map((m, i) => `
                    <div style="margin-bottom:12px; display:flex; gap:10px;">
                        <span style="opacity:0.5; font-weight:bold;">${i + 1}.</span>
                        <span>${m}</span>
                    </div>`).join('');
                defSection.style.display = 'block';
            } else {
                defSection.style.display = 'none';
            }
        }

        // Multi-examples rendering
        const exCont = document.getElementById('modalEx');
        if (exCont) {
            if (item.examples && item.examples.length) {
                exCont.innerHTML = item.examples.map(ex => `<div class="modal-text italic" style="margin-bottom:10px;">"${ex}"</div>`).join('');
            } else {
                exCont.textContent = '-';
            }
        }

        const modal = document.getElementById('detailModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    },

    // --- FLASHCARDS ---
    fcQueue: [],
    currentFcIndex: 0,
    isFlipped: false,

    startFlashcards() {
        // IMPORTANT: Only review words that have a translation (to avoid empty backs)
        const pool = this.state.filtered.length > 0 ? this.state.filtered : this.state.words;
        this.fcQueue = pool.filter(w => w.translate && w.translate.trim().length > 1);

        if (this.fcQueue.length === 0) {
            alert('No words found with translations to review!');
            return;
        }

        this.fcQueue.sort(() => Math.random() - 0.5);
        this.currentFcIndex = 0;

        const modal = document.getElementById('flashcardModal');
        if (modal) modal.classList.add('active');
        this.showFlashcard();
    },

    showFlashcard() {
        if (this.currentFcIndex >= this.fcQueue.length) {
            alert('Review complete!');
            closeFlashcard();
            return;
        }

        const item = this.fcQueue[this.currentFcIndex];
        this.isFlipped = false;

        // Reset Card Flip State
        const card = document.getElementById('fcCard');
        if (card) {
            card.classList.remove('flipped');
            // Re-bind click for flip
            card.onclick = () => this.flipCard();
        }

        document.getElementById('fcWord').textContent = item.word;
        document.getElementById('fcPos').textContent = item.pos;

        // Populate Back Content (Tiered)
        const transMain = document.getElementById('fcTransMain');
        if (transMain) {
            // Priority: item.translate -> first meaning -> '-'
            const primary = item.translate || (item.meanings && item.meanings.length ? item.meanings[0] : null);
            transMain.textContent = primary || '-';
        }

        const meaningsCont = document.getElementById('fcMeanings');
        const meaningsSection = document.getElementById('fcMeaningsCont');
        if (meaningsCont && meaningsSection) {
            const meanings = item.meanings || [];
            if (meanings.length > 0) {
                meaningsSection.style.display = 'block';
                meaningsCont.innerHTML = meanings.map((m, i) => `
                    <div class="fc-meaning-item">
                        <div class="fc-meaning-num">${i + 1}</div>
                        <div class="fc-meaning-text">${m}</div>
                    </div>
                `).join('');
            } else {
                meaningsSection.style.display = 'none';
            }
        }

        const ex = item.examples && item.examples.length ? item.examples[0] : '';
        const exBox = document.getElementById('fcExBox');
        if (exBox) {
            document.getElementById('fcEx').textContent = ex;
            exBox.style.display = ex ? 'block' : 'none';
        }

        document.getElementById('fcActions').style.display = 'none';

        this.speak(item.word);
    },

    flipCard() {
        if (this.isFlipped) return;
        this.isFlipped = true;

        const card = document.getElementById('fcCard');
        if (card) card.classList.add('flipped');

        document.getElementById('fcActions').style.display = 'grid';
    },

    handleFlashcard(isCorrect) {
        if (this.fcProcessing) return; // Prevent double clicks
        this.fcProcessing = true;

        const item = this.fcQueue[this.currentFcIndex];

        if (!this.state.progress[item.id]) this.state.progress[item.id] = { mastery: 0, reviews: 0 };

        if (isCorrect) this.state.progress[item.id].mastery = Math.min(100, (this.state.progress[item.id].mastery || 0) + 20);
        else this.state.progress[item.id].mastery = Math.max(0, (this.state.progress[item.id].mastery || 0) - 10);

        this.state.progress[item.id].reviews = (this.state.progress[item.id].reviews || 0) + 1;
        this.saveProgress();

        this.currentFcIndex++;

        // Reset card before next one shows for smooth logic
        const card = document.getElementById('fcCard');
        if (card) card.classList.remove('flipped');

        setTimeout(() => {
            this.fcProcessing = false;
            this.showFlashcard();
        }, 500); // Wait for flip back animation
    },

    // --- QUIZ ---
    quizItem: null,

    startQuiz() {
        this.nextQuizQuestion();
        const modal = document.getElementById('quizModal');
        if (modal) modal.classList.add('active');
    },

    nextQuizQuestion() {
        const pool = (this.state.filtered.length > 0 ? this.state.filtered : this.state.words)
            .filter(w => w.translate && w.translate.trim().length > 1);

        if (pool.length < 4) {
            alert('Need more words with translations for Quiz!');
            closeQuiz();
            return;
        }

        this.quizItem = pool[Math.floor(Math.random() * pool.length)];

        const options = [this.quizItem];
        while (options.length < 4) {
            const r = pool[Math.floor(Math.random() * pool.length)];
            if (!options.includes(r) && r.word !== this.quizItem.word) options.push(r);
        }
        options.sort(() => Math.random() - 0.5);

        document.getElementById('quizQuestion').textContent = `"${this.quizItem.translate}" คือคำว่า?`;
        document.getElementById('quizQuestion').style.fontSize = '24px';
        document.getElementById('quizQuestion').style.fontWeight = 'bold';
        document.getElementById('quizQuestion').style.color = 'var(--primary)';

        const optContainer = document.getElementById('quizOptions');
        optContainer.innerHTML = '';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-full';
            btn.style.marginBottom = '10px';
            btn.style.fontSize = '18px';
            btn.textContent = opt.word;
            btn.onclick = () => this.handleQuizAnswer(opt === this.quizItem, btn);
            optContainer.appendChild(btn);
        });
    },

    handleQuizAnswer(isCorrect, btn) {
        if (isCorrect) {
            btn.style.background = '#DCFCE7';
            btn.style.borderColor = '#16A34A';
            this.speak(this.quizItem.word);
            setTimeout(() => this.nextQuizQuestion(), 1200);

            if (!this.state.progress[this.quizItem.id]) this.state.progress[this.quizItem.id] = { mastery: 0 };
            this.state.progress[this.quizItem.id].mastery += 10;
            this.saveProgress();
        } else {
            btn.style.background = '#FEE2E2';
            btn.style.borderColor = '#EF4444';
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 500);
        }
    }
};

// Global Helpers
function closeModal() {
    const el = document.getElementById('detailModal');
    if (!el) return;
    el.classList.remove('active');
    setTimeout(() => { el.style.display = 'none'; }, 300);
}

function closeFlashcard() {
    const el = document.getElementById('flashcardModal');
    if (!el) return;
    el.classList.remove('active');
    setTimeout(() => { el.style.display = 'none'; }, 300);
}

function closeQuiz() {
    const el = document.getElementById('quizModal');
    if (!el) return;
    el.classList.remove('active');
    setTimeout(() => { el.style.display = 'none'; }, 300);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    try {
        APP.init();
        const flip = document.getElementById('fcFlipBtn');
        if (flip) flip.addEventListener('click', () => APP.flipCard());
    } catch (e) {
        console.error(e);
        alert('App compile error: ' + e.message);
    }
});
