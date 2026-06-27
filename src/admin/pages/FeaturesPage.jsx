import { featureCards } from '../adminData'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'

const fallbackFeatureSection = {
  kicker: 'اہم خصوصیات',
  title: 'مدرسہ کے ہر شعبے کے لیے مکمل حل۔',
  description:
    'یہ سافٹ ویئر روزمرہ کے انتظامی کاموں کو کم وقت میں مکمل کرنے کے لیے بنایا گیا ہے، تاکہ ٹیم ریکارڈ، رپورٹس اور فالو اپ آسانی سے manage کر سکے۔',
  cardLinkLabel: 'مزید جانیں',
}

function FeaturesPage({ openEditor, features, featureSection, onDelete, onRestore }) {
  const rows = features?.length ? features : featureCards
  const section = featureSection || fallbackFeatureSection

  return (
    <>
      <PageHeader
        title="خصوصیات سیکشن"
        description="اہم خصوصیات کی heading، تفصیل، کارڈ لنک متن اور کارڈز یہاں سے تبدیل کیے جا سکتے ہیں۔"
        actionLabel="خصوصیت کارڈ شامل کریں"
        onAction={() => openEditorConfig(openEditor, 'خصوصیت کارڈ شامل کریں', editorFields.features)}
      />
      <div className="mb-5">
        <AdminTable
          columns={[
            { key: 'label', label: 'فیلڈ' },
            { key: 'value', label: 'موجودہ متن' },
          ]}
          rows={[
            { label: 'بالائی متن', value: section.kicker },
            { label: 'مرکزی عنوان', value: section.title },
            { label: 'تفصیل', value: section.description },
            { label: 'کارڈ لنک متن', value: section.cardLinkLabel },
          ]}
          onEdit={() => openEditorConfig(openEditor, 'خصوصیات سیکشن کی ترمیم', editorFields.featureSection, 'edit', section)}
        />
      </div>
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
        onRestore={onRestore}
      />
    </>
  )
}

export default FeaturesPage
