import { statCards } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function StatsPage({ openEditor, stats, onDelete }) {
  const rows = stats?.length
    ? stats.map((item) => ({ ...item, order: item.sortOrder }))
    : statCards

  return (
    <>
      <PageHeader title="ہیرو اعداد کارڈز" description="ہیرو سیکشن کے چھوٹے کارڈز شامل، ترمیم، ترتیب اور حذف کرنے کی UI۔" onAction={() => openEditorConfig(openEditor, 'اعداد کارڈ شامل کریں', editorFields.stats)} />
      <AdminTable
        columns={[
          { key: 'order', label: 'ترتیب' },
          { key: 'name', label: 'نام' },
          { key: 'value', label: 'قدر' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
        ]}
        rows={rows}
        onEdit={(row) => openEditorConfig(openEditor, 'اعداد کارڈ کی ترمیم', editorFields.stats, 'edit', row)}
        onDelete={onDelete}
      />
    </>
  )
}

export default StatsPage
