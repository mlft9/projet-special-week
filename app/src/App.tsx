import { Routes, Route } from 'react-router-dom'
import BurgerMenu from './components/BurgerMenu'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Gallery from './pages/Gallery'
import Play from './pages/Play'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  return (
    <>
      <header className="app-header">
        <BurgerMenu />
      </header>

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/apprendre" element={<Learn />} />
        <Route path="/galerie"   element={<Gallery />} />
        <Route path="/jouer"     element={<Play />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}
