import ActionButton from './ActionButton'
import Badge from './Badge'

function getPayload(form, fields) {
  const payload = {}
  const files = {}

  fields.forEach((field) => {
    if (!field.name) return

    const element = form.elements[field.name]
    if (!element) return

    if (field.type === 'file') {
      const file = element.files?.[0]
      if (file) files[field.name] = file
      if (!file && field.value) payload[field.name] = field.value
      return
    }

    payload[field.name] = element.value
  })

  return { payload, files }
}

function FormPanel({
  title,
  fields,
  submitLabel = 'تبدیلیاں محفوظ کریں',
  onSubmit,
  onDelete,
  status = 'idle',
  error = '',
  canDelete = false,
}) {
  const isSaving = status === 'saving'
  const isDeleting = status === 'deleting'

  const handleSubmit = (event) => {
    event.preventDefault()
    const { payload, files } = getPayload(event.currentTarget, fields)
    onSubmit?.(payload, files)
  }

  const handleClear = (event) => {
    event.currentTarget.form?.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form rounded-xl border border-themeBorder bg-themeSurface/95 p-5 text-right shadow-card-theme">
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-themeBorder pb-4">
        <h2 className="font-urdu text-theme-title font-bold text-themeText">{title}</h2>
        <Badge value={status === 'saved' ? 'محفوظ ہو گیا' : 'Backend'} tone={status === 'saved' ? 'success' : 'info'} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className={field.type === 'textarea' ? 'block md:col-span-2' : 'block'}>
            <span className="mb-2 block text-theme-kicker font-bold text-themeText">{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                className="min-h-32 w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-right text-theme-button text-themeText outline-none transition focus:border-themePrimary"
                placeholder={field.placeholder}
                defaultValue={field.value ?? ''}
              />
            ) : field.type === 'file' ? (
              <div className="rounded-md border border-dashed border-themeBorder bg-themeBg p-4 transition focus-within:border-themePrimary hover:border-themePrimary">
                <input id={field.label} name={field.name} type="file" accept={field.accept ?? 'image/*'} className="sr-only" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-theme-button font-bold text-themeText">{field.value ?? 'فائل منتخب نہیں ہوئی'}</p>
                    <p className="text-theme-detail font-bold text-slate-500 dark:text-slate-400">
                      تصویر منتخب کریں یا موجودہ فائل تبدیل کریں
                    </p>
                  </div>
                  <label htmlFor={field.label} className="cursor-pointer rounded-md bg-themePrimary px-4 py-2 text-center text-theme-button font-bold text-white shadow-card-theme transition hover:bg-themePrimaryHover">
                    فائل امپورٹ کریں
                  </label>
                </div>
              </div>
            ) : (
              <input
                name={field.name}
                className="w-full rounded-md border border-themeBorder bg-themeBg px-4 py-3 text-right text-theme-button text-themeText outline-none transition focus:border-themePrimary"
                placeholder={field.placeholder}
                defaultValue={field.value ?? ''}
              />
            )}
          </label>
        ))}
      </div>
      {error && (
        <div className="mt-5 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-theme-kicker font-bold text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <ActionButton variant="primary" type="submit">{isSaving ? 'محفوظ ہو رہا ہے...' : submitLabel}</ActionButton>
        <ActionButton onClick={handleClear}>صاف کریں</ActionButton>
        {canDelete && (
          <ActionButton variant="danger" onClick={onDelete}>
            {isDeleting ? 'حذف ہو رہا ہے...' : 'ریکارڈ حذف کریں'}
          </ActionButton>
        )}
      </div>
    </form>
  )
}

export default FormPanel
