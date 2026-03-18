import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    <section ref={sectionRef} className="bg-[#FCF4E4] px-3 pb-16 sm:px-4 sm:pb-24">
      <div className="mx-auto w-[97%] max-w-none">
        <div className="journey-shell relative min-h-[620px] overflow-hidden rounded-[2rem] bg-[#6A62E4] px-5 py-8 text-white sm:min-h-[650px] sm:rounded-[2.5rem] sm:px-8 sm:py-10 md:min-h-[700px] lg:min-h-[600px] lg:rounded-[3rem] lg:p-12">
          <img
            src={stars}
            alt=""
            aria-hidden="true"
            className="journey-stars pointer-events-none absolute left-1/2 top-[34%] z-10 w-[220px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-85 sm:top-[36%] sm:w-[280px] md:left-[14%] md:top-[42%] md:w-[320px] md:-translate-x-0 lg:left-10 lg:top-1/2 lg:w-[420px]"
          />

          <svg
            aria-hidden="true"
            className="journey-ribbon pointer-events-none absolute left-1/2 top-[58%] z-0 w-[260%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90 sm:top-[57%] sm:w-[200%] md:top-[54%] md:w-[160%] lg:top-1/2 lg:w-[115%]"
          />

          <div className="relative z-10 max-w-sm">
            <h2 className="mb-6 text-center text-2xl font-display font-bold text-[#F8F3FF] sm:mb-8 sm:text-3xl md:ml-8 md:text-left">
              Ton parcours en 3 étapes
            </h2>
          </div>

          <div className="relative z-10 mt-12 grid gap-24 sm:mt-14 sm:gap-28 md:grid-cols-2 lg:mt-8 lg:block lg:min-h-[440px] lg:gap-0">
            <p className="journey-step mx-auto max-w-xs text-sm leading-relaxed sm:text-base md:col-start-2 md:mx-0 md:justify-self-end lg:absolute lg:right-10 lg:top-3">
              1. Découvre comment fonctionne l’IA et pourquoi elle peut être utilisée pour désinformer.
            </p>

            <p className="journey-step mx-auto max-w-xs text-sm leading-relaxed sm:text-base md:col-span-2 md:max-w-sm md:justify-self-center lg:absolute lg:left-[50%] lg:top-[30%] lg:max-w-xs lg:translate-x-0">
              2. Analyse des exemples concrets d’images, vidéos ou articles générés par l’IA.
            </p>

            <p className="journey-step mt-6 sm:mt-8 md:mt-10 lg:mt-0 mx-auto max-w-xs text-sm leading-relaxed sm:text-base md:col-start-2 md:mx-0 md:justify-self-end lg:absolute lg:right-6 lg:bottom-4">
              3. Mets tes connaissances à l’épreuve avec des quiz et des défis interactifs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}