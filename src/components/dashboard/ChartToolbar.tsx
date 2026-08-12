interface Option {
  value: string
  label: string
}

interface ChartToolbarProps {
  title: string
  styleOptions: Option[]
  styleValue: string
  onStyleChange: (value: string) => void
  colorOptions: Option[]
  colorValue: string
  onColorChange: (value: string) => void
}

const selectClass =
  'rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-600 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'

export default function ChartToolbar({
  title,
  styleOptions,
  styleValue,
  onStyleChange,
  colorOptions,
  colorValue,
  onColorChange,
}: ChartToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      <div className="flex items-center gap-1.5">
        <select
          aria-label="Estilo del gráfico"
          value={styleValue}
          onChange={(e) => onStyleChange(e.target.value)}
          className={selectClass}
        >
          {styleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Color del gráfico"
          value={colorValue}
          onChange={(e) => onColorChange(e.target.value)}
          className={selectClass}
        >
          {colorOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
