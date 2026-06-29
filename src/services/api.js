// const BASE_URL = 'http://localhost:5000/api'
const BASE_URL = 'https://api.madrasasoftware.com/api'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || BASE_URL).replace(/\/+$/, '')
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '')
const ADMIN_TOKEN_KEY = 'madarsa_admin_token'

function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem('madarsa_admin_logged_in')
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const isFormData = options.body instanceof FormData

  if (!isFormData && options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getAdminToken()
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: isFormData || !options.body ? options.body : JSON.stringify(options.body),
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    throw new Error(payload?.message || 'API request failed')
  }

  return payload
}

export const api = {
  ADMIN_TOKEN_KEY,
  getAdminToken,
  setAdminToken,
  clearAdminToken,
  getLanding: () => request('/public/landing'),
  createDemoRequest: (data) => request('/public/demo-requests', { method: 'POST', body: data }),
  login: (data) => request('/admin/auth/login', { method: 'POST', body: data }),
  me: () => request('/admin/auth/me'),
  list: (resource) => request(`/admin/${resource}`),
  create: (resource, data) => request(`/admin/${resource}`, { method: 'POST', body: data }),
  update: (resource, id, data) => request(`/admin/${resource}/${id}`, { method: 'PUT', body: data }),
  updateSingleton: (resource, data) => request(`/admin/${resource}`, { method: 'PUT', body: data }),
  remove: (resource, id) => request(`/admin/${resource}/${id}`, { method: 'DELETE' }),
  uploadMedia: (formData) => request('/admin/media/upload', { method: 'POST', body: formData }),
}

export function resolveAssetUrl(file) {
  if (!file) return ''
  const normalizedFile = String(file).trim().replace(/\\/g, '/')

  if (/^(https?:)?\/\//.test(normalizedFile) || normalizedFile.startsWith('data:')) {
    return normalizedFile
  }

  if (normalizedFile.startsWith('/uploads/') || normalizedFile.startsWith('uploads/')) {
    const uploadPath = normalizedFile.startsWith('/') ? normalizedFile : `/${normalizedFile}`
    return `${API_ORIGIN}${uploadPath}`
  }

  return null
}
