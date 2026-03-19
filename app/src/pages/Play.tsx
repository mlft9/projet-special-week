import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { QuizQuestion } from '../types'
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
    if (!question) return
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
    const earnedCertificate = questions.length === 14 && score > 11

    try {
      await fetch('/api/leaderboard/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, score, total: questions.length }),
      })
    } catch {
      // échec réseau non bloquant
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

  const hubRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!hubRef.current) return

      gsap.from('.hub-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })

      gsap.to('.hub-card', {
        y: -4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      })
    },
    { scope: hubRef, dependencies: [phase] },
  )

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

        <div ref={hubRef} className="results-body" style={{ maxWidth: 640, gap: 16 }}>
          {/* Carte Quiz */}
          <button
            onClick={() => setPhase('quiz')}
            disabled={!dataReady || questions.length === 0}
            className="hub-card flex items-start gap-4 text-left bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm p-5 w-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-[var(--color-secondary)]"
          >
            <span className="text-[2rem] leading-none shrink-0">❓</span>
            <div>
              <div className="font-bold text-[1.05rem] text-[#2a1a0e] mb-1">
                Quiz — Détecte la désinformation
              </div>
              <div className="text-[0.85rem] text-[#6b5c44] leading-relaxed">
                {questions.length > 0 ? `${questions.length} questions` : '…'} · Images réelles vs IA · Score classement
              </div>
              <div className="mt-3 inline-block bg-[var(--color-secondary)] text-white rounded-full px-4 py-1.5 text-[0.82rem] font-bold">
                {dataReady ? 'Jouer →' : 'Chargement…'}
              </div>
            </div>
          </button>

          {/* Carte Zones suspectes */}
          <button
            onClick={() => navigate('/reperer')}
            className="hub-card flex items-start gap-4 text-left bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm p-5 w-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-[var(--color-secondary)]"
          >
            <span className="text-[2rem] leading-none shrink-0">🔍</span>
            <div>
              <div className="font-bold text-[1.05rem] text-[#2a1a0e] mb-1">
                Zones suspectes — Repère les artefacts IA
              </div>
              <div className="text-[0.85rem] text-[#6b5c44] leading-relaxed">
                5 images · Clique sur les zones générées par IA · 3 clics par image
              </div>
              <div className="mt-3 inline-block bg-[var(--color-secondary)] text-white rounded-full px-4 py-1.5 text-[0.82rem] font-bold">
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
  if (!question) return null

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
