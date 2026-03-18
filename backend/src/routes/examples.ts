import { Router } from 'express'
import examples from '../data/examples.json'

const router = Router()

router.get('/', (_req, res) => {
  res.json(examples)
})

export default router
