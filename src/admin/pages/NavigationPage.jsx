import { navLinks } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function NavigationPage({ openEditor, navLinks: apiNavLinks, onDelete }) {
  const rows = apiNavLinks?.length ? apiNavLinks : navLinks

  return (
    <>
      <PageHeader title="مینو لنکس" description="ہیڈر اور فوٹر کے لنکس شامل، ترمیم، ترتیب، مخفی یا حذف کرنے کی UI۔" onAction={() => openEditorConfig(openEditor, 'مینو لنک شامل کریں', editorFields.navigation)} />
      <FilterBar searchPlaceholder="لنک کا نام یا پتا تلاش کریں" filters={['ہیڈر', 'فوٹر', 'فعال']} />
      <AdminTable
        columns={[
          { key: 'label', label: 'نام' },
          { key: 'href', label: 'لنک' },
          { key: 'placement', label: 'مقام' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
        ]}
        rows={rows}
        onEdit={(row) => openEditorConfig(openEditor, 'مینو لنک کی ترمیم', editorFields.navigation, 'edit', row)}
        onDelete={onDelete}
      />
    </>
  )
}

export default NavigationPage
