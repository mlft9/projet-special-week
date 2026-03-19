import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import ExampleCard from '../components/ExampleCard'
import type { Example } from '../types'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const sections = [
  {
    id: 'ia',
    title: "Qu'est-ce qu'une IA ?",
    tag: '#Calcul',
    content:
      "Un algorithme qui prédit la suite, comme le correcteur de ton téléphone, mais en beaucoup plus puissant. Elle ne comprend pas, elle calcule !",
  },
  {
    id: 'hallucinations',
    title: 'Les hallucinations',
    tag: '#Fake',
    content:
      "L'IA déteste dire \"je ne sais pas\". Alors, elle invente avec une assurance totale. Toujours vérifier ses sources !",
  },
  {
    id: 'deepfakes',
    title: 'Les deepfakes',
    tag: '#Arnaque',
    content:
      "Des trucages ultra-réalistes créés par l'IA. Ton meilleur outil ? Ton \u0153il de détective pour repérer les petits bugs visuels.",
  },
]

export default function Learn() {
  const [examples, setExamples] = useState<Example[]>([])
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set())
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetch('/api/examples')
      .then(r => r.json())
      .then((data: Example[]) => setExamples(data))
      .catch(() => {})
  }, [])

  const textExamples = examples.filter(e => e.type !== 'comparison')
  const comparisonExamples = examples.filter(e => e.type === 'comparison')
  const lastTextIsOdd = textExamples.length % 2 !== 0

  const handleReveal = (id: number) => {
    setRevealedIds(prev => new Set(prev).add(id))
  }

  /* ── Animations premier écran ── */
  useGSAP(
    () => {
      /* Blobs : mouvement lent aléatoire */
      document.querySelectorAll('.learn-blob').forEach((blob, i) => {
        gsap.to(blob, {
          x: (i % 2 === 0) ? 60 : -50,
          y: (i % 2 === 0) ? -30 : 40,
          scale: 1.15,
          duration: 12 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 2,
        })
      })

      /* Floating elements */
      document.querySelectorAll('.float-el').forEach((el, i) => {
        gsap.to(el, {
          y: -10 + (i * 4),
          x: 6 - (i * 3),
          rotation: 8 - (i * 5),
          duration: 4 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.8,
        })
      })

      /* Theory cards float */
      document.querySelectorAll('.theory-card').forEach((card, i) => {
        gsap.to(card, {
          y: -4,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        })
      })
    },
    { scope: heroRef },
  )

  /* ── Animations galerie ── */
  useGSAP(
    () => {
      document.querySelectorAll('.example-card-anim').forEach(card => {
        gsap.from(card, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        })
      })
    },
    { scope: galleryRef },
  )

  return (
    <main className="bg-[var(--color-primary)]">
      {/* ══ Premier écran : Hero + Théorie ══ */}
      <div ref={heroRef} className="relative flex flex-col md:h-screen md:max-h-screen overflow-hidden">

        {/* ── Dotted grid overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(147, 54, 0, 0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* ── Blobs dynamiques ── */}
        <div
          className="learn-blob pointer-events-none absolute -top-24 -right-20 z-0 h-[500px] w-[500px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(147, 54, 0, 0.12), rgba(230, 212, 168, 0.08))' }}
        />
        <div
          className="learn-blob pointer-events-none absolute -bottom-16 -left-24 z-0 h-[450px] w-[450px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(230, 212, 168, 0.2), rgba(147, 54, 0, 0.06))' }}
        />
        <div
          className="learn-blob pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 z-0 h-[350px] w-[350px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(147, 54, 0, 0.05), transparent)' }}
        />

        {/* ── Floating SVG elements ── */}
        <svg className="float-el pointer-events-none absolute top-[15%] left-[8%] z-0" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="var(--color-secondary)" strokeWidth="1.5" opacity="0.12" />
        </svg>
        <svg className="float-el pointer-events-none absolute top-[60%] right-[10%] z-0" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="var(--color-secondary)" strokeWidth="1" opacity="0.1" />
          <circle cx="24" cy="24" r="8" stroke="var(--color-secondary)" strokeWidth="1" opacity="0.1" />
        </svg>
        <svg className="float-el pointer-events-none absolute top-[25%] right-[15%] z-0" width="36" height="36" viewBox="0 0 36 36" fill="none">
          <line x1="0" y1="18" x2="36" y2="18" stroke="var(--color-secondary)" strokeWidth="1" opacity="0.1" />
          <line x1="18" y1="0" x2="18" y2="36" stroke="var(--color-secondary)" strokeWidth="1" opacity="0.1" />
        </svg>
        <svg className="float-el pointer-events-none absolute bottom-[30%] left-[12%] z-0" width="44" height="28" viewBox="0 0 44 28" fill="none">
          <text x="0" y="22" fontSize="22" fontFamily="monospace" fill="var(--color-secondary)" opacity="0.1">{'{ }'}</text>
        </svg>

        {/* ── Hero ── */}
        <section className="relative z-10 shrink-0 mx-auto max-w-3xl px-6 pt-28 md:pt-32 pb-2 text-center">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium tracking-wide text-[var(--color-secondary)] mb-4"
            style={{
              background: 'rgba(147, 54, 0, 0.06)',
              border: '1px solid rgba(147, 54, 0, 0.12)',
            }}
          >
            Devenir un détective du numérique
          </span>
          <h1 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] text-[#2a1a0e]">
            Comprendre pour mieux
            <br />
            <span className="italic font-medium text-[var(--color-secondary)]">décrypter</span>
          </h1>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6b5c44]">
            Avant de jouer, il faut savoir contre quoi on joue. Découvre comment l'IA
            génère du contenu et apprends à repérer les signaux d'alerte.
          </p>
        </section>

        {/* ── Sections pédagogiques ── */}
        <section className="relative z-10 flex-1 min-h-0 mx-auto w-full max-w-5xl px-6 py-4 md:py-0 md:flex md:items-start md:pt-8">
          <div className="grid gap-5 md:grid-cols-3 w-full">
            {sections.map((section, i) => (
              <article
                key={section.id}
                className="theory-card relative rounded-3xl backdrop-blur-md p-5 flex flex-col gap-2.5 shadow-sm ring-1 ring-white/20 transition-shadow duration-300 hover:shadow-lg overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  animation: `fadeSlideUp 0.6s ${i * 0.12}s both ease-out`,
                }}
              >
                {/* Glow interne haut-gauche */}
                <div
                  className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)' }}
                />
                <h2 className="relative font-[var(--font-display)] text-[1.1rem] md:text-[1.15rem] font-bold text-[var(--color-secondary)]">
                  {section.title}
                </h2>
                <div className="h-[2px] w-10 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.15)' }} />
                <p className="relative text-[13px] leading-[1.65] text-[var(--color-text)]">
                  <span className="font-bold text-[var(--color-secondary)]">{section.tag} </span>
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Vague SVG ── */}
        <div className="relative z-10 shrink-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[50px]">
            <path
              d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,50 L1440,100 L0,100Z"
              fill="#f5e6c8"
            />
          </svg>
        </div>
      </div>

      {/* ══ Deuxième section : Galerie ══ */}
      <section ref={galleryRef} className="pb-20" style={{ background: '#f5e6c8' }}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-secondary)] mb-4">
              Mise en pratique
            </span>
            <h2 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[#2a1a0e]">
              Galerie d'exemples
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#6b5c44]">
              Entraîne-toi à repérer le vrai du faux. Clique pour révéler les indices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-7">
            {textExamples.map((example, i) => {
              const isLast = i === textExamples.length - 1
              return (
                <div
                  key={example.id}
                  className={`example-card-anim ${isLast && lastTextIsOdd ? 'md:col-span-2' : ''}`}
                >
                  <ExampleCard
                    example={example}
                    revealed={revealedIds.has(example.id)}
                    onReveal={() => handleReveal(example.id)}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {comparisonExamples.map(example => (
              <div key={example.id} className="example-card-anim">
                <ExampleCard
                  example={example}
                  revealed={revealedIds.has(example.id)}
                  onReveal={() => handleReveal(example.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/jouer"
            className="cta-shine inline-block rounded-full bg-[var(--color-secondary)] px-12 py-4 text-lg font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            Prêt pour le défi ? Lancer le Quiz
          </Link>
        </div>
      </section>

      {/* ── Footer wave ── */}
      <div className="w-full overflow-hidden leading-[0] rotate-180 -mt-px">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[35px]">
          <path
            d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,50 L1440,100 L0,100Z"
            fill="#f5e6c8"
          />
        </svg>
      </div>
      
      <Footer />
    </main>
  )
}
