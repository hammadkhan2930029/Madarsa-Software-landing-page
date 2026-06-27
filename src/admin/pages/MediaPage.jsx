import { mediaAssets } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function MediaPage({ openEditor, media, onDelete, onRestore }) {
  const rows = media?.length
    ? media.map((item) => ({ ...item, file: item.fileUrl, usedIn: item.usedIn }))
    : mediaAssets

  return (
    <>
      <PageHeader title="میڈیا اثاثے" description="لینڈنگ پیج کے لوگو، ہیرو تصویر اور سلائیڈر اسکرین شاٹس تبدیل، شامل یا حذف کرنے کی UI۔" actionLabel="اثاثہ اپ لوڈ کریں" onAction={() => openEditorConfig(openEditor, 'میڈیا اثاثہ شامل کریں', editorFields.media)} />
      <FilterBar searchPlaceholder="فائل کا نام یا استعمال تلاش کریں" filters={['لوگو', 'اسکرین شاٹ', 'فعال']} />
      <AdminTable
        columns={[
          { key: 'name', label: 'نام' },
          { key: 'file', label: 'فائل' },
          { key: 'type', label: 'قسم' },
          { key: 'usedIn', label: 'استعمال' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
        ]}
        rows={rows}
        onEdit={(row) => openEditorConfig(openEditor, 'میڈیا اثاثہ تبدیل کریں', editorFields.media, 'edit', row)}
        onDelete={onDelete}
        onRestore={onRestore}
      />
    </>
  )
}

export default MediaPage
