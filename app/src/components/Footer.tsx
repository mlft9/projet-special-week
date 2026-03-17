import { Link } from 'react-router-dom'
import logo from '../assets/logo-petit.svg'

const pageLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/comprendre', label: 'Comprendre' },
  { to: '/jouer', label: 'Jouer' },
  { to: '/classement', label: 'Classement' },
]

export default function Footer() {
  return (
    <footer className="bg-[#22150d] text-[#F7EAD8] font-sans">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-3">
        <div className="md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="E-Alertés" className="h-20 w-20 invert" />
            <span className="text-lg font-display font-bold tracking-tight text-[#E6BA8F]">E-Alertés</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#F7EAD8]/75">
            Le portail de sensibilisation à la désinformation par l&apos;IA
          </p>
        </div>

        <nav className="md:col-span-1" aria-label="Pages">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#E6BA8F]">Pages</h3>
          <ul className="space-y-3 text-sm">
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-[#F7EAD8]/85 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-1">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#E6BA8F]">Informations</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/mentions-legales" className="text-[#F7EAD8]/85 transition-colors hover:text-white">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link to="/politique-confidentialite" className="text-[#F7EAD8]/85 transition-colors hover:text-white">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-[#F7EAD8]/65 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 E-Alertés — Capgemini x Sup de Vinci</span>
          <span>Conçu pour apprendre à détecter la désinformation</span>
        </div>
      </div>
    </footer>
  )
}