import FormPanel from './FormPanel'

function EditorModal({ config, onClose, onSubmit, onDelete, status, error }) {
  if (!config) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="فارم بند کریں"
        className="admin-drawer-backdrop absolute inset-0 bg-slate-950/55"
        onClick={onClose}
      />
      <div className="admin-editor-panel absolute inset-y-0 left-0 w-full max-w-3xl overflow-y-auto border-r border-themeBorder bg-themeBg p-4 shadow-theme sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-md border border-themeBorder bg-themeSurface text-themeText shadow-card-theme">
            ×
          </button>
          <p className="text-theme-kicker font-bold text-themePrimary">
            {config.mode === 'edit' ? 'ریکارڈ کی ترمیم' : 'نیا ریکارڈ'}
          </p>
        </div>
        <FormPanel
          title={config.title}
          fields={config.fields}
          submitLabel={config.submitLabel}
          onSubmit={(payload, files) => onSubmit?.(config, payload, files)}
          onDelete={() => onDelete?.(config)}
          status={status}
          error={error}
          canDelete={config.mode === 'edit' && !config.singleton && Boolean(config.values?.id)}
        />
      </div>
    </div>
  )
}

export default EditorModal
