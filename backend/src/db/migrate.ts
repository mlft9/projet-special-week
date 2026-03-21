/**
 * Migration one-shot : JSON files → SQLite
 * Run: npx ts-node src/db/migrate.ts
 */
import { readFileSync, existsSync } from 'fs'
import { randomUUID } from 'crypto'
import path from 'path'
import db from './database'

function readJson<T>(file: string, fallback: T): T {
  const p = path.resolve(process.cwd(), file)
  if (!existsSync(p)) return fallback
  try { return JSON.parse(readFileSync(p, 'utf-8')) as T } catch { return fallback }
}

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = readJson('data/stats.json', { quizPlays: 0, spotPlays: 0, reportsSubmitted: 0, chatMessages: 0 })

const upsertStat = db.prepare('INSERT INTO stats (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
upsertStat.run('quizPlays',        stats.quizPlays)
upsertStat.run('spotPlays',        stats.spotPlays)
upsertStat.run('reportsSubmitted', stats.reportsSubmitted)
upsertStat.run('chatMessages',     stats.chatMessages)
console.log('✅ Stats migrées')

// ── Leaderboard ───────────────────────────────────────────────────────────────
type QuizEntry = { id?: string; name: string; score: number; total: number; date: string }
type SpotEntry = { id?: string; name: string; score: number; maxScore: number; date: string }
const lb = readJson<{ quiz: QuizEntry[]; spot: SpotEntry[] }>('data/leaderboard.json', { quiz: [], spot: [] })

const insertQuiz = db.prepare('INSERT OR IGNORE INTO leaderboard_quiz (id, name, score, total, date) VALUES (?, ?, ?, ?, ?)')
const insertSpot = db.prepare('INSERT OR IGNORE INTO leaderboard_spot (id, name, score, max_score, date) VALUES (?, ?, ?, ?, ?)')

let quizCount = 0
for (const e of lb.quiz ?? []) {
  insertQuiz.run(e.id ?? randomUUID(), e.name, e.score, e.total, e.date)
  quizCount++
}
console.log(`✅ ${quizCount} entrées quiz migrées`)

let spotCount = 0
for (const e of lb.spot ?? []) {
  insertSpot.run(e.id ?? randomUUID(), e.name, e.score, e.maxScore, e.date)
  spotCount++
}
console.log(`✅ ${spotCount} entrées spot migrées`)

// ── Reports ───────────────────────────────────────────────────────────────────
type Report = {
  id: string; submittedAt: string; siteName: string; articleTitle: string
  articleUrl: string; reportReason: string; aiUsageType: string
  reporterName?: string; evidenceNotes?: string; status: string
}
const reportsStore = readJson<{ reports: Report[] }>('data/reports.json', { reports: [] })

const insertReport = db.prepare(`
  INSERT OR IGNORE INTO reports
    (id, submitted_at, site_name, article_title, article_url, report_reason, ai_usage_type, reporter_name, evidence_notes, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

let reportCount = 0
for (const r of reportsStore.reports ?? []) {
  insertReport.run(r.id, r.submittedAt, r.siteName, r.articleTitle, r.articleUrl, r.reportReason, r.aiUsageType, r.reporterName ?? null, r.evidenceNotes ?? null, r.status)
  reportCount++
}
console.log(`✅ ${reportCount} signalements migrés`)
console.log('\n🎉 Migration terminée — base SQLite prête dans data/ealerte.db')
