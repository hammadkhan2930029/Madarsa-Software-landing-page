function AdminTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="admin-table-wrap rounded-xl border border-themeBorder bg-themeSurface/95 shadow-card-theme">
      <table className="admin-table w-full border-collapse text-right">
        <thead className="bg-themeBg">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="border-b border-themeBorder px-4 py-3 text-theme-button font-black text-themeText">
                {column.label}
              </th>
            ))}
            <th className="border-b border-themeBorder px-4 py-3 text-theme-button font-black text-themeText">عمل</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.label ?? row.title ?? row.name ?? row.file ?? index}-${index}`} className="transition hover:bg-themeBg/70">
              {columns.map((column) => (
                <td key={column.key} className="border-b border-themeBorder px-4 py-3 text-theme-button text-themeText">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              <td className="border-b border-themeBorder px-4 py-3">
                <div className="flex gap-2">
                  <button type="button" className="rounded-md border border-themeBorder bg-themeBg px-3 py-1.5 text-theme-detail font-bold text-themeText transition hover:border-themePrimary hover:text-themePrimary">
                    دیکھیں
                  </button>
                  <button type="button" onClick={() => onEdit?.(row)} className="rounded-md border border-themeBorder bg-themeBg px-3 py-1.5 text-theme-detail font-bold text-themeText transition hover:border-themePrimary hover:text-themePrimary">
                    ترمیم
                  </button>
                  <button type="button" className="rounded-md border border-themeBorder bg-themeBg px-3 py-1.5 text-theme-detail font-bold text-themeText transition hover:border-themePrimary hover:text-themePrimary">
                    نقل
                  </button>
                  <button type="button" onClick={() => onDelete?.(row)} className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-theme-detail font-bold text-rose-700 dark:text-rose-300">
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable
