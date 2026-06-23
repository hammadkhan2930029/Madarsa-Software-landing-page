import darkLogo from '../../assets/logos/new2.png'
import { navItems } from '../constants/adminNavigation'

function Sidebar({ activePath, onNavigate, onClose }) {
  return (
    <aside className="admin-sidebar flex h-full w-[15.5rem] max-w-[84vw] flex-col border-l border-white/10 bg-themeBg text-sidebar-textHover shadow-theme">
      <div className="flex justify-end p-1.5">
        {onClose && (
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-md border border-white/15 bg-white/10 text-white">
            ×
          </button>
        )}
      </div>

      <div className="flex min-h-24 items-center justify-center gap-2 border-b border-white/10 px-3">
        <img src={darkLogo} alt="مدرسہ سافٹ ویئر" className="h-16 w-auto max-w-[13rem] object-contain" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map((item) => {
          const isActive = activePath === item.path || activePath.startsWith(item.path)
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={`admin-sidebar-link flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-right font-bold ${isActive ? 'admin-sidebar-link-active bg-sidebar-activeBg text-sidebar-textHover' : 'text-sidebar-text hover:text-sidebar-textHover'}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-sidebar-surface text-base font-black text-sidebar-textHover">{item.icon}</span>
              <span className="admin-sidebar-label">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
