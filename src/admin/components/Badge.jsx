import { statusText } from '../constants/statusText'

function Badge({ value, tone = 'success' }) {
  const classes = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    danger: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
    info: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  }

  return (
    <span className={`inline-flex rounded-md border px-3 py-1 text-theme-detail font-black ${classes[tone]}`}>
      {statusText[value] ?? value}
    </span>
  )
}

export default Badge
