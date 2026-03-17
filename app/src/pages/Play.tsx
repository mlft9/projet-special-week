import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import quizData from '../data/quiz.json'
import type { QuizQuestion, LeaderboardEntry } from '../types'
import QuizCard from '../components/QuizCard'
import ScoreBadge from '../components/ScoreBadge'
import './Play.css'

const questions = quizData as QuizQuestion[]

type Phase = 'quiz' | 'results'

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

  const [current,  setCurrent]  = useState(0)
  const [score,    setScore]    = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [phase,    setPhase]    = useState<Phase>('quiz')
  const [name,     setName]     = useState('')

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
    setPhase('quiz')
    setName('')
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
    </main>
  )
}
