import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const sections = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    title: 'Introduction',
    content: (
      <p>
        Le site <strong className="text-[#E6BA8F]">E-Alertés</strong> est un projet éducatif qui respecte la vie privée
        de ses utilisateurs. Cette page détaille notre politique en matière de collecte
        et de traitement des données personnelles, conformément au RGPD.
      </p>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Données collectées',
    badge: 'Aucune donnée personnelle',
    content: (
      <>
        <p>
          Ce site ne collecte <strong className="text-[#E6BA8F]">aucune donnée personnelle</strong> au sens du RGPD.
          Aucun formulaire d'inscription, cookie de tracking ou outil d'analyse tiers n'est utilisé.
        </p>
        <p>
          Les scores obtenus lors du quiz sont stockés uniquement dans le navigateur
          de l'utilisateur (<code className="text-[#E6BA8F]/80 text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(230,186,143,0.1)' }}>localStorage</code>) et ne sont transmis à aucun serveur.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Cookies',
    badge: 'Aucun cookie publicitaire',
    content: (
      <p>
        Ce site n'utilise <strong className="text-[#E6BA8F]">aucun cookie</strong> publicitaire ou de suivi.
        Seuls des cookies techniques strictement nécessaires au fonctionnement
        du site peuvent être utilisés par l'hébergeur.
      </p>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Droits des utilisateurs',
    content: (
      <>
        <p>
          Conformément au <strong className="text-[#E6BA8F]">RGPD</strong>,
          vous disposez d'un droit d'accès, de rectification et de suppression
          de vos données personnelles.
        </p>
        <p>
          Étant donné qu'aucune donnée personnelle n'est collectée par ce site,
          ces droits ne trouvent pas à s'appliquer dans le cadre de son utilisation.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
      </svg>
    ),
    title: 'Modifications',
    content: (
      <p>
        Cette politique de confidentialité peut être mise à jour à tout moment.
        Toute modification sera reflétée sur cette page.
      </p>
    ),
  },
]

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] text-[var(--color-primary)]">
      {/* Hero compact */}
      <div className="relative overflow-hidden">
        {/* Blobs décoratifs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E6BA8F 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #933600 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--color-primary)]/50 mb-8">
            <Link to="/" className="hover:text-[#E6BA8F] transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[#E6BA8F]">Politique de confidentialité</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl"
              style={{ background: 'rgba(230,186,143,0.12)', border: '1px solid rgba(230,186,143,0.2)' }}
            >
              <svg className="w-6 h-6 text-[#E6BA8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)]">
              Confidentialité
            </h1>
          </div>
          <p className="text-[var(--color-primary)]/60 text-base max-w-xl leading-relaxed">
            Comment nous protégeons vos données et respectons votre vie privée sur E-Alertés.
          </p>
        </div>
      </div>

      {/* Séparateur */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(230,186,143,0.3), transparent)' }} />
      </div>

      {/* Sections */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <article
              key={section.title}
              className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background: 'rgba(255,240,204,0.04)',
                border: '1px solid rgba(230,186,143,0.1)',
                animation: `fadeSlideUp 0.5s ease-out ${i * 0.08}s both`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(230,186,143,0.06), transparent 60%)' }}
              />

              <div className="relative flex gap-4 md:gap-6">
                <div
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-[#E6BA8F]"
                  style={{ background: 'rgba(230,186,143,0.08)', border: '1px solid rgba(230,186,143,0.12)' }}
                >
                  {section.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-lg font-semibold text-[#E6BA8F] tracking-tight">{section.title}</h2>
                    {'badge' in section && section.badge && (
                      <span
                        className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full text-green-300"
                        style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                      >
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-[var(--color-primary)]/75 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Date de mise à jour */}
        <div className="mt-12 text-center">
          <span
            className="inline-block text-xs text-[var(--color-primary)]/40 px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,240,204,0.04)', border: '1px solid rgba(230,186,143,0.08)' }}
          >
            Dernière mise à jour : mars 2026
          </span>
        </div>
      </main>

      <Footer />
    </div>
  )
}
