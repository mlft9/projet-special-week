import { Router, Request, Response } from 'express'
import { randomUUID } from 'crypto'
import db from '../db/database'
import { incrementStat } from '../db/stats'

type AiUsageType = 'suspected' | 'declared' | 'generated' | 'unknown'

const router = Router()

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function sanitizeOptionalText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const clean = value.trim()
  if (!clean) return undefined
  return clean.slice(0, maxLength)
}

// Public endpoint — only approved reports (used by extension)
router.get('/', (_req: Request, res: Response) => {
  const reports = db.prepare(`
    SELECT id, submitted_at AS submittedAt, site_name AS siteName,
           article_title AS articleTitle, article_url AS articleUrl,
           report_reason AS reportReason, ai_usage_type AS aiUsageType,
           reporter_name AS reporterName, status
    FROM reports WHERE status = 'approved'
  `).all()
  res.json({ schemaVersion: '1.0.0', updatedAt: new Date().toISOString(), reports })
})

router.post('/', (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>

  if (!isNonEmptyString(body.siteName) || (body.siteName as string).trim().length > 120)
    return res.status(400).json({ error: 'siteName requis (max 120 caractères)' })
  if (!isNonEmptyString(body.articleTitle) || (body.articleTitle as string).trim().length > 180)
    return res.status(400).json({ error: 'articleTitle requis (max 180 caractères)' })
  if (!isNonEmptyString(body.articleUrl) || !isValidUrl((body.articleUrl as string).trim()))
    return res.status(400).json({ error: 'articleUrl invalide (http/https requis)' })
  if (!isNonEmptyString(body.reportReason) || (body.reportReason as string).trim().length > 500)
    return res.status(400).json({ error: 'reportReason requis (max 500 caractères)' })

  const aiUsageType = body.aiUsageType
  if (aiUsageType !== 'suspected' && aiUsageType !== 'declared' && aiUsageType !== 'generated' && aiUsageType !== 'unknown')
    return res.status(400).json({ error: 'aiUsageType invalide' })

  const id = randomUUID()
  const submittedAt = new Date().toISOString()

  db.prepare(`
    INSERT INTO reports (id, submitted_at, site_name, article_title, article_url, report_reason, ai_usage_type, reporter_name, evidence_notes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `).run(
    id,
    submittedAt,
    (body.siteName as string).trim(),
    (body.articleTitle as string).trim(),
    (body.articleUrl as string).trim(),
    (body.reportReason as string).trim(),
    aiUsageType as AiUsageType,
    sanitizeOptionalText(body.reporterName, 80) ?? null,
    sanitizeOptionalText(body.evidenceNotes, 1000) ?? null,
  )

  incrementStat('reportsSubmitted')
  res.status(201).json({ report: { id, submittedAt, status: 'pending' } })
})

export default router
