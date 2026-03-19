import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import stars from '../assets/stars.png?format=webp&quality=80'
import ruban from '../assets/ruban.png?format=webp&quality=75'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const steps = [
  {
    label: 'Étape 1',
    text: "Découvre comment fonctionne l'IA et pourquoi elle peut être utilisée pour désinformer.",
  },
  {
    label: 'Étape 2',
    text: "Analyse des exemples concrets d'images, vidéos ou articles générés par l'IA.",
  },
  {
    label: 'Étape 3',
    text: "Mets tes connaissances à l'épreuve avec des quiz et des défis interactifs.",
  },
]

export default function UserJourney() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      gsap.from('.journey-ribbon', {
        scale: 0.96,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.journey-shell',
          start: 'top 80%',
        },
      })

      gsap.from('.journey-step', {
        y: 36,
        scale: 0.96,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.journey-shell',
          start: 'top 75%',
        },
      })

      gsap.to('.journey-stars', {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="bg-[#FCF4E4] px-3 pb-16 sm:px-4 sm:pb-24">
      <div className="mx-auto w-[97%] max-w-none">
        <div className="journey-shell relative overflow-hidden rounded-[2rem] bg-[#6A62E4] px-5 py-8 text-white sm:rounded-[2.5rem] sm:px-8 sm:py-10 lg:min-h-[600px] lg:rounded-[3rem] lg:p-12">

          {/* Stars — visibles uniquement sur grand écran */}
          <img
            src={stars}
            alt=""
            aria-hidden="true"
            className="journey-stars pointer-events-none absolute hidden lg:block left-10 top-1/2 z-10 w-[420px] max-w-none opacity-85"
          />

          {/* Ruban — masqué sur mobile/tablette, plein sur lg+ */}
          <img
            src={ruban}
            alt=""
            aria-hidden="true"
            className="journey-ribbon pointer-events-none absolute left-1/2 -translate-x-1/2 z-[1] max-w-none hidden lg:block lg:top-1/2 lg:w-[120%] lg:-translate-y-1/2"
          />

          {/* Titre */}
          <div className="relative z-10">
            <h2 className="mb-6 text-center text-3xl font-display font-bold text-[#F8F3FF] sm:text-4xl lg:mb-0 lg:ml-8 lg:text-left lg:text-5xl">
              Ton parcours en 3 étapes
            </h2>
          </div>

          {/* Layout mobile + tablette (< lg) : cartes empilées */}
          <div className="relative z-10 flex flex-col gap-3 pb-6 lg:hidden">
            {steps.map((step) => (
              <div
                key={step.label}
                className="journey-step rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-sm"
              >
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-white/55">
                  {step.label}
                </span>
                <p className="text-base leading-relaxed text-white/95 sm:text-lg">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Layout desktop (lg+) : positions absolues sur le ruban */}
          <div className="relative z-10 mt-8 hidden min-h-[440px] lg:block">
            <p className="journey-step absolute right-10 top-3 max-w-sm text-lg leading-relaxed lg:text-xl">
              1. Découvre comment fonctionne l'IA et pourquoi elle peut être utilisée pour désinformer.
            </p>
            <p className="journey-step absolute left-[50%] top-[30%] max-w-sm text-lg leading-relaxed lg:text-xl">
              2. Analyse des exemples concrets d'images, vidéos ou articles générés par l'IA.
            </p>
            <p className="journey-step absolute bottom-4 right-6 max-w-sm text-lg leading-relaxed lg:text-xl">
              3. Mets tes connaissances à l'épreuve avec des quiz et des défis interactifs.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
