import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BurgerMenu from './components/BurgerMenu'
import ChatBot from './components/ChatBot'
import Home from './pages/Home.tsx'
import Learn from './pages/Learn'
import Play from './pages/Play'
import Classement from './pages/Classement'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import SpotGame from './pages/SpotGame'
import Reports from './pages/Reports'
import Admin from './pages/Admin'
import './App.css'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {!isAdmin && (
        <header className="app-header">
          <BurgerMenu />
        </header>
      )}

      <main className="main-content">
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/comprendre" element={<Learn />} />
        <Route path="/jouer"      element={<Play />} />
        <Route path="/classement" element={<Classement />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/reperer" element={<SpotGame />} />
        <Route path="/signaler" element={<Reports />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </main>
      {!isAdmin && <ChatBot />}
    </>
  )
}
