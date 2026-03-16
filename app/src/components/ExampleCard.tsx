import type { Example } from '../types'

interface Props {
  example: Example
  revealed: boolean
  onReveal: () => void
}

export default function ExampleCard({ example, revealed, onReveal }: Props) {
  return (
    <div className={`example-card example-card--${example.type}`}>
      <span className="example-type">{example.type}</span>
      <h3>{example.title}</h3>
      <p className="example-content">{example.content}</p>

      {!revealed ? (
        <button className="btn-secondary" onClick={onReveal}>
          Fake ou réel ?
        </button>
      ) : (
        <div className="example-reveal">
          <span className={`example-badge ${example.isFake ? 'fake' : 'real'}`}>
            {example.isFake ? 'FAKE' : 'RÉEL'}
          </span>
          <ul className="example-clues">
            {example.clues.map((clue, i) => (
              <li key={i}>{clue}</li>
            ))}
          </ul>
          <p className="example-explanation">{example.explanation}</p>
        </div>
      )}
    </div>
  )
}
