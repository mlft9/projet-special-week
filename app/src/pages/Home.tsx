import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BurgerMenu from '../components/BurgerMenu'
import UserJourney from '../components/UserJourney'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stats = [
  { value: '10', label: 'questions' },
  { value: '5', label: 'exemples' },
  { value: '3', label: 'modules' },
]

const cards = [
  {
    step: 'ÉTAPE 01',
    icon: '🧠',
    title: 'Comprendre le contexte',
    description: 'Identifie la source, la date et l’intention du contenu avant de juger sa crédibilité.',
    link: '/comprendre',
    cta: 'Explorer',
  },
  {
    step: 'ÉTAPE 02',
    icon: '🔍',
    title: 'Vérifier les indices',
    description: 'Recoupe les faits, compare plusieurs médias et repère les incohérences visuelles ou textuelles.',
    link: '/jouer',
    cta: 'Analyser',
  },
  {
    step: 'ÉTAPE 03',
    icon: '⚡',
    title: 'Réagir avec méthode',
    description: 'Décide rapidement si l’information est fiable, douteuse ou manipulée puis justifie ton choix.',
    link: '/classement',
    cta: 'Passer à l’action',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('.animate-in', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        clearProps: 'transform,opacity',
      })

      gsap.to('.blob', {
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 2,
      })

      gsap.from('.content-animate', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.content-section',
          start: 'top 80%',
        },
      })

      gsap.from('.step-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.cards-grid',
          start: 'top 82%',
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <main ref={containerRef} className="font-sans">
      <section className="hero-section relative isolate min-h-screen flex flex-col items-center justify-center bg-[#933600] text-white" style={{ backgroundColor: '#933600' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="blob absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#FF9A3C]/30 blur-[100px]" />
          <div className="blob absolute -bottom-24 -left-24 h-[460px] w-[460px] rounded-full bg-[#FFE0B0]/25 blur-[120px]" />
        </div>

        <div className="absolute top-3 left-5 z-10">
          <BurgerMenu />
        </div>

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
          <div className="animate-in bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1 text-[10px] tracking-widest uppercase">
            CAPGEMINI x SUP DE VINCI 2026
          </div>

          <h1 className="animate-in mt-8 mb-4 max-w-2xl text-center text-6xl font-black leading-[1.1] text-white">
            T&apos;as le niveau pour détecter le{' '}
            <span className="font-serif italic font-medium text-amber-100">fake</span> ?
          </h1>

          <p className="animate-in max-w-md text-center text-sm leading-relaxed text-white/70">
            Le portail de sensibilisation à la désinformation par l&apos;IA
          </p>

          <div className="animate-in my-10 flex items-center gap-12">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-60">
                    {stat.label}
                  </span>
                </div>

                {index < stats.length - 1 && (
                  <div className="h-10 w-[1px] bg-white/20" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/jouer')}
              className="animate-in bg-[#FDF6E3] text-[#933600] px-10 py-4 rounded-full font-bold flex items-center gap-3"
              style={{ color: '#933600' }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.5 9.5h11a4 4 0 0 1 3.82 5.18l-.53 1.75a2.5 2.5 0 0 1-2.39 1.77h-1.66a1.5 1.5 0 0 1-1.34-.83l-.62-1.23a1.5 1.5 0 0 0-1.34-.83h-2.88a1.5 1.5 0 0 0-1.34.83l-.62 1.23a1.5 1.5 0 0 1-1.34.83H5.6a2.5 2.5 0 0 1-2.39-1.77l-.53-1.75A4 4 0 0 1 6.5 9.5Z" />
                <path d="M8 12.5v3" />
                <path d="M6.5 14h3" />
                <path d="M16.5 12.75h.01" />
                <path d="M18.5 14.75h.01" />
              </svg>
              Jouer
            </button>

            <button
              type="button"
              onClick={() => navigate('/comprendre')}
              className="animate-in border border-white/30 px-10 py-4 rounded-full font-medium"
            >
              Comprendre
            </button>
          </div>
        </div>

        <div
          className="hero-wave pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-[#FDF6E3]"
          aria-hidden="true"
        >
          <svg
            className="hero-wave-svg relative block h-[120px] w-[calc(130%+1.3px)]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-current"
              d="M0,40 C180,120 360,0 540,45 C720,90 900,150 1200,70 L1200,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      <section className="content-section bg-[#FDF6E3] py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="content-animate mb-4 text-4xl font-black text-[#2a1a0e]">
            Comment ça marche ?
          </h2>

          <p className="content-animate mb-16 text-lg text-gray-500">
            Trois étapes pour devenir un expert de l&apos;esprit critique
          </p>
        </div>

        <div className="cards-grid mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {cards.map((card) => (
            <article
              key={card.step}
              className="step-card bg-white rounded-[2.5rem] p-10 shadow-sm border border-black/5 flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C17E61]">
                {card.step}
              </div>

              <div className="mb-6 text-5xl leading-none" aria-hidden="true">
                {card.step === 'ÉTAPE 01' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#933600"
                    className="h-12 w-12"
                  >
                    <path d="M323-160q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188l-57-100q-2-5-3.5-10t-1.5-10q0-4 5-20l57-100h104l40-80h68v-40h-92l-40 80h-58l78-139q5-10 14.5-15.5T323-800h97q17 0 28.5 11.5T460-760v160h-60l-40 40h100v120h-88l-40-80h-92l-40 40h108l40 80h112v200q0 17-11.5 28.5T420-160h-97Zm217 0q-17 0-28.5-11.5T500-200v-200h112l40-80h108l-40-40h-92l-40 80h-88v-120h100l-40-40h-60v-160q0-17 11.5-28.5T540-800h97q11 0 20.5 5.5T672-779l78 139h-58l-40-80h-92v40h68l40 80h104l57 100q2 5 3.5 10t1.5 10q0 4-5 20l-57 100H668l-40 80h-68v40h92l40-80h58l-78 139q-5 10-14.5 15.5T637-160h-97Z" />
                  </svg>
                ) : card.step === 'ÉTAPE 02' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#933600"
                    className="h-12 w-12"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                ) : card.step === 'ÉTAPE 03' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#933600"
                    className="h-12 w-12"
                  >
                    <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
                  </svg>
                ) : (
                  card.icon
                )}
              </div>

              <h3 className="mb-3 text-2xl font-bold text-[#2a1a0e]">{card.title}</h3>

              <p className="mb-8 text-gray-600 leading-relaxed">{card.description}</p>

              <Link
                to={card.link}
                className="mt-auto inline-flex items-center gap-2 text-sm font-extrabold text-[#933600]"
              >
                {card.cta}
                <span className="font-bold">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <UserJourney />
    </main>
  )
}
