import { Link } from 'react-router-dom'
import type { LeaderboardEntry } from '../types'
import './Classement.css'

const MEDALS = ['🥇', '🥈', '🥉']

function getEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem('leaderboard')
    if (!raw) return []
    const entries: LeaderboardEntry[] = JSON.parse(raw)
    // Trier par score décroissant, puis par date la plus récente
    return entries
      .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
  } catch {
    return []
  }
}

export default function Classement() {
  const entries = getEntries()
  const top3    = entries.slice(0, 3)
  const rest    = entries.slice(3)

  const bestScore = entries[0]?.score ?? 0
  const totalPlayers = entries.length

  return (
    <main>
      <div className="classement-hero">
        <p className="classement-eyebrow">Classement · Top 10</p>
        <h1>Les meilleurs détecteurs</h1>
        <p>Qui peut déjouer les pièges de l'IA ?</p>

        {totalPlayers > 0 && (
          <div className="classement-stats">
            <div className="classement-stat">
              <span className="val">{totalPlayers}</span>
              <span className="lbl">Joueur{totalPlayers > 1 ? 's' : ''}</span>
            </div>
            <div className="classement-stat">
              <span className="val">{bestScore}/10</span>
              <span className="lbl">Meilleur score</span>
            </div>
            <div className="classement-stat">
              <span className="val">
                {Math.round(entries.reduce((acc, e) => acc + e.score, 0) / totalPlayers * 10)}%
              </span>
              <span className="lbl">Réussite moy.</span>
            </div>
          </div>
        )}
      </div>

      <div className="classement-body">
        {entries.length === 0 ? (
          <div className="classement-empty">
            <p>🏆</p>
            <p>Aucun score enregistré pour l'instant.<br />Sois le premier à jouer !</p>
            <Link className="classement-cta" to="/jouer">Lancer le quiz →</Link>
          </div>
        ) : (
          <>
            {/* Podium top 3 */}
            {top3.length > 0 && (
              <>
                <p className="classement-section-title">Podium</p>
                <div className="podium">
                  {top3.map((entry, i) => (
                    <div key={i} className={`podium-item rank-${i + 1}`}>
                      <span className="podium-medal">{MEDALS[i]}</span>
                      <span className="podium-name">{entry.name}</span>
                      <span className="podium-score">{entry.score}</span>
                      <span className="podium-total">/ {entry.total}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Reste du classement */}
            {rest.length > 0 && (
              <>
                <p className="classement-section-title">Suite du classement</p>
                <div className="classement-list">
                  {rest.map((entry, i) => (
                    <div key={i} className="classement-row">
                      <span className="row-rank">{i + 4}</span>
                      <div className="row-info">
                        <span className="row-name">{entry.name}</span>
                        <span className="row-date">{entry.date}</span>
                      </div>
                      <span className="row-score">{entry.score}/{entry.total}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <Link className="classement-cta" to="/jouer">Rejouer →</Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
