import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const sections = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-3.5-2L14 21l-3.5-2L7 21l-3.5-2L3 21Z" />
      </svg>
    ),
    title: 'Éditeur du site',
    content: (
      <>
        <p>
          Ce site est un projet éducatif réalisé dans le cadre de la <strong className="text-[#E6BA8F]">Semaine Spéciale 2026</strong>,
          en partenariat entre <strong className="text-[#E6BA8F]">Capgemini</strong> et <strong className="text-[#E6BA8F]">Sup de Vinci</strong>.
        </p>
        <p>Il est édité à titre non commercial et à des fins pédagogiques uniquement.</p>
      </>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
      </svg>
    ),
    title: 'Hébergement',
    content: (
      <p>
        Le site est hébergé par <strong className="text-[#E6BA8F]">Vercel Inc.</strong><br />
        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
      </p>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    title: 'Propriété intellectuelle',
    content: (
      <>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, illustrations, code source)
          sont la propriété de leurs auteurs respectifs. Toute reproduction est soumise à autorisation préalable.
        </p>
        <p>
          Les images utilisées dans les exemples comparatifs sont fournies à titre éducatif
          pour illustrer les techniques de désinformation par l'intelligence artificielle.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
    title: 'Responsabilité',
    content: (
      <p>
        Les informations fournies sur ce site le sont à titre indicatif et pédagogique.
        Les auteurs ne sauraient être tenus responsables des erreurs, d'une absence
        de disponibilité des informations ou de la présence de virus sur le site.
      </p>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Contact',
    content: (
      <p>
        Pour toute question relative au site, vous pouvez nous contacter via
        le dépôt GitHub du projet.
      </p>
    ),
  },
]

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] text-[var(--color-primary)]">
      {/* Hero compact */}
      <div className="relative overflow-hidden">
        {/* Blob décoratif */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E6BA8F 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #933600 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--color-primary)]/50 mb-8">
            <Link to="/" className="hover:text-[#E6BA8F] transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[#E6BA8F]">Mentions légales</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl"
              style={{ background: 'rgba(230,186,143,0.12)', border: '1px solid rgba(230,186,143,0.2)' }}
            >
              <svg className="w-6 h-6 text-[#E6BA8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)]">
              Mentions légales
            </h1>
          </div>
          <p className="text-[var(--color-primary)]/60 text-base max-w-xl leading-relaxed">
            Informations relatives à l'édition, l'hébergement et les conditions d'utilisation du site E-Alertés.
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
                  <h2 className="text-lg font-semibold text-[#E6BA8F] mb-3 tracking-tight">{section.title}</h2>
                  <div className="space-y-2 text-sm text-[var(--color-primary)]/75 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
