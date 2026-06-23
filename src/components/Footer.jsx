import { footerLinks } from '../data/landingData'
import { localAssets } from '../utils/assetResolver'

const getRouteHref = (href) => {
  if (href === '#contact') return '/contact'
  if (href?.startsWith('#')) return `/${href}`
  return href || '/'
}

const fallbackFooter = {
  ctaKicker: 'مدرسہ مینجمنٹ کو آج ہی آسان بنائیں',
  ctaTitle: 'مکمل ڈیش بورڈ دیکھیں اور اپنی ٹیم کے لئے بہترین فلو منتخب کریں۔',
  ctaButton: 'ڈیمو درخواست دیں',
  ctaHref: '/contact',
  description: 'جدید مدرسہ مینجمنٹ کے لئے مکمل سافٹ ویئر حل۔',
  copyright: 'کاپی رائٹ 2026 مدرسہ سافٹ ویئر۔ تمام حقوق محفوظ ہیں۔',
}


function Footer({ theme, onNavigate, footer, navLinks = footerLinks, contactItems = [] }) {
  const brandLogo = theme === 'dark' ? localAssets.darkLogo : localAssets.lightLogo
  const content = footer || fallbackFooter
  const visibleLinks = navLinks.length ? navLinks : footerLinks
  const email = contactItems.find((item) => item.label?.includes('میل'))?.value || 'info@madrasasoftware.com'
  const phone = contactItems.find((item) => item.label?.includes('فون'))?.value || '+92-331-9998780'
  const address = contactItems.find((item) => item.label?.includes('پتہ'))?.value
    || 'R-5, Row 5, Block D, NCECHS, Gulshan-e-Iqbal Block 10A, Rashid Minhas Road, Karachi, Pakistan.'

  const handleRouteClick = (event, href) => {
    const routeHref = getRouteHref(href)

    if (!routeHref.startsWith('/')) return

    event.preventDefault()
    onNavigate?.(routeHref)
  }

  return (
    <footer className="footer-shell relative z-10 border-t border-themeBorder bg-themeSurface/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 pt-7 text-right sm:px-6 lg:px-8">
        <div className="footer-cta soft-panel rounded-lg border border-themeBorder bg-themeBg/80 p-5 shadow-card-theme sm:p-6">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <a
              href={content.ctaHref || '/contact'}
              onClick={(event) => handleRouteClick(event, content.ctaHref || '/contact')}
              className="footer-cta-button hero-action order-3 rounded-md bg-themePrimary px-5 py-3 text-center text-theme-button font-bold text-white shadow-card-theme transition hover:bg-themePrimaryHover md:order-1"
            >
              {content.ctaButton}
            </a>

            <div className="order-2 text-center md:text-right">
              <p className="footer-cta-kicker text-theme-body font-bold text-themePrimary">
                {content.ctaKicker}
              </p>
              <h2 className="footer-cta-title mt-2 font-urdu text-theme-title font-bold text-themeText">
                {content.ctaTitle}
              </h2>
            </div>

            <div className="footer-cta-visual order-1 mx-auto hidden w-full max-w-xs md:order-3 md:block" aria-hidden="true">
              <img src={localAssets.dashboardOne} alt="" className="footer-cta-laptop" />
              <span className="footer-cta-bubble footer-cta-bubble-1">✓</span>
              <span className="footer-cta-bubble footer-cta-bubble-2">رپورٹ</span>
              <span className="footer-cta-bubble footer-cta-bubble-3">فیس</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main-dark mt-7">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="footer-dark-column text-right">
              <div className="flex justify-start">
                <img
                  src={localAssets.darkLogo}
                  alt="مدرسہ سافٹ ویئر"
                  className="footer-dark-logo"
                />
              </div>
             
              <p className="footer-dark-text mt-3">
                ہمارا مقصد جدید ٹیکنالوجی کے ذریعے مدارس کے نظام کو آسان، محفوظ اور منظم بنانا ہے۔
              </p>
            </div>

            <div className="footer-dark-column text-center">
              <h3 className="footer-dark-title">فوری لنکس</h3>
              <div className="mt-3 grid gap-2">
                {visibleLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={getRouteHref(link.href)}
                    onClick={(event) => handleRouteClick(event, link.href)}
                    className="footer-dark-link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-dark-column text-left md:text-right">
              <h3 className="footer-dark-title">رابطہ</h3>
              <div className="mt-3 grid gap-3">
                <a href={`mailto:${email}`} className="footer-contact-row" dir="ltr">
                  <span className="footer-contact-icon">@</span>
                  {email}
                </a>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="footer-contact-row" dir="ltr">
                  <span className="footer-contact-icon">☎</span>
                  {phone}
                </a>
                <span className="footer-contact-row text-start" dir="ltr">
                  <span className="footer-contact-icon">⌖</span>
                  {address}
                </span>
              </div>
            </div>
          </div>

          <div className="footer-dark-bottom mt-7 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm font-bold text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>{content.copyright}</p>
            <p>Frontend + Backend ready management platform</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
