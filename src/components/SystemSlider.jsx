import { useMemo, useState } from 'react'
import { slides } from '../data/landingData'
import { getAssetUrl, localAssets } from '../utils/assetResolver'

const fallbackImages = [
  localAssets.slideOne,
  localAssets.slideTwo,
  localAssets.slideThree,
  localAssets.slideFour,
]

const fallbackSection = {
  kicker: 'سسٹم ماڈیولز',
  headingLineOne: '',
  headingLineTwo: '',
  alignment: 'right',
}

function getInitialSlideIndex(items) {
  const defaultIndex = items.findIndex((item) => Number(item.isDefault) === 1 || item.isDefault === true || item.isDefault === '1')
  return defaultIndex >= 0 ? defaultIndex : 0
}

function SystemSlider({ slidesData = slides, section }) {
  const items = slidesData.length ? slidesData : slides
  const [activeSlide, setActiveSlide] = useState(() => getInitialSlideIndex(items))
  const [hasUserSelectedSlide, setHasUserSelectedSlide] = useState(false)
  const defaultSlide = getInitialSlideIndex(items)
  const safeActiveSlide = activeSlide >= items.length || (!hasUserSelectedSlide && activeSlide === 0 && defaultSlide > 0) ? defaultSlide : activeSlide
  const slide = items[safeActiveSlide] || items[0]
  const sectionContent = { ...fallbackSection, ...(section || {}) }
  const headingText = [sectionContent.headingLineOne, sectionContent.headingLineTwo].filter(Boolean).join(' ')
  const headingAlignClass = sectionContent.alignment === 'center' ? 'text-center' : sectionContent.alignment === 'left' ? 'text-left' : 'text-right'
  const hasDuplicateCardHeading = slide.cardHeading?.trim() === slide.label?.trim()
  const cardHeading = hasDuplicateCardHeading ? '' : slide.cardHeading
  const slideImages = useMemo(() => (
    items.map((item, index) => getAssetUrl(item.imageUrl, fallbackImages[index % fallbackImages.length]))
  ), [items])

  if (!slide) return null

  return (
    <section id="slider" className="relative z-10 border-y border-themeBorder bg-transparent">
      <div className="slider-equal-grid mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8 lg:[direction:ltr]">
        <div className="slider-panel soft-panel rounded-lg border border-themeBorder bg-themeBg p-4 shadow-card-theme [direction:rtl]">
          <div className="slider-image-card overflow-hidden rounded-md border border-themeBorder bg-themeSurface shadow-card-theme">
            <img
              src={slideImages[safeActiveSlide]}
              alt={slide.altText || slide.title || `${slide.label} module preview`}
              className="slider-image block w-full"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                onClick={() => {
                  setHasUserSelectedSlide(true)
                  setActiveSlide(index)
                }}
                className={`slider-tab rounded-md border px-3 py-3 text-theme-button font-bold transition ${
                  safeActiveSlide === index
                    ? 'border-themePrimary bg-themePrimary text-white'
                    : 'border-themeBorder bg-themeSurface text-themeText hover:border-themePrimary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`slider-copy page-reveal ${headingAlignClass} [direction:rtl]`}>
          <div className="slider-copy-heading">
            <p className="text-[1.35rem] font-bold leading-9 text-themePrimary">{sectionContent.kicker}</p>
            <h2 className="mt-3 font-urdu text-[2.05rem] font-bold leading-[1.95] text-themeText sm:text-[3rem] sm:leading-[1.8]">
              {headingText || slide.title}
            </h2>
          </div>
          <div className="slider-card mt-5 rounded-lg border border-themeBorder bg-themeSurface p-8 text-right shadow-card-theme">
            <span className="rounded-md bg-themePrimary/10 px-4 py-2 text-[1.25rem] font-bold leading-8 text-themePrimary">
              {slide.label}
            </span>
            {(cardHeading || !slide.description) && (
              <h3 className="mt-7 max-w-2xl font-urdu text-[1.35rem] font-bold leading-[2.1] text-themeText sm:text-[1.7rem]">
                {cardHeading || slide.title}
              </h3>
            )}
            {slide.description && (
              <p className="mt-4 max-w-2xl text-theme-body font-bold text-slate-500 dark:text-slate-400">
                {slide.description}
              </p>
            )}
            <div className="mt-8 flex items-end gap-4">
              <p className="text-[3rem] font-black leading-none text-themePrimary">
                {slide.stat}
              </p>
              <p className="pb-1 text-[1.05rem] font-bold leading-7 text-slate-500 dark:text-slate-400">
                {slide.statLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SystemSlider
