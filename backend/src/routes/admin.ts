import { Router, Request, Response, NextFunction } from 'express'
import { createHmac, randomUUID } from 'crypto'
import db from '../db/database'
import { readStats } from '../db/stats'

const ADMIN_USER     = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const SECRET         = process.env.ADMIN_SECRET

if (!ADMIN_USER || !ADMIN_PASSWORD || !SECRET) {
  throw new Error('[admin] ADMIN_USER, ADMIN_PASSWORD et ADMIN_SECRET doivent être définis dans les variables d\'environnement')
}

const router = Router()

const sessions = new Map<string, number>()
const SESSION_MS = 8 * 60 * 60 * 1000

function generateToken(): string {
  const raw = `${randomUUID()}:${Date.now()}`
  return createHmac('sha256', SECRET!).update(raw).digest('hex')
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) { res.status(401).json({ error: 'Non autorisé' }); return }
  const token = auth.slice(7)
  const expiry = sessions.get(token)
  if (!expiry || Date.now() > expiry) { sessions.delete(token); res.status(401).json({ error: 'Session expirée' }); return }
  next()
}

// ── Auth ───────────────────────────────────────────────────────────────────────

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: unknown; password?: unknown }
  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Identifiants incorrects' }); return
  }
  const token = generateToken()
  sessions.set(token, Date.now() + SESSION_MS)
  res.json({ token })
})

router.post('/logout', requireAuth, (req: Request, res: Response) => {
  sessions.delete(req.headers['authorization']!.slice(7))
  res.json({ ok: true })
})

// ── Stats ──────────────────────────────────────────────────────────────────────

router.get('/stats', requireAuth, (_req: Request, res: Response) => {
  const stats = readStats()

  const quizScores = (db.prepare('SELECT score FROM leaderboard_quiz').all() as { score: number }[]).map(r => r.score)
  const spotScores = (db.prepare('SELECT score FROM leaderboard_spot').all() as { score: number }[]).map(r => r.score)
  const avg = (arr: number[]) => arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0

  const pendingReports = (db.prepare("SELECT COUNT(*) AS n FROM reports WHERE status = 'pending'").get() as { n: number }).n
  const quizCount      = (db.prepare('SELECT COUNT(*) AS n FROM leaderboard_quiz').get() as { n: number }).n
  const spotCount      = (db.prepare('SELECT COUNT(*) AS n FROM leaderboard_spot').get() as { n: number }).n

  res.json({
    quizPlays:                stats.quizPlays,
    spotPlays:                stats.spotPlays,
    reportsSubmitted:         stats.reportsSubmitted,
    chatMessages:             stats.chatMessages,
    quizEntriesInLeaderboard: quizCount,
    spotEntriesInLeaderboard: spotCount,
    pendingReports,
    avgQuizScore:             avg(quizScores),
    avgSpotScore:             avg(spotScores),
    bestQuizScore:            quizScores.length ? Math.max(...quizScores) : 0,
    bestSpotScore:            spotScores.length ? Math.max(...spotScores) : 0,
  })
})

// ── Données complètes ──────────────────────────────────────────────────────────

router.get('/leaderboard', requireAuth, (_req: Request, res: Response) => {
  const quiz = db.prepare('SELECT id, name, score, total, date FROM leaderboard_quiz ORDER BY score DESC').all()
  const spot = db.prepare('SELECT id, name, score, max_score AS maxScore, date FROM leaderboard_spot ORDER BY score DESC').all()
  res.json({ quiz, spot })
})

router.get('/reports', requireAuth, (_req: Request, res: Response) => {
  const reports = db.prepare(`
    SELECT id, submitted_at AS submittedAt, site_name AS siteName,
           article_title AS articleTitle, article_url AS articleUrl,
           ai_usage_type AS aiUsageType, reporter_name AS reporterName, status
    FROM reports ORDER BY submitted_at DESC
  `).all()
  res.json(reports)
})

// ── Modifications ──────────────────────────────────────────────────────────────

router.patch('/reports/:id', requireAuth, (req: Request, res: Response) => {
  const { status } = req.body as { status?: unknown }
  if (status !== 'approved' && status !== 'rejected' && status !== 'pending') {
    res.status(400).json({ error: 'status invalide (pending | approved | rejected)' }); return
  }
  const result = db.prepare('UPDATE reports SET status = ? WHERE id = ?').run(status, req.params['id'])
  if (result.changes === 0) { res.status(404).json({ error: 'Rapport introuvable' }); return }
  res.json({ ok: true, status })
})

// ── Suppressions ───────────────────────────────────────────────────────────────

router.delete('/leaderboard/quiz/:id', requireAuth, (req: Request, res: Response) => {
  const result = db.prepare('DELETE FROM leaderboard_quiz WHERE id = ?').run(req.params['id'])
  if (result.changes === 0) { res.status(404).json({ error: 'Entrée introuvable' }); return }
  res.json({ ok: true })
})

router.delete('/leaderboard/spot/:id', requireAuth, (req: Request, res: Response) => {
  const result = db.prepare('DELETE FROM leaderboard_spot WHERE id = ?').run(req.params['id'])
  if (result.changes === 0) { res.status(404).json({ error: 'Entrée introuvable' }); return }
  res.json({ ok: true })
})

router.delete('/reports/:id', requireAuth, (req: Request, res: Response) => {
  const result = db.prepare('DELETE FROM reports WHERE id = ?').run(req.params['id'])
  if (result.changes === 0) { res.status(404).json({ error: 'Rapport introuvable' }); return }
  res.json({ ok: true })
})

export default router
