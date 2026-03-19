import { Router, Request, Response, NextFunction } from 'express'
import { createHmac, randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import { readStats } from '../db/stats'

const router = Router()

const ADMIN_USER     = process.env.ADMIN_USER     ?? 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'ealertes2026'
const SECRET         = process.env.ADMIN_SECRET   ?? 'e-alertes-dev-secret-2026'

// Sessions en mémoire : token → expiry
const sessions = new Map<string, number>()
const SESSION_MS = 8 * 60 * 60 * 1000 // 8 h

function generateToken(): string {
  const raw = `${randomUUID()}:${Date.now()}`
  return createHmac('sha256', SECRET).update(raw).digest('hex')
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Non autorisé' })
    return
  }
  const token = auth.slice(7)
  const expiry = sessions.get(token)
  if (!expiry || Date.now() > expiry) {
    sessions.delete(token)
    res.status(401).json({ error: 'Session expirée' })
    return
  }
  next()
}

// Chemins des données
const LEADERBOARD_PATH = path.resolve(process.cwd(), 'data/leaderboard.json')
const REPORTS_PATH     = path.resolve(process.cwd(), 'data/reports.json')

type QuizEntry = { id?: string; name: string; score: number; total: number; date: string }
type SpotEntry = { id?: string; name: string; score: number; maxScore: number; date: string }
type LeaderboardStore = { quiz: QuizEntry[]; spot: SpotEntry[] }
type ReportEntry = { id: string; submittedAt: string; status: string; [key: string]: unknown }
type ReportsStore  = { schemaVersion: string; updatedAt: string; reports: ReportEntry[] }

async function readLeaderboard(): Promise<LeaderboardStore> {
  try {
    const raw = await fs.readFile(LEADERBOARD_PATH, 'utf-8')
    return JSON.parse(raw) as LeaderboardStore
  } catch {
    return { quiz: [], spot: [] }
  }
}

async function writeLeaderboard(store: LeaderboardStore): Promise<void> {
  await fs.writeFile(LEADERBOARD_PATH, JSON.stringify(store, null, 2), 'utf-8')
}

async function readReports(): Promise<ReportsStore> {
  try {
    const raw = await fs.readFile(REPORTS_PATH, 'utf-8')
    return JSON.parse(raw) as ReportsStore
  } catch {
    return { schemaVersion: '1.0.0', updatedAt: new Date().toISOString(), reports: [] }
  }
}

async function writeReports(store: ReportsStore): Promise<void> {
  await fs.writeFile(REPORTS_PATH, JSON.stringify(store, null, 2), 'utf-8')
}

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: unknown; password?: unknown }
  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Identifiants incorrects' })
    return
  }
  const token = generateToken()
  sessions.set(token, Date.now() + SESSION_MS)
  res.json({ token })
})

router.post('/logout', requireAuth, (req: Request, res: Response) => {
  sessions.delete(req.headers['authorization']!.slice(7))
  res.json({ ok: true })
})

// ── Stats ─────────────────────────────────────────────────────────────────────

router.get('/stats', requireAuth, async (_req: Request, res: Response) => {
  const [lb, reports, stats] = await Promise.all([
    readLeaderboard(),
    readReports(),
    readStats(),
  ])

  const quizScores = lb.quiz.map(e => e.score)
  const spotScores = lb.spot.map(e => e.score)
  const avg = (arr: number[]) =>
    arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0

  res.json({
    quizPlays:               stats.quizPlays,
    spotPlays:               stats.spotPlays,
    reportsSubmitted:        stats.reportsSubmitted,
    chatMessages:            stats.chatMessages,
    quizEntriesInLeaderboard: lb.quiz.length,
    spotEntriesInLeaderboard: lb.spot.length,
    pendingReports:          reports.reports.filter(r => r.status === 'pending').length,
    avgQuizScore:            avg(quizScores),
    avgSpotScore:            avg(spotScores),
    bestQuizScore:           quizScores.length ? Math.max(...quizScores) : 0,
    bestSpotScore:           spotScores.length ? Math.max(...spotScores) : 0,
  })
})

// ── Données complètes ─────────────────────────────────────────────────────────

router.get('/leaderboard', requireAuth, async (_req: Request, res: Response) => {
  const lb = await readLeaderboard()
  // Migration : ajouter un id aux entrées qui n'en ont pas
  let changed = false
  for (const e of [...lb.quiz, ...lb.spot]) {
    if (!e.id) { e.id = randomUUID(); changed = true }
  }
  if (changed) await writeLeaderboard(lb)
  res.json(lb)
})

router.get('/reports', requireAuth, async (_req: Request, res: Response) => {
  const store = await readReports()
  res.json(store.reports)
})

// ── Suppressions ──────────────────────────────────────────────────────────────

router.delete('/leaderboard/quiz/:id', requireAuth, async (req: Request, res: Response) => {
  const lb = await readLeaderboard()
  const before = lb.quiz.length
  lb.quiz = lb.quiz.filter(e => e.id !== req.params['id'])
  if (lb.quiz.length === before) { res.status(404).json({ error: 'Entrée introuvable' }); return }
  await writeLeaderboard(lb)
  res.json({ ok: true })
})

router.delete('/leaderboard/spot/:id', requireAuth, async (req: Request, res: Response) => {
  const lb = await readLeaderboard()
  const before = lb.spot.length
  lb.spot = lb.spot.filter(e => e.id !== req.params['id'])
  if (lb.spot.length === before) { res.status(404).json({ error: 'Entrée introuvable' }); return }
  await writeLeaderboard(lb)
  res.json({ ok: true })
})

router.delete('/reports/:id', requireAuth, async (req: Request, res: Response) => {
  const store = await readReports()
  const before = store.reports.length
  store.reports = store.reports.filter(r => r.id !== req.params['id'])
  if (store.reports.length === before) { res.status(404).json({ error: 'Rapport introuvable' }); return }
  store.updatedAt = new Date().toISOString()
  await writeReports(store)
  res.json({ ok: true })
})

export default router
