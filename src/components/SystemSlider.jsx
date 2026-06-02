import { useState } from 'react'
import { slides } from '../data/landingData'

function SystemSlider() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  return (
    <section id="slider" className="relative z-10 border-y border-themeBorder bg-transparent">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8">
        <div className="page-reveal text-right">
          <p className="text-sm font-bold text-themePrimary">سسٹم سلائیڈر</p>
          <h2 className="mt-3 font-urdu text-3xl font-bold leading-loose text-themeText sm:text-4xl">
            ہر ماڈیول صاف اور منظم انداز میں۔
          </h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            اس سلائیڈر میں مدرسہ سافٹ ویئر کے اہم حصوں کا مختصر تعارف دیا
            گیا ہے۔ بعد میں یہاں اسکرین شاٹس یا پروڈکٹ ویڈیو بھی شامل کی جا
            سکتی ہے۔
          </p>
        </div>

        <div className="slider-panel soft-panel rounded-xl border border-themeBorder bg-themeBg p-4 shadow-card-theme">
          <div className="slider-card min-h-64 rounded-lg bg-themeSurface p-6 text-right shadow-card-theme">
            <span className="rounded-md bg-themePrimary/10 px-3 py-1 text-sm font-bold text-themePrimary">
              {slide.label}
            </span>
            <h3 className="mt-5 max-w-2xl font-urdu text-2xl font-bold leading-loose text-themeText sm:text-3xl">
              {slide.title}
            </h3>
            <div className="mt-8 flex items-end gap-4">
              <p className="text-5xl font-black text-themePrimary">
                {slide.stat}
              </p>
              <p className="pb-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                {slide.statLabel}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {slides.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`slider-tab rounded-md border px-3 py-3 text-sm font-bold transition ${
                  activeSlide === index
                    ? 'border-themePrimary bg-themePrimary text-white'
                    : 'border-themeBorder bg-themeSurface text-themeText hover:border-themePrimary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SystemSlider
