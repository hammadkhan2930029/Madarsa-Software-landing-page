import { features } from '../data/landingData'

const fallbackFeatureSection = {
  kicker: 'اہم خصوصیات',
  title: 'مدرسہ کے ہر شعبے کے لیے مکمل حل۔',
  description:
    'یہ سافٹ ویئر روزمرہ کے انتظامی کاموں کو کم وقت میں مکمل کرنے کے لیے بنایا گیا ہے، تاکہ ٹیم ریکارڈ، رپورٹس اور فالو اپ آسانی سے manage کر سکے۔',
  cardLinkLabel: 'مزید جانیں',
}

function FeaturesSection({ featuresData = features, featureSection = null }) {
  const items = featuresData.length ? featuresData : features
  const content = { ...fallbackFeatureSection, ...(featureSection || {}) }

  return (
    <section id="features" className="relative z-10 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="page-reveal mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <p className="text-[1.08rem] font-bold text-themePrimary sm:text-[1.35rem]">{content.kicker}</p>
          <h2 className="mt-3 font-urdu text-[2.05rem] font-bold leading-[1.9] text-themeText sm:text-[3rem] sm:leading-[1.65]">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[1rem] font-bold leading-8 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-theme-body">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((feature, index) => (
            <article
              key={feature.title}
              className="feature-card soft-panel group rounded-2xl border border-themeBorder bg-themeSurface/90 p-6 text-right shadow-card-theme backdrop-blur"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="feature-card-topline" />
              <div className="mb-7 flex items-start justify-between gap-4">
                <span className="feature-number rounded-xl bg-themePrimary/10 px-4 py-2 text-theme-kicker font-black text-themePrimary">
                  {feature.value}
                </span>
                <span className="feature-icon-box">
                  <span className="feature-dot" />
                </span>
              </div>
              <h3 className="font-urdu text-theme-title font-bold text-themeText">
                {feature.title}
              </h3>
              <p className="mt-4 min-h-24 text-theme-body text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center gap-3 text-theme-kicker font-bold text-themePrimary">
                <span className="h-px flex-1 bg-themePrimary/25" />
                <span>{content.cardLinkLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
