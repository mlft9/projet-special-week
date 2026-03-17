import { Routes, Route } from 'react-router-dom'
import BurgerMenu from './components/BurgerMenu'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Play from './pages/Play'
import Classement from './pages/Classement'
import './App.css'

export default function App() {
  return (
    <>
      <header className="app-header">
        <BurgerMenu />
      </header>

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/comprendre" element={<Learn />} />
        <Route path="/jouer"      element={<Play />} />
        <Route path="/classement" element={<Classement />} />
      </Routes>
    </>
  )
}
