import { demoSection, formFields } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function DemoSectionPage({ openEditor, demoSection: apiDemoSection }) {
  const content = apiDemoSection || demoSection

  return (
    <>
      <PageHeader
        title="ڈیمو فارم سیکشن"
        description="ڈیمو سیکشن کا عنوان، تفصیل، بٹن، کامیابی پیغام اور فارم فیلڈز منظم کرنے کی UI۔"
        onAction={() => openEditorConfig(openEditor, 'ڈیمو سیکشن شامل کریں', editorFields.demo)}
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <AdminTable
          columns={[
            { key: 'label', label: 'فیلڈ' },
            { key: 'value', label: 'موجودہ متن' },
          ]}
          rows={[
            { label: 'بالائی متن', value: content.kicker },
            { label: 'عنوان', value: content.title },
            { label: 'تفصیل', value: content.description },
            { label: 'بٹن کا متن', value: content.submitLabel },
            { label: 'کامیابی پیغام', value: content.successMessage },
          ]}
          onEdit={() => openEditorConfig(openEditor, 'ڈیمو سیکشن کی ترمیم', editorFields.demo, 'edit', content)}
        />
        <AdminTable
          columns={[
            { key: 'label', label: 'فیلڈ نام' },
            { key: 'name', label: 'فیلڈ آئی ڈی' },
            { key: 'placeholder', label: 'مثالی متن' },
            { key: 'required', label: 'لازمی', render: (row) => <Badge value={row.required} tone="info" /> },
          ]}
          rows={formFields}
        />
      </div>
    </>
  )
}

export default DemoSectionPage
