import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="page page-home">
      <img src={logo} alt="Logo" className="home-logo" />
      <h1>Améliorez vos bonnes pratiques numériques</h1>
      <p>Découvrez des conseils et recommandations pour une utilisation plus saine du numérique en famille.</p>

      <div className="home-steps">
        <span>1 — Définissez vos besoins</span>
        <span>2 — Découvrez nos conseils</span>
        <span>3 — Créez vos pratiques</span>
      </div>

      <button className="btn-primary" onClick={() => navigate('/apprendre')}>
        C'est parti ! →
      </button>
    </main>
  )
}
