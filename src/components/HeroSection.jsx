import { useEffect, useMemo, useState } from 'react'
import { previewCards } from '../data/landingData'
import { getAssetUrl, localAssets } from '../utils/assetResolver'

const defaultHeroImages = [
  localAssets.dashboardOne,
  localAssets.dashboardTwo,
  localAssets.slideOne,
  localAssets.slideTwo,
  localAssets.slideThree,
  localAssets.slideFour,
]

const fallbackHero = {
  kicker: 'مکمل فرنٹ اینڈ اور بیک اینڈ کے ساتھ مدرسہ مینجمنٹ نظام',
  title: 'مدرسے کے تمام انتظامی کام ایک جدید ڈیش بورڈ میں منظم کریں۔',
  description: 'طلبہ، داخلہ، فیس مینجمنٹ، حاضری، امتحانات، اساتذہ اور رپورٹس کے لئے بہترین جامع حل۔',
  primaryCta: 'ڈیمو دیکھیں',
  primaryHref: '#contact',
  secondaryCta: 'خصوصیات دیکھیں',
  secondaryHref: '#features',
}

function PlayIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  )
}

function HeroStatIcon({ index }) {
  const icons = [
    (
      <>
        <path d="M4 10.5 12 5l8 5.5" />
        <path d="M6 10v9h12v-9" />
        <path d="M10 19v-5h4v5" />
        <path d="M8 12h1" />
        <path d="M15 12h1" />
      </>
    ),
    (
      <>
        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M2 21v-2a4 4 0 0 1 3-3.87" />
      </>
    ),
    (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-8" />
        <path d="M22 19V3" />
      </>
    ),
    (
      <>
        <path d="M9 5h6" />
        <path d="M9 3h6v4H9z" />
        <path d="M6 6h12v15H6z" />
        <path d="m9 14 2 2 4-5" />
      </>
    ),
  ]

  return (
    <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" aria-hidden="true">
      {icons[index % icons.length]}
    </svg>
  )
}

function HeroSection({ hero, heroImages = [], stats = previewCards }) {
  const [activeImage, setActiveImage] = useState(0)
  const content = hero || fallbackHero
  const cards = stats?.length ? stats : previewCards
  const carouselImages = useMemo(() => {
    if (!heroImages?.length) return defaultHeroImages
    return heroImages.map((image, index) => (
      getAssetUrl(image.imageUrl, defaultHeroImages[index % defaultHeroImages.length])
    ))
  }, [heroImages])

  const showPreviousImage = () => {
    setActiveImage((currentImage) => (
      currentImage === 0 ? carouselImages.length - 1 : currentImage - 1
    ))
  }

  const showNextImage = () => {
    setActiveImage((currentImage) => (currentImage + 1) % carouselImages.length)
  }

  useEffect(() => {
    const carouselTimer = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % carouselImages.length)
    }, 3200)

    return () => window.clearInterval(carouselTimer)
  }, [carouselImages.length])

  return (
    <section id="top" className="hero-section relative z-10 pt-16 sm:pt-[4.5rem]">
      <div className="hero-layout mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.98fr] lg:px-8">
        <div className="hero-copy max-w-3xl text-right">
          <p className="hero-reveal hero-kicker inline-flex max-w-full items-center rounded-md border border-themePrimary/20 bg-themeSurface/86 px-4 py-2 font-bold text-themePrimary shadow-card-theme">
            {content.kicker}
          </p>
          <h1 className="hero-reveal hero-reveal-delay-1 mt-5 font-urdu text-[2.15rem] font-bold leading-[1.95] text-themeText sm:text-[3.15rem] sm:leading-[1.75]">
            {content.title}
          </h1>
          <p className="hero-reveal hero-reveal-delay-2 mt-4 max-w-2xl text-[1.28rem] font-bold leading-9 text-slate-600 dark:text-slate-300">
            {content.description}
          </p>

          <div className="hero-reveal hero-reveal-delay-3 mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={content.primaryHref || '#contact'}
              className="hero-action inline-flex items-center justify-center gap-2 rounded-md bg-themePrimary px-6 py-3 text-center text-theme-button font-bold text-white shadow-theme transition hover:bg-themePrimaryHover"
            >
              <PlayIcon />
              {content.primaryCta || 'ڈیمو دیکھیں'}
            </a>
            <a
              href={content.secondaryHref || '#features'}
              className="hero-action inline-flex items-center justify-center gap-2 rounded-md border border-themeBorder bg-themeSurface px-6 py-3 text-center text-theme-button font-bold text-themeText shadow-card-theme transition hover:border-themePrimary"
            >
              <ListIcon />
              {content.secondaryCta || 'خصوصیات دیکھیں'}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:-mt-2">
          <div className="hero-dashboard hero-dashboard-image rounded-lg border border-themeBorder bg-themeSurface/92 p-3 text-right shadow-theme backdrop-blur">
            <div className="hero-slider-viewport" dir="ltr">
              <div
                className="hero-slider-track"
                style={{ transform: `translateX(-${activeImage * 100}%)` }}
              >
                {carouselImages.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`مدرسہ سافٹ ویئر ڈیش بورڈ پیش منظر ${index + 1}`}
                    className="hero-carousel-image block w-full shrink-0 rounded-md"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={showPreviousImage}
              className="hero-slider-arrow hero-slider-arrow-prev"
              aria-label="پچھلی تصویر"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={showNextImage}
              className="hero-slider-arrow hero-slider-arrow-next"
              aria-label="اگلی تصویر"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="hero-stats-grid grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.slice(0, 4).map((card, index) => (
            <div
              key={`${card.name}-${index}`}
              className="hero-stat-card rounded-lg border border-themeBorder bg-themeSurface p-4 shadow-card-theme"
              style={{ animationDelay: `${520 + index * 110}ms` }}
            >
              <span className="hero-stat-icon" aria-hidden="true">
                <HeroStatIcon index={index} />
              </span>
              <div>
                <p className="text-theme-detail font-bold text-slate-500 dark:text-slate-400">
                  {card.name}
                </p>
                <p className="mt-1 text-[1.55rem] font-black leading-tight text-themePrimary">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
