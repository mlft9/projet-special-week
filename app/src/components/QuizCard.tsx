import type { QuizQuestion } from '../types'

interface Props {
  question: QuizQuestion
  onAnswer: (index: number) => void
  answered: number | null
}

export default function QuizCard({ question, onAnswer, answered }: Props) {
  return (
    <div className="quiz-card">
      <p className="quiz-question">{question.question}</p>

      {question.images && (
        <div className="quiz-images">
          <figure className="quiz-image-figure">
            <img src={question.images.a} alt={question.images.labelA ?? 'Image A'} />
            <figcaption>{question.images.labelA ?? 'Image A'}</figcaption>
          </figure>
          <figure className="quiz-image-figure">
            <img src={question.images.b} alt={question.images.labelB ?? 'Image B'} />
            <figcaption>{question.images.labelB ?? 'Image B'}</figcaption>
          </figure>
        </div>
      )}

      <ul className="quiz-options">
        {question.options.map((option, i) => {
          let state = ''
          if (answered !== null) {
            if (i === question.correct) state = 'correct'
            else if (i === answered) state = 'wrong'
          }
          return (
            <li key={i}>
              <button
                className={`quiz-option ${state}`}
                onClick={() => answered === null && onAnswer(i)}
                disabled={answered !== null}
              >
                {option}
              </button>
            </li>
          )
        })}
      </ul>

      {answered !== null && (
        <p className="quiz-explanation">{question.explanation}</p>
      )}
    </div>
  )
}
