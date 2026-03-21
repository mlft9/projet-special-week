import db from './database'

export type StatsStore = {
  quizPlays: number
  spotPlays: number
  reportsSubmitted: number
  chatMessages: number
}

export function readStats(): StatsStore {
  const rows = db.prepare('SELECT key, value FROM stats').all() as { key: string; value: number }[]
  const map = Object.fromEntries(rows.map(r => [r.key, r.value]))
  return {
    quizPlays:        map['quizPlays']        ?? 0,
    spotPlays:        map['spotPlays']        ?? 0,
    reportsSubmitted: map['reportsSubmitted'] ?? 0,
    chatMessages:     map['chatMessages']     ?? 0,
  }
}

export function incrementStat(key: keyof StatsStore): void {
  db.prepare('INSERT INTO stats (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1').run(key)
}
