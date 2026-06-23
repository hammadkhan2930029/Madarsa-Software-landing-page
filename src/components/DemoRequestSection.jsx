import { useState } from 'react'
import dashboardPreview from '../assets/dashboard2.png'
import { api } from '../services/api'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  madarsa: '',
}

const fallbackDemoSection = {
  kicker: 'ڈیمو درخواست',
  title: 'ڈیمو اکاؤنٹ حاصل کریں۔',
  description: 'اپنی بنیادی معلومات بھیجیں، ہماری ٹیم آپ کو ڈیمو لاگ اِن اور پاس ورڈ دے کر سسٹم کا مکمل جائزہ فراہم کرے گی۔',
  submitLabel: 'ڈیمو درخواست بھیجیں',
  successMessage: 'آپ کی درخواست محفوظ ہو گئی ہے۔ ہماری ٹیم جلد رابطہ کرے گی۔',
}

const benefits = [
  {
    label: 'مفت ڈیمو',
    icon: (
      <>
        <path d="M12 3v12" />
        <path d="m8 11 4 4 4-4" />
        <path d="M4 21h16" />
      </>
    ),
  },
  {
    label: 'ہر وقت بیک اپ',
    icon: (
      <>
        <path d="M12 8v4l3 3" />
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M21 3v6h-6" />
      </>
    ),
  },
  {
    label: 'آسان سپورٹ',
    icon: (
      <>
        <path d="M12 2a10 10 0 0 0-7.9 16.1L2 22l3.9-2.1A10 10 0 1 0 12 2Z" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
      </>
    ),
  },
]

function DemoRequestSection({ demoSection }) {
  const [form, setForm] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const content = demoSection || fallbackDemoSection

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await api.createDemoRequest(form)
      setIsSubmitted(true)
      setForm(initialForm)
    } catch (apiError) {
      setError(apiError.message || 'درخواست مکمل نہیں ہو سکی')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative z-10 py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="demo-request-shell soft-panel grid gap-7 rounded-[40px] p-5 shadow-theme sm:p-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:p-8 lg:[direction:rtl]">
          <form
            onSubmit={handleSubmit}
            className="request-card demo-form-card w-full rounded-[40px] bg-white p-5 text-right shadow-card-theme sm:p-6 lg:p-7"
          >
            <h3 className="mb-5 font-urdu text-[2rem] font-bold leading-[1.7] text-slate-800 sm:text-[2.35rem]">
              اپنی معلومات درج کریں
            </h3>

            <div className="grid gap-3">
              <label className="block">
                <span className="sr-only">آپ کا نام</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-right text-theme-button text-slate-800 outline-none transition focus:border-themePrimary focus:ring-4 focus:ring-emerald-100"
                  placeholder="آپ کا نام"
                />
              </label>

              <label className="block">
                <span className="sr-only">فون نمبر</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-right text-theme-button text-slate-800 outline-none transition focus:border-themePrimary focus:ring-4 focus:ring-emerald-100"
                  dir="rtl"
                  placeholder="+92-331-9998780"
                />
              </label>

              <label className="block">
                <span className="sr-only">ای میل</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-right text-theme-button text-slate-800 outline-none transition focus:border-themePrimary focus:ring-4 focus:ring-emerald-100"
                  dir="rtl"
                  placeholder="info@example.com"
                />
              </label>

              <label className="block">
                <span className="sr-only">مدرسہ یا ادارہ</span>
                <input
                  name="madarsa"
                  value={form.madarsa}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-right text-theme-button text-slate-800 outline-none transition focus:border-themePrimary focus:ring-4 focus:ring-emerald-100"
                  placeholder="مدرسہ / ادارہ کا نام"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="hero-action mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-themePrimary px-5 py-3 text-theme-button font-bold text-white shadow-card-theme transition hover:bg-themePrimaryHover disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
              {isSubmitting ? 'بھیج رہے ہیں...' : content.submitLabel}
            </button>

            {isSubmitted && (
              <div className="mt-4 rounded-md border border-themePrimary/35 bg-themePrimary/10 p-3 text-theme-kicker font-bold text-themePrimary">
                {content.successMessage}
              </div>
            )}
            {error && (
              <div className="mt-4 rounded-md border border-rose-500/40 bg-rose-500/10 p-3 text-theme-kicker font-bold text-rose-700">
                {error}
              </div>
            )}
          </form>

          <div className="demo-copy-panel grid gap-6 text-right text-white lg:grid-cols-[0.9fr_1fr] lg:items-center lg:[direction:ltr]">
            <div className="demo-visual-card mx-auto w-full max-w-sm rounded-lg p-4 lg:[direction:rtl]">
              <img
                src={dashboardPreview}
                alt="مدرسہ سافٹ ویئر ڈیمو"
                className="demo-visual-image mx-auto block w-full rounded-md"
              />
            </div>

            <div className="lg:[direction:rtl]">
              <p className="text-[1.15rem] font-bold text-white/85">{content.kicker}</p>
              <h2 className="mt-2 font-urdu text-[2.35rem] font-bold leading-[1.75] text-white sm:text-[2.8rem]">
                {content.title}
              </h2>
              <p className="mt-3 max-w-xl text-[1.28rem] font-bold leading-9 text-white/85">
                {content.description}
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit.label} className="grid place-items-center gap-2 text-center">
                    <span className="demo-benefit-icon">
                      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                        {benefit.icon}
                      </svg>
                    </span>
                    <span className="text-[1.05rem] font-bold text-white/90">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoRequestSection
