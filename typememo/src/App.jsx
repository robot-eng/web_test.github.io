import React, { useEffect, useMemo, useRef, useState } from 'react';
import vocabularyUrl from './data/oxford3000.json?url';

const levels = ['ทั้งหมด', 'A1', 'A2', 'B1', 'B2'];
const progressKey = 'typememo-3000-progress';
const partNames = {
  noun: 'คำนาม', verb: 'คำกริยา', adjective: 'คำคุณศัพท์', adverb: 'คำกริยาวิเศษณ์',
  pronoun: 'คำสรรพนาม', preposition: 'คำบุพบท', conjunction: 'คำสันธาน',
  determiner: 'คำกำหนดนาม', interjection: 'คำอุทาน', article: 'คำนำหน้านาม', number: 'คำบอกจำนวน',
};

const starterDetails = {
  breakfast: { meaning: 'อาหารเช้า', example: 'I usually eat breakfast at seven.' },
  neighbor: { meaning: 'เพื่อนบ้าน', example: 'My neighbor has a friendly dog.' },
  borrow: { meaning: 'ยืม', example: 'Can I borrow your pen, please?' },
  crowded: { meaning: 'แออัด, คนเยอะ', example: 'The train was very crowded today.' },
  forget: { meaning: 'ลืม', example: 'Please do not forget your keys.' },
  comfortable: { meaning: 'สบาย', example: 'This sofa is really comfortable.' },
  recipe: { meaning: 'สูตรอาหาร', example: 'She shared her recipe with me.' },
  schedule: { meaning: 'ตารางเวลา', example: 'What is your schedule tomorrow?' },
  deadline: { meaning: 'กำหนดส่งงาน', example: 'The deadline is next Friday.' },
  meeting: { meaning: 'การประชุม', example: 'We have a meeting at ten.' },
  improve: { meaning: 'ปรับปรุงให้ดีขึ้น', example: 'I want to improve my English.' },
  manager: { meaning: 'ผู้จัดการ', example: 'The manager approved my idea.' },
  budget: { meaning: 'งบประมาณ', example: 'Our budget is quite limited.' },
  colleague: { meaning: 'เพื่อนร่วมงาน', example: 'My colleague helped me with the report.' },
  experience: { meaning: 'ประสบการณ์', example: 'She has five years of experience.' },
  request: { meaning: 'คำขอ', example: 'I sent a request yesterday.' },
  luggage: { meaning: 'สัมภาระ, กระเป๋าเดินทาง', example: 'My luggage is too heavy.' },
  passport: { meaning: 'หนังสือเดินทาง', example: 'Show your passport at the counter.' },
  delay: { meaning: 'ล่าช้า', example: 'The flight has a short delay.' },
  reserve: { meaning: 'จอง', example: 'I would like to reserve a table.' },
  direction: { meaning: 'ทิศทาง', example: 'The station is in that direction.' },
  souvenir: { meaning: 'ของที่ระลึก', example: 'I bought a souvenir for my mom.' },
  journey: { meaning: 'การเดินทาง', example: 'The journey took six hours.' },
  ticket: { meaning: 'ตั๋ว', example: 'One ticket to Chiang Mai, please.' },
};

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

function readProgress() {
  const saved = readStorage(progressKey, null);
  if (saved) return saved;

  const legacy = readStorage('typememo1', {});
  return Object.fromEntries(
    Object.entries(legacy).map(([word, mastery]) => [word, { mastery, seen: 1 }]),
  );
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.88;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function normalizeAnswer(value) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
}

function normalizeSentence(value) {
  return normalizeAnswer(value).replace(/[.!?]+$/u, '');
}

function getSentenceWords(sentence) {
  return sentence.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
}

function getExample(entry) {
  return entry.example || starterDetails[entry.word]?.example || '';
}

function scrambleSentence(sentence) {
  const words = getSentenceWords(sentence);
  const scrambled = shuffle(words);
  if (scrambled.length > 1 && scrambled.every((word, index) => word === words[index])) {
    [scrambled[0], scrambled[1]] = [scrambled[1], scrambled[0]];
  }
  return scrambled;
}

function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [vocabularyLoaded, setVocabularyLoaded] = useState(false);
  const [vocabularyError, setVocabularyError] = useState(false);
  const [vocabularyLoadAttempt, setVocabularyLoadAttempt] = useState(0);
  const [level, setLevel] = useState('ทั้งหมด');
  const [mode, setMode] = useState('typing');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(readProgress);
  const [session, setSession] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const inputRef = useRef(null);
  const nextTimer = useRef(null);

  useEffect(() => {
    let active = true;
    setVocabularyLoaded(false);
    setVocabularyError(false);
    fetch(vocabularyUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Vocabulary data could not be loaded.');
        return response.json();
      })
      .then((data) => {
        if (active) {
          setVocabulary(data);
          setVocabularyError(false);
        }
      })
      .catch(() => {
        if (active) setVocabularyError(true);
      })
      .finally(() => {
        if (active) setVocabularyLoaded(true);
      });
    return () => { active = false; };
  }, [vocabularyLoadAttempt]);

  const matchingWords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return vocabulary.filter((entry) => {
      const matchesLevel = level === 'ทั้งหมด' || entry.level === level;
      const matchesQuery = !normalizedQuery || entry.word.toLocaleLowerCase().includes(normalizedQuery);
      const hasTypingExample = entry.example || starterDetails[entry.word]?.example;
      const needsSentence = mode === 'typing' || mode === 'reorder';
      return matchesLevel && matchesQuery && (!needsSentence || hasTypingExample);
    });
  }, [level, mode, query, vocabulary]);

  const currentWord = session?.words[session.index] ?? null;
  const starterDetail = currentWord ? starterDetails[currentWord.word] ?? null : null;
  const example = currentWord ? getExample(currentWord) : '';
  const definition = currentWord?.meaning || starterDetail?.meaning;
  const isComplete = session?.index >= (session?.words.length ?? 0);
  const learnedCount = Object.keys(progress).length;
  const masteredCount = Object.values(progress).filter((item) => item.mastery >= 4).length;
  const levelCount = level === 'ทั้งหมด' ? vocabulary.length : vocabulary.filter((item) => item.level === level).length;

  useEffect(() => {
    try {
      localStorage.setItem(progressKey, JSON.stringify(progress));
    } catch {
      // Progress remains available for the current page if storage is full.
    }
  }, [progress]);

  useEffect(() => {
    if (currentWord && !feedback) inputRef.current?.focus();
  }, [currentWord, feedback]);

  function startSession() {
    window.clearTimeout(nextTimer.current);
    const available = matchingWords;
    const ranked = [...available].sort((first, second) =>
      (progress[first.word]?.mastery ?? 0) - (progress[second.word]?.mastery ?? 0));
    const lowMastery = ranked.slice(0, Math.min(60, ranked.length));
    const words = shuffle(lowMastery).slice(0, 10).map((entry) => mode === 'reorder'
      ? { ...entry, scrambledWords: scrambleSentence(getExample(entry)) }
      : entry);
    setSession({ words, index: 0, correct: 0, mode });
    setAnswer('');
    setFeedback('');
    setHintCount(0);
  }

  function leaveSession() {
    window.clearTimeout(nextTimer.current);
    setSession(null);
    setAnswer('');
    setFeedback('');
  }

  function nextQuestion() {
    setSession((previous) => previous ? { ...previous, index: previous.index + 1 } : null);
    setAnswer('');
    setFeedback('');
    setHintCount(0);
  }

  function retryQuestion() {
    setAnswer('');
    setFeedback('');
    setHintCount(0);
  }

  function finishAnswer(correct) {
    if (!currentWord || feedback) return;
    setFeedback(correct ? 'correct' : 'incorrect');
    setProgress((previous) => {
      const existing = previous[currentWord.word] ?? { mastery: 0, seen: 0 };
      return {
        ...previous,
        [currentWord.word]: {
          mastery: correct ? Math.min(5, existing.mastery + 1) : existing.mastery,
          seen: existing.seen + 1,
        },
      };
    });
    if (correct) {
      setSession((previous) => previous ? { ...previous, correct: previous.correct + 1 } : null);
      if (session.mode === 'typing' || session.mode === 'reorder') {
        nextTimer.current = window.setTimeout(nextQuestion, 650);
      }
    }
  }

  function checkAnswer(event) {
    event.preventDefault();
    if (!answer.trim() || session?.mode === 'typing') return;
    const correct = session.mode === 'recall'
      ? normalizeAnswer(answer) === normalizeAnswer(currentWord.word)
      : normalizeSentence(answer) === normalizeSentence(example);
    finishAnswer(correct);
  }

  function handleAnswerChange(event) {
    const value = event.target.value;
    setAnswer(value);
    if ((session?.mode === 'typing' || session?.mode === 'reorder') && normalizeSentence(value) === normalizeSentence(example)) {
      finishAnswer(true);
    }
  }

  function revealHint() {
    setHintCount((previous) => Math.min(previous + 1, currentWord.word.length - 1));
  }

  function getPrompt() {
    if (!currentWord) return '';
    if (session.mode === 'typing') return example;
    return definition || `${partNames[currentWord.partOfSpeech] || 'คำศัพท์'} · Oxford ${currentWord.level}`;
  }

  const hint = currentWord
    ? [...currentWord.word].map((character, index) => index < hintCount ? character : '•').join(' ')
    : '';

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={leaveSession} aria-label="TypeMemo หน้าหลัก">
          <span className="brand-mark">t.</span>
          <span>TypeMemo</span>
        </button>
        <div className="topbar-meta"><span className="live-dot" /> Oxford 3000 <span className="meta-divider">/</span> A1–B2</div>
      </header>

      {session ? (
        <main className="study-layout">
          <div className="study-heading">
            <button className="back-button" onClick={leaveSession}><span aria-hidden="true">←</span> ออกจากรอบ</button>
            <div className="session-progress">
              <span>{Math.min(session.index + 1, session.words.length)} <i>/</i> {session.words.length}</span>
              <div className="progress-track"><span style={{ width: `${session.index / session.words.length * 100}%` }} /></div>
            </div>
          </div>

          {isComplete ? (
            <section className="completion-panel">
              <span className="eyebrow">จบรอบการฝึก</span>
              <h1>ทำได้ดีมาก<span className="period">.</span></h1>
              <p>ตอบถูก {session.correct} จาก {session.words.length} ข้อ</p>
              <div className="completion-actions">
                <button className="button button-primary" onClick={startSession}>ฝึกอีกรอบ <span>↗</span></button>
                <button className="button button-quiet" onClick={leaveSession}>กลับหน้าหลัก</button>
              </div>
            </section>
          ) : currentWord && (
            <section className="exercise-grid">
              <div className="exercise-main">
                <div className="exercise-label"><span className="eyebrow">{session.mode === 'typing' ? 'พิมพ์ตามข้อความ' : session.mode === 'reorder' ? 'เรียงประโยคใหม่' : 'ทวนความจำ'}</span><span className="level-pill">{currentWord.level}</span></div>
                <div className="word-title-row">
                  <h1>{session.mode === 'recall' ? 'คำศัพท์ที่หายไป' : currentWord.word}</h1>
                  {(session.mode !== 'recall' || feedback) && <button className="sound-button" onClick={() => speak(currentWord.word)} aria-label="ฟังเสียงภาษาอังกฤษ">◖))</button>}
                </div>
                {session.mode === 'typing' ? (
                  <div className="typing-prompt" aria-label="ข้อความสำหรับพิมพ์ตาม">
                    {[...example].map((character, index) => {
                      const characterState = index >= answer.length
                        ? index === answer.length ? 'current' : 'pending'
                        : character.toLocaleLowerCase() === answer[index].toLocaleLowerCase() ? 'correct' : 'wrong';
                      return <span className={`typed-char ${characterState}`} key={index}>{character}</span>;
                    })}
                  </div>
                ) : session.mode === 'reorder' ? (
                  <div className="scrambled-prompt" aria-label="คำที่สลับลำดับ">{currentWord.scrambledWords.map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</div>
                ) : <p className="definition">{getPrompt()}</p>}
                {session.mode !== 'recall' ? (
                  <div className="example-note"><span>MEANING</span><p>{definition || `${partNames[currentWord.partOfSpeech] || 'คำศัพท์'} · ${currentWord.level}`}</p></div>
                ) : (
                  <div className="example-line">{example.replace(new RegExp(`\\b${currentWord.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'), '_______')}</div>
                )}

                {session.mode === 'recall' && <div className="letter-hint" aria-live="polite">{hint}</div>}
                {session.mode !== 'recall' && currentWord.exampleTranslation && <p className="sentence-translation">{currentWord.exampleTranslation}</p>}
                {currentWord.exampleSource && (
                  <a className="source-credit" href={`https://tatoeba.org/en/sentences/${currentWord.exampleSource.sentenceId}`} target="_blank" rel="noreferrer">
                    Tatoeba #{currentWord.exampleSource.sentenceId} · {currentWord.exampleSource.sentenceOwner} · แปลโดย {currentWord.exampleSource.translationOwner} · {currentWord.exampleSource.sentenceLicense}{currentWord.exampleSource.translationLicense !== currentWord.exampleSource.sentenceLicense && ` / ${currentWord.exampleSource.translationLicense}`}
                  </a>
                )}
                <form className="answer-form" onSubmit={checkAnswer}>
                  <label className="input-label" htmlFor="answer-input">{session.mode === 'recall' ? 'พิมพ์คำศัพท์ที่หายไป' : session.mode === 'reorder' ? 'พิมพ์ประโยคตามลำดับที่ถูกต้อง' : 'พิมพ์ตามประโยค'}</label>
                  <input
                    ref={inputRef}
                    id="answer-input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder={session.mode === 'recall' ? 'พิมพ์คำตอบ…' : 'พิมพ์ประโยคที่เรียงแล้ว…'}
                    disabled={Boolean(feedback)}
                  />
                  <div className="answer-footer">
                    {session.mode === 'typing' ? <span className="typing-count">{answer.length} / {example.length} ตัวอักษร</span> : session.mode === 'reorder' ? <>
                      <span className="typing-count">{getSentenceWords(answer).length} / {getSentenceWords(example).length} คำ</span>
                      <button className="button button-primary submit-button" type="submit" disabled={!answer.trim() || Boolean(feedback)}>
                        ตรวจคำตอบ <span>↗</span>
                      </button>
                    </> : <>
                      <button className="hint-button" type="button" onClick={revealHint} disabled={Boolean(feedback)}>คำใบ้ <span>＋</span></button>
                      <button className="button button-primary submit-button" type="submit" disabled={!answer.trim() || Boolean(feedback)}>
                        ตรวจคำตอบ <span>↗</span>
                      </button>
                    </>}
                  </div>
                </form>
                {feedback && (
                  <div className={`feedback ${feedback}`} role="status">
                    <span>{feedback === 'correct' ? 'ถูกต้อง เก่งมาก!' : <>คำตอบที่ถูกคือ <strong>{session.mode === 'recall' ? currentWord.word : example}</strong></>}</span>
                    {session.mode === 'recall' && <button className="button button-primary submit-button" onClick={nextQuestion}>คำถัดไป <span>↗</span></button>}
                    {session.mode === 'reorder' && feedback === 'incorrect' && <>
                      <button className="button button-quiet submit-button" onClick={retryQuestion}>ลองอีกครั้ง</button>
                      <button className="button button-primary submit-button" onClick={nextQuestion}>คำถัดไป <span>↗</span></button>
                    </>}
                  </div>
                )}
              </div>

              <aside className="exercise-aside">
                <div className="aside-top"><span className="aside-index">{String(session.index + 1).padStart(2, '0')}</span><span className="aside-rule" /></div>
                <span className="eyebrow">WORD CARD</span>
                <h2>{session.mode === 'recall' && !feedback ? '•••' : currentWord.word}</h2>
                <div className="aside-level">ระดับภาษา <strong>{currentWord.level}</strong></div>
                <div className="aside-definition">
                  <span>{definition ? 'ความหมาย' : 'ชนิดคำ'}{currentWord.meaning && <> · <a href="https://belisan-volubilis.blogspot.com/" target="_blank" rel="noreferrer">Volubilis</a></>}</span>
                  <p>{definition || partNames[currentWord.partOfSpeech] || 'คำศัพท์'}</p>
                </div>
                {(session.mode !== 'recall' || feedback) && <button className="listen-link" onClick={() => speak(currentWord.word)}>ฟังการออกเสียง <span>↗</span></button>}
              </aside>
            </section>
          )}
        </main>
      ) : (
        <main className="dashboard">
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow"><span className="live-dot" /> ENGLISH, BY PRACTICE</span>
              <h1>พิมพ์ให้คล่อง<br />จำให้แม่น<span className="period">.</span></h1>
              <p>คลังคำศัพท์ Oxford 3,000 คำ ตั้งแต่ระดับเริ่มต้นถึงกลาง</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={startSession} disabled={!matchingWords.length}>เริ่มฝึก <span>↗</span></button>
                <span className="hero-caption">สูงสุด 10 คำ <i>·</i> เลือกระดับได้</span>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
              <span className="art-word art-word-one">learn</span><span className="art-word art-word-two">type</span>
              <span className="art-cursor">_</span><span className="art-level">A1—B2</span>
              <div className="art-stamp">3000<br /><small>WORDS</small></div>
            </div>
          </section>

          <section className="overview" aria-label="สถิติการฝึก">
            <div className="overview-item"><span>เรียนแล้ว</span><strong>{learnedCount}<small> / 3,000</small></strong><div className="mini-track"><i style={{ width: `${Math.min(100, learnedCount / 30)}%` }} /></div></div>
            <div className="overview-item"><span>จำได้แม่น</span><strong>{masteredCount}<small> คำ</small></strong><p>ตอบถูกอย่างน้อย 4 ครั้ง</p></div>
            <div className="overview-item level-overview"><span>คำในชุดที่เลือก</span><strong>{levelCount.toLocaleString()}<small> คำ</small></strong><p>Oxford English · A1—B2</p></div>
          </section>

          <section className="practice-area">
            <div className="practice-header">
              <div><span className="eyebrow">YOUR PRACTICE</span><h2>เลือกวิธีฝึก</h2></div>
              <div className="mode-switch" role="group" aria-label="โหมดฝึก">
                <button className={mode === 'typing' ? 'selected' : ''} onClick={() => setMode('typing')}>พิมพ์ตาม</button>
                <button className={mode === 'reorder' ? 'selected' : ''} onClick={() => setMode('reorder')}>เรียงประโยค</button>
                <button className={mode === 'recall' ? 'selected' : ''} onClick={() => setMode('recall')}>ทวนความจำ</button>
              </div>
            </div>

            <div className="practice-controls">
              <div className="level-select" role="group" aria-label="ระดับคำศัพท์">
                {levels.map((item) => <button key={item} className={level === item ? 'selected' : ''} onClick={() => setLevel(item)}>{item}</button>)}
              </div>
              <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาคำศัพท์" aria-label="ค้นหาคำศัพท์" /></label>
            </div>

            <div className="word-list" aria-label="ตัวอย่างคำศัพท์">
              {matchingWords.slice(0, 8).map((entry, index) => (
                <div className="word-row" key={entry.word}>
                  <span className="row-number">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{entry.word}</strong>
                  <span className="word-state">{progress[entry.word]?.mastery >= 4 ? 'จำได้แล้ว' : progress[entry.word] ? 'กำลังฝึก' : 'คำใหม่'}</span>
                  <span className="row-level">{entry.level}</span>
                </div>
              ))}
              {matchingWords.length === 0 && (
                <p className="empty-results" aria-live="polite">
                  {!vocabularyLoaded ? 'กำลังโหลดคลังคำศัพท์…' : vocabularyError ? <>
                    โหลดคลังคำศัพท์ไม่สำเร็จ <button className="text-button" onClick={() => setVocabularyLoadAttempt((attempt) => attempt + 1)}>ลองอีกครั้ง</button>
                  </> : 'ไม่พบคำศัพท์ที่ตรงกัน'}
                </p>
              )}
            </div>
            <div className="list-footer"><span>แสดง {Math.min(8, matchingWords.length)} จาก {matchingWords.length.toLocaleString()} คำ</span><button className="text-button" onClick={startSession} disabled={!matchingWords.length}>เริ่มฝึกชุดนี้ <span>↗</span></button></div>
          </section>
          <footer className="page-footer"><span>TypeMemo</span><span>Oxford 3000 · CEFR A1–B2</span></footer>
        </main>
      )}
    </div>
  );
}

export default App;