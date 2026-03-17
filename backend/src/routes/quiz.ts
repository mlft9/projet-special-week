import { Router } from 'express'
import quiz from '../data/quiz.json'

const router = Router()

router.get('/', (_req, res) => {
  res.json(quiz)
})

export default router
