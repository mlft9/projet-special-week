import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const stats = [
  { value: '10', label: 'questions' },
  { value: '5', label: 'exemples' },
  { value: '3', label: 'modules' },
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
      })

      gsap.to('.blob', {
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 2,
      })
    },
    { scope: containerRef },
  )

  return (
    <main
      ref={containerRef}
      className="relative isolate min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#943D15] font-sans text-white"
    >
      <div className="blob absolute -top-8 right-[-5rem] z-0 h-[460px] w-[460px] rounded-full bg-white/12 blur-[95px] pointer-events-none" />
      <div className="blob absolute bottom-[-4rem] left-[-3rem] z-0 h-[390px] w-[390px] rounded-full bg-[#FFD8B8]/20 blur-[110px] pointer-events-none" />

      <button
        type="button"
        aria-label="Ouvrir le menu"
        className="absolute top-8 left-8 z-10 bg-white p-2.5 rounded-xl shadow-lg"
      >
        <span className="block h-0.5 w-6 rounded-full bg-[#943D15]" />
        <span className="mt-1.5 block h-0.5 w-6 rounded-full bg-[#943D15]" />
        <span className="mt-1.5 block h-0.5 w-6 rounded-full bg-[#943D15]" />
      </button>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
        <div className="animate-in bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1 text-[10px] tracking-widest uppercase">
          CAPGEMINI x SUP DE VINCI 2026
        </div>

        <h1 className="animate-in mt-8 mb-4 max-w-2xl text-center text-6xl font-black leading-[1.1] text-white">
          T&apos;as le niveau pour détecter le{' '}
          <span className="font-serif italic font-medium text-amber-100">fake</span> ?
        </h1>

        <p className="animate-in max-w-md text-center text-sm leading-relaxed text-white/70">
          Apprends à repérer la désinformation, teste tes réflexes et mesure ton esprit critique face aux contenus générés par l&apos;IA.
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
            className="animate-in bg-[#FDF6E3] text-[#943D15] px-10 py-4 rounded-full font-bold flex items-center gap-3"
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
    </main>
  )
}
