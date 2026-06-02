import dashboardImage from '../assets/dashboard1.png'
import { previewCards } from '../data/landingData'

function HeroSection() {
  return (
    <section id="top" className="relative z-10 pt-16">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
        <div className="max-w-3xl text-right">
          <p className="hero-reveal mb-4 inline-flex rounded-md border border-themeBorder bg-themeSurface px-3 py-1 text-sm font-bold text-themePrimary shadow-card-theme">
            مکمل فرنٹ اینڈ اور بیک اینڈ کے ساتھ مدرسہ مینجمنٹ پلیٹ فارم
          </p>
          <h1 className="hero-reveal hero-reveal-delay-1 mb-5 max-w-4xl font-urdu text-4xl font-bold leading-loose text-themeText sm:text-5xl lg:text-6xl">
            مدرسہ کے تمام انتظامی کام ایک جدید ڈیش بورڈ میں سنبھالیں۔
          </h1>
          <p className="hero-reveal hero-reveal-delay-2 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            طلبہ، اساتذہ، کلاسز، حاضری، مالیات، حفظ کی پیش رفت اور رپورٹس
            کے لیے تیز، صاف اور باقاعدہ سافٹ ویئر۔
          </p>

          <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#slider"
              className="hero-action rounded-md bg-themePrimary px-6 py-3 text-center text-sm font-bold text-white shadow-theme transition hover:bg-themePrimaryHover"
            >
              ماڈیولز دیکھیں
            </a>
            <a
              href="#features"
              className="hero-action rounded-md border border-themeBorder bg-themeSurface px-6 py-3 text-center text-sm font-bold text-themeText shadow-card-theme transition hover:border-themePrimary"
            >
              خصوصیات دیکھیں
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {previewCards.map((card, index) => (
              <div
                key={card.name}
                className="hero-stat-card rounded-lg border border-themeBorder bg-themeSurface p-4 shadow-card-theme"
                style={{ animationDelay: `${520 + index * 110}ms` }}
              >
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {card.name}
                </p>
                <p className="mt-2 text-sm font-bold text-themeText">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto lg:-mt-25 w-full max-w-2xl  ">
          <div className="hero-dashboard hero-dashboard-image rounded-2xl border border-themeBorder bg-themeSurface/85 p-3 text-right shadow-theme backdrop-blur">
            <img
              src={dashboardImage}
              alt="مدرسہ سسٹم ڈیش بورڈ کا پیش منظر"
              className="block w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
