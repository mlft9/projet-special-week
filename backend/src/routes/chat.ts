import { Router, Request, Response } from 'express'
import { responses } from '../db/responses'
import { incrementStat } from '../db/stats'

const router = Router()

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
}

const KEEP_SHORT = new Set(['ia', 'gpt'])

function tokenize(text: string): Set<string> {
  const words = normalize(text).split(/\s+/)
  return new Set(words.filter(w => w.length >= 3 || KEEP_SHORT.has(w)))
}

const DEFAULT_REPLY =
  "Je ne suis pas sûr de comprendre ta question 🤔 Essaie de me demander quelque chose sur les deepfakes, les IA, les fake news, ou comment vérifier une information. Tu peux aussi utiliser le menu pour explorer le site !"

const SENSITIVE_OPINION_REPLY =
  "Je ne peux pas me prononcer sur ce sujet. Je peux en revanche t'aider à vérifier des faits et des sources de manière neutre."

const OPINION_REQUEST_PATTERNS = [
  'tu penses',
  'vous pensez',
  'ton avis',
  'votre avis',
  'opinion',
  'pour ou contre',
  'tu crois',
  'vous croyez',
  'se prononcer',
]

const SENSITIVE_TOPIC_PATTERNS = [
  'limite',
  'controverse',
  'tabou',
  'racisme',
  'raciste',
  'sexisme',
  'sexiste',
  'religion',
  'politique',
  'terrorisme',
  'violence',
  'suicide',
  'drogue',
  'pornographie',
  'sexe',
  'mineur',
  'illegal',
  'harcelement',
]

function shouldRefuseSensitiveOpinion(message: string): boolean {
  const normalizedMessage = normalize(message)
  const asksOpinion = OPINION_REQUEST_PATTERNS.some((pattern) => normalizedMessage.includes(pattern))
  const isSensitiveTopic = SENSITIVE_TOPIC_PATTERNS.some((pattern) => normalizedMessage.includes(pattern))

  return asksOpinion && isSensitiveTopic
}

router.post('/', (req: Request, res: Response) => {
  const { message } = req.body as { message?: unknown }

  if (typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'message requis' })
    return
  }

  if (message.length > 500) {
    res.status(400).json({ error: 'message trop long (max 500 chars)' })
    return
  }

  if (shouldRefuseSensitiveOpinion(message)) {
    res.json({ reply: SENSITIVE_OPINION_REPLY })
    return
  }

  const tokens = tokenize(message)

  let bestScore = 0
  let bestReply = DEFAULT_REPLY

  for (const row of responses) {
    let score = 0
    for (const kw of row.keywords) {
      const normKw = normalize(kw)
      for (const token of tokens) {
        if (token.includes(normKw) || normKw.includes(token)) {
          score++
          break
        }
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestReply = row.response
    }
  }

  incrementStat('chatMessages').catch(() => {})
  res.json({ reply: bestReply })
})

export default router
