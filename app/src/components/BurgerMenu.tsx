import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',           label: 'Accueil' },
  { to: '/apprendre', label: 'Comprendre' },
  { to: '/galerie',   label: 'Galerie' },
  { to: '/jouer',     label: 'Jouer' },
  { to: '/dashboard', label: 'Mon score' },
]

export default function BurgerMenu() {
  const [open, setOpen] = useState(false)

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

      {open && (
        <div className="burger-overlay" onClick={() => setOpen(false)}>
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
      )}
    </>
  )
}
