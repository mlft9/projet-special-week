import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface Props {
  levelIndex: number
  totalLevels: number
  clicksLeft: number
  maxClicks: number
  score: number
  foundCount: number
  totalHotspots: number
}

export default function SpotHUD({
  levelIndex,
  totalLevels,
  clicksLeft,
  maxClicks,
  score,
  foundCount,
  totalHotspots,
}: Props) {
  const hudRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!hudRef.current) return
    gsap.from(hudRef.current, { opacity: 0, y: -16, duration: 0.5, ease: 'power2.out' })
  }, { scope: hudRef, dependencies: [levelIndex] })

  return (
    <div ref={hudRef} className="spot-hud">
      {/* Niveaux */}
      <div className="spot-hud__levels">
        {Array.from({ length: totalLevels }, (_, i) => (
          <div
            key={i}
            className={`spot-hud__level-dot ${
              i < levelIndex ? 'done' : i === levelIndex ? 'active' : ''
            }`}
          />
        ))}
        <span className="spot-hud__level-label">
          Niveau {levelIndex + 1}/{totalLevels}
        </span>
      </div>

      {/* Clics restants */}
      <div className="spot-hud__clicks">
        {Array.from({ length: maxClicks }, (_, i) => (
          <span
            key={i}
            className={`spot-hud__click-icon ${i < clicksLeft ? 'active' : 'used'}`}
          >
            🔍
          </span>
        ))}
        <span className="spot-hud__clicks-label">
          {clicksLeft} clic{clicksLeft > 1 ? 's' : ''} restant{clicksLeft > 1 ? 's' : ''}
        </span>
      </div>

      {/* Zones trouvées */}
      <div className="spot-hud__found">
        <span className="spot-hud__found-count">{foundCount}/{totalHotspots}</span>
        <span className="spot-hud__found-label">zones</span>
      </div>

      {/* Score */}
      <div className="spot-hud__score">
        <span className="spot-hud__score-value">{score}</span>
        <span className="spot-hud__score-label">pts</span>
      </div>
    </div>
  )
}
