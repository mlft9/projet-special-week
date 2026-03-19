import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { responses } from './db/responses'
import chatRouter from './routes/chat'
import quizRouter from './routes/quiz'
import examplesRouter from './routes/examples'
import reportsRouter from './routes/reports'
import leaderboardRouter from './routes/leaderboard'
import adminRouter from './routes/admin'

const app = express()
const PORT = process.env.PORT ?? 3001

app.set('trust proxy', 1)
app.use(express.json({ limit: '10kb' }))
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? false
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'DELETE'],
}))

const loginLimiter      = rateLimit({ windowMs: 15 * 60 * 1000, max: 5,  standardHeaders: true, legacyHeaders: false })
const leaderboardPost   = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false })
const reportsLimiter    = rateLimit({ windowMs: 60 * 60 * 1000, max: 5,  standardHeaders: true, legacyHeaders: false })
const chatLimiter       = rateLimit({ windowMs: 60 * 1000,       max: 30, standardHeaders: true, legacyHeaders: false })

app.use('/api/chat', chatLimiter, chatRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/examples', examplesRouter)
app.post('/api/reports', reportsLimiter)
app.use('/api/reports', reportsRouter)
app.post('/api/leaderboard/quiz', leaderboardPost)
app.post('/api/leaderboard/spot', leaderboardPost)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/admin/login', loginLimiter)
app.use('/api/admin', adminRouter)

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
