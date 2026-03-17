import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BurgerMenu from './components/BurgerMenu'
import Home from './pages/Home.tsx'
import Learn from './pages/Learn'
import Play from './pages/Play'
import Classement from './pages/Classement'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import './App.css'

export default function App() {
  const location = useLocation()
  const showHeader = location.pathname !== '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {showHeader && (
        <header className="app-header">
          <BurgerMenu />
        </header>
      )}

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/comprendre" element={<Learn />} />
        <Route path="/jouer"      element={<Play />} />
        <Route path="/classement" element={<Classement />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      </Routes>
    </>
  )
}
