import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import type { Example } from '../types'

interface Props {
  example: Example
  revealed: boolean
  onReveal: () => void
}

export default function ExampleCard({ example, revealed, onReveal }: Props) {
  if (example.type === 'comparison') {
    return <ComparisonCard example={example} revealed={revealed} onReveal={onReveal} />
  }
  return <TextCard example={example} revealed={revealed} onReveal={onReveal} />
}

/* ═══════════════════════════════════════════
   Text / Post Card
   ═══════════════════════════════════════════ */

function TextCard({ example, revealed, onReveal }: Props) {
  return (
    <div
      className="rounded-3xl backdrop-blur-sm p-8 flex flex-col gap-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
    >
      <div className="flex items-center gap-3">
        <TypeBadge type={example.type} />
        <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-text)]">
          {example.title}
        </h3>
      </div>

      <blockquote
        className="text-[15px] leading-[1.8] text-[var(--color-text)] rounded-2xl p-5 italic"
        style={{ background: 'rgba(255, 255, 255, 0.5)', borderLeft: '3px solid rgba(147, 54, 0, 0.15)' }}
      >
        {example.content}
      </blockquote>

      {!revealed ? (
        <button
          onClick={onReveal}
          className="self-start rounded-full border-2 border-[var(--color-secondary)] px-7 py-2.5 text-sm font-semibold text-[var(--color-secondary)] transition-all duration-200 hover:bg-[var(--color-secondary)] hover:text-white active:scale-95"
        >
          Fake ou réel ?
        </button>
      ) : (
        <AnimatedReveal>
          <RevealPanel
            isFake={example.isFake}
            clues={example.clues}
            explanation={example.explanation}
          />
        </AnimatedReveal>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Comparison Card (Duels d'images)
   ═══════════════════════════════════════════ */

function ComparisonCard({ example, revealed, onReveal }: Props) {
  // Ordre aléatoire calculé une seule fois et stocké en ref
  // (useRef ne se réinitialise jamais, contrairement à useMemo en Strict Mode)
  const swappedRef = useRef<boolean | null>(null)
  if (swappedRef.current === null) {
    swappedRef.current = Math.random() < 0.5
  }
  const swapped = swappedRef.current

  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null)
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!modalSrc) return
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalSrc(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [modalSrc])

  if (!example.images) return null

  const leftImage = swapped ? example.images.ai : example.images.real
  const rightImage = swapped ? example.images.real : example.images.ai
  const leftIsAi = swapped
  const rightIsAi = !swapped
  const leftClues = swapped ? example.images.cluesAi : example.images.cluesReal
  const rightClues = swapped ? example.images.cluesReal : example.images.cluesAi

  return (
    <div
      className="rounded-3xl backdrop-blur-sm p-9 flex flex-col gap-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
    >
      {modalSrc && createPortal(
        <div className="img-modal-overlay" onClick={() => setModalSrc(null)}>
          <img src={modalSrc} alt="Agrandissement" className="img-modal-img" />
          <button className="img-modal-close" aria-label="Fermer">✕</button>
        </div>,
        document.body
      )}

      <div className="flex items-center gap-3">
        <TypeBadge type={example.type} />
        <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-text)]">
          {example.title}
        </h3>
      </div>

      {example.objective && (
        <p
          className="text-[14px] leading-[1.7] text-[#6b5c44] rounded-2xl px-5 py-4"
          style={{ background: 'rgba(255, 255, 255, 0.5)', borderLeft: '3px solid rgba(147, 54, 0, 0.2)' }}
        >
          {example.objective}
        </p>
      )}

      <p className="text-[15px] leading-[1.7] text-[var(--color-text)]">{example.content}</p>

      {/* Duel d'images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-5">
        <ImagePanel
          src={leftImage}
          label="Image A"
          selected={selectedSide === 'left'}
          onClick={() => !revealed && setSelectedSide('left')}
          onZoom={setModalSrc}
          revealed={revealed}
          isAi={leftIsAi}
          clues={leftClues}
        />
        <ImagePanel
          src={rightImage}
          label="Image B"
          selected={selectedSide === 'right'}
          onClick={() => !revealed && setSelectedSide('right')}
          onZoom={setModalSrc}
          revealed={revealed}
          isAi={rightIsAi}
          clues={rightClues}
        />
      </div>

      {!revealed ? (
        <button
          onClick={onReveal}
          className="self-center rounded-full bg-[var(--color-secondary)] px-9 py-3 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
        >
          Révéler la réponse
        </button>
      ) : (
        <AnimatedReveal>
          <div className="rounded-2xl p-5" style={{ background: 'rgba(147, 54, 0, 0.06)' }}>
            <p className="text-[15px] leading-[1.75] text-[var(--color-text)]">
              <span className="font-semibold text-[var(--color-secondary)]">Explication : </span>
              {example.explanation}
            </p>
          </div>
        </AnimatedReveal>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Animated Reveal wrapper
   ═══════════════════════════════════════════ */

function AnimatedReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      )
    }
  }, [])

  return <div ref={ref}>{children}</div>
}

/* ═══════════════════════════════════════════
   Image Panel
   ═══════════════════════════════════════════ */

interface ImagePanelProps {
  src: string
  label: string
  selected: boolean
  onClick: () => void
  onZoom: (src: string) => void
  revealed: boolean
  isAi: boolean
  clues?: string[]
}

function ImagePanel({ src, label, selected, onClick, onZoom, revealed, isAi, clues }: ImagePanelProps) {
  const borderColor = revealed
    ? isAi ? 'rgba(239, 68, 68, 0.45)' : 'rgba(34, 197, 94, 0.45)'
    : selected
      ? 'var(--color-secondary)'
      : 'rgba(255, 255, 255, 0.5)'

  const bgColor = revealed
    ? isAi ? 'rgba(254, 242, 242, 0.5)' : 'rgba(240, 253, 244, 0.5)'
    : 'rgba(255, 255, 255, 0.3)'

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer hover:shadow-md"
      style={{ border: `2px solid ${borderColor}`, background: bgColor }}
    >
      {/* Image — aspect ratio fixe, jamais de saut */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={src}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105 img-zoomable"
          onClick={e => { e.stopPropagation(); onZoom(src) }}
        />
        <span className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
          {label}
        </span>
        {revealed && (
          <span
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm text-white"
            style={{ background: isAi ? 'rgba(239, 68, 68, 0.8)' : 'rgba(34, 197, 94, 0.8)' }}
          >
            {isAi ? 'IA' : 'Réel'}
          </span>
        )}
      </div>

      {/* Indices après reveal — animation fluide */}
      {revealed && clues && clues.length > 0 && (
        <AnimatedReveal>
          <div className="p-4 flex flex-col gap-2">
            {clues.map((clue, i) => (
              <p key={i} className="flex items-start gap-2 text-[13px] leading-[1.6] text-[var(--color-text)]">
                <span
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: isAi ? '#ef4444' : '#22c55e' }}
                />
                {clue}
              </p>
            ))}
          </div>
        </AnimatedReveal>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

function TypeBadge({ type }: { type: Example['type'] }) {
  const labels: Record<string, string> = {
    text: 'Article',
    post: 'Post',
    comparison: 'Duel d\'images',
  }
  return (
    <span
      className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-secondary)]"
      style={{ background: 'rgba(147, 54, 0, 0.06)' }}
    >
      {labels[type] ?? type}
    </span>
  )
}

function RevealPanel({ isFake, clues, explanation }: { isFake: boolean; clues: string[]; explanation: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span
        className="self-start rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide"
        style={{
          background: isFake ? '#fee2e2' : '#dcfce7',
          color: isFake ? '#b91c1c' : '#15803d',
        }}
      >
        {isFake ? 'FAKE' : 'RÉEL'}
      </span>

      <ul className="flex flex-col gap-2.5">
        {clues.map((clue, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-[var(--color-text)]">
            <span
              className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
              style={{ background: isFake ? '#fca5a5' : '#86efac' }}
            />
            {clue}
          </li>
        ))}
      </ul>

      <div className="rounded-2xl p-5 mt-1" style={{ background: 'rgba(147, 54, 0, 0.06)' }}>
        <p className="text-[15px] leading-[1.75] text-[var(--color-text)]">
          <span className="font-semibold text-[var(--color-secondary)]">Explication : </span>
          {explanation}
        </p>
      </div>
    </div>
  )
}
