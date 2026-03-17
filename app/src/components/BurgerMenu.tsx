import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',            label: 'Accueil' },
  { to: '/comprendre',  label: 'Comprendre' },
  { to: '/jouer',       label: 'Jouer' },
  { to: '/classement',  label: 'Classement' },
]

export default function BurgerMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [open])

  return (
    <>
      <button
        className="burger-btn"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span /><span /><span />
      </button>

      <div className={`burger-overlay${open ? ' is-open' : ''}`} onClick={() => setOpen(false)}>
          <nav
            className="burger-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="burger-close"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <ul>
              {links.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
      </div>
    </>
  )
}
