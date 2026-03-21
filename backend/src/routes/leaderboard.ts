import { Router } from 'express'
import { randomUUID } from 'crypto'
import db from '../db/database'
import { incrementStat } from '../db/stats'

const router = Router()

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isFiniteInteger(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && Number.isInteger(v)
}

const QUIZ_TOTAL = 14
const SPOT_MAX   = 125

// ── Quiz ───────────────────────────────────────────────────────────────────────

router.get('/quiz', (_req, res) => {
  const rows = db.prepare(
    'SELECT id, name, score, total, date FROM leaderboard_quiz ORDER BY score DESC LIMIT 20'
  ).all()
  res.json(rows)
})

router.post('/quiz', (req, res) => {
  const { name, score, total } = req.body as Record<string, unknown>

  if (!isNonEmptyString(name) || name.trim().length > 30)
    return res.status(400).json({ error: 'Nom invalide' })
  if (!isFiniteInteger(score) || score < 0 || score > QUIZ_TOTAL)
    return res.status(400).json({ error: 'Score invalide' })
  if (total !== QUIZ_TOTAL)
    return res.status(400).json({ error: 'Total invalide' })

  const entry = { id: randomUUID(), name: name.trim(), score, total: QUIZ_TOTAL, date: new Date().toISOString() }
  db.prepare('INSERT INTO leaderboard_quiz (id, name, score, total, date) VALUES (?, ?, ?, ?, ?)').run(
    entry.id, entry.name, entry.score, entry.total, entry.date
  )
  incrementStat('quizPlays')

  res.status(201).json(entry)
})

// ── Spot ───────────────────────────────────────────────────────────────────────

router.get('/spot', (_req, res) => {
  const rows = db.prepare(
    'SELECT id, name, score, max_score AS maxScore, date FROM leaderboard_spot ORDER BY score DESC LIMIT 20'
  ).all()
  res.json(rows)
})

router.post('/spot', (req, res) => {
  const { name, score, maxScore } = req.body as Record<string, unknown>

  if (!isNonEmptyString(name) || name.trim().length > 30)
    return res.status(400).json({ error: 'Nom invalide' })
  if (!isFiniteInteger(score) || score < 0 || score > SPOT_MAX)
    return res.status(400).json({ error: 'Score invalide' })
  if (maxScore !== SPOT_MAX)
    return res.status(400).json({ error: 'maxScore invalide' })

  const entry = { id: randomUUID(), name: name.trim(), score, maxScore: SPOT_MAX, date: new Date().toLocaleDateString('fr-FR') }
  db.prepare('INSERT INTO leaderboard_spot (id, name, score, max_score, date) VALUES (?, ?, ?, ?, ?)').run(
    entry.id, entry.name, entry.score, entry.maxScore, entry.date
  )
  incrementStat('spotPlays')

  res.status(201).json(entry)
})

export default router
