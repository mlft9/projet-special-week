import type { QuizQuestion } from '../types'

const LETTERS = ['A', 'B', 'C', 'D']

interface Props {
  question: QuizQuestion
  questionIndex: number
  total: number
  answered: number | null
  onAnswer: (index: number) => void
  onNext: () => void
}

export default function QuizCard({ question, questionIndex, total, answered, onAnswer, onNext }: Props) {
  const isCorrect = answered !== null && answered === question.correct

  return (
    <div className="quiz-card">
      <p className="quiz-qnum">
        Question {String(questionIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>

      <p className="quiz-question">{question.question}</p>

      {question.images && (
        <div className="quiz-images">
          <figure className="quiz-image-figure">
            <img
              src={question.images.a}
              alt={question.images.labelA ?? 'Image A'}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            <figcaption>{question.images.labelA ?? 'Image A'}</figcaption>
          </figure>
          <figure className="quiz-image-figure">
            <img
              src={question.images.b}
              alt={question.images.labelB ?? 'Image B'}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
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
                data-letter={LETTERS[i]}
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
        <>
          <div className="quiz-explanation">
            🔍 <strong>{isCorrect ? 'Bien joué !' : 'Pas tout à fait...'}</strong>{' '}
            {question.explanation}
          </div>
          <button className="quiz-next" onClick={onNext}>
            {questionIndex + 1 < total ? 'Question suivante →' : 'Voir mon score →'}
          </button>
        </>
      )}
    </div>
  )
}
