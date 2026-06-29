import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { footerLinks } from '../data/landingData'
import { getAssetUrl, localAssets } from '../utils/assetResolver'

const getRouteHref = (href, label) => {
  if (label === 'ڈیمو' && href === '#contact') return '/#demo'
  if (href === '#contact') return '/contact'
  if (href?.startsWith('#')) return `/${href}`
  return href || '/'
}

const fallbackFooter = {
  ctaKicker: 'مدرسہ مینجمنٹ کو آج ہی آسان بنائیں',
  ctaTitle: 'مکمل ڈیش بورڈ دیکھیں اور اپنی ٹیم کے لئے بہترین فلو منتخب کریں۔',
  ctaButton: 'ویڈیو دیکھیں',
  ctaHref: '/contact',
  ctaVideoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  ctaImageUrl: 'dashboard1.png',
  ctaImageAlt: 'مدرسہ سافٹ ویئر ڈیش بورڈ پریویو',
  description: 'جدید مدرسہ مینجمنٹ کے لئے مکمل سافٹ ویئر حل۔',
  copyright: 'کاپی رائٹ 2026 مدرسہ سافٹ ویئر۔ تمام حقوق محفوظ ہیں۔',
}

function getVideoEmbedUrl(url) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes('youtu.be')) {
      const videoId = parsedUrl.pathname.replace('/', '')
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` : url
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      const videoId = parsedUrl.searchParams.get('v')
      if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`

      if (parsedUrl.pathname.startsWith('/embed/')) {
        return `https://www.youtube-nocookie.com${parsedUrl.pathname}${parsedUrl.search || '?autoplay=1&rel=0'}`
      }
    }

    return url
  } catch {
    return url
  }
}

function Footer({ theme, onNavigate, footer, navLinks = footerLinks, contactItems = [] }) {
  const content = footer || fallbackFooter
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const ctaVideoUrl = content.ctaVideoUrl || fallbackFooter.ctaVideoUrl
  const ctaImageUrl = getAssetUrl(content.ctaImageUrl, localAssets.dashboardOne)
  const videoEmbedUrl = useMemo(() => getVideoEmbedUrl(ctaVideoUrl), [ctaVideoUrl])
  const visibleLinks = navLinks.length ? navLinks : footerLinks
  const email = contactItems.find((item) => item.label?.includes('میل'))?.value || 'info@madrasasoftware.com'
  const phone = contactItems.find((item) => item.label?.includes('فون'))?.value || '+92-331-9998780'
  const address = contactItems.find((item) => item.label?.includes('پتہ'))?.value
    || 'R-5, Row 5, Block D, NCECHS, Gulshan-e-Iqbal Block 10A, Rashid Minhas Road, Karachi, Pakistan.'

  const openVideo = () => {
    if (ctaVideoUrl) setIsVideoOpen(true)
  }

  const handleRouteClick = (event, href, label) => {
    if (ctaVideoUrl && href === (content.ctaHref || '/contact')) {
      event.preventDefault()
      openVideo()
      return
    }

    const routeHref = getRouteHref(href, label)

    if (!routeHref.startsWith('/')) return

    event.preventDefault()
    onNavigate?.(routeHref)
  }

  const videoModal = isVideoOpen && videoEmbedUrl
    ? createPortal(
      <div
        className="fixed inset-0 z-[9999] grid min-h-svh place-items-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="ڈیمو ویڈیو"
        onClick={() => setIsVideoOpen(false)}
      >
        <div
          className="flex w-[min(96vw,1100px)] max-h-[min(88svh,720px)] flex-col overflow-hidden rounded-lg border border-white/15 bg-slate-950 shadow-theme"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
            <p className="text-theme-button font-bold text-white">ڈیمو ویڈیو</p>
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="grid size-9 place-items-center rounded-md bg-white/10 text-xl font-black text-white transition hover:bg-white/15"
              aria-label="ویڈیو بند کریں"
            >
              ×
            </button>
          </div>
          <div className="aspect-video max-h-[calc(88svh-3.75rem)] w-full bg-black">
            <iframe
              title="مدرسہ سافٹ ویئر ڈیمو ویڈیو"
              src={videoEmbedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>,
      document.body,
    )
    : null

  return (
    <>
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

            <div className="footer-cta-visual order-1 mx-auto hidden w-full max-w-xs md:order-3 md:block">
              <button
                type="button"
                onClick={openVideo}
                className="block text-right"
                aria-label="ویڈیو دیکھیں"
              >
                <img src={ctaImageUrl} alt={content.ctaImageAlt || ''} className="footer-cta-laptop" />
              </button>
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
            <div className="footer-dark-column text-center md:text-right">
              <div className="flex justify-center md:justify-start">
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
                    href={getRouteHref(link.href, link.label)}
                    onClick={(event) => handleRouteClick(event, link.href, link.label)}
                    className="footer-dark-link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-dark-column text-center md:text-right">
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
           
          </div>
        </div>
      </div>
    </footer>
    {videoModal}
    </>
  )
}

export default Footer
