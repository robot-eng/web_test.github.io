/**
 * Oxford 3000 Vocabulary Learning System - Enhanced Version
 * Features: Progress Tracking, Spaced Repetition, Level Filtering
 */

// ===== STATE MANAGEMENT =====
let vocab = [];
let filteredVocab = []; // For storing filtered results
const STORAGE_KEY = 'oxford_vocab_data';
const SETTINGS_KEY = 'oxford_vocab_settings';

// User settings
let settings = {
    selectedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'], // All levels by default  
    showExamples: true,
    darkMode: false,
    dailyGoal: 20 // words per day
};

// ===== DOM ELEMENTS =====
const els = {
    tbody: document.getElementById('vocabBody'),
    search: document.getElementById('search'),
    totalCount: document.getElementById('totalCount'),
    modal: document.getElementById('modal'),
    modalOverlay: document.getElementById('modalOverlay'),
    addBtn: document.getElementById('addBtn'),
    reviewBtn: document.getElementById('reviewBtn'),
    importBtn: document.getElementById('importBtn'),
    reviewModal: document.getElementById('reviewModal'),
    levelFilter: document.getElementById('levelFilter')
};

// ===== INITIALIZATION =====
function init() {
    loadData();
    loadSettings();
    applySettings();
    sanitizeAndFix();
    filterByLevel(); // Apply level filter
    renderTable(filteredVocab);
    setupEventListeners();
    updateStats();
}

// ===== DATA MANAGEMENT =====

function loadSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
        settings = { ...settings, ...JSON.parse(raw) };
    }
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function applySettings() {
    document.body.classList.toggle('dark-mode', settings.darkMode);
    // Update UI to reflect settings
    const toggleBtn = document.getElementById('toggleExamplesBtn');
    if (toggleBtn) {
        toggleBtn.innerHTML = settings.showExamples
            ? '<span>👁️</span> ซ่อนตัวอย่าง'
            : '<span>❌</span> แสดงตัวอย่าง';
    }
}

// Auto-repair bad data
function sanitizeAndFix() {
    let changed = false;
    vocab = vocab.filter(item => {
        if (item.word && item.word.length > 50) {
            changed = true;
            return false;
        }
        return true;
    }).map(item => {
        // Fix spaced out words
        if (item.word && item.word.length > 3) {
            const spaces = item.word.split(' ').length - 1;
            if (spaces > (item.word.length * 0.4)) {
                item.word = item.word.replace(/\s+/g, '');
                changed = true;
            }
        }

        // Fix merged POS
        if (item.word && item.word.length > 3) {
            const posMatch = item.word.match(/^([a-z]+)(n\.|v\.|adj\.|adv\.|prep\.|conj\.|pron\.|num\.)/);
            if (posMatch) {
                item.word = posMatch[1];
                if (!item.pos) item.pos = posMatch[2];
                changed = true;
            }
        }

        // Ensure tracking fields exist
        if (item.mastery === undefined) item.mastery = 0;
        if (item.reviewCount === undefined) item.reviewCount = 0;
        if (item.correctCount === undefined) item.correctCount = 0;
        if (item.streak === undefined) item.streak = 0;

        return item;
    });

    if (changed) {
        saveData();
        showToast('ระบบทำความสะอาดข้อมูลอัตโนมัติแล้ว');
    }
}

// ===== LEVEL FILTERING =====
function filterByLevel() {
    if (settings.selectedLevels.length === 0) {
        filteredVocab = [...vocab];
        return;
    }

    filteredVocab = vocab.filter(item => {
        if (!item.level) return true; // Include words without level
        return settings.selectedLevels.some(level => item.level.includes(level));
    });
}

function toggleLevelFilter(level) {
    const index = settings.selectedLevels.indexOf(level);
    if (index > -1) {
        settings.selectedLevels.splice(index, 1);
    } else {
        settings.selectedLevels.push(level);
    }

    saveSettings();
    filterByLevel();
    filter(); // Re-apply search filter too
    updateStats();
}

// ===== LOAD/SAVE DATA =====

async function loadFullData() {
    if (!confirm('การโหลดข้อมูลใหม่จะล้างข้อมูลเดิมที่มีอยู่ทั้งหมด คุณแน่ใจหรือไม่?')) return;

    try {
        els.importBtn.textContent = 'กำลังโหลด...';
        els.importBtn.disabled = true;

        const res = await fetch('oxford-3000.json');
        if (!res.ok) throw new Error('ไม่พบไฟล์ oxford-3000.json');

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('รูปแบบไฟล์ไม่ถูกต้อง');

        vocab = data.map((item, i) => {
            const isObj = typeof item === 'object';
            return {
                id: Date.now() + i,
                word: isObj ? (item.word || '') : item,
                reading: isObj ? (item.reading || '') : '',
                pos: isObj ? (item.pos || '') : '',
                level: isObj ? (item.level || '') : '',
                translate: isObj ? (item.translate || '') : '',
                examples: isObj ? (item.examples || []) : [],
                // Tracking fields
                mastery: isObj ? (item.mastery || 0) : 0,
                lastReviewed: isObj ? (item.lastReviewed || null) : null,
                reviewCount: isObj ? (item.reviewCount || 0) : 0,
                correctCount: isObj ? (item.correctCount || 0) : 0,
                streak: isObj ? (item.streak || 0) : 0,
                nextReview: isObj ? (item.nextReview || null) : null
            };
        });

        saveData();
        filterByLevel();
        renderTable(filteredVocab);
        showToast(`นำเข้าคำศัพท์สำเร็จ ${vocab.length} คำ`);

    } catch (e) {
        alert('เกิดข้อผิดพลาด: ' + e.message);
        console.error(e);
    } finally {
        els.importBtn.innerHTML = '<span>📥</span> Load Data';
        els.importBtn.disabled = false;
    }
}

function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        vocab = JSON.parse(raw);
    } else {
        // Initial empty data - user must import
        vocab = [];
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vocab));
    updateStats();
}

// ===== STATISTICS =====

function updateStats() {
    const total = filteredVocab.length;
    const mastered = filteredVocab.filter(w => w.mastery >= 80).length;
    const needReview = filteredVocab.filter(w => w.mastery > 0 && w.mastery < 80).length;
    const newWords = filteredVocab.filter(w => w.reviewCount === 0).length;

    if (els.totalCount) els.totalCount.textContent = total;

    // Update stat cards if they exist
    const statCards = document.querySelectorAll('.stat-card .stat-value');
    if (statCards.length >= 3) {
        statCards[0].textContent = total;
        statCards[1].textContent = mastered;
        statCards[2].textContent = needReview;
    }
}

// Level breakdown
function getLevelStats() {
    const stats = {};
    ['A1', 'A2', 'B1', 'B2', 'C1'].forEach(level => {
        stats[level] = vocab.filter(w => w.level && w.level.includes(level)).length;
    });
    return stats;
}

// continue to next part...
