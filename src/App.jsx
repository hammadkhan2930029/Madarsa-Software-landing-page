import { useCallback, useEffect, useState } from 'react'
import './App.css'
import AdminPanel from './admin/AdminPanel'
import ContactPage from './components/ContactPage'
import DemoRequestSection from './components/DemoRequestSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import SystemSlider from './components/SystemSlider'
import { useLandingContent } from './hooks/useLandingContent'
import { useTheme } from './hooks/useTheme'
import { getAssetUrl } from './utils/assetResolver'

function getInitialLocation() {
  const navigationEntry = performance.getEntriesByType?.('navigation')?.[0]
  const isReload = navigationEntry?.type === 'reload'

  if (isReload && window.location.hash) {
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`)
  }

  return {
    pathname: window.location.pathname,
    hash: isReload ? '' : window.location.hash,
  }
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const { content: landingContent } = useLandingContent()
  const [isSplashVisible, setIsSplashVisible] = useState(true)
  const [location, setLocation] = useState(getInitialLocation)
  const isContactPage = location.pathname === '/contact'
  const isAdminPage = location.pathname.startsWith('/admin')

  const navigate = useCallback((href) => {
    const url = new URL(href, window.location.origin)

    window.history.pushState({}, '', `${url.pathname}${url.hash}`)
    setLocation({ pathname: url.pathname, hash: url.hash })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setLocation({
        pathname: window.location.pathname,
        hash: window.location.hash,
      })
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const splashTimer = window.setTimeout(() => {
      setIsSplashVisible(false)
    }, 1600)

    return () => window.clearTimeout(splashTimer)
  }, [])

  useEffect(() => {
    if (isSplashVisible) {
      return
    }

    if (location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView()
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [isSplashVisible, location])

  useEffect(() => {
    if (isAdminPage) return undefined

    const revealSelector = [
      '.slider-panel',
      '.slider-copy',
      '.slider-card',
      '.feature-card',
      '.demo-request-shell',
      '.request-card',
      '.demo-visual-card',
      '.demo-copy-panel',
      '.footer-cta',
      '.footer-main-dark',
      '.contact-info-card',
    ].join(', ')

    const revealItems = Array.from(document.querySelectorAll(revealSelector))
    revealItems.forEach((item, index) => {
      item.classList.add('reveal-on-scroll')
      item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`)
    })

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.16,
    })

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [isAdminPage, isSplashVisible, landingContent])

  useEffect(() => {
    const settings = landingContent.settings
    if (!settings) return

    if (settings.siteTitle) {
      document.title = settings.siteTitle
    }

    if (settings.metaDescription) {
      let description = document.querySelector('meta[name="description"]')
      if (!description) {
        description = document.createElement('meta')
        description.setAttribute('name', 'description')
        document.head.appendChild(description)
      }
      description.setAttribute('content', settings.metaDescription)
    }

    if (settings.favicon) {
      let favicon = document.querySelector('link[rel="icon"]')
      if (!favicon) {
        favicon = document.createElement('link')
        favicon.setAttribute('rel', 'icon')
        document.head.appendChild(favicon)
      }
      favicon.setAttribute('href', getAssetUrl(settings.favicon, settings.favicon))
    }
  }, [landingContent.settings])

  if (isAdminPage) {
    return (
      <AdminPanel
        theme={theme}
        onThemeToggle={toggleTheme}
        location={location}
      />
    )
  }

  return (
    <main
      className="site-shell relative min-h-screen overflow-hidden bg-themeBg font-arabic text-themeText"
      data-theme={theme}
      dir="rtl"
    >
      <div className="site-ambient pointer-events-none absolute inset-0 z-0" />
      <div className="site-glow site-glow-primary pointer-events-none absolute z-0" />
      <div className="site-glow site-glow-secondary pointer-events-none absolute z-0" />
      <div className="site-pattern pointer-events-none absolute inset-0 z-0" />
      <div className="site-scan pointer-events-none absolute inset-x-0 top-0 z-0 h-full" />

      {isSplashVisible && <SplashScreen theme={theme} />}
      <Navbar
        theme={theme}
        onThemeToggle={toggleTheme}
        onNavigate={navigate}
        navLinks={landingContent.navLinks}
      />
      {isContactPage ? (
        <ContactPage
          contactItems={landingContent.contactItems}
          demoSection={landingContent.demoSection}
          demoBenefits={landingContent.demoBenefits}
        />
      ) : (
        <>
          <HeroSection
            hero={landingContent.hero}
            heroImages={landingContent.heroImages}
            stats={landingContent.stats}
          />
          <SystemSlider slidesData={landingContent.sliderModules} />
          <FeaturesSection
            featuresData={landingContent.features}
            featureSection={landingContent.featureSection}
          />
          <DemoRequestSection
            demoSection={landingContent.demoSection}
            demoBenefits={landingContent.demoBenefits}
          />
        </>
      )}
      <Footer
        theme={theme}
        onNavigate={navigate}
        footer={landingContent.footer}
        navLinks={landingContent.navLinks}
        contactItems={landingContent.contactItems}
      />
    </main>
  )
}

export default App
