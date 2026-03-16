interface Props {
  score: number
  total: number
}

function getLabel(ratio: number): { emoji: string; label: string } {
  if (ratio >= 0.9) return { emoji: '🏆', label: 'Expert anti-fake' }
  if (ratio >= 0.7) return { emoji: '⭐', label: 'Bon détecteur' }
  if (ratio >= 0.5) return { emoji: '📚', label: 'En progression' }
  return { emoji: '🔍', label: 'Continue à apprendre' }
}

export default function ScoreBadge({ score, total }: Props) {
  const ratio = total > 0 ? score / total : 0
  const { emoji, label } = getLabel(ratio)

  return (
    <div className="score-badge">
      <span className="score-emoji">{emoji}</span>
      <span className="score-value">{score} / {total}</span>
      <span className="score-label">{label}</span>
    </div>
  )
}
