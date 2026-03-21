import Database from 'better-sqlite3'
import path from 'path'
import { mkdirSync } from 'fs'

const DB_PATH = path.resolve(process.cwd(), 'data/ealerte.db')

mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS leaderboard_quiz (
    id        TEXT PRIMARY KEY,
    name      TEXT NOT NULL,
    score     INTEGER NOT NULL,
    total     INTEGER NOT NULL,
    date      TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS leaderboard_spot (
    id        TEXT PRIMARY KEY,
    name      TEXT NOT NULL,
    score     INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    date      TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reports (
    id             TEXT PRIMARY KEY,
    submitted_at   TEXT NOT NULL,
    site_name      TEXT NOT NULL,
    article_title  TEXT NOT NULL,
    article_url    TEXT NOT NULL,
    report_reason  TEXT NOT NULL,
    ai_usage_type  TEXT NOT NULL,
    reporter_name  TEXT,
    evidence_notes TEXT,
    status         TEXT NOT NULL DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS stats (
    key   TEXT PRIMARY KEY,
    value INTEGER NOT NULL DEFAULT 0
  );

  INSERT OR IGNORE INTO stats (key, value) VALUES
    ('quizPlays', 0),
    ('spotPlays', 0),
    ('reportsSubmitted', 0),
    ('chatMessages', 0);
`)

export default db
