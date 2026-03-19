import { promises as fs } from 'fs'
import path from 'path'

export type StatsStore = {
  quizPlays: number
  spotPlays: number
  reportsSubmitted: number
  chatMessages: number
}

const STATS_PATH = path.resolve(process.cwd(), 'data/stats.json')

export async function readStats(): Promise<StatsStore> {
  try {
    const raw = await fs.readFile(STATS_PATH, 'utf-8')
    return JSON.parse(raw) as StatsStore
  } catch {
    return { quizPlays: 0, spotPlays: 0, reportsSubmitted: 0, chatMessages: 0 }
  }
}

export async function incrementStat(key: keyof StatsStore): Promise<void> {
  const stats = await readStats()
  stats[key]++
  await fs.mkdir(path.dirname(STATS_PATH), { recursive: true })
  await fs.writeFile(STATS_PATH, JSON.stringify(stats, null, 2), 'utf-8')
}
