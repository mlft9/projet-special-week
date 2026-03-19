import express from 'express'
import cors from 'cors'
import { responses } from './db/responses'
import chatRouter from './routes/chat'
import quizRouter from './routes/quiz'
import examplesRouter from './routes/examples'
import reportsRouter from './routes/reports'
import leaderboardRouter from './routes/leaderboard'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(express.json({ limit: '10kb' }))
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
}))

app.use('/api/chat', chatRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/examples', examplesRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`E-alertés backend running on port ${PORT}`)
  console.log(`DB prête: ${responses.length} réponses disponibles`)
})
