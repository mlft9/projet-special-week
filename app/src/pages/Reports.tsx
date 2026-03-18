import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'

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
  schemaVersion: string
  updatedAt: string
  reports: ReportRecord[]
}

const usageLabels: Record<AiUsageType, string> = {
  suspected: 'IA suspectée',
  declared: 'IA déclarée par le site',
  generated: 'Contenu probablement généré',
  unknown: 'Niveau inconnu',
}

const EMPTY_FORM = {
  siteName: '',
  articleTitle: '',
  articleUrl: '',
  reportReason: '',
  aiUsageType: 'suspected' as AiUsageType,
  reporterName: '',
  evidenceNotes: '',
}

export default function Reports() {
  const [store, setStore] = useState<ReportsStore>({ schemaVersion: '1.0.0', updatedAt: '', reports: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)

  const latestReports = useMemo(() => store.reports.slice(0, 12), [store.reports])

  async function loadReports() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/reports')
      if (!response.ok) throw new Error('Impossible de charger les signalements')
      const payload = await response.json() as ReportsStore
      setStore(payload)
    } catch {
      setError('Impossible de charger les signalements pour le moment.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadReports()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json() as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error ?? 'Échec de l’envoi')
      }

      setForm(EMPTY_FORM)
      setSuccess('Signalement enregistré. Merci pour ta vigilance 👏')
      await loadReports()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Erreur inattendue')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="bg-[var(--color-primary)] min-h-screen">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-10">
        <span
          className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium tracking-wide text-[var(--color-secondary)] mb-4"
          style={{
            background: 'rgba(147, 54, 0, 0.06)',
            border: '1px solid rgba(147, 54, 0, 0.12)',
          }}
        >
          Veille citoyenne
        </span>
        <h1 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] text-[#2a1a0e]">
          Signaler un site ou un article
          <br />
          <span className="italic font-medium text-[var(--color-secondary)]">assisté par l’IA</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6b5c44]">
          Cette page permet de centraliser les contenus suspects pour aider les autres visiteurs à rester vigilants.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-7 px-6 pb-20 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#e6d4a8] bg-[#fff8e8] p-6">
          <h2 className="mb-4 font-[var(--font-display)] text-2xl text-[#2a1a0e]">Nouveau signalement</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              required
              maxLength={120}
              value={form.siteName}
              onChange={event => setForm(prev => ({ ...prev, siteName: event.target.value }))}
              className="w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
              placeholder="Nom du site (ex: actualites-x.com)"
            />
            <input
              required
              maxLength={180}
              value={form.articleTitle}
              onChange={event => setForm(prev => ({ ...prev, articleTitle: event.target.value }))}
              className="w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
              placeholder="Titre de l'article"
            />
            <input
              required
              type="url"
              value={form.articleUrl}
              onChange={event => setForm(prev => ({ ...prev, articleUrl: event.target.value }))}
              className="w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
              placeholder="https://..."
            />

            <select
              value={form.aiUsageType}
              onChange={event => setForm(prev => ({ ...prev, aiUsageType: event.target.value as AiUsageType }))}
              className="w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
            >
              <option value="suspected">IA suspectée</option>
              <option value="declared">IA déclarée par le site</option>
              <option value="generated">Contenu probablement généré</option>
              <option value="unknown">Niveau inconnu</option>
            </select>

            <textarea
              required
              maxLength={500}
              value={form.reportReason}
              onChange={event => setForm(prev => ({ ...prev, reportReason: event.target.value }))}
              className="min-h-[110px] w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
              placeholder="Pourquoi ce contenu te semble problématique ?"
            />

            <textarea
              maxLength={1000}
              value={form.evidenceNotes}
              onChange={event => setForm(prev => ({ ...prev, evidenceNotes: event.target.value }))}
              className="min-h-[96px] w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
              placeholder="Indices observés (optionnel)"
            />

            <input
              maxLength={80}
              value={form.reporterName}
              onChange={event => setForm(prev => ({ ...prev, reporterName: event.target.value }))}
              className="w-full rounded-xl border border-[#e6d4a8] bg-white px-4 py-3 text-sm"
              placeholder="Ton prénom (optionnel)"
            />

            {error && <p className="text-sm font-medium text-[#9a2c2c]">{error}</p>}
            {success && <p className="text-sm font-medium text-[#296b2e]">{success}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-bold text-white disabled:opacity-70"
            >
              {saving ? 'Envoi en cours…' : 'Envoyer le signalement'}
            </button>
          </form>
        </article>

        <article className="rounded-3xl border border-[#e6d4a8] bg-[#fff8e8] p-6">
          <h2 className="mb-1 font-[var(--font-display)] text-2xl text-[#2a1a0e]">Signalements récents</h2>
          <p className="mb-4 text-sm text-[#6b5c44]">JSON v{store.schemaVersion} · {store.reports.length} entrée{store.reports.length > 1 ? 's' : ''}</p>

          {loading ? (
            <p className="text-sm text-[#6b5c44]">Chargement…</p>
          ) : latestReports.length === 0 ? (
            <p className="text-sm text-[#6b5c44]">Aucun signalement pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {latestReports.map(report => (
                <div key={report.id} className="rounded-2xl border border-[#e6d4a8] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">{usageLabels[report.aiUsageType]}</p>
                  <a
                    href={report.articleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm font-bold text-[#2a1a0e] hover:underline"
                  >
                    {report.articleTitle}
                  </a>
                  <p className="text-xs text-[#6b5c44]">{report.siteName} · {new Date(report.submittedAt).toLocaleDateString('fr-FR')}</p>
                  <p className="mt-1 text-sm text-[#2a1a0e]">{report.reportReason}</p>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <Footer />
    </main>
  )
}