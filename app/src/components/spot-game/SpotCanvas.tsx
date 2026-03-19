import { useState, useCallback } from 'react'
import type { HotspotZone } from './spotLevels'

interface MissMarker {
  id: number
  x: number
  y: number
}

interface Props {
  image: string
  hotspots: HotspotZone[]
  foundIds: Set<string>
  revealAll: boolean
  clicksLeft: number
  onHit: (hotspot: HotspotZone) => void
  onMiss: () => void
  onZoneClick?: (hotspot: HotspotZone) => void
  analyzeMode: boolean
  scanning?: boolean
}

let missCounter = 0

export default function SpotCanvas({
  image,
  hotspots,
  foundIds,
  revealAll,
  clicksLeft,
  onHit,
  onMiss,
  onZoneClick,
  scanning = false,
}: Props) {
  const [missMarkers, setMissMarkers] = useState<MissMarker[]>([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (clicksLeft <= 0) return
      const rect = e.currentTarget.getBoundingClientRect()
      const xPct = ((e.clientX - rect.left) / rect.width) * 100
      const yPct = ((e.clientY - rect.top) / rect.height) * 100

      const hit = hotspots.find(
        h => !foundIds.has(h.id) && Math.hypot(h.x - xPct, h.y - yPct) < h.radius
      )

      if (hit) {
        onHit(hit)
      } else {
        onMiss()
        const id = missCounter++
        setMissMarkers(prev => [...prev, { id, x: xPct, y: yPct }])
        setTimeout(() => {
          setMissMarkers(prev => prev.filter(m => m.id !== id))
        }, 1200)
      }
    },
    [clicksLeft, hotspots, foundIds, onHit, onMiss]
  )

  return (
    <div
      className={`spot-canvas ${clicksLeft <= 0 ? 'no-pointer' : ''} ${scanning ? 'is-scanning' : ''}`}
      onClick={handleClick}
    >
      <div className="spot-scanner-line" />
      <img src={image} alt="Image à analyser" className="spot-canvas__img" draggable={false} />

      {hotspots.map(h => {
        const isFound = foundIds.has(h.id)
        const visible = isFound || (revealAll && !isFound)
        if (!visible) return null
        return (
          <div
            key={h.id}
            className={`spot-zone ${isFound ? 'found' : 'revealed'}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={e => { e.stopPropagation(); onZoneClick?.(h) }}
          >
            <div className="spot-zone__circle" />
          </div>
        )
      })}

      {missMarkers.map(m => (
        <div key={m.id} className="spot-miss" style={{ left: `${m.x}%`, top: `${m.y}%` }}>✕</div>
      ))}

      {clicksLeft <= 0 && !revealAll && (
        <div className="spot-canvas__overlay">Regarde les zones révélées…</div>
      )}
    </div>
  )
}
