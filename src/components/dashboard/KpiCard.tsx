import type { LucideIcon } from 'lucide-react'
import Card from '../ui/Card'

export default function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = 'brand',
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  tone?: 'brand' | 'red' | 'amber' | 'emerald'
}) {
  const toneClasses: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300',
    red: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <span className={`flex size-9 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
    </Card>
  )
}
