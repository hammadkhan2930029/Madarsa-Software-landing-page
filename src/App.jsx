import './App.css'
import DemoRequestSection from './components/DemoRequestSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import SystemSlider from './components/SystemSlider'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main
      className="site-shell relative min-h-screen overflow-hidden bg-themeBg font-arabic text-themeText"
      dir="rtl"
    >
      <div className="site-ambient pointer-events-none absolute inset-0 z-0" />
      <div className="site-glow site-glow-primary pointer-events-none absolute z-0" />
      <div className="site-glow site-glow-secondary pointer-events-none absolute z-0" />
      <div className="site-pattern pointer-events-none absolute inset-0 z-0" />
      <div className="site-scan pointer-events-none absolute inset-x-0 top-0 z-0 h-full" />

      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <HeroSection />
      <SystemSlider />
      <FeaturesSection />
      <DemoRequestSection />
      <Footer />
    </main>
  )
}

export default App
