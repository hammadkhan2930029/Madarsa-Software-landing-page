import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import {
  features,
  footerLinks,
  navItems,
  previewCards,
  slides,
} from '../data/landingData'

const fallbackLanding = {
  hero: null,
  heroImages: [],
  navLinks: navItems,
  stats: previewCards,
  sliderModules: slides,
  features,
  footer: null,
  contactItems: [],
  footerLinks,
}

export function useLandingContent() {
  const [content, setContent] = useState(fallbackLanding)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    api.getLanding()
      .then((landing) => {
        if (!isMounted) return
        setContent({
          ...fallbackLanding,
          ...landing,
          navLinks: landing.navLinks?.length ? landing.navLinks : fallbackLanding.navLinks,
          stats: landing.stats?.length ? landing.stats : fallbackLanding.stats,
          sliderModules: landing.sliderModules?.length ? landing.sliderModules : fallbackLanding.sliderModules,
          features: landing.features?.length ? landing.features : fallbackLanding.features,
          heroImages: landing.heroImages?.length ? landing.heroImages : fallbackLanding.heroImages,
        })
        setStatus('success')
      })
      .catch((apiError) => {
        if (!isMounted) return
        setError(apiError.message)
        setContent(fallbackLanding)
        setStatus('error')
      })

    return () => {
      isMounted = false
    }
  }, [])

  return useMemo(() => ({ content, status, error }), [content, status, error])
}
