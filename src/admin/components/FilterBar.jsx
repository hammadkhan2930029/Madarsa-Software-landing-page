import ActionButton from './ActionButton'

function FilterBar({ searchPlaceholder = 'مواد تلاش کریں', filters = ['سیکشن', 'اسٹیٹس', 'ترتیب'] }) {
  return (
    <div className="admin-filter mb-4 grid gap-3 rounded-xl border border-themeBorder bg-themeSurface/90 p-4 shadow-card-theme md:grid-cols-[1fr_auto]">
      <input
        className="min-h-12 rounded-full border border-themeBorder bg-themeBg px-5 text-right text-theme-button text-themeText outline-none transition focus:border-themePrimary"
        placeholder={searchPlaceholder}
      />
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button key={filter} type="button" className="rounded-md border border-themeBorder bg-themeSurface px-4 py-2 text-theme-button font-bold text-themeText transition hover:border-themePrimary">
            {filter}
          </button>
        ))}
        <ActionButton variant="primary">پیش منظر</ActionButton>
      </div>
    </div>
  )
}

export default FilterBar
