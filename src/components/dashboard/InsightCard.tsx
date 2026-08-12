import { AlertTriangle, TrendingUp, Info, BrainCircuit } from 'lucide-react'
import type { DashboardInsight } from '../../lib/ai'

const toneStyles: Record<DashboardInsight['tone'], { bg: string; text: string; icon: typeof AlertTriangle }> = {
  danger: {
    bg: 'bg-red-50 ring-red-200 dark:bg-red-500/10 dark:ring-red-500/30',
    text: 'text-red-700 dark:text-red-400',
    icon: AlertTriangle,
  },
  warning: {
    bg: 'bg-amber-50 ring-amber-200 dark:bg-amber-500/10 dark:ring-amber-500/30',
    text: 'text-amber-700 dark:text-amber-400',
    icon: TrendingUp,
  },
  info: {
    bg: 'bg-brand-50 ring-brand-200 dark:bg-brand-500/10 dark:ring-brand-500/30',
    text: 'text-brand-700 dark:text-brand-300',
    icon: Info,
  },
}

export default function InsightCard({ insight }: { insight: DashboardInsight }) {
  const style = toneStyles[insight.tone]
  const Icon = style.icon
  return (
    <div className={`flex gap-3 rounded-xl p-4 ring-1 ${style.bg}`}>
      <Icon size={18} className={`mt-0.5 shrink-0 ${style.text}`} />
      <div>
        <p className={`text-sm font-semibold ${style.text}`}>{insight.title}</p>
        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">{insight.description}</p>
      </div>
    </div>
  )
}

export function InsightsHeader() {
  return (
    <div className="mb-4 flex items-center gap-2">
      <BrainCircuit size={18} className="text-brand-600 dark:text-brand-400" />
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Insights de IA</h3>
    </div>
  )
}
