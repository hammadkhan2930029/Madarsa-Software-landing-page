import { footerLinks } from '../data/landingData'

function Footer() {
  return (
    <footer className="footer-shell relative z-10 border-t border-themeBorder bg-themeSurface/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-8 text-right sm:px-6 lg:px-8">
        <div className="footer-cta soft-panel rounded-2xl border border-themeBorder bg-themeBg/80 p-6 shadow-card-theme">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold text-themePrimary">
                مدرسہ مینجمنٹ کو آج ہی آسان بنائیں
              </p>
              <h2 className="mt-2 font-urdu text-3xl font-bold leading-loose text-themeText">
                مکمل ڈیمو دیکھیں اور اپنی ٹیم کے لیے بہترین flow منتخب کریں۔
              </h2>
            </div>
            <a
              href="#contact"
              className="hero-action rounded-md bg-themePrimary px-6 py-3 text-center text-sm font-bold text-white shadow-card-theme transition hover:bg-themePrimaryHover"
            >
              ڈیمو درخواست دیں
            </a>
          </div>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-themePrimary text-xl font-black text-white shadow-card-theme">
                م
              </span>
              <div>
                <p className="font-urdu text-2xl font-bold text-themeText">
                  مدرسہ سسٹم
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  جدید مدرسہ مینجمنٹ کے لیے مکمل سافٹ ویئر حل۔
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-black text-themeText">
              فوری لنکس
            </p>
            <div className="grid gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link text-sm font-bold text-slate-600 transition hover:text-themePrimary dark:text-slate-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-black text-themeText">رابطہ</p>
            <div className="grid gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
              <span>demo@madarsa.local</span>
              <span>03xx-xxxxxxx</span>
              <span>پاکستان</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-themeBorder pt-5 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 مدرسہ سسٹم۔ تمام حقوق محفوظ ہیں۔</p>
          <p>Frontend + Backend ready management platform</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
