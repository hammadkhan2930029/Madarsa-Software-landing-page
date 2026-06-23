import { heroContent } from '../adminData'
import AdminTable from '../components/AdminTable'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function HeroPage({ openEditor, hero }) {
  const content = hero || heroContent

  return (
    <>
      <PageHeader
        title="ہیرو سیکشن"
        description="لینڈنگ پیج کے پہلے حصے کا عنوان، تفصیل، بٹن اور ہیرو مواد یہاں سے تبدیل کیا جا سکتا ہے۔"
        actionLabel="نیا ہیرو ورژن"
        onAction={() => openEditorConfig(openEditor, 'ہیرو مواد شامل کریں', editorFields.hero)}
      />
      <AdminTable
        columns={[
          { key: 'label', label: 'فیلڈ' },
          { key: 'value', label: 'موجودہ مواد' },
        ]}
        rows={[
          { label: 'بالائی متن', value: content.kicker },
          { label: 'مرکزی عنوان', value: content.title },
          { label: 'تفصیل', value: content.description },
          { label: 'بنیادی بٹن', value: content.primaryCta },
          { label: 'دوسرا بٹن', value: content.secondaryCta },
          { label: 'حالت', value: content.status },
        ]}
        onEdit={() => openEditorConfig(openEditor, 'ہیرو مواد کی ترمیم', editorFields.hero, 'edit', content)}
      />
    </>
  )
}

export default HeroPage
