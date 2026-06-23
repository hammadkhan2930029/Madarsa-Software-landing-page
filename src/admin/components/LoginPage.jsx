import darkLogo from '../../assets/logos/new2.png'
import lightLogo from '../../assets/logos/new1.png'
import { useState } from 'react'

function LoginPage({ theme, onLogin, error, onError }) {
  const [form, setForm] = useState({ email: 'admin@madarsa.com', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    onError?.('')

    try {
      await onLogin?.(form)
    } catch (apiError) {
      onError?.(apiError.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-shell grid min-h-screen place-items-center p-4" data-theme={theme} dir="rtl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-xl border border-themeBorder bg-themeSurface/95 p-6 text-right shadow-theme"
      >
        <div className="mb-6 flex items-center justify-between border-b border-themeBorder pb-4">
          <img
            src={theme === 'dark' ? darkLogo : lightLogo}
            alt="مدرسہ سافٹ ویئر"
            className="h-16 w-auto max-w-[16rem] object-contain"
          />
        </div>

        <h1 className="font-urdu text-theme-title font-bold text-themeText">
          ایڈمن لاگ اِن
        </h1>
        <p className="text-theme-body text-slate-600 dark:text-slate-300">
          ایڈمن پینل کھولنے کے لیے اپنا لاگ اِن درج کریں۔
        </p>

        <div className="mt-5 grid gap-4">
          <label>
            <span className="mb-2 block text-theme-kicker font-bold text-themeText">
              ای میل
            </span>
            <input
              dir="ltr"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-left text-theme-button text-themeText outline-none focus:border-themePrimary"
              placeholder="admin@madarsa.com"
            />
          </label>

          <label>
            <span className="mb-2 block text-theme-kicker font-bold text-themeText">
              پاس ورڈ
            </span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              dir="ltr"
              required
              className="w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-left text-theme-button text-themeText outline-none focus:border-themePrimary"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-themePrimary px-5 py-3 text-theme-button font-bold text-white shadow-card-theme transition hover:bg-themePrimaryHover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'لاگ اِن ہو رہا ہے...' : 'ایڈمن پینل کھولیں'}
          </button>
          {error && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-theme-kicker font-bold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage
