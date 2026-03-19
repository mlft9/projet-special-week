import { useState, useEffect } from 'react'
import './Admin.css'

type Stats = {
  quizPlays: number
  spotPlays: number
  reportsSubmitted: number
  chatMessages: number
  quizEntriesInLeaderboard: number
  spotEntriesInLeaderboard: number
  pendingReports: number
  avgQuizScore: number
  avgSpotScore: number
  bestQuizScore: number
  bestSpotScore: number
}

type QuizEntry = { id: string; name: string; score: number; total: number; date: string }
type SpotEntry = { id: string; name: string; score: number; maxScore: number; date: string }
type ReportEntry = {
  id: string
  submittedAt: string
  siteName: string
  articleTitle: string
  articleUrl: string
  aiUsageType: string
  reporterName?: string
  status: string
}

const API = '/api/admin'

function getToken()          { return localStorage.getItem('admin_token') }
function saveToken(t: string) { localStorage.setItem('admin_token', t) }
function clearToken()         { localStorage.removeItem('admin_token') }

function authFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken() ?? ''}`,
      ...(options.headers as Record<string, string> | undefined),
    },
  })
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="admin-stat-card">
      <span className="admin-stat-icon">{icon}</span>
      <span className="admin-stat-value">{value}</span>
      <span className="admin-stat-label">{label}</span>
    </div>
  )
}

export default function Admin() {
  const [token, setToken]             = useState<string | null>(getToken())
  const [username, setUsername]       = useState('')
  const [password, setPassword]       = useState('')
  const [loginError, setLoginError]   = useState('')
  const [stats, setStats]             = useState<Stats | null>(null)
  const [quizEntries, setQuizEntries] = useState<QuizEntry[]>([])
  const [spotEntries, setSpotEntries] = useState<SpotEntry[]>([])
  const [reports, setReports]         = useState<ReportEntry[]>([])
  const [tab, setTab]                 = useState<'quiz' | 'spot' | 'reports'>('quiz')
  const [loading, setLoading]         = useState(false)

  // Valide le token existant au montage
  useEffect(() => {
    if (!token) return
    authFetch('/stats').then(r => {
      if (r.status === 401) { clearToken(); setToken(null) }
    })
  }, [])

  // Charge les données après connexion
  useEffect(() => {
    if (!token) return
    setLoading(true)
    Promise.all([
      authFetch('/stats').then(r => r.json()),
      authFetch('/leaderboard').then(r => r.json()),
      authFetch('/reports').then(r => r.json()),
    ]).then(([s, lb, rep]) => {
      setStats(s as Stats)
      setQuizEntries((lb as { quiz: QuizEntry[] }).quiz ?? [])
      setSpotEntries((lb as { spot: SpotEntry[] }).spot ?? [])
      setReports(rep as ReportEntry[])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [token])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      const { token: t } = await res.json() as { token: string }
      saveToken(t)
      setToken(t)
    } else {
      setLoginError('Identifiants incorrects')
    }
  }

  async function logout() {
    await authFetch('/logout', { method: 'POST' })
    clearToken()
    setToken(null)
  }

  async function deleteQuiz(id: string) {
    if (!confirm('Supprimer cette entrée ?')) return
    await authFetch(`/leaderboard/quiz/${id}`, { method: 'DELETE' })
    setQuizEntries(prev => prev.filter(e => e.id !== id))
    setStats(prev => prev ? { ...prev, quizEntriesInLeaderboard: prev.quizEntriesInLeaderboard - 1 } : prev)
  }

  async function deleteSpot(id: string) {
    if (!confirm('Supprimer cette entrée ?')) return
    await authFetch(`/leaderboard/spot/${id}`, { method: 'DELETE' })
    setSpotEntries(prev => prev.filter(e => e.id !== id))
    setStats(prev => prev ? { ...prev, spotEntriesInLeaderboard: prev.spotEntriesInLeaderboard - 1 } : prev)
  }

  async function deleteReport(id: string) {
    if (!confirm('Supprimer ce signalement ?')) return
    await authFetch(`/reports/${id}`, { method: 'DELETE' })
    setReports(prev => prev.filter(e => e.id !== id))
    setStats(prev => prev ? { ...prev, pendingReports: Math.max(0, prev.pendingReports - 1), reportsSubmitted: Math.max(0, prev.reportsSubmitted - 1) } : prev)
  }

  // ── Page login ──────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-logo">🛡️</div>
          <h1>Administration</h1>
          <p>E-alertés — Accès restreint</p>
          <form onSubmit={login}>
            <div className="admin-field">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="admin-field">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit" className="admin-btn-primary">Se connecter</button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="admin-dashboard">
      <header className="admin-topbar">
        <span className="admin-topbar-title">🛡️ Dashboard E-alertés</span>
        <button className="admin-btn-logout" onClick={logout}>Déconnexion</button>
      </header>

      {loading && <div className="admin-loading">Chargement...</div>}

      {stats && (
        <section className="admin-stats">
          <StatCard icon="🎮" label="Parties quiz jouées"     value={stats.quizPlays} />
          <StatCard icon="🔍" label="Parties Spot jouées"     value={stats.spotPlays} />
          <StatCard icon="📢" label="Signalements reçus"      value={stats.reportsSubmitted} />
          <StatCard icon="💬" label="Messages chatbot"        value={stats.chatMessages} />
          <StatCard icon="⭐" label="Meilleur score quiz"     value={`${stats.bestQuizScore}/14`} />
          <StatCard icon="📊" label="Score moyen quiz"        value={`${stats.avgQuizScore}/14`} />
          <StatCard icon="🏆" label="Meilleur score Spot"     value={stats.bestSpotScore} />
          <StatCard icon="📊" label="Score moyen Spot"        value={stats.avgSpotScore} />
          <StatCard icon="📋" label="Entrées classement quiz" value={stats.quizEntriesInLeaderboard} />
          <StatCard icon="📋" label="Entrées classement Spot" value={stats.spotEntriesInLeaderboard} />
          <StatCard icon="⏳" label="Signalements en attente" value={stats.pendingReports} />
        </section>
      )}

      <section className="admin-section">
        <div className="admin-tabs">
          <button
            className={`admin-tab${tab === 'quiz' ? ' active' : ''}`}
            onClick={() => setTab('quiz')}
          >
            Classement Quiz ({quizEntries.length})
          </button>
          <button
            className={`admin-tab${tab === 'spot' ? ' active' : ''}`}
            onClick={() => setTab('spot')}
          >
            Classement Spot ({spotEntries.length})
          </button>
          <button
            className={`admin-tab${tab === 'reports' ? ' active' : ''}`}
            onClick={() => setTab('reports')}
          >
            Signalements ({reports.length})
          </button>
        </div>

        {tab === 'quiz' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>Nom</th><th>Score</th><th>Date</th><th></th>
              </tr>
            </thead>
            <tbody>
              {quizEntries.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>Aucune entrée</td></tr>
              )}
              {quizEntries.map((e, i) => (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.score}/{e.total}</td>
                  <td>{new Date(e.date).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button className="admin-btn-delete" onClick={() => deleteQuiz(e.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'spot' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>Nom</th><th>Score</th><th>Date</th><th></th>
              </tr>
            </thead>
            <tbody>
              {spotEntries.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>Aucune entrée</td></tr>
              )}
              {spotEntries.map((e, i) => (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.score}/{e.maxScore}</td>
                  <td>{e.date}</td>
                  <td>
                    <button className="admin-btn-delete" onClick={() => deleteSpot(e.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'reports' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Site</th><th>Titre</th><th>Type IA</th><th>Date</th><th>Rapporteur</th><th></th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#aaa', padding: '32px' }}>Aucun signalement</td></tr>
              )}
              {reports.map(e => (
                <tr key={e.id}>
                  <td>{e.siteName}</td>
                  <td className="admin-td-truncate" title={e.articleTitle}>{e.articleTitle}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${e.aiUsageType}`}>{e.aiUsageType}</span>
                  </td>
                  <td>{new Date(e.submittedAt).toLocaleDateString('fr-FR')}</td>
                  <td>{e.reporterName ?? '—'}</td>
                  <td>
                    <button className="admin-btn-delete" onClick={() => deleteReport(e.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
