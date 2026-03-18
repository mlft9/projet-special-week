import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import type { SpotLeaderboardEntry } from '../../types'

interface LevelResult {
  levelTitle: string
  found: number
  total: number
  wrongClicks: number
  points: number
}

interface Props {
  totalScore: number
  maxScore: number
  levelResults: LevelResult[]
  onReplay: () => void
}

function getVerdict(score: number, max: number): { emoji: string; label: string; color: string } {
  const pct = max > 0 ? score / max : 0
  if (pct >= 0.9) return { emoji: '🕵️', label: 'Détective expert !',        color: '#4aaeff' }
  if (pct >= 0.7) return { emoji: '👁️', label: 'Bon œil !',                  color: '#22c55e' }
  if (pct >= 0.5) return { emoji: '🤔', label: 'Entraîne-toi encore…',       color: '#ff9800' }
  return              { emoji: '😅', label: "L'IA t'a bien eu !",            color: '#ff3b3b' }
}

export default function SpotResults({ totalScore, maxScore, levelResults, onReplay }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.from(containerRef.current, { opacity: 0, scale: 0.93, duration: 0.6, ease: 'back.out(1.4)' })
    gsap.from('.spot-results__row', {
      opacity: 0, x: -24, duration: 0.35, stagger: 0.07, ease: 'power2.out', delay: 0.3,
    })
  }, { scope: containerRef })

  const verdict = getVerdict(totalScore, maxScore)

  const handleSave = () => {
    if (!name.trim() || saved) return
    const entry: SpotLeaderboardEntry = {
      name: name.trim(),
      score: totalScore,
      maxScore,
      date: new Date().toLocaleDateString('fr-FR'),
    }
    const existing = JSON.parse(localStorage.getItem('leaderboard-spot') ?? '[]') as SpotLeaderboardEntry[]
    existing.push(entry)
    existing.sort((a, b) => b.score - a.score)
    localStorage.setItem('leaderboard-spot', JSON.stringify(existing.slice(0, 20)))
    setSaved(true)
  }

  return (
    <div ref={containerRef} className="spot-results">
      {/* Verdict */}
      <div className="spot-results__verdict">
        <span className="spot-results__verdict-emoji">{verdict.emoji}</span>
        <h2 className="spot-results__verdict-label">{verdict.label}</h2>
        <p className="spot-results__score-total">
          {totalScore} / {maxScore} pts
        </p>
      </div>

      <div className="spot-results__body">
      {/* Détail par niveau */}
      <div className="spot-results__table">
        {levelResults.map((r, i) => (
          <div key={i} className="spot-results__row">
            <span className="spot-results__row-title">{r.levelTitle}</span>
            <span className="spot-results__row-detail">
              {r.found}/{r.total} zones · {r.wrongClicks} erreur{r.wrongClicks > 1 ? 's' : ''}
            </span>
            <span className="spot-results__row-pts">
              {r.points > 0 ? '+' : ''}{r.points} pts
            </span>
          </div>
        ))}
      </div>

      {/* Sauvegarde */}
      {!saved ? (
        <div className="spot-results__save">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ton prénom"
            maxLength={20}
            className="spot-results__input"
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          <button
            className="spot-results__btn spot-results__btn--primary"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Enregistrer
          </button>
        </div>
      ) : (
        <p className="spot-results__saved-msg">Score enregistré !</p>
      )}

      <div className="spot-results__actions">
        <button className="spot-results__btn spot-results__btn--secondary" onClick={onReplay}>
          Rejouer
        </button>
        <button
          className="spot-results__btn spot-results__btn--outline"
          onClick={() => navigate('/classement')}
        >
          Classement
        </button>
      </div>
      </div>
    </div>
  )
}
