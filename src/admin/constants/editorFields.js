import { demoSection, footerContent, heroContent } from '../adminData'

export const editorFields = {
  hero: [
    { label: 'بالائی متن', value: heroContent.kicker },
    { label: 'مرکزی عنوان', value: heroContent.title, type: 'textarea' },
    { label: 'تفصیل', value: heroContent.description, type: 'textarea' },
    { label: 'بنیادی بٹن کا متن', value: heroContent.primaryCta },
    { label: 'دوسرے بٹن کا متن', value: heroContent.secondaryCta },
    { label: 'ہیرو تصویر کی فائل', value: heroContent.image, type: 'file' },
  ],
  navigation: [{ label: 'نام' }, { label: 'لنک' }, { label: 'مقام' }, { label: 'ترتیب نمبر' }],
  stats: [{ label: 'کارڈ کا نام' }, { label: 'کارڈ کی قدر' }, { label: 'ترتیب نمبر' }, { label: 'حالت' }],
  slider: [
    { label: 'ماڈیول نام' },
    { label: 'عنوان', type: 'textarea' },
    { label: 'عدد' },
    { label: 'عدد کا لیبل' },
    { label: 'تصویر کی فائل', type: 'file' },
    { label: 'ترتیب' },
  ],
  features: [{ label: 'عنوان' }, { label: 'تفصیل', type: 'textarea' }, { label: 'ترتیب' }, { label: 'حالت' }],
  demo: [
    { label: 'بالائی متن', value: demoSection.kicker },
    { label: 'عنوان', value: demoSection.title },
    { label: 'تفصیل', value: demoSection.description, type: 'textarea' },
    { label: 'بٹن کا متن', value: demoSection.submitLabel },
    { label: 'کامیابی کا پیغام', value: demoSection.successMessage, type: 'textarea' },
  ],
  footer: [
    { label: 'CTA بالائی متن', value: footerContent.ctaKicker },
    { label: 'CTA عنوان', value: footerContent.ctaTitle, type: 'textarea' },
    { label: 'CTA بٹن', value: footerContent.ctaButton },
    { label: 'فوٹر تفصیل', value: footerContent.description, type: 'textarea' },
    { label: 'کاپی رائٹ متن', value: footerContent.copyright },
  ],
  contact: [{ label: 'نام' }, { label: 'قدر' }, { label: 'معاون متن' }, { label: 'حالت' }],
  media: [{ label: 'اثاثہ نام' }, { label: 'فائل اپ لوڈ', type: 'file' }, { label: 'استعمال ہونے والا سیکشن' }, { label: 'متبادل متن' }],
  settingsSeo: [
    { label: 'براؤزر عنوان', value: 'مدرسہ سافٹ ویئر' },
    { label: 'میٹا تفصیل', type: 'textarea' },
    { label: 'فیویکون فائل' },
    { label: 'لائٹ لوگو' },
    { label: 'ڈارک لوگو' },
  ],
}

function getValue(source, keys) {
  if (!source) return undefined
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null) return source[key]
  }
  return undefined
}

function getFieldKeys(fields) {
  if (fields === editorFields.hero) {
    return [
      ['kicker'],
      ['title'],
      ['description'],
      ['primaryCta'],
      ['secondaryCta'],
      ['image', 'imageUrl'],
    ]
  }
  if (fields === editorFields.navigation) {
    return [['label'], ['href'], ['placement'], ['sortOrder', 'order']]
  }
  if (fields === editorFields.stats) {
    return [['name'], ['value'], ['sortOrder', 'order'], ['status']]
  }
  if (fields === editorFields.slider) {
    return [['label'], ['title'], ['stat'], ['statLabel'], ['imageUrl', 'image'], ['sortOrder', 'order']]
  }
  if (fields === editorFields.features) {
    return [['title'], ['description'], ['sortOrder', 'order', 'value'], ['status']]
  }
  if (fields === editorFields.demo) {
    return [['kicker'], ['title'], ['description'], ['submitLabel'], ['successMessage']]
  }
  if (fields === editorFields.footer) {
    return [['ctaKicker'], ['ctaTitle'], ['ctaButton'], ['description'], ['copyright']]
  }
  if (fields === editorFields.contact) {
    return [['label'], ['value'], ['helper'], ['status']]
  }
  if (fields === editorFields.media) {
    return [['name'], ['fileUrl', 'file'], ['usedIn'], ['altText']]
  }
  if (fields === editorFields.settingsSeo) {
    return [['siteTitle'], ['metaDescription'], ['favicon'], ['logoLight'], ['logoDark']]
  }
  return []
}

function getFieldNames(fields) {
  if (fields === editorFields.hero) {
    return ['kicker', 'title', 'description', 'primaryCta', 'secondaryCta', '']
  }
  if (fields === editorFields.navigation) {
    return ['label', 'href', 'placement', 'sortOrder']
  }
  if (fields === editorFields.stats) {
    return ['name', 'value', 'sortOrder', 'status']
  }
  if (fields === editorFields.slider) {
    return ['label', 'title', 'stat', 'statLabel', 'imageUrl', 'sortOrder']
  }
  if (fields === editorFields.features) {
    return ['title', 'description', 'sortOrder', 'status']
  }
  if (fields === editorFields.demo) {
    return ['kicker', 'title', 'description', 'submitLabel', 'successMessage']
  }
  if (fields === editorFields.footer) {
    return ['ctaKicker', 'ctaTitle', 'ctaButton', 'description', 'copyright']
  }
  if (fields === editorFields.contact) {
    return ['label', 'value', 'helper', 'status']
  }
  if (fields === editorFields.media) {
    return ['name', 'file', 'usedIn', 'altText']
  }
  if (fields === editorFields.settingsSeo) {
    return ['siteTitle', 'metaDescription', 'favicon', 'logoLight', 'logoDark']
  }
  return []
}

function getEditorMeta(fields) {
  if (fields === editorFields.hero) return { resource: 'hero', singleton: true }
  if (fields === editorFields.navigation) return { resource: 'nav-links' }
  if (fields === editorFields.stats) return { resource: 'stats' }
  if (fields === editorFields.slider) return { resource: 'slider-modules' }
  if (fields === editorFields.features) return { resource: 'features' }
  if (fields === editorFields.demo) return { resource: 'demo-section', singleton: true }
  if (fields === editorFields.footer) return { resource: 'footer', singleton: true }
  if (fields === editorFields.contact) return { resource: 'contact-items' }
  if (fields === editorFields.media) return { resource: 'media', media: true }
  if (fields === editorFields.settingsSeo) return { resource: 'settings', singleton: true }
  return {}
}

function hydrateFields(fields, values) {
  const fieldNames = getFieldNames(fields)
  if (!values) {
    return fields.map((field, index) => ({ ...field, name: field.name ?? fieldNames[index] }))
  }
  const fieldKeys = getFieldKeys(fields)

  return fields.map((field, index) => {
    const value = getValue(values, fieldKeys[index] || [])
    const namedField = { ...field, name: field.name ?? fieldNames[index] }
    return value === undefined ? namedField : { ...namedField, value }
  })
}

export function openEditorConfig(openEditor, title, fields, mode = 'add', values = null) {
  openEditor({ title, fields: hydrateFields(fields, values), mode, values, ...getEditorMeta(fields) })
}
