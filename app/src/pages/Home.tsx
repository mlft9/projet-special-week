import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="page page-home">
      <img src={logo} alt="TruthSense" className="home-logo" />
      <h1>Saurais-tu détecter une fake news générée par l'IA ?</h1>
      <p>Apprends à repérer la désinformation, teste tes réflexes et deviens un expert de l'esprit critique.</p>

      <div className="home-steps">
        <span>1 — Comprendre l'IA</span>
        <span>2 — Analyser des exemples</span>
        <span>3 — Jouer et progresser</span>
      </div>

      <button className="btn-primary" onClick={() => navigate('/apprendre')}>
        C'est parti ! →
      </button>
    </main>
  )
}
