import { contactContent } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function ContactPage({ openEditor, contactItems, onDelete }) {
  const rows = contactItems?.length ? contactItems : contactContent

  return (
    <>
      <PageHeader title="رابطہ تفصیلات" description="رابطہ صفحہ اور فوٹر میں استعمال ہونے والی ای میل، فون، مقام اور دفتر کا پتہ منظم کریں۔" onAction={() => openEditorConfig(openEditor, 'رابطہ آئٹم شامل کریں', editorFields.contact)} />
      <AdminTable
        columns={[
          { key: 'label', label: 'نام' },
          { key: 'value', label: 'قدر' },
          { key: 'helper', label: 'معاون متن' },
          { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
        ]}
        rows={rows}
        onEdit={(row) => openEditorConfig(openEditor, 'رابطہ آئٹم کی ترمیم', editorFields.contact, 'edit', row)}
        onDelete={onDelete}
      />
    </>
  )
}

export default ContactPage
