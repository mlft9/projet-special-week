import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  {
    to: '/',
    label: 'Accueil',
    iconPath: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z',
    iconViewBox: '0 -960 960 960',
    iconType: 'fill' as const,
  },
  {
    to: '/comprendre',
    label: 'Comprendre',
    iconPath: 'M380-360q42 0 71-29l160-160q29-29 29-71t-29-71q-29-29-71-29t-71 29q-37-13-73-6t-61 32q-25 25-32 61t6 73q-29 29-29 71t29 71q29 29 71 29ZM240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Z',
    iconViewBox: '0 -960 960 960',
    iconType: 'fill' as const,
  },
  {
    to: '/jouer',
    label: 'Jouer',
    iconPath: 'M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm3-80q19 0 34.5-10t23.5-27l28-57q15-31 44-48.5t63-17.5h190q34 0 63 18t45 48l28 57q8 17 23.5 27t34.5 10q28 0 48-18.5t21-46.5q0 1-2-19l-84-335q-7-27-28-44t-49-17H285q-28 0-49.5 17T208-659l-84 335q-2 6-2 18 0 28 20.5 47t49.5 19Zm376.5-291.5Q580-543 580-560t-11.5-28.5Q557-600 540-600t-28.5 11.5Q500-577 500-560t11.5 28.5Q523-520 540-520t28.5-11.5Zm80-80Q660-623 660-640t-11.5-28.5Q637-680 620-680t-28.5 11.5Q580-657 580-640t11.5 28.5Q603-600 620-600t28.5-11.5Zm0 160Q660-463 660-480t-11.5-28.5Q637-520 620-520t-28.5 11.5Q580-497 580-480t11.5 28.5Q603-440 620-440t28.5-11.5Zm80-80Q740-543 740-560t-11.5-28.5Q717-600 700-600t-28.5 11.5Q660-577 660-560t11.5 28.5Q683-520 700-520t28.5-11.5Zm-367 63Q370-477 370-490v-40h40q13 0 21.5-8.5T440-560q0-13-8.5-21.5T410-590h-40v-40q0-13-8.5-21.5T340-660q-13 0-21.5 8.5T310-630v40h-40q-13 0-21.5 8.5T240-560q0 13 8.5 21.5T270-530h40v40q0 13 8.5 21.5T340-460q13 0 21.5-8.5ZM480-480Z',
    iconViewBox: '0 -960 960 960',
    iconType: 'fill' as const,
  },
  {
    to: '/classement',
    label: 'Classement',
    iconPath: 'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm80-160h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160Zm80-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM480-480Z',
    iconViewBox: '0 -960 960 960',
    iconType: 'fill' as const,
  },
  {
    to: '/signaler',
    label: 'Signaler un site',
    iconPath: 'M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z',
    iconViewBox: '0 -960 960 960',
    iconType: 'fill' as const,
  },
]

export default function BurgerMenu() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <aside className={`side-nav-shell${mobileOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
      <button
        type="button"
        className="side-nav-mobile-toggle"
        aria-label="Ouvrir le menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="side-nav-drawer" aria-label="Menu de navigation">
        <ul>
          {links.map(link => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} onClick={() => setMobileOpen(false)}>
                <span className="side-nav-link-label">{link.label}</span>
                <svg
                  className="side-nav-link-icon"
                  viewBox={link.iconViewBox}
                  aria-hidden="true"
                  fill={link.iconType === 'fill' ? 'currentColor' : 'none'}
                >
                  {link.iconType === 'fill' ? (
                    <path d={link.iconPath} />
                  ) : (
                    <path d={link.iconPath} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
