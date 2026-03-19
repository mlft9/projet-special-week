import { Router } from 'express'
import { promises as fs } from 'fs'
import { randomUUID } from 'crypto'
import path from 'path'
import { incrementStat } from '../db/stats'

type QuizEntry = {
  id: string
  name: string
  score: number
  total: number
  date: string
}

type SpotEntry = {
  id: string
  name: string
  score: number
  maxScore: number
  date: string
}

type LeaderboardStore = {
  quiz: QuizEntry[]
  spot: SpotEntry[]
}

const router = Router()
const DATA_PATH = path.resolve(process.cwd(), 'data/leaderboard.json')

async function readStore(): Promise<LeaderboardStore> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(raw) as LeaderboardStore
  } catch {
    return { quiz: [], spot: [] }
  }
}

async function writeStore(store: LeaderboardStore): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2), 'utf-8')
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isPositiveNumber(v: unknown): v is number {
  return typeof v === 'number' && v >= 0
}

// ── Quiz ──────────────────────────────────────────────

router.get('/quiz', async (_req, res) => {
  const store = await readStore()
  const top = [...store.quiz]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
  res.json(top)
})

router.post('/quiz', async (req, res) => {
  const { name, score, total } = req.body as Record<string, unknown>

  if (!isNonEmptyString(name) || name.trim().length > 30)
    return res.status(400).json({ error: 'Nom invalide' })
  if (!isPositiveNumber(score) || !isPositiveNumber(total) || score > total)
    return res.status(400).json({ error: 'Score invalide' })

  const entry: QuizEntry = {
    id: randomUUID(),
    name: name.trim(),
    score,
    total,
    date: new Date().toISOString(),
  }

  const store = await readStore()
  store.quiz.push(entry)
  store.quiz.sort((a, b) => b.score - a.score)
  if (store.quiz.length > 200) store.quiz = store.quiz.slice(0, 200)
  await writeStore(store)
  incrementStat('quizPlays').catch(() => {})

  res.status(201).json(entry)
})

// ── Spot ──────────────────────────────────────────────

router.get('/spot', async (_req, res) => {
  const store = await readStore()
  const top = [...store.spot]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
  res.json(top)
})

router.post('/spot', async (req, res) => {
  const { name, score, maxScore } = req.body as Record<string, unknown>

  if (!isNonEmptyString(name) || name.trim().length > 30)
    return res.status(400).json({ error: 'Nom invalide' })
  if (!isPositiveNumber(score) || !isPositiveNumber(maxScore) || score > maxScore)
    return res.status(400).json({ error: 'Score invalide' })

  const entry: SpotEntry = {
    id: randomUUID(),
    name: name.trim(),
    score,
    maxScore,
    date: new Date().toLocaleDateString('fr-FR'),
  }

  const store = await readStore()
  store.spot.push(entry)
  store.spot.sort((a, b) => b.score - a.score)
  if (store.spot.length > 200) store.spot = store.spot.slice(0, 200)
  await writeStore(store)
  incrementStat('spotPlays').catch(() => {})

  res.status(201).json(entry)
})

export default router
