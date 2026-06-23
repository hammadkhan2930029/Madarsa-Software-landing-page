import ActionButton from './ActionButton'

function PageHeader({ title, description, actionLabel = 'نیا ریکارڈ شامل کریں', onAction }) {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="text-right">
        <p className="text-theme-kicker font-bold text-themePrimary">لینڈنگ پیج ایڈمن</p>
        <h1 className="font-urdu text-theme-title font-bold text-themeText">{title}</h1>
        <p className="max-w-4xl text-theme-body text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {actionLabel && <ActionButton variant="primary" onClick={onAction}>{actionLabel}</ActionButton>}
    </div>
  )
}

export default PageHeader
