import { demoSection, formFields } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

const fallbackBenefits = [
  { label: 'مفت ڈیمو', icon: 'download', sortOrder: 1, status: 'active' },
  { label: 'ہر وقت بیک اپ', icon: 'backup', sortOrder: 2, status: 'active' },
  { label: 'آسان سپورٹ', icon: 'support', sortOrder: 3, status: 'active' },
]

function DemoSectionPage({ openEditor, demoSection: apiDemoSection, demoBenefits, onDelete, onRestore }) {
  const content = apiDemoSection || demoSection
  const benefits = demoBenefits?.length ? demoBenefits : fallbackBenefits

  return (
    <>
      <PageHeader
        title="ڈیمو فارم سیکشن"
        description="ڈیمو سیکشن کا عنوان، تفصیل، بٹن، کامیابی پیغام اور فارم فیلڈز منظم کرنے کی UI۔"
        onAction={() => openEditorConfig(openEditor, 'ڈیمو سیکشن شامل کریں', editorFields.demo)}
      />
      <div className="grid gap-5">
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
      <div className="mt-5">
        <PageHeader
          title="ڈیمو فوائد"
          description="فارم کے نیچے دکھنے والے مختصر فوائد جیسے مفت ڈیمو، بیک اپ اور سپورٹ۔"
          actionLabel="فائدہ شامل کریں"
          onAction={() => openEditorConfig(openEditor, 'ڈیمو فائدہ شامل کریں', editorFields.demoBenefits)}
        />
        <AdminTable
          columns={[
            { key: 'sortOrder', label: 'ترتیب' },
            { key: 'label', label: 'لیبل' },
            { key: 'icon', label: 'آئیکن' },
            { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
          ]}
          rows={benefits}
          onEdit={(row) => openEditorConfig(openEditor, 'ڈیمو فائدہ کی ترمیم', editorFields.demoBenefits, 'edit', row)}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      </div>
    </>
  )
}

export default DemoSectionPage
