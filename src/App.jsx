import React, { useEffect, useState, useRef } from 'react';
import dictionary from '../data/dictionary.json';
import vocabularyExample from '../data/vocabulary.example.json';
import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

const DAY = 24 * 60 * 60 * 1000;
let pagesDictionaryPromise;
const knownDictionaryEntries = new Map(
  [...dictionary, ...vocabularyExample].map((entry) => [entry.word.toLocaleLowerCase(), entry])
);

function addKnownWordMetadata(words) {
  return words.map((word) => ({
    ...word,
    partOfSpeech: word.partOfSpeech || knownDictionaryEntries.get(word.word.toLocaleLowerCase())?.partOfSpeech || 'คำศัพท์',
    thaiReading: word.thaiReading || knownDictionaryEntries.get(word.word.toLocaleLowerCase())?.thaiReading || '',
    category: word.category || 'ทั่วไป',
  }));
}

function loadPagesDictionary() {
  if (!pagesDictionaryPromise) {
    const dictionaryUrl = `${import.meta.env.BASE_URL}pages-dictionary.json`;
    pagesDictionaryPromise = fetch(dictionaryUrl).then(async (response) => {
      if (!response.ok) throw new Error('โหลดพจนานุกรมไม่สำเร็จ');
      return response.json();
    });
  }
  return pagesDictionaryPromise;
}

function isMastered(word) {
  return (word.streak || 0) >= 3;
}

function speak(text, event) {
  if (event) event.stopPropagation();
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
}

const CATEGORY_COLORS = {
  'ทั่วไป': { bg: '#eef2ec', text: '#3c5a44', border: '#dbe5d6' },
  'การทำงาน': { bg: '#e8f1f5', text: '#29546b', border: '#d0e2ec' },
  'การเรียน': { bg: '#fdf3e7', text: '#8c5923', border: '#f7dfc6' },
  'การเดินทาง': { bg: '#f0edf6', text: '#533c77', border: '#dfd8ec' },
  'ความรู้สึก': { bg: '#faebee', text: '#8c2d3f', border: '#f5d4db' },
};

function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || { bg: '#f1f1eb', text: '#4e544a', border: '#e1e1d7' };
}

function App() {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState('connecting'); // 'connected' | 'connecting' | 'error'

  // Navigation & View Layout
  const [page, setPage] = useState('library'); // 'library' | 'review'
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'table'

  // Filters & Search
  const [filter, setFilter] = useState('all'); // 'all' | 'due' | 'learning' | 'mastered'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('review'); // 'review' | 'az' | 'newest'
  const [search, setSearch] = useState('');

  // Dialogs
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null); // null or word object
  const [manualMode, setManualMode] = useState(false);
  const [wordInput, setWordInput] = useState('');
  const [wordForm, setWordForm] = useState({
    englishMeaning: '',
    thaiMeaning: '',
    thaiReading: '',
    example: '',
    partOfSpeech: '',
    category: 'ทั่วไป',
  });
  const [formMessage, setFormMessage] = useState('');
  const [toast, setToast] = useState('');

  // Review Flashcard State
  const [reviewQueue, setReviewQueue] = useState([]);
  const [reviewPosition, setReviewPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionCompletedCount, setSessionCompletedCount] = useState(0);

  const fileInputRef = useRef(null);

  // Firestore Sync Listener
  useEffect(() => {
    setIsLoading(true);
    setFirebaseStatus('connecting');
    const wordsRef = collection(db, 'words');

    const unsubscribe = onSnapshot(
      wordsRef,
      async (snapshot) => {
        setFirebaseStatus('connected');
        if (snapshot.empty) {
          const hasSeeded = localStorage.getItem('kham-khoi-jam-firebase-seeded');
          if (!hasSeeded && vocabularyExample.length > 0) {
            localStorage.setItem('kham-khoi-jam-firebase-seeded', 'true');
            try {
              for (const sample of vocabularyExample) {
                await setDoc(doc(db, 'words', sample.id), {
                  ...sample,
                  createdAt: Date.now() - Math.floor(Math.random() * 1000000),
                });
              }
              return;
            } catch (seedErr) {
              console.warn('Could not seed starter vocabulary:', seedErr);
            }
          }
          setWords([]);
          setIsLoading(false);
          return;
        }

        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setWords(addKnownWordMetadata(items));
        setIsLoading(false);
      },
      (error) => {
        console.error('Firebase Firestore error:', error);
        setFirebaseStatus('error');
        setToast('เชื่อมต่อ Firebase ไม่สำเร็จ: ' + (error.message || 'โปรดตรวจเช็ค Firestore Rules'));
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Toast Timer
  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  // Keyboard Shortcuts for Flashcard Review
  useEffect(() => {
    if (page !== 'review') return;

    function handleKeyDown(e) {
      if (isAddOpen || editingWord) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        setRevealed((prev) => !prev);
      } else if (revealed && (e.key === '1' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        rateWord(false);
      } else if (revealed && (e.key === '2' || e.key === 'ArrowRight')) {
        e.preventDefault();
        rateWord(true);
      } else if (e.key.toLowerCase() === 'r') {
        const current = words.find((w) => w.id === reviewQueue[reviewPosition]);
        if (current) speak(current.word);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, revealed, reviewQueue, reviewPosition, words, isAddOpen, editingWord]);

  // Derived Statistics
  const dueWords = words.filter((word) => Number(word.nextReview || 0) <= Date.now());
  const masteredCount = words.filter(isMastered).length;
  const learningCount = words.length - masteredCount;
  const currentReviewWord = words.find((word) => word.id === reviewQueue[reviewPosition]);

  // Extract all categories
  const categories = ['all', ...new Set(words.map((w) => w.category || 'ทั่วไป').filter(Boolean))];

  // Filtered and Sorted Words
  const filteredWords = words
    .filter((word) => {
      // Status filter
      if (filter === 'due' && Number(word.nextReview || 0) > Date.now()) return false;
      if (filter === 'learning' && isMastered(word)) return false;
      if (filter === 'mastered' && !isMastered(word)) return false;

      // Category filter
      if (selectedCategory !== 'all' && word.category !== selectedCategory) return false;

      // Search query
      const query = search.trim().toLocaleLowerCase();
      if (!query) return true;
      const searchable = `${word.word} ${word.thaiReading} ${word.englishMeaning} ${word.thaiMeaning} ${word.example} ${word.category} ${word.partOfSpeech}`.toLocaleLowerCase();
      return searchable.includes(query);
    })
    .sort((a, b) => {
      if (sortBy === 'review') return Number(a.nextReview || 0) - Number(b.nextReview || 0);
      if (sortBy === 'az') return a.word.localeCompare(b.word);
      if (sortBy === 'newest') return Number(b.createdAt || 0) - Number(a.createdAt || 0);
      return 0;
    });

  function navigate(nextPage) {
    if (nextPage === 'review') {
      const queue = dueWords.map((word) => word.id);
      setReviewQueue(queue);
      setReviewPosition(0);
      setRevealed(false);
      setSessionCompletedCount(0);
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openAddDialog() {
    setWordInput('');
    setWordForm({
      englishMeaning: '',
      thaiMeaning: '',
      thaiReading: '',
      example: '',
      partOfSpeech: '',
      category: 'ทั่วไป',
    });
    setManualMode(false);
    setFormMessage('');
    setIsAddOpen(true);
  }

  function openEditDialog(word, event) {
    if (event) event.stopPropagation();
    setEditingWord(word);
    setWordForm({
      englishMeaning: word.englishMeaning || '',
      thaiMeaning: word.thaiMeaning || '',
      thaiReading: word.thaiReading || '',
      example: word.example || '',
      partOfSpeech: word.partOfSpeech || '',
      category: word.category || 'ทั่วไป',
    });
    setFormMessage('');
  }

  async function handleAddSubmit(event) {
    event.preventDefault();
    const nextWord = wordInput.trim();
    if (!nextWord) {
      setFormMessage('กรุณากรอกคำศัพท์ก่อนครับ');
      return;
    }
    if (words.some((word) => word.word.toLocaleLowerCase() === nextWord.toLocaleLowerCase())) {
      setFormMessage('คำนี้อยู่ในสมุดคำศัพท์แล้วครับ');
      return;
    }

    setIsSaving(true);
    setFormMessage(manualMode ? 'กำลังบันทึกลง Firebase...' : 'กำลังค้นหาความหมายจากพจนานุกรม...');

    try {
      let match = dictionary.find((entry) => entry.word.toLocaleLowerCase() === nextWord.toLocaleLowerCase());

      if (!match) {
        try {
          const dictData = await loadPagesDictionary();
          const indexedEntry = dictData[nextWord.toLocaleLowerCase()];
          if (indexedEntry) {
            match = {
              word: nextWord,
              englishMeaning: indexedEntry[0],
              thaiMeaning: indexedEntry[1],
              category: indexedEntry[2] || 'ทั่วไป',
              example: indexedEntry[3] || '',
              partOfSpeech: indexedEntry[4] || 'คำศัพท์',
              thaiReading: indexedEntry[5] || '',
            };
          }
        } catch {
          // fallback to manual
        }
      }

      if (!manualMode && !match) {
        setManualMode(true);
        setFormMessage('ไม่พบคำนี้ในพจนานุกรมอัตโนมัติ กรุณากรอกความหมายด้านล่างได้เลยครับ');
        setIsSaving(false);
        return;
      }

      const details = manualMode ? wordForm : match;
      if (!details.englishMeaning?.trim() || !details.thaiMeaning?.trim()) {
        setWordForm({
          englishMeaning: details.englishMeaning || '',
          thaiMeaning: details.thaiMeaning || '',
          thaiReading: details.thaiReading || '',
          example: details.example || '',
          partOfSpeech: details.partOfSpeech || 'คำศัพท์',
          category: details.category || 'ทั่วไป',
        });
        setManualMode(true);
        setFormMessage('กรุณากรอกความหมายอังกฤษและคำแปลไทยให้ครบถ้วนก่อนบันทึก');
        setIsSaving(false);
        return;
      }

      const newWordId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newWord = {
        word: nextWord,
        englishMeaning: details.englishMeaning.trim(),
        thaiMeaning: details.thaiMeaning.trim(),
        partOfSpeech: (details.partOfSpeech || 'คำศัพท์').trim(),
        thaiReading: (details.thaiReading || '').trim(),
        example: (details.example || '').trim(),
        category: details.category || 'ทั่วไป',
        streak: 0,
        interval: 0,
        nextReview: Date.now(),
        createdAt: Date.now(),
      };

      await setDoc(doc(db, 'words', newWordId), newWord);

      setWordInput('');
      setWordForm({ englishMeaning: '', thaiMeaning: '', thaiReading: '', example: '', partOfSpeech: '', category: 'ทั่วไป' });
      setManualMode(false);
      setIsAddOpen(false);
      setFormMessage('');
      setToast(`เพิ่มคำว่า “${nextWord}” ลงคลังเรียบร้อย ✨`);
    } catch (error) {
      console.error(error);
      setFormMessage(error.message || 'บันทึกคำศัพท์ไม่สำเร็จ');
      if (!manualMode && !error.message?.includes('อยู่ในสมุด')) setManualMode(true);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleEditSubmit(event) {
    event.preventDefault();
    if (!editingWord) return;

    setIsSaving(true);
    try {
      const updated = {
        englishMeaning: wordForm.englishMeaning.trim(),
        thaiMeaning: wordForm.thaiMeaning.trim(),
        partOfSpeech: wordForm.partOfSpeech.trim() || 'คำศัพท์',
        thaiReading: wordForm.thaiReading.trim(),
        example: wordForm.example.trim(),
        category: wordForm.category || 'ทั่วไป',
      };

      await updateDoc(doc(db, 'words', editingWord.id), updated);
      setEditingWord(null);
      setToast(`อัปเดตข้อมูลคำว่า “${editingWord.word}” เรียบร้อย ✨`);
    } catch (error) {
      console.error(error);
      setFormMessage(error.message || 'แก้ไขคำศัพท์ไม่สำเร็จ');
    } finally {
      setIsSaving(false);
    }
  }

  async function removeWord(word, event) {
    if (event) event.stopPropagation();
    if (!window.confirm(`ต้องการลบคำว่า “${word.word}” ออกจากสมุดคำศัพท์ใช่หรือไม่?`)) return;
    try {
      await deleteDoc(doc(db, 'words', word.id));
      setReviewQueue((current) => current.filter((id) => id !== word.id));
      setToast(`ลบคำว่า “${word.word}” ออกเรียบร้อย`);
    } catch (error) {
      setToast('ลบไม่สำเร็จ: ' + error.message);
    }
  }

  async function rateWord(remembered) {
    if (!currentReviewWord) return;
    const interval = remembered ? Math.min(30, Math.max(1, Number(currentReviewWord.interval || 0) * 2)) : 0;
    const update = remembered
      ? { streak: Number(currentReviewWord.streak || 0) + 1, interval, nextReview: Date.now() + interval * DAY }
      : { streak: 0, interval: 0, nextReview: Date.now() + 10 * 60 * 1000 };

    try {
      await updateDoc(doc(db, 'words', currentReviewWord.id), update);
      setSessionCompletedCount((prev) => prev + 1);
      setReviewPosition((position) => position + 1);
      setRevealed(false);
    } catch (error) {
      setToast('บันทึกผลทบทวนไม่สำเร็จ: ' + error.message);
    }
  }

  function exportBackup() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(words, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kham-khoi-jam-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToast('ดาวน์โหลดไฟล์สำรองข้อมูลเรียบร้อย 📥');
  }

  function handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) throw new Error('รูปแบบไฟล์ไม่ถูกต้อง');
        let count = 0;
        for (const item of imported) {
          if (item.word && item.thaiMeaning) {
            const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            await setDoc(doc(db, 'words', id), {
              ...item,
              id,
              streak: Number(item.streak || 0),
              interval: Number(item.interval || 0),
              nextReview: Number(item.nextReview || Date.now()),
              createdAt: Number(item.createdAt || Date.now()),
            });
            count++;
          }
        }
        setToast(`นำเข้าคำศัพท์สำเร็จ ${count} คำ 🎉`);
      } catch (err) {
        setToast('นำเข้าไม่สำเร็จ: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  const dateLabel = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(new Date());

  return (
    <div className="app">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">ค</div>
          <div className="brand-copy">
            <div className="brand-name">คำค่อย ๆ จำ</div>
            <div className="brand-caption">your little word garden</div>
          </div>
        </div>

        <div className="nav-group">
          <div className="nav-label">เมนูการเรียนรู้</div>
          <nav className="nav" aria-label="เมนูหลัก">
            <button
              className={page === 'library' ? 'active' : ''}
              onClick={() => navigate('library')}
            >
              <span className="nav-icon" aria-hidden="true">📖</span>
              <span className="nav-text">คลังคำศัพท์</span>
              <span className="nav-count">{words.length}</span>
            </button>
            <button
              className={page === 'review' ? 'active' : ''}
              onClick={() => navigate('review')}
            >
              <span className="nav-icon" aria-hidden="true">↻</span>
              <span className="nav-text">ทบทวนวันนี้</span>
              {dueWords.length > 0 ? (
                <span className="nav-count badge-due">{dueWords.length}</span>
              ) : (
                <span className="nav-count">0</span>
              )}
            </button>
          </nav>
        </div>

        {/* CLOUD STORAGE STATUS & BACKUP */}
        <div className="sidebar-bottom">
          <div className="firebase-status-box">
            <div className="firebase-pill">
              <span className={`status-dot ${firebaseStatus}`} />
              <span className="status-label">
                {firebaseStatus === 'connected' ? 'Firebase ซิงค์แล้ว' : firebaseStatus === 'connecting' ? 'กำลังเชื่อมต่อ...' : 'ออฟไลน์'}
              </span>
            </div>
            <div className="firebase-meta">
              Cloud Firestore (datawork-c0629)
            </div>
          </div>

          <div className="backup-actions">
            <button className="subtle-btn" onClick={exportBackup} title="ดาวน์โหลดไฟล์สำรองข้อมูล">
              <span>📥 สำรอง JSON</span>
            </button>
            <button className="subtle-btn" onClick={() => fileInputRef.current?.click()} title="นำเข้าคำศัพท์จาก JSON">
              <span>📤 นำเข้า</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main>
        {/* TOPBAR */}
        <header className="topbar">
          <div className="eyebrow">
            <span className="leaf-icon">🌱</span> สมุดบันทึกคำศัพท์ประจำวัน
          </div>
          <div className="top-actions">
            <span className="date-badge">{dateLabel}</span>
            <div className="avatar" title="ผู้เรียน">ค</div>
          </div>
        </header>

        {page === 'library' ? (
          <section className="page active">
            {/* HERO BANNER */}
            <div className="welcome">
              <div className="welcome-text">
                <div className="eyebrow">A LITTLE EVERY DAY</div>
                <h1>ค่อย ๆ จำ ค่อย ๆ สะสม</h1>
                <p className="subtitle">สมุดบันทึกคำศัพท์ภาษาอังกฤษ ทบทวนด้วยระบบ Spaced Repetition ไม่ลืมง่าย</p>
              </div>
              <button className="primary-btn pulse-glow" onClick={openAddDialog}>
                <span className="plus" aria-hidden="true">＋</span>
                <span>เพิ่มคำศัพท์ใหม่</span>
              </button>
            </div>

            {/* DASHBOARD STATS */}
            <div className="stats" aria-label="สรุปสถิติคำศัพท์">
              <div className="stat">
                <div className="stat-label">
                  <span className="stat-dot green" /> คำศัพท์ทั้งหมด
                </div>
                <div className="stat-value">
                  <span>{words.length}</span>
                  <span className="stat-unit">WORDS</span>
                </div>
                <div className="stat-bar"><div className="bar-fill" style={{ width: '100%' }} /></div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  <span className="stat-dot orange" /> ถึงเวลาทบทวน
                </div>
                <div className="stat-value">
                  <span>{dueWords.length}</span>
                  <span className="stat-unit">TO REVIEW</span>
                </div>
                <div className="stat-bar">
                  <div
                    className="bar-fill orange"
                    style={{ width: `${words.length ? Math.min(100, (dueWords.length / words.length) * 100) : 0}%` }}
                  />
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  <span className="stat-dot blue" /> จำได้แม่นยำ
                </div>
                <div className="stat-value">
                  <span>{masteredCount}</span>
                  <span className="stat-unit">MASTERED</span>
                </div>
                <div className="stat-bar">
                  <div
                    className="bar-fill blue"
                    style={{ width: `${words.length ? (masteredCount / words.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* SPACED REPETITION BANNER */}
            <section className="study-banner" aria-label="การทบทวนคำศัพท์">
              <div className="banner-content">
                <div className="banner-label">DAILY SPACED REPETITION</div>
                <h2>{dueWords.length > 0 ? `วันนี้มี ${dueWords.length} คำ รอให้คุณทบทวน` : 'ยอดเยี่ยมมาก! วันนี้ทบทวนครบทุกคำแล้ว'}</h2>
                <p>
                  {dueWords.length > 0
                    ? 'ใช้เวลาเพียง 2-3 นาที ทบทวนเพื่อให้คำศัพท์ย้ายไปสู่ความจำระยะยาว'
                    : 'แวะมาเพิ่มคำศัพท์ใหม่ หรือกลับมาทบทวนใหม่ในวันพรุ่งนี้นะครับ'}
                </p>
              </div>
              <button
                className="review-btn"
                onClick={() => (dueWords.length ? navigate('review') : openAddDialog())}
              >
                {dueWords.length ? 'เริ่มทบทวนการ์ดคำศัพท์' : '＋ เพิ่มคำศัพท์ใหม่'}
                <span aria-hidden="true">→</span>
              </button>
            </section>

            {/* LIBRARY TOOLBAR CONTROLS */}
            <div className="library-header">
              <div className="section-title-wrap">
                <h2>คลังคำศัพท์</h2>
                <span className="count-pill">{filteredWords.length} คำ</span>
              </div>

              <div className="library-toolbar">
                {/* Search Bar */}
                <div className="search-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ค้นหาคำศัพท์, คำแปล, คำอ่าน..."
                  />
                  {search && (
                    <button className="clear-search" onClick={() => setSearch('')}>×</button>
                  )}
                </div>

                {/* Status Filter Buttons */}
                <div className="filters" role="group" aria-label="กรองสถานะ">
                  {[
                    ['all', 'ทั้งหมด'],
                    ['due', 'รอทบทวน'],
                    ['learning', 'กำลังเรียน'],
                    ['mastered', 'จำได้แล้ว'],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      className={`filter-btn ${filter === val ? 'active' : ''}`}
                      onClick={() => setFilter(val)}
                    >
                      {label}
                      {val === 'due' && dueWords.length > 0 && <span className="mini-badge">{dueWords.length}</span>}
                    </button>
                  ))}
                </div>

                {/* Category Filter */}
                <div className="select-wrap">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="หมวดหมู่"
                  >
                    <option value="all">📁 ทุกหมวดหมู่</option>
                    {categories.filter((c) => c !== 'all').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Option */}
                <div className="select-wrap">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="การเรียงลำดับ"
                  >
                    <option value="review">⏰ เวลาทบทวน (เร็วสุด)</option>
                    <option value="newest">✨ เพิ่งเพิ่มล่าสุด</option>
                    <option value="az">🔤 คำศัพท์ A → Z</option>
                  </select>
                </div>

                {/* View Layout Toggle */}
                <div className="view-toggle" role="group" aria-label="มุมมอง">
                  <button
                    className={`toggle-btn ${viewLayout === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewLayout('grid')}
                    title="มุมมองการ์ด (Grid)"
                  >
                    🗂️
                  </button>
                  <button
                    className={`toggle-btn ${viewLayout === 'table' ? 'active' : ''}`}
                    onClick={() => setViewLayout('table')}
                    title="มุมมองตาราง (Table)"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>

            {/* WORDS COLLECTION DISPLAY */}
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>กำลังเชื่อมต่อและโหลดคลังคำศัพท์จาก Firebase...</p>
              </div>
            ) : filteredWords.length === 0 ? (
              <div className="empty-state">
                <div className="empty-illustration">🌿</div>
                <h3>{search || filter !== 'all' ? 'ไม่พบคำศัพท์ที่ตรงกับการค้นหา' : 'ยังไม่มีคำศัพท์ในคลัง'}</h3>
                <p>
                  {search || filter !== 'all'
                    ? 'ลองปรับคำค้นหา หรือเลือกตัวกรองอื่นเพื่อดูคำศัพท์ทั้งหมด'
                    : 'เริ่มต้นเก็บสะสมคำศัพท์แรกของคุณ เพื่อให้สมุดคำศัพท์เติบโตอย่างงดงาม'}
                </p>
                {search || filter !== 'all' ? (
                  <button className="secondary-btn" onClick={() => { setSearch(''); setFilter('all'); setSelectedCategory('all'); }}>
                    ล้างการค้นหา
                  </button>
                ) : (
                  <button className="primary-btn" onClick={openAddDialog}>
                    ＋ เพิ่มคำศัพท์แรก
                  </button>
                )}
              </div>
            ) : viewLayout === 'grid' ? (
              /* GRID CARDS VIEW */
              <div className="word-cards-grid">
                {filteredWords.map((word) => {
                  const catStyle = getCategoryColor(word.category);
                  const mastered = isMastered(word);
                  const isDue = Number(word.nextReview || 0) <= Date.now();

                  return (
                    <article className="word-card" key={word.id}>
                      <div className="card-top">
                        <div className="card-title-row">
                          <h3 className="card-word-title">{word.word}</h3>
                          <button
                            className="audio-btn"
                            onClick={(e) => speak(word.word, e)}
                            title="ฟังเสียงอ่านออกเสียง"
                            aria-label={`ฟังเสียงอ่านคำว่า ${word.word}`}
                          >
                            🔊
                          </button>
                        </div>

                        {word.thaiReading && (
                          <div className="card-reading">
                            <span className="reading-label">อ่านว่า:</span> {word.thaiReading}
                          </div>
                        )}

                        <div className="card-badges">
                          <span className="badge-pos">{word.partOfSpeech || 'คำศัพท์'}</span>
                          <span
                            className="badge-category"
                            style={{ backgroundColor: catStyle.bg, color: catStyle.text, borderColor: catStyle.border }}
                          >
                            {word.category}
                          </span>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="definition-box">
                          <div className="def-thai">
                            <span className="def-label">คำแปลไทย:</span>
                            <div className="thai-text">{word.thaiMeaning}</div>
                          </div>
                          {word.englishMeaning && (
                            <div className="def-eng">
                              <span className="def-label">Meaning:</span>
                              <div className="eng-text">{word.englishMeaning}</div>
                            </div>
                          )}
                        </div>

                        {word.example && (
                          <div className="card-example">
                            <span className="example-label">ตัวอย่าง:</span>
                            <p>“{word.example}”</p>
                          </div>
                        )}
                      </div>

                      <div className="card-footer">
                        <div className="review-status">
                          <span className={`status-pill ${mastered ? 'mastered' : isDue ? 'due' : 'learning'}`}>
                            {mastered ? '★ จำได้คล่อง' : isDue ? '● รอทบทวน' : `อีก ${Math.max(1, Math.ceil((word.nextReview - Date.now()) / DAY))} วัน`}
                          </span>
                          <span className="streak-count">
                            {word.streak > 0 ? `ทบทวนแล้ว ${word.streak}x` : 'คำใหม่'}
                          </span>
                        </div>

                        <div className="card-actions">
                          <button
                            className="icon-action-btn edit"
                            onClick={(e) => openEditDialog(word, e)}
                            title="แก้ไขคำศัพท์"
                          >
                            ✎
                          </button>
                          <button
                            className="icon-action-btn delete"
                            onClick={(e) => removeWord(word, e)}
                            title="ลบคำศัพท์"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* TABLE / LIST VIEW */
              <div className="table-wrapper">
                <table className="word-table">
                  <thead>
                    <tr>
                      <th>คำศัพท์</th>
                      <th>คำอ่าน</th>
                      <th>ชนิดคำ</th>
                      <th>คำแปลไทย</th>
                      <th>ความหมายอังกฤษ</th>
                      <th>หมวดหมู่</th>
                      <th>สถานะ</th>
                      <th className="th-actions">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWords.map((word) => {
                      const mastered = isMastered(word);
                      const isDue = Number(word.nextReview || 0) <= Date.now();
                      const catStyle = getCategoryColor(word.category);

                      return (
                        <tr key={word.id}>
                          <td className="td-word">
                            <div className="word-with-audio">
                              <strong>{word.word}</strong>
                              <button
                                className="mini-audio-btn"
                                onClick={(e) => speak(word.word, e)}
                                title="ฟังเสียงอ่าน"
                              >
                                🔊
                              </button>
                            </div>
                          </td>
                          <td className="td-reading">{word.thaiReading || '-'}</td>
                          <td><span className="badge-pos">{word.partOfSpeech || 'คำศัพท์'}</span></td>
                          <td className="td-thai">{word.thaiMeaning}</td>
                          <td className="td-eng">{word.englishMeaning || '-'}</td>
                          <td>
                            <span
                              className="badge-category"
                              style={{ backgroundColor: catStyle.bg, color: catStyle.text, borderColor: catStyle.border }}
                            >
                              {word.category}
                            </span>
                          </td>
                          <td>
                            <span className={`status-pill ${mastered ? 'mastered' : isDue ? 'due' : 'learning'}`}>
                              {mastered ? '★ คล่อง' : isDue ? '● รอทบทวน' : `${Math.max(1, Math.ceil((word.nextReview - Date.now()) / DAY))} วัน`}
                            </span>
                          </td>
                          <td className="td-actions">
                            <button
                              className="icon-action-btn edit"
                              onClick={(e) => openEditDialog(word, e)}
                              title="แก้ไขคำศัพท์"
                            >
                              ✎
                            </button>
                            <button
                              className="icon-action-btn delete"
                              onClick={(e) => removeWord(word, e)}
                              title="ลบคำศัพท์"
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : (
          /* FLASHCARD REVIEW SECTION */
          <section className="page active">
            <div className="review-shell">
              <div className="review-header-bar">
                <button className="back-btn" onClick={() => navigate('library')}>
                  ← กลับสู่คลังคำศัพท์
                </button>
                <div className="review-progress-text">
                  คำที่ {reviewQueue.length ? Math.min(reviewPosition + 1, reviewQueue.length) : 0} จากทั้งหมด {reviewQueue.length} คำ
                </div>
              </div>

              {/* Progress Bar */}
              <div className="review-progress-track">
                <div
                  className="review-progress-fill"
                  style={{
                    width: `${
                      reviewQueue.length ? (Math.min(reviewPosition, reviewQueue.length) / reviewQueue.length) * 100 : 100
                    }%`,
                  }}
                />
              </div>

              {currentReviewWord ? (
                <div className="flashcard-container">
                  <div
                    className={`flashcard-3d ${revealed ? 'is-flipped' : ''}`}
                    onClick={() => setRevealed(!revealed)}
                  >
                    {/* FRONT OF CARD */}
                    <div className="card-face card-front">
                      <div className="face-header">
                        <span className="badge-pos">{currentReviewWord.partOfSpeech || 'คำศัพท์'}</span>
                        <span className="card-cat-badge">{currentReviewWord.category}</span>
                      </div>

                      <div className="face-center">
                        <h2 className="flashcard-main-word">{currentReviewWord.word}</h2>
                        {currentReviewWord.thaiReading && (
                          <div className="flashcard-reading">
                            คำอ่าน: {currentReviewWord.thaiReading}
                          </div>
                        )}
                        <button
                          className="flashcard-speaker-btn"
                          onClick={(e) => speak(currentReviewWord.word, e)}
                          title="ฟังเสียงออกเสียง"
                        >
                          🔊 ฟังเสียงอ่าน
                        </button>
                      </div>

                      <div className="face-footer">
                        <span className="hint-pill">แตะการ์ดหรือกด Spacebar เพื่อดูความหมาย ↩</span>
                      </div>
                    </div>

                    {/* BACK OF CARD */}
                    <div className="card-face card-back">
                      <div className="face-header">
                        <span className="card-word-echo">{currentReviewWord.word}</span>
                        <button
                          className="audio-btn-small"
                          onClick={(e) => speak(currentReviewWord.word, e)}
                        >
                          🔊
                        </button>
                      </div>

                      <div className="face-center">
                        <div className="flashcard-thai-meaning">{currentReviewWord.thaiMeaning}</div>
                        {currentReviewWord.englishMeaning && (
                          <div className="flashcard-eng-meaning">
                            <span className="sub-label">English meaning:</span>
                            <p>{currentReviewWord.englishMeaning}</p>
                          </div>
                        )}
                        {currentReviewWord.example && (
                          <div className="flashcard-example-box">
                            <span className="sub-label">Example sentence:</span>
                            <p>“{currentReviewWord.example}”</p>
                          </div>
                        )}
                      </div>

                      <div className="face-footer">
                        <span className="card-streak-info">
                          คะแนนความแม่นยำปัจจุบัน: ทบทวนสำเร็จ {currentReviewWord.streak || 0} ครั้ง
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* REVIEW ACTION BUTTONS */}
                  <div className="review-action-panel">
                    <button
                      className="rating-btn again"
                      disabled={!revealed}
                      onClick={() => rateWord(false)}
                      title="กดเลข 1 บนคีย์บอร์ด"
                    >
                      <span className="btn-icon">↺</span>
                      <div className="btn-text">
                        <strong>ยังไม่แม่น</strong>
                        <small>ทบทวนอีกครั้งใน 10 นาที (กด 1)</small>
                      </div>
                    </button>

                    <button
                      className="rating-btn remember"
                      disabled={!revealed}
                      onClick={() => rateWord(true)}
                      title="กดเลข 2 บนคีย์บอร์ด"
                    >
                      <span className="btn-icon">✓</span>
                      <div className="btn-text">
                        <strong>จำได้แล้ว</strong>
                        <small>
                          {currentReviewWord.interval
                            ? `เว้นระยะอีก ${Math.min(30, Math.max(1, currentReviewWord.interval * 2))} วัน (กด 2)`
                            : 'เว้นระยะ 1 วัน (กด 2)'}
                        </small>
                      </div>
                    </button>
                  </div>

                  <div className="keyboard-shortcuts-guide">
                    💡 ทางลัดคีย์บอร์ด: <code>Spacebar</code> พลิกการ์ด &bull; <code>1</code> ยังไม่แม่น &bull; <code>2</code> จำได้แล้ว &bull; <code>R</code> ฟังเสียง
                  </div>
                </div>
              ) : (
                /* REVIEW SESSION COMPLETED SCREEN */
                <div className="review-completed-card">
                  <div className="celebration-icon">🎉</div>
                  <h2>ทบทวนครบทั้งหมดแล้ว!</h2>
                  <p>
                    ยอดเยี่ยมมาก! คุณได้ทบทวนคำศัพท์เสร็จสิ้นทั้งหมด {sessionCompletedCount || reviewQueue.length} คำ
                    การทบทวนเป็นประจำจะช่วยให้จดจำคำศัพท์ได้อย่างแม่นยำและยั่งยืน
                  </p>

                  <div className="completion-stats">
                    <div className="stat-pill">
                      <span className="pill-number">{words.length}</span>
                      <span className="pill-label">คำในสมุดทั้งหมด</span>
                    </div>
                    <div className="stat-pill">
                      <span className="pill-number">{masteredCount}</span>
                      <span className="pill-label">จำได้อย่างคล่องแคล่ว</span>
                    </div>
                  </div>

                  <button className="primary-btn" onClick={() => navigate('library')}>
                    กลับสู่คลังคำศัพท์
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* ADD WORD MODAL DIALOG */}
      {isAddOpen && (
        <div
          className="dialog-backdrop"
          onMouseDown={(e) => { if (e.target === e.currentTarget && !isSaving) setIsAddOpen(false); }}
        >
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <div className="eyebrow">NEW VOCABULARY</div>
                <h2>เพิ่มคำศัพท์ใหม่</h2>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setIsAddOpen(false)}
                disabled={isSaving}
              >
                ✕
              </button>
            </div>

            <p className="modal-description">
              พิมพ์คำศัพท์ภาษาอังกฤษ ระบบจะค้นหาความหมาย คำแปล และคำอ่านอัตโนมัติ พร้อมบันทึกลง Firebase Cloud Firestore
            </p>

            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label htmlFor="word-input">คำศัพท์ภาษาอังกฤษ (English Word) *</label>
                <div className="input-with-button">
                  <input
                    id="word-input"
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                    placeholder="เช่น serendipity, resilient, versatile"
                    required
                    maxLength={80}
                    autoFocus
                  />
                  {wordInput && (
                    <button
                      type="button"
                      className="input-audio-btn"
                      onClick={() => speak(wordInput)}
                      title="ลองฟังเสียงอ่าน"
                    >
                      🔊
                    </button>
                  )}
                </div>
              </div>

              {manualMode && (
                <div className="manual-inputs-section">
                  <div className="manual-header-note">
                    ✏️ ระบุรายละเอียดคำศัพท์ด้วยตนเอง:
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="manual-thai">คำแปลไทย (Thai Meaning) *</label>
                      <input
                        id="manual-thai"
                        required
                        value={wordForm.thaiMeaning}
                        onChange={(e) => setWordForm({ ...wordForm, thaiMeaning: e.target.value })}
                        placeholder="เช่น การพบสิ่งดีโดยบังเอิญ"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="manual-reading">คำอ่านไทย (Pronunciation)</label>
                      <input
                        id="manual-reading"
                        value={wordForm.thaiReading}
                        onChange={(e) => setWordForm({ ...wordForm, thaiReading: e.target.value })}
                        placeholder="เช่น เซเรนดิพิที"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="manual-english">ความหมายภาษาอังกฤษ (English Meaning) *</label>
                    <textarea
                      id="manual-english"
                      required
                      value={wordForm.englishMeaning}
                      onChange={(e) => setWordForm({ ...wordForm, englishMeaning: e.target.value })}
                      placeholder="เช่น Finding valuable things by luck or chance"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="manual-pos">ชนิดคำ (Part of Speech)</label>
                      <select
                        id="manual-pos"
                        value={wordForm.partOfSpeech}
                        onChange={(e) => setWordForm({ ...wordForm, partOfSpeech: e.target.value })}
                      >
                        <option value="คำนาม (noun)">คำนาม (noun)</option>
                        <option value="คำกริยา (verb)">คำกริยา (verb)</option>
                        <option value="คำคุณศัพท์ (adjective)">คำคุณศัพท์ (adjective)</option>
                        <option value="คำกริยาวิเศษณ์ (adverb)">คำกริยาวิเศษณ์ (adverb)</option>
                        <option value="คำสรรพนาม (pronoun)">คำสรรพนาม (pronoun)</option>
                        <option value="คำบุพบท (preposition)">คำบุพบท (preposition)</option>
                        <option value="คำสันธาน (conjunction)">คำสันธาน (conjunction)</option>
                        <option value="คำอุทาน (interjection)">คำอุทาน (interjection)</option>
                        <option value="สำนวน (idiom/phrase)">สำนวน (idiom/phrase)</option>
                        <option value="คำศัพท์">คำศัพท์ทั่วไป</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="manual-cat">หมวดหมู่ (Category)</label>
                      <select
                        id="manual-cat"
                        value={wordForm.category}
                        onChange={(e) => setWordForm({ ...wordForm, category: e.target.value })}
                      >
                        <option value="ทั่วไป">ทั่วไป</option>
                        <option value="การทำงาน">การทำงาน</option>
                        <option value="การเรียน">การเรียน</option>
                        <option value="การเดินทาง">การเดินทาง</option>
                        <option value="ความรู้สึก">ความรู้สึก</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="manual-example">ตัวอย่างประโยค (Example Sentence)</label>
                    <input
                      id="manual-example"
                      value={wordForm.example}
                      onChange={(e) => setWordForm({ ...wordForm, example: e.target.value })}
                      placeholder="เช่น Finding this little bookshop was pure serendipity."
                    />
                  </div>
                </div>
              )}

              {formMessage && (
                <div className={`form-feedback-message ${isSaving ? 'loading' : ''}`}>
                  {formMessage}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsAddOpen(false)}
                  disabled={isSaving}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={isSaving}
                >
                  {isSaving ? 'กำลังดำเนินการ...' : manualMode ? 'บันทึกคำศัพท์' : 'ค้นหาและเพิ่มคำ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT WORD MODAL DIALOG */}
      {editingWord && (
        <div
          className="dialog-backdrop"
          onMouseDown={(e) => { if (e.target === e.currentTarget && !isSaving) setEditingWord(null); }}
        >
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <div className="eyebrow">EDIT VOCABULARY</div>
                <h2>แก้ไขคำศัพท์: {editingWord.word}</h2>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setEditingWord(null)}
                disabled={isSaving}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-thai">คำแปลไทย *</label>
                  <input
                    id="edit-thai"
                    required
                    value={wordForm.thaiMeaning}
                    onChange={(e) => setWordForm({ ...wordForm, thaiMeaning: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-reading">คำอ่านไทย</label>
                  <input
                    id="edit-reading"
                    value={wordForm.thaiReading}
                    onChange={(e) => setWordForm({ ...wordForm, thaiReading: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-eng">ความหมายภาษาอังกฤษ (English Meaning) *</label>
                <textarea
                  id="edit-eng"
                  required
                  value={wordForm.englishMeaning}
                  onChange={(e) => setWordForm({ ...wordForm, englishMeaning: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-pos">ชนิดคำ</label>
                  <select
                    id="edit-pos"
                    value={wordForm.partOfSpeech}
                    onChange={(e) => setWordForm({ ...wordForm, partOfSpeech: e.target.value })}
                  >
                    <option value="คำนาม (noun)">คำนาม (noun)</option>
                    <option value="คำกริยา (verb)">คำกริยา (verb)</option>
                    <option value="คำคุณศัพท์ (adjective)">คำคุณศัพท์ (adjective)</option>
                    <option value="คำกริยาวิเศษณ์ (adverb)">คำกริยาวิเศษณ์ (adverb)</option>
                    <option value="คำสรรพนาม (pronoun)">คำสรรพนาม (pronoun)</option>
                    <option value="คำบุพบท (preposition)">คำบุพบท (preposition)</option>
                    <option value="คำสันธาน (conjunction)">คำสันธาน (conjunction)</option>
                    <option value="คำอุทาน (interjection)">คำอุทาน (interjection)</option>
                    <option value="สำนวน (idiom/phrase)">สำนวน (idiom/phrase)</option>
                    <option value="คำศัพท์">คำศัพท์ทั่วไป</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-cat">หมวดหมู่</label>
                  <select
                    id="edit-cat"
                    value={wordForm.category}
                    onChange={(e) => setWordForm({ ...wordForm, category: e.target.value })}
                  >
                    <option value="ทั่วไป">ทั่วไป</option>
                    <option value="การทำงาน">การทำงาน</option>
                    <option value="การเรียน">การเรียน</option>
                    <option value="การเดินทาง">การเดินทาง</option>
                    <option value="ความรู้สึก">ความรู้สึก</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-example">ตัวอย่างประโยค</label>
                <input
                  id="edit-example"
                  value={wordForm.example}
                  onChange={(e) => setWordForm({ ...wordForm, example: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setEditingWord(null)}
                  disabled={isSaving}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={isSaving}
                >
                  {isSaving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`toast-notification ${toast ? 'is-visible' : ''}`} role="status">
        <span className="toast-icon">✨</span>
        <span className="toast-text">{toast}</span>
      </div>
    </div>
  );
}

export default App;