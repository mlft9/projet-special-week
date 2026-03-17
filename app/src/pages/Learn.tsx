import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import examples from '../data/examples.json'
import ExampleCard from '../components/ExampleCard'
import type { Example } from '../types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const typedExamples = examples as Example[]
const textExamples = typedExamples.filter(e => e.type !== 'comparison')
const comparisonExamples = typedExamples.filter(e => e.type === 'comparison')
const lastTextIsOdd = textExamples.length % 2 !== 0

const sections = [
  {
    id: 'ia',
    title: "Qu'est-ce qu'une IA ?",
    content:
      "L'intelligence artificielle désigne des systèmes capables d'effectuer des tâches qui nécessitent habituellement l'intelligence humaine : reconnaître des images, générer du texte ou prendre des décisions. Les modèles actuels, comme les grands modèles de langage (LLM), apprennent à partir de quantités massives de données pour produire des réponses statistiquement probables — sans réellement comprendre ce qu'ils écrivent.",
  },
  {
    id: 'hallucinations',
    title: 'Les hallucinations',
    content:
      "Une hallucination, en IA, c'est quand un modèle génère une information fausse avec une assurance totale. Il peut inventer des citations, des études scientifiques ou des faits historiques qui n'existent pas. Cela se produit parce que l'IA prédit le mot suivant le plus probable, sans vérifier la véracité de ce qu'elle produit. C'est pourquoi il est crucial de toujours recouper les informations générées par une IA.",
  },
  {
    id: 'deepfakes',
    title: 'Les deepfakes',
    content:
      "Les deepfakes sont des contenus visuels ou audio générés ou modifiés par l'IA pour imiter de vraies personnes. Ils peuvent reproduire le visage, la voix ou les gestes de quelqu'un de manière très convaincante. Utilisés à des fins de désinformation, ils représentent un défi majeur pour l'esprit critique. Apprendre à repérer les artefacts — asymétries, textures trop lisses, incohérences de lumière — est devenu une compétence essentielle.",
  },
]

export default function Learn() {
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set())
  const galleryRef = useRef<HTMLDivElement | null>(null)

  const handleReveal = (id: number) => {
    setRevealedIds(prev => new Set(prev).add(id))
  }

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
    <main className="relative min-h-screen bg-[var(--color-primary)]">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-6 text-center">
        <span
          className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-secondary)] mb-5"
          style={{ background: 'rgba(255, 255, 255, 0.5)' }}
        >
          Module 1 — Théorie
        </span>
        <h1 className="font-[var(--font-display)] text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-[1.1] text-[#2a1a0e]">
          Comprendre pour mieux
          <br />
          <span className="italic font-medium text-[var(--color-secondary)]">décrypter</span>
        </h1>
        {/* Ligne décorative */}
        <div className="mx-auto mt-5 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#6b5c44]">
          Avant de jouer, il faut savoir contre quoi on joue. Découvre comment l'IA
          génère du contenu et apprends à repérer les signaux d'alerte.
        </p>
      </section>

      {/* ── Sections pédagogiques ── */}
      <section className="mx-auto max-w-5xl px-6 pt-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section, i) => (
            <article
              key={section.id}
              className="rounded-3xl backdrop-blur-sm p-8 flex flex-col gap-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                animation: `fadeSlideUp 0.6s ${i * 0.12}s both ease-out`,
              }}
            >
              <h2 className="font-[var(--font-display)] text-[1.3rem] font-bold text-[var(--color-secondary)]">
                {section.title}
              </h2>
              <div className="h-[2px] w-10 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.15)' }} />
              <p className="text-[14px] leading-[1.75] text-[var(--color-text)]">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Vague SVG séparatrice ── */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[70px]">
          <path
            d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,50 L1440,100 L0,100Z"
            fill="#f5e6c8"
          />
        </svg>
      </div>

      {/* ── Galerie d'exemples ── */}
      <section ref={galleryRef} className="pb-20" style={{ background: '#f5e6c8' }}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-secondary)] mb-4">
              Mise en pratique
            </span>
            <h2 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[#2a1a0e]">
              Galerie d'exemples
            </h2>
            {/* Ligne décorative */}
            <div className="mx-auto mt-4 h-[2px] w-16 rounded-full" style={{ background: 'rgba(147, 54, 0, 0.2)' }} />
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#6b5c44]">
              Entraîne-toi à repérer le vrai du faux. Clique pour révéler les indices.
            </p>
          </div>

          {/* Grille hybride : textes sur 2 colonnes, dernier impair = pleine largeur */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
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

          {/* Duels d'images : pleine largeur */}
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
    </main>
  )
}
