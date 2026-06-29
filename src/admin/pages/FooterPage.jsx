import { footerContent } from '../adminData'
import AdminTable from '../components/AdminTable'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

function FooterPage({ openEditor, footer }) {
  const content = footer || footerContent

  return (
    <>
      <PageHeader
        title="فوتر مواد"
        description="فوتر CTA، تفصیل، کاپی رائٹ اور بٹن کا متن تبدیل کرنے کی UI۔"
        actionLabel="فوتر مواد شامل کریں"
        onAction={() => openEditorConfig(openEditor, 'فوتر مواد شامل کریں', editorFields.footer)}
      />
      <AdminTable
        columns={[
          { key: 'label', label: 'فیلڈ' },
          { key: 'value', label: 'موجودہ مواد' },
        ]}
        rows={[
          { label: 'CTA بالائی متن', value: content.ctaKicker },
          { label: 'CTA عنوان', value: content.ctaTitle },
          { label: 'CTA بٹن', value: content.ctaButton },
          { label: 'CTA ویڈیو لنک', value: content.ctaVideoUrl || 'شامل نہیں کیا گیا' },
          { label: 'CTA تصویر', value: content.ctaImageUrl || 'شامل نہیں کی گئی' },
          { label: 'CTA تصویر کا متبادل متن', value: content.ctaImageAlt || 'شامل نہیں کیا گیا' },
          { label: 'فوتر تفصیل', value: content.description },
          { label: 'کاپی رائٹ متن', value: content.copyright },
        ]}
        onEdit={() => openEditorConfig(openEditor, 'فوتر مواد کی ترمیم', editorFields.footer, 'edit', content)}
      />
    </>
  )
}

export default FooterPage
