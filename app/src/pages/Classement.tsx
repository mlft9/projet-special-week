import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { LeaderboardEntry, SpotLeaderboardEntry } from '../types'
import './Classement.css'
import Footer from '../components/Footer'

const MEDALS = ['🥇', '🥈', '🥉']

interface QuizListProps { entries: LeaderboardEntry[] }
function QuizList({ entries }: QuizListProps) {
  if (entries.length === 0) return (
    <div className="classement-empty">
      <p>🏆</p>
      <p>Aucun score enregistré.<br />Sois le premier à jouer !</p>
      <Link className="classement-cta" to="/jouer">Lancer le quiz →</Link>
    </div>
  )
  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3)
  return (
    <>
      <p className="classement-section-title">Podium</p>
      <div className="podium">
        {top3.map((e, i) => (
          <div key={i} className={`podium-item rank-${i + 1}`}>
            <span className="podium-medal">{MEDALS[i]}</span>
            <span className="podium-name">{e.name}</span>
            <span className="podium-score">{e.score}</span>
            <span className="podium-total">/ {e.total}</span>
          </div>
        ))}
      </div>
      {rest.length > 0 && (
        <>
          <p className="classement-section-title">Suite du classement</p>
          <div className="classement-list">
            {rest.map((e, i) => (
              <div key={i} className="classement-row">
                <span className="row-rank">{i + 4}</span>
                <div className="row-info">
                  <span className="row-name">{e.name}</span>
                  <span className="row-date">{new Date(e.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <span className="row-score">{e.score}/{e.total}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <Link className="classement-cta" to="/jouer">Rejouer →</Link>
      </div>
    </>
  )
}

interface SpotListProps { entries: SpotLeaderboardEntry[] }
function SpotList({ entries }: SpotListProps) {
  if (entries.length === 0) return (
    <div className="classement-empty">
      <p>🔍</p>
      <p>Aucun score enregistré.<br />Sois le premier à jouer !</p>
      <Link className="classement-cta" to="/reperer">Jouer →</Link>
    </div>
  )
  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3)
  return (
    <>
      <p className="classement-section-title">Podium</p>
      <div className="podium">
        {top3.map((e, i) => (
          <div key={i} className={`podium-item rank-${i + 1}`}>
            <span className="podium-medal">{MEDALS[i]}</span>
            <span className="podium-name">{e.name}</span>
            <span className="podium-score">{e.score}</span>
            <span className="podium-total">/ {e.maxScore} pts</span>
          </div>
        ))}
      </div>
      {rest.length > 0 && (
        <>
          <p className="classement-section-title">Suite du classement</p>
          <div className="classement-list">
            {rest.map((e, i) => (
              <div key={i} className="classement-row">
                <span className="row-rank">{i + 4}</span>
                <div className="row-info">
                  <span className="row-name">{e.name}</span>
                  <span className="row-date">{e.date}</span>
                </div>
                <span className="row-score">{e.score} pts</span>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <Link className="classement-cta" to="/reperer">Rejouer →</Link>
      </div>
    </>
  )
}

export default function Classement() {
  const [tab, setTab] = useState<'quiz' | 'spot'>('quiz')
  const [quizEntries, setQuizEntries] = useState<LeaderboardEntry[]>([])
  const [spotEntries, setSpotEntries] = useState<SpotLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/leaderboard/quiz').then(r => r.json()),
      fetch('/api/leaderboard/spot').then(r => r.json()),
    ])
      .then(([quiz, spot]) => {
        setQuizEntries(quiz as LeaderboardEntry[])
        setSpotEntries(spot as SpotLeaderboardEntry[])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <section className="relative z-10 shrink-0 mx-auto max-w-3xl px-6 pt-28 md:pt-32 pb-2 text-center">
        <span
          className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium tracking-wide text-[var(--color-secondary)] mb-4"
          style={{ background: 'rgba(147, 54, 0, 0.06)', border: '1px solid rgba(147, 54, 0, 0.12)' }}
        >
          Classement · Top 10
        </span>
        <h1 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] text-[#2a1a0e]">
          Les meilleurs
          <br />
          <span className="italic font-medium text-[var(--color-secondary)]">détecteurs</span>
        </h1>
        <div className="mx-auto mt-3 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
      </section>

      <div className="classement-body">
        {loading && <p style={{ textAlign: 'center', color: '#6b5c44', padding: '40px 0' }}>Chargement…</p>}
        {/* Onglets */}
        {!loading && <><div className="classement-tabs">
          <button
            className={`classement-tab ${tab === 'quiz' ? 'active' : ''}`}
            onClick={() => setTab('quiz')}
          >
            ❓ Quiz
          </button>
          <button
            className={`classement-tab ${tab === 'spot' ? 'active' : ''}`}
            onClick={() => setTab('spot')}
          >
            🔍 Zones suspectes
          </button>
        </div>

        {tab === 'quiz'
          ? <QuizList entries={quizEntries} />
          : <SpotList entries={spotEntries} />
        }
        </>}
      </div>

      <Footer />
    </main>
  )
}
