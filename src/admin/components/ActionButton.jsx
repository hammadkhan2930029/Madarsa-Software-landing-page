function ActionButton({ children, variant = 'secondary', onClick, type = 'button' }) {
  const className =
    variant === 'primary'
      ? 'bg-themePrimary text-white hover:bg-themePrimaryHover'
      : variant === 'danger'
        ? 'border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
        : 'border border-themeBorder bg-themeSurface text-themeText hover:border-themePrimary hover:text-themePrimary'

  return (
    <button type={type} onClick={onClick} className={`rounded-md px-4 py-2 text-theme-button font-bold shadow-card-theme transition ${className}`}>
      {children}
    </button>
  )
}

export default ActionButton
