import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { QuizQuestion, LeaderboardEntry } from '../types'
import QuizCard from '../components/QuizCard'
import ScoreBadge from '../components/ScoreBadge'
import './Play.css'
import Footer from '../components/Footer'
import { generateCertificatePdf } from '../utils/certificate'
import logoUrl from '../assets/logo.png'

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

  async function handleSave() {
    if (!name.trim()) return

    const playerName = name.trim()
    const entry: LeaderboardEntry = {
      name:  playerName,
      score,
      total: questions.length,
      date:  new Date().toISOString(),
    }

    const earnedCertificate = questions.length === 14 && score > 11

    try {
      const existing: LeaderboardEntry[] = JSON.parse(localStorage.getItem('leaderboard') ?? '[]')
      localStorage.setItem('leaderboard', JSON.stringify([...existing, entry]))
    } catch {
      // localStorage indisponible ou plein — on navigue quand même
    }

    if (earnedCertificate) {
      try {
        await generateCertificatePdf({
          playerName,
          score,
          total: questions.length,
          logoUrl,
        })
      } catch {
        // échec PDF non bloquant
      }
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

  /* ── ÉCRAN INTRO / HUB ── */
  if (phase === 'intro') {
    return (
      <main>
        <section className="relative z-10 shrink-0 mx-auto max-w-3xl px-6 pt-28 md:pt-32 pb-2 text-center">
          <h1 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] text-[#2a1a0e]">
            À toi de jouer
          </h1>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6b5c44]">
            Deux façons de tester ton esprit critique face à l'IA.
          </p>
        </section>

        <div className="results-body" style={{ maxWidth: 640, gap: 16 }}>
          {/* Carte Quiz */}
          <button
            onClick={() => setPhase('quiz')}
            disabled={!dataReady || questions.length === 0}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 16, textAlign: 'left',
              background: '#ffffff', border: '2px solid #e6d4a8', borderRadius: 16,
              padding: '20px 22px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s',
              width: '100%', fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#933600'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(147,54,0,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e6d4a8'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}
          >
            <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>❓</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#2a1a0e', marginBottom: 4 }}>
                Quiz — Détecte la désinformation
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6b5c44', lineHeight: 1.5 }}>
                {questions.length > 0 ? `${questions.length} questions` : '…'} · Images réelles vs IA · Score classement
              </div>
              <div style={{ marginTop: 12, display: 'inline-block', background: '#933600', color: '#fff', borderRadius: 999, padding: '6px 16px', fontSize: '0.82rem', fontWeight: 700 }}>
                {dataReady ? 'Jouer →' : 'Chargement…'}
              </div>
            </div>
          </button>

          {/* Carte Zones suspectes */}
          <button
            onClick={() => navigate('/reperer')}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 16, textAlign: 'left',
              background: '#ffffff', border: '2px solid #e6d4a8', borderRadius: 16,
              padding: '20px 22px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s',
              width: '100%', fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#933600'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(147,54,0,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e6d4a8'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}
          >
            <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>🔍</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#2a1a0e', marginBottom: 4 }}>
                Zones suspectes — Repère les artefacts IA
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6b5c44', lineHeight: 1.5 }}>
                5 images · Clique sur les zones générées par IA · 3 clics par image
              </div>
              <div style={{ marginTop: 12, display: 'inline-block', background: '#933600', color: '#fff', borderRadius: 999, padding: '6px 16px', fontSize: '0.82rem', fontWeight: 700 }}>
                Jouer →
              </div>
            </div>
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
