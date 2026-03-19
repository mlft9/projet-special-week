import { Router, Request, Response } from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import { incrementStat } from '../db/stats'

type AiUsageType = 'suspected' | 'declared' | 'generated' | 'unknown'

type ReportRecord = {
  id: string
  submittedAt: string
  siteName: string
  articleTitle: string
  articleUrl: string
  reportReason: string
  aiUsageType: AiUsageType
  reporterName?: string
  evidenceNotes?: string
  status: 'pending'
}

type ReportsStore = {
  schemaVersion: '1.0.0'
  updatedAt: string
  reports: ReportRecord[]
}

type FlaggedSitesStore = {
  schemaVersion: '1.0.0'
  updatedAt: string
  domains: string[]
}

type IncomingReport = {
  siteName?: unknown
  articleTitle?: unknown
  articleUrl?: unknown
  reportReason?: unknown
  aiUsageType?: unknown
  reporterName?: unknown
  evidenceNotes?: unknown
}

const router = Router()
const SOURCE_FILE_PATH = path.resolve(process.cwd(), 'data/reports.json')
const FLAGGED_SITES_FILE_PATH = path.resolve(process.cwd(), '../extension/flagged-sites.json')

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

function normalizeDomain(value: string): string {
  const trimmed = value.trim().toLowerCase()
  if (!trimmed) return ''

  try {
    const parsed = new URL(trimmed)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return trimmed
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split(':')[0]
  }
}

async function readFlaggedSitesStore(): Promise<FlaggedSitesStore> {
  try {
    const raw = await fs.readFile(FLAGGED_SITES_FILE_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as FlaggedSitesStore
    if (!Array.isArray(parsed.domains)) {
      return {
        schemaVersion: '1.0.0',
        updatedAt: new Date().toISOString(),
        domains: [],
      }
    }

    return {
      schemaVersion: '1.0.0',
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      domains: parsed.domains.map((domain) => normalizeDomain(domain)).filter(Boolean),
    }
  } catch {
    return {
      schemaVersion: '1.0.0',
      updatedAt: new Date().toISOString(),
      domains: [],
    }
  }
}

async function writeFlaggedSitesStore(store: FlaggedSitesStore): Promise<void> {
  await fs.mkdir(path.dirname(FLAGGED_SITES_FILE_PATH), { recursive: true })
  await fs.writeFile(FLAGGED_SITES_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8')
}

async function syncFlaggedSites(report: ReportRecord): Promise<void> {
  const urlDomain = normalizeDomain(report.articleUrl)
  const siteDomain = normalizeDomain(report.siteName)
  const domainToAdd = urlDomain || siteDomain
  if (!domainToAdd) return

  const flaggedStore = await readFlaggedSitesStore()
  const domains = new Set(flaggedStore.domains)
  domains.add(domainToAdd)

  const nextFlaggedStore: FlaggedSitesStore = {
    schemaVersion: '1.0.0',
    updatedAt: new Date().toISOString(),
    domains: [...domains],
  }

  await writeFlaggedSitesStore(nextFlaggedStore)
}

async function readStore(): Promise<ReportsStore> {
  try {
    const raw = await fs.readFile(SOURCE_FILE_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as ReportsStore
    if (!Array.isArray(parsed.reports)) {
      return {
        schemaVersion: '1.0.0',
        updatedAt: new Date().toISOString(),
        reports: [],
      }
    }
    return {
      schemaVersion: '1.0.0',
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      reports: parsed.reports,
    }
  } catch {
    return {
      schemaVersion: '1.0.0',
      updatedAt: new Date().toISOString(),
      reports: [],
    }
  }
}

async function writeStore(store: ReportsStore): Promise<void> {
  await fs.mkdir(path.dirname(SOURCE_FILE_PATH), { recursive: true })
  await fs.writeFile(SOURCE_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8')
}

router.get('/', async (_req: Request, res: Response) => {
  const store = await readStore()
  res.json(store)
})

router.post('/', async (req: Request, res: Response) => {
  const body = req.body as IncomingReport

  if (!isNonEmptyString(body.siteName) || body.siteName.trim().length > 120) {
    res.status(400).json({ error: 'siteName requis (max 120 caractères)' })
    return
  }

  if (!isNonEmptyString(body.articleTitle) || body.articleTitle.trim().length > 180) {
    res.status(400).json({ error: 'articleTitle requis (max 180 caractères)' })
    return
  }

  if (!isNonEmptyString(body.articleUrl) || !isValidUrl(body.articleUrl.trim())) {
    res.status(400).json({ error: 'articleUrl invalide (http/https requis)' })
    return
  }

  if (!isNonEmptyString(body.reportReason) || body.reportReason.trim().length > 500) {
    res.status(400).json({ error: 'reportReason requis (max 500 caractères)' })
    return
  }

  const aiUsageType = body.aiUsageType
  if (aiUsageType !== 'suspected' && aiUsageType !== 'declared' && aiUsageType !== 'generated' && aiUsageType !== 'unknown') {
    res.status(400).json({ error: 'aiUsageType invalide' })
    return
  }

  const report: ReportRecord = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    siteName: body.siteName.trim(),
    articleTitle: body.articleTitle.trim(),
    articleUrl: body.articleUrl.trim(),
    reportReason: body.reportReason.trim(),
    aiUsageType,
    reporterName: sanitizeOptionalText(body.reporterName, 80),
    evidenceNotes: sanitizeOptionalText(body.evidenceNotes, 1000),
    status: 'pending',
  }

  const store = await readStore()
  const nextStore: ReportsStore = {
    ...store,
    updatedAt: new Date().toISOString(),
    reports: [report, ...store.reports],
  }

  await writeStore(nextStore)
  incrementStat('reportsSubmitted').catch(() => {})
  await syncFlaggedSites(report)
  res.status(201).json({ report })
})

export default router