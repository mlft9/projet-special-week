import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { QuizQuestion, LeaderboardEntry } from '../types'
import QuizCard from '../components/QuizCard'
import ScoreBadge from '../components/ScoreBadge'
import './Play.css'
import Footer from '../components/Footer'

type Phase = 'intro' | 'quiz' | 'results'

function getResultMessage(score: number, total: number): string {
  const pct = score / total
  if (pct === 1)   return '🎯 Parfait ! Tu es incollable sur la désinformation !'
  if (pct >= 0.8)  return '💪 Excellent ! Tu as un très bon esprit critique.'
  if (pct >= 0.6)  return '👍 Pas mal ! Encore quelques pièges à éviter.'
  if (pct >= 0.4)  return "🤔 Moyen… L'IA t'a bien eu sur quelques questions !"
  return "😅 L'IA t'a bien trompé cette fois. Retourne sur Comprendre !"
}

export default function Play() {
  const navigate = useNavigate()

  const [questions,  setQuestions]  = useState<QuizQuestion[]>([])
  const [dataReady,  setDataReady]  = useState(false)
  const [current,    setCurrent]    = useState(0)
  const [score,      setScore]      = useState(0)
  const [answered,   setAnswered]   = useState<number | null>(null)
  const [phase,      setPhase]      = useState<Phase>('intro')
  const [name,       setName]       = useState('')

  useEffect(() => {
    fetch('/api/quiz')
      .then(r => r.json())
      .then((data: QuizQuestion[]) => { setQuestions(data); setDataReady(true) })
      .catch(() => setDataReady(true))
  }, [])

  const question = questions[current]
  const progress = questions.length > 0 ? (current / questions.length) * 100 : 0

  function handleAnswer(index: number) {
    setAnswered(index)
    if (index === question.correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setPhase('results')
    } else {
      setCurrent(c => c + 1)
      setAnswered(null)
    }
  }

  function handleSave() {
    if (!name.trim()) return
    const entry: LeaderboardEntry = {
      name:  name.trim(),
      score,
      total: questions.length,
      date:  new Date().toISOString(),
    }
    try {
      const existing: LeaderboardEntry[] = JSON.parse(localStorage.getItem('leaderboard') ?? '[]')
      localStorage.setItem('leaderboard', JSON.stringify([...existing, entry]))
    } catch {
      // localStorage indisponible ou plein — on navigue quand même
    }
    navigate('/classement')
  }

  function handleReplay() {
    setCurrent(0)
    setScore(0)
    setAnswered(null)
    setPhase('intro')
    setName('')
  }

  /* ── ÉCRAN INTRO ── */
  if (phase === 'intro') {
    return (
      <main>
        <section className="relative z-10 shrink-0 mx-auto max-w-3xl px-6 pt-28 md:pt-32 pb-2 text-center">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium tracking-wide text-[var(--color-secondary)] mb-4"
            style={{
              background: 'rgba(147, 54, 0, 0.06)',
              border: '1px solid rgba(147, 54, 0, 0.12)',
            }}
          >
            Test tes connaissances
          </span>
          <h1 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] text-[#2a1a0e]">
            Détecte la
            <br />
            <span className="italic font-medium text-[var(--color-secondary)]">désinformation</span>
          </h1>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6b5c44]">
            10 questions pour tester ton esprit critique face à l'IA.
          </p>
        </section>

        <div className="results-body">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '❓', text: `${questions.length} questions` },
              { icon: '🖼️', text: 'Analyse d\'images réelles vs IA' },
              { icon: '🏆', text: 'Score enregistré dans le classement' },
            ].map(item => (
              <li key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#fff8e8', border: '1px solid #e6d4a8',
                borderRadius: 12, padding: '14px 18px',
                fontSize: '0.92rem', fontWeight: 500, color: '#1a1a1a',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>

          <button className="results-save-btn" onClick={() => setPhase('quiz')} disabled={!dataReady || questions.length === 0}>
            {dataReady ? "C'est parti →" : 'Chargement…'}
          </button>
        </div>

        <Footer />
      </main>
    )
  }

  /* ── ÉCRAN RÉSULTATS ── */
  if (phase === 'results') {
    return (
      <main>
        <div className="results-hero">
          <ScoreBadge score={score} total={questions.length} />
          <p className="results-sub">{getResultMessage(score, questions.length)}</p>
        </div>

        <div className="results-body">
          <p className="results-name-label">Entre ton prénom pour rejoindre le classement :</p>
          <input
            className="results-name-input"
            type="text"
            placeholder="Ton prénom…"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            maxLength={20}
            autoFocus
          />
          <button
            className="results-save-btn"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Voir le classement →
          </button>
          <button className="results-replay-btn" onClick={handleReplay}>
            Rejouer
          </button>
        </div>
      </main>
    )
  }

  /* ── ÉCRAN QUIZ ── */
  return (
    <main>
      <div className="quiz-hud">
        <span className="hud-q">Q {current + 1}/{questions.length}</span>
        <div className="hud-bar-wrap">
          <div className="hud-bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="hud-score">⭐ {score} pt{score !== 1 ? 's' : ''}</span>
      </div>

      <div className="quiz-wrapper">
        <QuizCard
          question={question}
          questionIndex={current}
          total={questions.length}
          answered={answered}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>
      
      <Footer />
    </main>
  )
}
