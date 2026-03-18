const STATIC_SITES_FILE = 'flagged-sites.json'
const STORAGE_KEY = 'truthsense.dynamicDomains'
const STORAGE_LAST_SYNC_KEY = 'truthsense.lastSync'
const ALARM_NAME = 'truthsense-sync-reports'

const alertedByTab = new Map()

function normalizeDomain(value) {
  if (!value || typeof value !== 'string') return ''
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
}

function isHttpUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://')
}

function getHost(url) {
  try {
    const parsed = new URL(url)
    return normalizeDomain(parsed.hostname)
  } catch {
    return ''
  }
}

function domainMatches(host, watchedDomain) {
  return host === watchedDomain || host.endsWith(`.${watchedDomain}`)
}

async function getStaticDomains() {
  try {
    const response = await fetch(chrome.runtime.getURL(STATIC_SITES_FILE))
    if (!response.ok) return []
    const payload = await response.json()
    if (!Array.isArray(payload?.domains)) return []
    return payload.domains.map(normalizeDomain).filter(Boolean)
  } catch {
    return []
  }
}

async function getDynamicDomains() {
  const stored = await chrome.storage.local.get(STORAGE_KEY)
  if (!Array.isArray(stored[STORAGE_KEY])) return []
  return stored[STORAGE_KEY].map(normalizeDomain).filter(Boolean)
}

async function getAllWatchedDomains() {
  const [staticDomains, dynamicDomains] = await Promise.all([getStaticDomains(), getDynamicDomains()])
  return [...new Set([...staticDomains, ...dynamicDomains])]
}

async function syncReportsFromApi() {
  try {
    const response = await fetch('http://localhost:3001/api/reports', { cache: 'no-store' })
    if (!response.ok) return

    const payload = await response.json()
    const reports = Array.isArray(payload?.reports) ? payload.reports : []

    const domains = reports
      .flatMap((report) => {
        const fromUrl = normalizeDomain(report?.articleUrl)
        const fromSiteName = normalizeDomain(report?.siteName)
        return [fromUrl, fromSiteName]
      })
      .filter(Boolean)

    const uniqueDomains = [...new Set(domains)]

    await chrome.storage.local.set({
      [STORAGE_KEY]: uniqueDomains,
      [STORAGE_LAST_SYNC_KEY]: new Date().toISOString(),
    })
  } catch {
    // Backend non disponible : on garde la liste locale statique
  }
}

async function notifyIfReported(tabId, url) {
  if (!url || !isHttpUrl(url)) {
    await chrome.action.setBadgeText({ text: '', tabId })
    return
  }

  const host = getHost(url)
  if (!host) return

  const watchedDomains = await getAllWatchedDomains()
  const match = watchedDomains.find((domain) => domainMatches(host, domain))

  if (!match) {
    alertedByTab.delete(tabId)
    await chrome.action.setBadgeText({ text: '', tabId })
    return
  }

  await chrome.action.setBadgeBackgroundColor({ color: '#933600', tabId })
  await chrome.action.setBadgeText({ text: '!', tabId })

  if (alertedByTab.get(tabId) === match) return
  alertedByTab.set(tabId, match)

  await chrome.notifications.create(`truthsense-${tabId}-${Date.now()}`, {
    type: 'basic',
    iconUrl: 'icon-128.png',
    title: '⚠️ Site signalé',
    message: `Attention : ${host} a été signalé. Vérifiez bien les sources avant de partager.`,
    priority: 2,
  })
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 5 })
  await syncReportsFromApi()
})

chrome.runtime.onStartup.addListener(async () => {
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 5 })
  await syncReportsFromApi()
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return
  await syncReportsFromApi()
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const nextUrl = changeInfo.url ?? tab.url
  if (!nextUrl) return
  await notifyIfReported(tabId, nextUrl)
})

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId)
  if (!tab.url) return
  await notifyIfReported(tabId, tab.url)
})

chrome.tabs.onRemoved.addListener((tabId) => {
  alertedByTab.delete(tabId)
})