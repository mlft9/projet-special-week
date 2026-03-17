import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import type { LeaderboardEntry } from '../types'
import './Classement.css'
import Footer from '../components/Footer'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const MEDALS = ['🥇', '🥈', '🥉']

function getAllEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem('leaderboard')
    if (!raw) return []
    return JSON.parse(raw) as LeaderboardEntry[]
  } catch {
    return []
  }
}

function getTopEntries(all: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...all]
    .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
}

export default function Classement() {
  const all      = getAllEntries()
  const entries  = getTopEntries(all)
  const top3     = entries.slice(0, 3)
  const rest     = entries.slice(3)

  const bestScore    = entries[0]?.score ?? 0
  const totalPlayers = all.length

  // Distribution des scores pour le graphique (0 à 10)
  const maxScore = all[0]?.total ?? 10
  const distribution = Array.from({ length: maxScore + 1 }, (_, i) =>
    all.filter(e => e.score === i).length
  )

  const chartData = {
    labels: Array.from({ length: maxScore + 1 }, (_, i) => `${i}/${maxScore}`),
    datasets: [{
      data: distribution,
      backgroundColor: distribution.map(v =>
        v === Math.max(...distribution) ? '#933600' : 'rgba(147, 54, 0, 0.25)'
      ),
      borderRadius: 8,
      borderSkipped: false,
    }],
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { callbacks: {
      label: (ctx: { raw: unknown }) => ` ${ctx.raw} joueur${Number(ctx.raw) > 1 ? 's' : ''}`,
    }}},
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6b5c44', font: { size: 11 } } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6b5c44', stepSize: 1, precision: 0 } },
    },
  }

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
                {Math.round(entries.reduce((acc, e) => acc + e.score, 0) / entries.reduce((acc, e) => acc + e.total, 0) * 100)}%
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
            {/* Distribution des scores */}
            {all.length >= 2 && (
              <>
                <p className="classement-section-title">Distribution des scores</p>
                <div className="classement-chart">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </>
            )}

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
                        <span className="row-date">{new Date(entry.date).toLocaleDateString('fr-FR')}</span>
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
      <Footer />
    </main>
  )
}
