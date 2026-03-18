import { useState, useRef, useCallback } from 'react'
import type { HotspotZone } from './spotLevels'

interface MissMarker {
  id: number
  x: number // % from left
  y: number // % from top
}

interface CalibPin {
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
  calibrate?: boolean
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
  calibrate = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [missMarkers, setMissMarkers] = useState<MissMarker[]>([])
  const [calibPins, setCalibPins] = useState<CalibPin[]>([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10
      const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10

      if (calibrate) {
        setCalibPins(prev => [...prev, { x: xPct, y: yPct }])
        return
      }

      if (clicksLeft <= 0) return

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
    [calibrate, clicksLeft, hotspots, foundIds, onHit, onMiss]
  )

  return (
    <div
      ref={containerRef}
      className={`spot-canvas ${!calibrate && clicksLeft <= 0 ? 'no-pointer' : ''}`}
      onClick={handleClick}
    >
      <img
        src={image}
        alt="Image à analyser"
        className="spot-canvas__img"
        draggable={false}
      />

      {/* Mode calibration : pins avec coordonnées */}
      {calibrate && calibPins.map((pin, i) => (
        <div
          key={i}
          className="spot-calib-pin"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          onClick={e => { e.stopPropagation(); setCalibPins(prev => prev.filter((_, j) => j !== i)) }}
        >
          <div className="spot-calib-pin__dot" />
          <div className="spot-calib-pin__label">x:{pin.x} y:{pin.y}</div>
        </div>
      ))}

      {/* Hotspots révélés — cercle seul, info affichée sous l'image */}
      {hotspots.map(h => {
        const isFound = foundIds.has(h.id)
        const showRevealed = revealAll && !isFound
        const visible = isFound || showRevealed

        if (!visible) return null

        return (
          <div
            key={h.id}
            className={`spot-zone ${isFound ? 'found' : 'revealed'}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={e => {
              e.stopPropagation()
              onZoneClick?.(h)
            }}
          >
            <div className="spot-zone__circle" />
          </div>
        )
      })}

      {/* Marqueurs de mauvais clics */}
      {missMarkers.map(m => (
        <div
          key={m.id}
          className="spot-miss"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          ✕
        </div>
      ))}

      {/* Overlay "plus de clics" */}
      {clicksLeft <= 0 && !revealAll && (
        <div className="spot-canvas__overlay">
          Regarde les zones révélées…
        </div>
      )}
    </div>
  )
}
