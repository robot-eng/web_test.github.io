import React, { useEffect, useState } from 'react';

const DAY = 24 * 60 * 60 * 1000;

function isMastered(word) {
  return word.streak >= 3;
}

function App() {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [page, setPage] = useState('library');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [wordInput, setWordInput] = useState('');
  const [manualDetails, setManualDetails] = useState({ englishMeaning: '', thaiMeaning: '', example: '' });
  const [formMessage, setFormMessage] = useState('');
  const [toast, setToast] = useState('');
  const [reviewQueue, setReviewQueue] = useState([]);
  const [reviewPosition, setReviewPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const dueWords = words.filter((word) => Number(word.nextReview || 0) <= Date.now());
  const masteredCount = words.filter(isMastered).length;
  const currentWord = words.find((word) => word.id === reviewQueue[reviewPosition]);
  const filteredWords = words.filter((word) => {
    const matchesFilter = filter === 'all' || (filter === 'mastered' ? isMastered(word) : !isMastered(word));
    const query = search.trim().toLocaleLowerCase();
    const searchable = `${word.word} ${word.englishMeaning} ${word.thaiMeaning} ${word.example} ${word.category}`.toLocaleLowerCase();
    return matchesFilter && searchable.includes(query);
  }).sort((a, b) => Number(a.nextReview || 0) - Number(b.nextReview || 0));

  useEffect(() => {
    let cancelled = false;
    fetch('/api/words')
      .then(async (response) => {
        if (!response.ok) throw new Error('อ่านไฟล์คำศัพท์ไม่สำเร็จ');
        return response.json();
      })
      .then((data) => { if (!cancelled) setWords(data); })
      .catch((error) => { if (!cancelled) setToast(error.message || 'เชื่อมต่อที่เก็บคำศัพท์ไม่ได้'); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function navigate(nextPage) {
    if (nextPage === 'review') {
      setReviewQueue(dueWords.map((word) => word.id));
      setReviewPosition(0);
      setRevealed(false);
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openAddDialog() {
    setWordInput('');
    setManualDetails({ englishMeaning: '', thaiMeaning: '', example: '' });
    setManualMode(false);
    setFormMessage('');
    setIsAddOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextWord = wordInput.trim();
    if (!nextWord) {
      setFormMessage('กรอกคำศัพท์ก่อนนะ');
      return;
    }
    setIsSaving(true);
    setFormMessage(manualMode ? 'กำลังบันทึกคำศัพท์...' : 'กำลังค้นหาคำแปลจากพจนานุกรมออฟไลน์...');
    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: nextWord, ...(manualMode ? manualDetails : {}) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'เพิ่มคำศัพท์ไม่สำเร็จ');
      setWords((current) => [result.word, ...current]);
      setWordInput('');
      setManualDetails({ englishMeaning: '', thaiMeaning: '', example: '' });
      setManualMode(false);
      setIsAddOpen(false);
      setFormMessage('');
      setToast('เพิ่มคำศัพท์ลงคลังแล้ว');
    } catch (error) {
      setFormMessage(error.message || 'ค้นหาคำศัพท์ไม่สำเร็จ');
      if (!manualMode && !error.message.includes('อยู่ในคลัง')) setManualMode(true);
    } finally {
      setIsSaving(false);
    }
  }

  async function removeWord(word) {
    if (!window.confirm(`ลบคำว่า “${word.word}” ออกจากคลังหรือไม่?`)) return;
    try {
      const response = await fetch(`/api/words/${encodeURIComponent(word.id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('ลบคำศัพท์ไม่สำเร็จ');
      setWords((current) => current.filter((item) => item.id !== word.id));
      setReviewQueue((current) => current.filter((id) => id !== word.id));
      setToast('ลบคำศัพท์ออกจากคลังแล้ว');
    } catch (error) {
      setToast(error.message || 'ลบคำศัพท์ไม่สำเร็จ');
    }
  }

  async function rateWord(remembered) {
    if (!currentWord) return;
    const interval = remembered ? Math.min(30, Math.max(1, Number(currentWord.interval || 0) * 2)) : 0;
    const update = remembered
      ? { streak: Number(currentWord.streak || 0) + 1, interval, nextReview: Date.now() + interval * DAY }
      : { streak: 0, interval: 0, nextReview: Date.now() + 10 * 60 * 1000 };
    try {
      const response = await fetch(`/api/words/${encodeURIComponent(currentWord.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'บันทึกผลทบทวนไม่สำเร็จ');
      setWords((current) => current.map((word) => word.id === result.word.id ? result.word : word));
      setReviewPosition((position) => position + 1);
      setRevealed(false);
    } catch (error) {
      setToast(error.message || 'บันทึกผลทบทวนไม่สำเร็จ');
    }
  }

  const dateLabel = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(new Date());

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">ค</div>
          <div className="brand-copy"><div className="brand-name">คำค่อย ๆ จำ</div><div className="brand-caption">your little word garden</div></div>
        </div>
        <div>
          <div className="nav-label">พื้นที่เรียนรู้</div>
          <nav className="nav" aria-label="เมนูหลัก">
            <button className={page === 'library' ? 'active' : ''} onClick={() => navigate('library')}><span className="nav-icon" aria-hidden="true">▤</span><span className="nav-text">คลังคำศัพท์</span><span className="nav-count">{words.length}</span></button>
            <button className={page === 'review' ? 'active' : ''} onClick={() => navigate('review')}><span className="nav-icon" aria-hidden="true">↻</span><span className="nav-text">ทบทวนวันนี้</span><span className="nav-count">{dueWords.length}</span></button>
          </nav>
        </div>
        <div className="sidebar-bottom"><div className="local-status">บันทึกลงไฟล์ JSON</div>คำศัพท์อยู่ในโปรเจกต์<br />data/vocabulary.json</div>
      </aside>

      <main>
        <div className="topbar"><div className="eyebrow">สมุดคำศัพท์ส่วนตัว</div><div className="top-actions"><span className="date">{dateLabel}</span><div className="avatar" aria-hidden="true">ค</div></div></div>

        {page === 'library' ? (
          <section className="page active">
            <div className="welcome">
              <div><div className="eyebrow">ค่อย ๆ เก็บ ค่อย ๆ จำ</div><h1>ทุกคำมีที่ของมัน</h1><p className="subtitle">สะสมคำใหม่ แล้วกลับมาทักทายคำเก่าอีกครั้ง</p></div>
              <button className="primary-btn" onClick={openAddDialog}><span className="plus" aria-hidden="true">＋</span> เพิ่มคำศัพท์</button>
            </div>
            <div className="stats" aria-label="สรุปการเรียนรู้">
              <div className="stat"><div className="stat-label">คำศัพท์ทั้งหมด</div><div className="stat-value"><span>{words.length}</span><span className="stat-note">WORDS</span></div></div>
              <div className="stat"><div className="stat-label">ถึงเวลาทบทวน</div><div className="stat-value"><span>{dueWords.length}</span><span className="stat-note">TO REVIEW</span></div></div>
              <div className="stat"><div className="stat-label">จำได้คล่องแล้ว</div><div className="stat-value"><span>{masteredCount}</span><span className="stat-note">MASTERED</span></div></div>
            </div>
            <section className="study-banner" aria-label="การทบทวนคำศัพท์">
              <div><div className="banner-label">A LITTLE EVERY DAY</div><h2>{dueWords.length ? `วันนี้มี ${dueWords.length} คำรอทบทวน` : 'วันนี้ทบทวนครบแล้ว'}</h2><p>{dueWords.length ? 'ใช้เวลาไม่กี่นาที ให้คำที่เรียนไปยังอยู่กับเรา' : 'แวะมาเก็บคำใหม่ หรือพักสายตาสักครู่ก็ได้'}</p></div>
              <button className="review-btn" onClick={() => dueWords.length ? navigate('review') : openAddDialog()}>{dueWords.length ? 'เริ่มทบทวน' : 'เพิ่มคำใหม่'} <span aria-hidden="true">→</span></button>
            </section>

            <div className="lower-grid">
              <section>
                <div className="section-heading"><h2>คลังคำศัพท์</h2><small>{filteredWords.length} คำ</small></div>
                <div className="library-toolbar">
                  <div className="filters" role="group" aria-label="กรองคำศัพท์">
                    {[['all', 'ทั้งหมด'], ['learning', 'กำลังเรียน'], ['mastered', 'จำได้แล้ว']].map(([value, label]) => <button key={value} className={`filter-btn ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>{label}</button>)}
                  </div>
                  <label className="search"><span className="sr-only" hidden>ค้นหาคำศัพท์</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ค้นหาคำหรือความหมาย" /></label>
                </div>
                <div className="word-list" aria-live="polite">
                  {isLoading ? <div className="empty-list">กำลังโหลดคลังคำศัพท์...</div> : filteredWords.length ? filteredWords.map((word) => <article className="word-row" key={word.id}>
                    <div className="word-heading"><div className="word-main">{word.word}</div><div className="word-pronunciation">{word.streak ? `ทบทวนแล้ว ${word.streak} ครั้ง` : 'คำใหม่'}</div></div>
                    <div className="word-details">
                      <div className="definition-pair"><div><span className="detail-label">English meaning</span><p>{word.englishMeaning || 'ยังไม่ได้เพิ่มความหมายอังกฤษ'}</p></div><div><span className="detail-label">คำแปลไทย</span><p>{word.thaiMeaning || 'ยังไม่ได้เพิ่มคำแปล'}</p></div></div>
                      {word.example && <div className="word-example"><span className="detail-label">Example</span><p>{word.example}</p></div>}
                    </div>
                    <span className="tag">{word.category}</span>
                    <span className="level">{isMastered(word) ? 'คล่องแล้ว' : Number(word.nextReview || 0) <= Date.now() ? 'รอทบทวน' : `อีก ${Math.max(1, Math.ceil((word.nextReview - Date.now()) / DAY))} วัน`}</span>
                    <button className="delete-btn" type="button" onClick={() => removeWord(word)} aria-label={`ลบ ${word.word}`} title="ลบคำศัพท์">×</button>
                  </article>) : <div className="empty-list">ไม่เจอคำที่ค้นหา ลองคำอื่นหรือเพิ่มคำศัพท์ใหม่</div>}
                </div>
              </section>

            </div>
          </section>
        ) : (
          <section className="page active">
            <div className="review-shell">
              <div className="review-head"><button className="text-btn" onClick={() => navigate('library')}>← กลับไปคลังคำศัพท์</button><span className="review-count">{reviewQueue.length ? `${Math.min(reviewPosition + 1, reviewQueue.length)} / ${reviewQueue.length}` : '0 คำ'}</span></div>
              <div className="eyebrow review-eyebrow">ทบทวนแบบเว้นระยะ</div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${reviewQueue.length ? Math.min(reviewPosition, reviewQueue.length) / reviewQueue.length * 100 : 100}%` }} /></div>
              {currentWord ? <>
                <button className={`flashcard ${revealed ? 'revealed' : ''}`} onClick={() => setRevealed(true)} aria-label="แตะเพื่อดูความหมาย">
                  {!revealed ? <div className="card-inner"><div className="card-overline">คำศัพท์ · {currentWord.category}</div><div className="card-word">{currentWord.word}</div><div className="card-hint">แตะการ์ดเพื่อเปิดดูความหมาย</div></div> : <div className="card-inner card-answer">
                    <div className="card-overline">{currentWord.word}</div><div className="card-meaning">{currentWord.thaiMeaning}</div><div className="card-definition"><span className="detail-label">English meaning</span>{currentWord.englishMeaning}</div>{currentWord.example && <div className="card-example"><span className="detail-label">Example</span>{currentWord.example}</div>}
                  </div>}
                </button>
                <div className="review-controls"><button className="again-btn" disabled={!revealed} onClick={() => rateWord(false)}>ยังไม่แม่น · ทบทวนเร็ว ๆ นี้</button><button className="remember-btn" disabled={!revealed} onClick={() => rateWord(true)}>จำได้ · {currentWord.interval ? `อีก ${Math.min(30, Math.max(1, currentWord.interval * 2))} วัน` : 'พรุ่งนี้'}</button></div>
                <div className="review-help">{revealed ? 'จำได้หรือยัง? เลือกคำตอบด้านล่าง' : 'แตะการ์ดเพื่อดูความหมาย'}</div>
              </> : <div className="review-empty"><div className="empty-mark">✓</div><h2>{reviewQueue.length ? 'ทบทวนครบแล้ว' : 'ยังไม่มีคำถึงเวลาทบทวน'}</h2><p>{reviewQueue.length ? 'คำศัพท์เหล่านี้พร้อมกลับมาเจอกันในวันถัดไป' : 'เพิ่มคำศัพท์ใหม่ หรือกลับมาอีกครั้งเมื่อถึงเวลาทบทวน'}</p><button className="primary-btn" onClick={() => navigate('library')}>กลับไปคลังคำศัพท์</button></div>}
            </div>
          </section>
        )}
      </main>
      {isAddOpen && <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSaving) setIsAddOpen(false); }}>
        <section className="add-dialog" role="dialog" aria-modal="true" aria-labelledby="add-dialog-title">
          <div className="dialog-head"><div><div className="eyebrow">เพิ่มลงสมุดคำศัพท์</div><h2 id="add-dialog-title">เก็บคำใหม่</h2></div><button className="delete-btn dialog-close" aria-label="ปิด" onClick={() => setIsAddOpen(false)} disabled={isSaving}>×</button></div>
          <p className="dialog-copy">พิมพ์คำภาษาอังกฤษ ระบบจะค้นความหมายและคำแปลจากพจนานุกรมที่ติดตั้งไว้ในเครื่อง</p>
          <form onSubmit={handleSubmit}>
            <div className="field"><label htmlFor="word-input">คำศัพท์</label><input id="word-input" value={wordInput} onChange={(event) => setWordInput(event.target.value)} placeholder="เช่น enrollment" required maxLength={80} autoFocus /></div>
            {manualMode && <div className="manual-fields">
              <p className="manual-note">ไม่พบข้อมูลครบในพจนานุกรม เพิ่มรายละเอียดเองได้เลย</p>
              <div className="field"><label htmlFor="manual-english">Meaning (English)</label><textarea id="manual-english" required value={manualDetails.englishMeaning} onChange={(event) => setManualDetails((current) => ({ ...current, englishMeaning: event.target.value }))} placeholder="คำอธิบายภาษาอังกฤษ" /></div>
              <div className="field"><label htmlFor="manual-thai">คำแปลไทย</label><textarea id="manual-thai" required value={manualDetails.thaiMeaning} onChange={(event) => setManualDetails((current) => ({ ...current, thaiMeaning: event.target.value }))} placeholder="ความหมายภาษาไทย" /></div>
              <div className="field"><label htmlFor="manual-example">ตัวอย่างประโยค (ไม่บังคับ)</label><input id="manual-example" value={manualDetails.example} onChange={(event) => setManualDetails((current) => ({ ...current, example: event.target.value }))} placeholder="ตัวอย่างการใช้คำ" /></div>
            </div>}
            {formMessage && <p className={`form-message ${isSaving ? 'is-loading' : ''}`} role="status">{formMessage}</p>}
            <div className="dialog-actions"><button className="text-btn" type="button" onClick={() => setIsAddOpen(false)} disabled={isSaving}>ยกเลิก</button><button className="primary-btn" type="submit" disabled={isSaving}>{isSaving ? 'กำลังค้นหา...' : manualMode ? 'บันทึกคำศัพท์' : 'ค้นหาและเพิ่ม'} <span aria-hidden="true">→</span></button></div>
          </form>
          <div className="source-note">คำแปลออฟไลน์ · 83,000+ รายการ</div>
        </section>
      </div>}
      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}

export default App;