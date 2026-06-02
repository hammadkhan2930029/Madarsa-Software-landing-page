import { useState } from 'react'

const initialForm = {
  name: '',
  phone: '',
  madarsa: '',
}

function DemoRequestSection() {
  const [form, setForm] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="relative z-10 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div className="page-reveal text-right">
          <p className="text-sm font-bold text-themePrimary">ڈیمو درخواست</p>
          <h2 className="mt-3 font-urdu text-3xl font-bold leading-loose text-themeText sm:text-4xl">
            ڈیمو اکاؤنٹ حاصل کریں۔
          </h2>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
            اپنی بنیادی معلومات بھیجیں۔ ہماری ٹیم آپ کو demo login اور password
            دے کر سسٹم کا مکمل walkthrough فراہم کرے گی۔
          </p>

          <div className="credential-card soft-panel mt-8 rounded-2xl border border-themeBorder bg-themeSurface/90 p-5 text-right shadow-card-theme backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-themePrimary">
                  ڈیمو رسائی
                </p>
                <h3 className="mt-2 font-urdu text-2xl font-bold text-themeText">
                  Demo Credentials
                </h3>
              </div>
              <span className="credential-lock">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="credential-field rounded-xl border border-themeBorder bg-themeBg p-4">
                <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  Login
                </p>
                <p className="mt-2 break-all font-bold text-themeText">
                  demo@madarsa.local
                </p>
              </div>
              <div className="credential-field rounded-xl border border-themeBorder bg-themeBg p-4">
                <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  Password
                </p>
                <p className="mt-2 font-bold text-themeText">Demo@12345</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              نوٹ: اصل demo access request کے بعد confirm کیا جائے گا۔
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="request-card soft-panel rounded-xl border border-themeBorder bg-themeSurface/90 p-5 text-right shadow-theme backdrop-blur sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-themeBorder pb-4">
            <div>
              <p className="text-sm font-bold text-themePrimary">
                Request Form
              </p>
              <h3 className="mt-1 font-urdu text-2xl font-bold text-themeText">
                اپنی معلومات درج کریں
              </h3>
            </div>
            <span className="credential-lock">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5" />
                <path d="M12 15V3" />
              </svg>
            </span>
          </div>

          <div className="grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-themeText">
                آپ کا نام
              </span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-right text-themeText outline-none transition focus:border-themePrimary"
                placeholder="مثلاً محمد احمد"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-themeText">
                فون نمبر
              </span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-right text-themeText outline-none transition focus:border-themePrimary"
                placeholder="03xx-xxxxxxx"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-themeText">
                مدرسہ / ادارہ کا نام
              </span>
              <input
                name="madarsa"
                value={form.madarsa}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-right text-themeText outline-none transition focus:border-themePrimary"
                placeholder="مثلاً جامعہ تعلیم القرآن"
              />
            </label>
          </div>

          <button
            type="submit"
            className="hero-action mt-5 w-full rounded-md bg-themePrimary px-5 py-3 text-sm font-bold text-white shadow-card-theme transition hover:bg-themePrimaryHover"
          >
            درخواست بھیجیں
          </button>

          {isSubmitted && (
            <div className="mt-5 rounded-lg border border-themePrimary/40 bg-themePrimary/10 p-4 text-sm font-bold leading-7 text-themePrimary">
              آپ کی درخواست محفوظ ہو گئی ہے۔ ہماری ٹیم جلد رابطہ کرے گی۔
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default DemoRequestSection
