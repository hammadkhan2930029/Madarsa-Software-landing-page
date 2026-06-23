import { useEffect, useMemo, useState } from 'react'
import AdminLayout from './components/AdminLayout'
import EditorModal from './components/EditorModal'
import LoginPage from './components/LoginPage'
import { getAdminPage } from './pages/getAdminPage'
import { navigateTo } from './utils/navigation'
import { api } from '../services/api'
import './Admin.css'

const initialAdminContent = {
  hero: null,
  navLinks: null,
  stats: null,
  sliderModules: null,
  features: null,
  demoSection: null,
  footer: null,
  contactItems: null,
  media: null,
  settings: null,
}

function AdminPanel({ theme, onThemeToggle, location }) {
  const path = location.pathname
  const [editorConfig, setEditorConfig] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(api.getAdminToken()))
  const [authStatus, setAuthStatus] = useState(() => (api.getAdminToken() ? 'checking' : 'guest'))
  const [loginError, setLoginError] = useState('')
  const [editorStatus, setEditorStatus] = useState('idle')
  const [editorError, setEditorError] = useState('')
  const [adminContent, setAdminContent] = useState(initialAdminContent)
  const openEditor = (config) => {
    setEditorStatus('idle')
    setEditorError('')
    setEditorConfig(config)
  }
  const deleteRecord = async (resource, row) => {
    if (!resource || !row?.id) return
    if (!window.confirm('کیا آپ واقعی یہ ریکارڈ حذف کرنا چاہتے ہیں؟')) return

    await api.remove(resource, row.id)
    await loadAdminContent()
  }

  const page = useMemo(() => getAdminPage(path, openEditor, adminContent, { deleteRecord }), [path, adminContent])

  const loadAdminContent = async () => {
    const [
      hero,
      navLinks,
      stats,
      sliderModules,
      features,
      demoSection,
      footer,
      contactItems,
      media,
      settings,
    ] = await Promise.all([
      api.list('hero'),
      api.list('nav-links'),
      api.list('stats'),
      api.list('slider-modules'),
      api.list('features'),
      api.list('demo-section'),
      api.list('footer'),
      api.list('contact-items'),
      api.list('media'),
      api.list('settings'),
    ])

    setAdminContent({
      hero,
      navLinks,
      stats,
      sliderModules,
      features,
      demoSection,
      footer,
      contactItems,
      media,
      settings,
    })
  }

  useEffect(() => {
    if (!api.getAdminToken()) {
      return
    }

    let isMounted = true
    api.me()
      .then(() => {
        if (!isMounted) return
        setIsLoggedIn(true)
        setAuthStatus('authenticated')
        loadAdminContent().catch(() => {})
      })
      .catch(() => {
        if (!isMounted) return
        api.clearAdminToken()
        setIsLoggedIn(false)
        setAuthStatus('guest')
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogin = async (credentials) => {
    setLoginError('')
    const response = await api.login(credentials)
    api.setAdminToken(response.token)
    setIsLoggedIn(true)
    setAuthStatus('authenticated')
    loadAdminContent().catch(() => {})
    navigateTo('/admin/hero')
  }

  const uploadEditorFile = async (config, payload, files) => {
    const file = files.file || files.imageUrl
    if (!file) return payload

    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', payload.name || payload.altText || file.name)
    formData.append('usedIn', payload.usedIn || config.resource || '')
    formData.append('altText', payload.altText || payload.name || file.name)
    formData.append('type', payload.type || 'image')
    formData.append('status', payload.status || 'active')

    const uploaded = await api.uploadMedia(formData)
    if (config.media) return uploaded
    return { ...payload, imageUrl: uploaded.fileUrl }
  }

  const handleEditorSubmit = async (config, payload, files) => {
    if (!config?.resource) {
      setEditorError('یہ فارم backend resource سے منسلک نہیں ہے')
      return
    }

    setEditorStatus('saving')
    setEditorError('')

    try {
      const finalPayload = await uploadEditorFile(config, payload, files)

      if (config.media) {
        if (!files.file) throw new Error('میڈیا محفوظ کرنے کے لئے فائل منتخب کریں')
      } else if (config.singleton) {
        await api.updateSingleton(config.resource, finalPayload)
      } else if (config.mode === 'edit' && config.values?.id) {
        await api.update(config.resource, config.values.id, finalPayload)
      } else {
        await api.create(config.resource, finalPayload)
      }

      await loadAdminContent()
      setEditorStatus('saved')
      setEditorConfig(null)
    } catch (error) {
      setEditorError(error.message || 'ریکارڈ محفوظ نہیں ہو سکا')
      setEditorStatus('idle')
    }
  }

  const handleEditorDelete = async (config) => {
    if (!config?.resource || !config.values?.id || config.singleton) return

    setEditorStatus('deleting')
    setEditorError('')

    try {
      await api.remove(config.resource, config.values.id)
      await loadAdminContent()
      setEditorConfig(null)
      setEditorStatus('idle')
    } catch (error) {
      setEditorError(error.message || 'ریکارڈ حذف نہیں ہو سکا')
      setEditorStatus('idle')
    }
  }

  if (authStatus === 'checking') {
    return (
      <div className="admin-shell grid min-h-screen place-items-center bg-themeBg text-themeText" data-theme={theme} dir="rtl">
        <p className="text-theme-body font-bold text-themePrimary">ایڈمن سیشن چیک ہو رہا ہے...</p>
      </div>
    )
  }

  if (!isLoggedIn || path === '/admin/login') {
    return (
      <LoginPage
        theme={theme}
        onLogin={handleLogin}
        error={loginError}
        onError={setLoginError}
      />
    )
  }

  return (
    <AdminLayout path={path === '/admin' ? '/admin/hero' : path} theme={theme} onThemeToggle={onThemeToggle}>
      {page}
      <EditorModal
        config={editorConfig}
        onClose={() => setEditorConfig(null)}
        onSubmit={handleEditorSubmit}
        onDelete={handleEditorDelete}
        status={editorStatus}
        error={editorError}
      />
    </AdminLayout>
  )
}

export default AdminPanel
