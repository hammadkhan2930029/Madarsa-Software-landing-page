import { heroContent } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'
import { getAssetUrl } from '../../utils/assetResolver'

function HeroPage({ openEditor, hero, heroImages, onDelete, onRestore }) {
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

      <div className="mt-6">
        <PageHeader
          title="ہیرو تصاویر"
          description="ہیرو carousel میں دکھائی جانے والی تصاویر یہاں سے شامل یا تبدیل کریں۔"
          actionLabel="ہیرو تصویر شامل کریں"
          onAction={() => openEditorConfig(openEditor, 'ہیرو تصویر شامل کریں', editorFields.heroImages)}
        />
        <AdminTable
          columns={[
            {
              key: 'imageUrl',
              label: 'تصویر',
              render: (row) => row.imageUrl ? (
                <img
                  src={getAssetUrl(row.imageUrl, row.imageUrl)}
                  alt={row.altText || ''}
                  className="h-14 w-24 rounded-md object-cover"
                />
              ) : 'تصویر موجود نہیں',
            },
            { key: 'altText', label: 'متبادل متن' },
            { key: 'sortOrder', label: 'ترتیب' },
            { key: 'status', label: 'حالت', render: (row) => <Badge value={row.status} /> },
          ]}
          rows={heroImages || []}
          onEdit={(row) => openEditorConfig(openEditor, 'ہیرو تصویر تبدیل کریں', editorFields.heroImages, 'edit', row)}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      </div>
    </>
  )
}

export default HeroPage
