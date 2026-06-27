import { sliderModules } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function SliderPage({ openEditor, sliderModules: apiSliderModules, onDelete, onRestore }) {
  const rows = apiSliderModules?.length
    ? apiSliderModules.map((item) => ({ ...item, image: item.imageUrl }))
    : sliderModules

  return (
    <>
      <PageHeader title="سسٹم سلائیڈر" description="سلائیڈر ماڈیول کا نام، عنوان، عدد، لیبل اور اسکرین شاٹ شامل، ترمیم یا حذف کریں۔" onAction={() => openEditorConfig(openEditor, 'سلائیڈر ماڈیول شامل کریں', editorFields.slider)} />
      <FilterBar searchPlaceholder="ماڈیول کا نام یا عدد تلاش کریں" filters={['تصویر', 'ترتیب', 'حالت']} />
      <AdminTable
        columns={[
          { key: 'label', label: 'ماڈیول' },
          { key: 'title', label: 'عنوان' },
          { key: 'stat', label: 'عدد' },
          { key: 'statLabel', label: 'عدد کا لیبل' },
          { key: 'image', label: 'تصویر' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
        ]}
        rows={rows}
        onEdit={(row) => openEditorConfig(openEditor, 'سلائیڈر ماڈیول کی ترمیم', editorFields.slider, 'edit', row)}
        onDelete={onDelete}
        onRestore={onRestore}
      />
    </>
  )
}

export default SliderPage
