import { sliderModules } from '../adminData'
import ActionButton from '../components/ActionButton'
import AdminTable from '../components/AdminTable'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import { editorFields, openEditorConfig } from '../constants/editorFields'
import { getAssetUrl } from '../../utils/assetResolver'

const fallbackSliderSection = {
  kicker: 'سسٹم ماڈیولز',
  headingLineOne: '',
  headingLineTwo: '',
  alignment: 'right',
}

function getSection(sliderSection) {
  if (Array.isArray(sliderSection)) return sliderSection[0] || fallbackSliderSection
  return sliderSection || fallbackSliderSection
}

function SliderPage({
  openEditor,
  sliderSection,
  sliderModules: apiSliderModules,
  onDelete,
  onRestore,
}) {
  const section = getSection(sliderSection)
  const rows = apiSliderModules?.length
    ? apiSliderModules.map((item) => ({
      ...item,
      image: item.imageUrl,
      defaultTab: Number(item.isDefault) === 1 || item.isDefault === true || item.isDefault === '1' ? 'ہاں' : 'نہیں',
    }))
    : sliderModules

  return (
    <>
      <PageHeader
        title="سسٹم ماڈیولز"
        description="سلائیڈر کی تصاویر، ٹیبز، ترتیب، حالت، متبادل متن، اور ہر ٹیب کا کارڈ مواد یہاں سے منظم کریں۔"
        actionLabel="نیا ماڈیول شامل کریں"
        onAction={() => openEditorConfig(openEditor, 'سلائیڈر ماڈیول شامل کریں', editorFields.slider)}
      />

      <div className="admin-card mb-5 rounded-xl border border-themeBorder bg-themeSurface/95 p-5 text-right shadow-card-theme">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-theme-kicker font-bold text-themePrimary">{section.kicker || 'سسٹم ماڈیولز'}</p>
            <h2 className="font-urdu text-theme-title font-bold text-themeText">
              {[section.headingLineOne, section.headingLineTwo].filter(Boolean).join(' ') || 'مرکزی عنوان ابھی شامل نہیں کیا گیا'}
            </h2>
            <p className="text-theme-body font-bold text-slate-500 dark:text-slate-400">
              عنوان کی سمت: {section.alignment || 'right'}
            </p>
          </div>
          <ActionButton
            variant="primary"
            onClick={() => openEditorConfig(openEditor, 'سلائیڈر سیکشن کی ترتیب', editorFields.sliderSection, 'edit', section)}
          >
            سیکشن عنوان تبدیل کریں
          </ActionButton>
        </div>
      </div>

      <FilterBar searchPlaceholder="ٹیب، عنوان یا عدد تلاش کریں" filters={['تصویر', 'ترتیب', 'حالت']} />
      <AdminTable
        columns={[
          { key: 'label', label: 'ٹیب' },
          { key: 'title', label: 'مرکزی عنوان' },
          { key: 'cardHeading', label: 'کارڈ عنوان' },
          { key: 'stat', label: 'عدد' },
          { key: 'statLabel', label: 'عدد کا لیبل' },
          { key: 'sortOrder', label: 'ترتیب' },
          { key: 'defaultTab', label: 'ڈیفالٹ' },
          {
            key: 'image',
            label: 'تصویر',
            render: (row) => row.image ? (
              <img
                src={getAssetUrl(row.image, row.image)}
                alt={row.altText || row.label || ''}
                className="h-14 w-24 rounded-md object-cover"
              />
            ) : 'تصویر موجود نہیں',
          },
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
