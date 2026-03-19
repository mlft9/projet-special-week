import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'bot'
  text: string
}

const WELCOME: Message = {
  role: 'bot',
  text: "Bonjour ! Je suis l'assistant E-alertés 🤖 Pose-moi une question sur les deepfakes, les IA, ou la vérification d'infos !",
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fermeture par Escape + lock scroll sur mobile
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handleKey)
    const isMobile = window.innerWidth <= 440
    if (isMobile) document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Auto-scroll vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus sur l'input à l'ouverture
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() as { reply: string }
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Oups, une erreur est survenue. Réessaie dans un instant !' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  return (
    <>
      <button
        className="chatbot-bubble"
        aria-label={open ? 'Fermer le chatbot' : 'Ouvrir le chatbot'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {open ? '✕' : '💬'}
      </button>

      <div
        className={`chatbot-window${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Assistant E-alertés"
      >
        <div className="chatbot-header">
          <span className="chatbot-title">Assistant E-alertés</span>
          <button className="chatbot-close" aria-label="Fermer" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="chatbot-msg chatbot-msg--bot chatbot-msg--loading">
              <span /><span /><span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-row">
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            placeholder="Pose ta question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={500}
            disabled={loading}
            inputMode="text"
            aria-label="Message pour l'assistant"
          />
          <button
            className="chatbot-send"
            onClick={() => void sendMessage()}
            disabled={loading || input.trim().length === 0}
            aria-label="Envoyer"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  )
}
