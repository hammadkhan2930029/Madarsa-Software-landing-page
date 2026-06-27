import { useCallback, useState } from 'react'
import { navigateTo } from '../utils/navigation'
import Sidebar from './Sidebar'

function ChatIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <path d="M10.27 21a2 2 0 0 0 3.46 0" />
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

function AdminLayout({ children, path, theme, onLogout }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleNavigate = useCallback((nextPath) => {
    setIsDrawerOpen(false)
    navigateTo(nextPath)
  }, [])

  return (
    <div className="admin-shell h-screen overflow-hidden bg-themeBg text-themeText" data-theme={theme} dir="rtl">
      <div className="grid h-full lg:grid-cols-[15.5rem_1fr]">
        <div className="hidden h-full lg:block">
          <Sidebar activePath={path} onNavigate={handleNavigate} />
        </div>
        <div className="flex min-h-0 min-w-0 flex-col">
          <header className="admin-topbar-static z-30 shrink-0 border border-themeBorder bg-themeSurface/92 backdrop-blur-xl">
            <div className="admin-topbar-inner">
              <div className="admin-user-block">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="admin-menu-button"
                  aria-label="مینو کھولیں"
                >
                  <MenuIcon />
                </button>
                <div className="admin-avatar" aria-hidden="true">
                  <span />
                </div>
                <div className="text-right">
                 
                  <p className="admin-user-role">
                    <span />
                    سسٹم ایڈمن
                  </p>
                 
                </div>
               
              </div>

              <label className="admin-search">
                <SearchIcon />
                <input placeholder="کچھ بھی تلاش کریں..." />
                <kbd>CTRL&nbsp;&nbsp;K</kbd>
              </label>

              <div className="admin-topbar-actions">
                <button type="button" className="admin-icon-button" aria-label="پیغامات">
                  <ChatIcon />
                </button>
                <button type="button" className="admin-icon-button admin-notification" aria-label="اطلاعات">
                  <BellIcon />
                  <span />
                </button>
                <button type="button" onClick={onLogout} className="admin-icon-button" aria-label="لاگ آؤٹ" title="لاگ آؤٹ">
                  <LogoutIcon />
                </button>
             
              </div>
            </div>
          </header>
          <main className="admin-content-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5 lg:px-6">{children}</main>
        </div>
      </div>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="بند کریں" className="admin-drawer-backdrop absolute inset-0 bg-slate-950/55" onClick={() => setIsDrawerOpen(false)} />
          <div className="admin-drawer absolute inset-y-0 right-0">
            <Sidebar activePath={path} onNavigate={handleNavigate} onClose={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLayout
