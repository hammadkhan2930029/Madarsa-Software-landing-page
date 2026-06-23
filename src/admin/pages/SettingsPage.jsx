import AdminTable from '../components/AdminTable'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function SettingsPage({ openEditor, settings }) {
  const content = settings?.[0] || settings || {
    siteTitle: 'مدرسہ سافٹ ویئر',
    metaDescription: 'لینڈنگ پیج کی SEO تفصیل',
    favicon: '/favicon.svg',
    logoLight: '/assets/new1.png',
    logoDark: '/assets/new2.png',
  }

  const rows = [
    { label: 'براؤزر عنوان', value: content.siteTitle },
    { label: 'میٹا تفصیل', value: content.metaDescription },
    { label: 'فیویکون فائل', value: content.favicon },
    { label: 'لائٹ لوگو', value: content.logoLight },
    { label: 'ڈارک لوگو', value: content.logoDark },
  ]

  return (
    <>
      <PageHeader title="سیٹنگز" description="صفحہ عنوان، میٹا تفصیل، فیویکون، زبان، RTL اور تھیم سے متعلق لینڈنگ سیٹنگز کی UI۔" actionLabel="سیٹنگ شامل کریں" onAction={() => openEditorConfig(openEditor, 'سیٹنگ شامل کریں', editorFields.settingsSeo, 'edit', content)} />
      <AdminTable
        columns={[
          { key: 'label', label: 'سیٹنگ' },
          { key: 'value', label: 'قدر' },
        ]}
        rows={rows}
        onEdit={() => openEditorConfig(openEditor, 'سیٹنگ کی ترمیم', editorFields.settingsSeo, 'edit', content)}
      />
    </>
  )
}

export default SettingsPage
