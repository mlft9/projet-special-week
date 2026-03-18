import { useState, useCallback, useRef } from 'react'
import SpotCanvas from '../components/spot-game/SpotCanvas'
import SpotHUD from '../components/spot-game/SpotHUD'
import SpotResults from '../components/spot-game/SpotResults'
import { SPOT_LEVELS } from '../components/spot-game/spotLevels'
import type { HotspotZone } from '../components/spot-game/spotLevels'
import './SpotGame.css'

type GamePhase = 'intro' | 'playing' | 'level-results' | 'final-results'

interface LevelResult {
  levelTitle: string
  found: number
  total: number
  wrongClicks: number
  points: number
}

function computeLevelScore(found: number, total: number, wrongClicks: number): number {
  const base = found * 10 - wrongClicks * 2
  const bonus = found === total && wrongClicks === 0 ? 15 : 0
  return Math.max(0, base) + bonus
}

const MAX_SCORE_PER_LEVEL = (h: number) => h * 10 + 15 // toutes zones + bonus parfait

export default function SpotGame() {
  const [phase, setPhase] = useState<GamePhase>('intro')
  const [levelIndex, setLevelIndex] = useState(0)
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const [wrongClicks, setWrongClicks] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [levelResults, setLevelResults] = useState<LevelResult[]>([])
  const [revealAll, setRevealAll] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<HotspotZone | null>(null)
  const introRef = useRef<HTMLDivElement>(null)


  const currentLevel = SPOT_LEVELS[levelIndex]
  const clicksLeft = currentLevel ? currentLevel.maxClicks - wrongClicks : 0
  const maxScore = SPOT_LEVELS.reduce((acc, l) => acc + MAX_SCORE_PER_LEVEL(l.hotspots.length), 0)

  const handleHit = useCallback((hotspot: HotspotZone) => {
    setFoundIds(prev => new Set([...prev, hotspot.id]))
    setActiveHotspot(hotspot)
  }, [])

  const handleMiss = useCallback(() => {
    setWrongClicks(prev => {
      const next = prev + 1
      if (next >= currentLevel.maxClicks) {
        // Révéler toutes les zones après un court délai
        setTimeout(() => setRevealAll(true), 300)
      }
      return next
    })
  }, [currentLevel])

  // Passer au niveau suivant (depuis l'écran level-results)
  const handleNextLevel = useCallback(() => {
    const nextIndex = levelIndex + 1
    if (nextIndex >= SPOT_LEVELS.length) {
      setPhase('final-results')
    } else {
      setLevelIndex(nextIndex)
      setFoundIds(new Set())
      setWrongClicks(0)
      setRevealAll(false)
      setActiveHotspot(null)
      setPhase('playing')
    }
  }, [levelIndex])

  // Fin du niveau (appelé manuellement ou auto quand tout trouvé)
  const handleEndLevel = useCallback(() => {
    const level = SPOT_LEVELS[levelIndex]
    const found = foundIds.size
    const total = level.hotspots.length
    const pts = computeLevelScore(found, total, wrongClicks)

    setTotalScore(prev => prev + pts)
    setLevelResults(prev => [
      ...prev,
      { levelTitle: level.title, found, total, wrongClicks, points: pts },
    ])
    setRevealAll(true)
    setPhase('level-results')
  }, [levelIndex, foundIds, wrongClicks])

  // Déclencher la fin de niveau automatiquement quand toutes les zones sont trouvées
  const allFound = currentLevel && foundIds.size >= currentLevel.hotspots.length
  if (phase === 'playing' && allFound && !revealAll) {
    handleEndLevel()
  }

  const handleReplay = useCallback(() => {
    setPhase('intro')
    setLevelIndex(0)
    setFoundIds(new Set())
    setWrongClicks(0)
    setTotalScore(0)
    setLevelResults([])
    setRevealAll(false)
  }, [])

  return (
    <main className="spot-game-page">

      {/* ── INTRO ── */}
      {phase === 'intro' && (
        <div ref={introRef} className="spot-intro">
          <h1 className="spot-intro__title spot-intro__animate">
            Repérer les zones suspectes
          </h1>
          <p className="spot-intro__subtitle spot-intro__animate">
            Ces images semblent réelles… mais chacune cache des artefacts révélateurs d'une génération par IA.
            Sauras-tu les trouver ?
          </p>

          <div className="spot-intro__rules spot-intro__animate">
            <div className="spot-intro__rule">
              <span>🔍</span>
              <div>
                <strong>3 clics par image</strong>
                <p>Utilise-les bien — chaque mauvais clic te coûte des points.</p>
              </div>
            </div>
            <div className="spot-intro__rule">
              <span>✅</span>
              <div>
                <strong>+10 pts par zone trouvée</strong>
                <p>Trouve toutes les zones sans erreur : +15 pts bonus.</p>
              </div>
            </div>
            <div className="spot-intro__rule">
              <span>📖</span>
              <div>
                <strong>Explications à chaque zone</strong>
                <p>Clique sur un cercle révélé pour lire pourquoi c'est suspect.</p>
              </div>
            </div>
            <div className="spot-intro__rule">
              <span>🖼️</span>
              <div>
                <strong>{SPOT_LEVELS.length} images à analyser</strong>
                <p>Portraits, objets, paysages, architecture, mains… IA partout !</p>
              </div>
            </div>
          </div>

          <button
            className="spot-intro__cta spot-intro__animate"
            onClick={() => setPhase('playing')}
          >
            C'est parti →
          </button>
        </div>
      )}

      {/* ── PLAYING ── */}
      {phase === 'playing' && currentLevel && (
        <div className="spot-playing">
          <SpotHUD
            levelIndex={levelIndex}
            totalLevels={SPOT_LEVELS.length}
            clicksLeft={Math.max(0, clicksLeft)}
            maxClicks={currentLevel.maxClicks}
            score={totalScore}
            foundCount={foundIds.size}
            totalHotspots={currentLevel.hotspots.length}
          />

          <div className="spot-playing__content">
            <div className="spot-playing__header">
              <h2 className="spot-playing__title">{currentLevel.title}</h2>
              <button
                className="spot-mode-btn"
                onClick={() => window.open(currentLevel.image, '_blank')}
              >
                🔍 Analyser l'image
              </button>
            </div>

            <SpotCanvas
              image={currentLevel.image}
              hotspots={currentLevel.hotspots}
              foundIds={foundIds}
              revealAll={revealAll}
              clicksLeft={Math.max(0, clicksLeft)}
              onHit={handleHit}
              onMiss={handleMiss}
              onZoneClick={setActiveHotspot}
              analyzeMode={false}
            />

            {/* Info zone trouvée — sous l'image */}
            {activeHotspot && (
              <div className="spot-zone-info">
                <div className="spot-zone-info__content">
                  <strong>{activeHotspot.label}</strong>
                  <p>{activeHotspot.description}</p>
                </div>
                <button className="spot-zone-info__close" onClick={() => setActiveHotspot(null)}>✕</button>
              </div>
            )}

            {/* Bouton fin de niveau manuel (visible si clics épuisés ou toutes zones trouvées) */}
            {(clicksLeft <= 0 || foundIds.size >= currentLevel.hotspots.length) && (
              <button className="spot-playing__next-btn" onClick={handleEndLevel}>
                {foundIds.size >= currentLevel.hotspots.length
                  ? '✅ Toutes les zones trouvées ! Continuer →'
                  : 'Voir les résultats →'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── LEVEL RESULTS ── */}
      {phase === 'level-results' && currentLevel && (
        <div className="spot-level-results">
          <div className="spot-level-results__card">
            <h2 className="spot-level-results__title">
              {foundIds.size >= currentLevel.hotspots.length
                ? '🎯 Bravo, tout trouvé !'
                : `${foundIds.size}/${currentLevel.hotspots.length} zones repérées`}
            </h2>

            <div className="spot-level-results__zones">
              {currentLevel.hotspots.map(h => (
                <div
                  key={h.id}
                  className={`spot-level-results__zone ${foundIds.has(h.id) ? 'found' : 'missed'}`}
                >
                  <span>{foundIds.has(h.id) ? '✅' : '❌'}</span>
                  <div>
                    <strong>{h.label}</strong>
                    <p>{h.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="spot-level-results__pts">
              {(() => {
                const pts = computeLevelScore(foundIds.size, currentLevel.hotspots.length, wrongClicks)
                return (
                  <span style={{ color: pts > 0 ? '#4aaeff' : '#ff3b3b' }}>
                    {pts > 0 ? '+' : ''}{pts} pts cette image
                  </span>
                )
              })()}
            </div>

            <button className="spot-intro__cta" onClick={handleNextLevel}>
              {levelIndex + 1 < SPOT_LEVELS.length
                ? `Image suivante (${levelIndex + 2}/${SPOT_LEVELS.length}) →`
                : 'Voir mes résultats →'}
            </button>
          </div>
        </div>
      )}

      {/* ── FINAL RESULTS ── */}
      {phase === 'final-results' && (
        <div className="spot-final">
          <SpotResults
            totalScore={totalScore}
            maxScore={maxScore}
            levelResults={levelResults}
            onReplay={handleReplay}
          />
        </div>
      )}
    </main>
  )
}
