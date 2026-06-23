import { featureCards } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function FeaturesPage({ openEditor, features, onDelete }) {
  const rows = features?.length ? features : featureCards

  return (
    <>
      <PageHeader title="خصوصیات کارڈز" description="اہم خصوصیات کے کارڈز شامل، ترمیم، ترتیب، مخفی اور حذف کرنے کی UI۔" onAction={() => openEditorConfig(openEditor, 'خصوصیت کارڈ شامل کریں', editorFields.features)} />
      <FilterBar searchPlaceholder="خصوصیت کا عنوان تلاش کریں" filters={['ترتیب', 'فعال', 'مخفی']} />
      <AdminTable
        columns={[
          { key: 'value', label: 'ترتیب' },
          { key: 'title', label: 'عنوان' },
          { key: 'description', label: 'تفصیل' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
        ]}
        rows={rows}
        onEdit={(row) => openEditorConfig(openEditor, 'خصوصیت کارڈ کی ترمیم', editorFields.features, 'edit', row)}
        onDelete={onDelete}
      />
    </>
  )
}

export default FeaturesPage
