import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'

function formatSubmissionDate(value) {
  if (!value) return '-'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('ur-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function DemoRequestsPage({ demoRequests = [] }) {
  const rows = demoRequests || []

  return (
    <>
      <PageHeader
        title="ڈیمو درخواستیں"
        description="لینڈنگ پیج کا ڈیمو فارم جمع کروانے والے افراد کی معلومات۔"
        actionLabel={null}
      />

      <AdminTable
        columns={[
          { key: 'name', label: 'نام' },
          { key: 'phone', label: 'فون نمبر' },
          { key: 'email', label: 'ای میل' },
          { key: 'madarsa', label: 'مدرسہ / ادارہ' },
          { key: 'referral_code', label: 'ریفرل کوڈ', render: (row) => row.referral_code || '-' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} tone="info" /> },
          { key: 'created_at', label: 'جمع ہونے کا وقت', render: (row) => formatSubmissionDate(row.created_at) },
        ]}
        rows={rows}
        showActions={false}
      />

      {!rows.length && (
        <p className="mt-4 rounded-xl border border-themeBorder bg-themeSurface p-5 text-center text-theme-body text-slate-600 dark:text-slate-300">
          ابھی کوئی ڈیمو درخواست موصول نہیں ہوئی۔
        </p>
      )}
    </>
  )
}

export default DemoRequestsPage
