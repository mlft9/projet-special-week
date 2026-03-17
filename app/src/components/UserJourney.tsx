import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ruban from '../assets/ruban.png'
import stars from '../assets/stars.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function UserJourney() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      gsap.from('.journey-ribbon', {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
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
    <section ref={sectionRef} className="bg-[#FDF6E3] px-4 pb-24">
      <div className="mx-auto w-[97%] max-w-none">
        <div className="journey-shell relative min-h-[600px] overflow-hidden rounded-[3rem] bg-[#7B7BFF] p-12 text-white">
          <img
            src={stars}
            alt=""
            aria-hidden="true"
            className="journey-stars pointer-events-none absolute left-10 top-1/2 z-10 w-[420px] max-w-none -translate-y-1/2 opacity-100"
          />

          <img
            src={ruban}
            alt=""
            aria-hidden="true"
            className="journey-ribbon pointer-events-none absolute left-1/2 top-1/2 z-0 w-[115%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-95"
          />

          <div className="relative z-10 max-w-sm">
            <h2 className="text-3xl font-bold mb-8 ml-8 text-amber-50">Ton parcours en 3 étapes</h2>
          </div>

          <div className="relative z-10 mt-8 min-h-[440px]">
            <p className="journey-step max-w-xs text-base leading-relaxed md:absolute md:right-10 md:top-3">
              1. Découvre comment fonctionne l’IA et pourquoi elle peut être utilisée pour désinformer.
            </p>

            <p className="journey-step mt-8 max-w-xs text-base leading-relaxed md:absolute md:left-[50%] md:top-[30%] md:mt-0">
              2. Analyse des exemples concrets d’images, vidéos ou articles générés par l’IA.
            </p>

            <p className="journey-step mt-8 max-w-xs text-base leading-relaxed md:absolute md:right-6 md:bottom-4 md:mt-0">
              3. Mets tes connaissances à l’épreuve avec des quiz et des défis interactifs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}