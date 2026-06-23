import PageHeader from '../components/PageHeader'
import { navigateTo } from '../utils/navigation'

function NotFoundPage() {
  return (
    <>
      <PageHeader title="صفحہ نہیں ملا" description="یہ مواد والا راستہ دستیاب نہیں۔ ہیرو سیکشن پر واپس جائیں۔" actionLabel={null} />
      <button type="button" onClick={() => navigateTo('/admin/hero')} className="rounded-md bg-themePrimary px-5 py-3 text-theme-button font-bold text-white shadow-card-theme">
        ہیرو سیکشن
      </button>
    </>
  )
}

export default NotFoundPage
