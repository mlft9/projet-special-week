export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  images?: {
    a: string   // chemin vers l'image A (src/assets/quiz/)
    b: string   // chemin vers l'image B (src/assets/quiz/)
    labelA?: string
    labelB?: string
  }
}

export interface Example {
  id: number
  type: 'text' | 'image' | 'post'
  title: string
  content: string
  clues: string[]
  explanation: string
  isFake: boolean
}

export interface Score {
  sessionId: string
  score: number
  total: number
  date: string
}

export interface LeaderboardEntry {
  name: string
  score: number
  total: number
  date: string
}
