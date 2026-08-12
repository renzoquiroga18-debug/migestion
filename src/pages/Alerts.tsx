import { AlertTriangle, PackageX, TrendingDown } from 'lucide-react'
import { useInventoryStore, stockStatus } from '../store/inventoryStore'
import { suggestReorderQuantity, daysUntilStockout } from '../lib/ai'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const statusMeta: Record<string, { tone: 'ok' | 'warning' | 'danger'; icon: typeof AlertTriangle; label: string }> = {
  agotado: { tone: 'danger', icon: PackageX, label: 'Agotado' },
  critico: { tone: 'danger', icon: AlertTriangle, label: 'Crítico' },
  bajo: { tone: 'warning', icon: TrendingDown, label: 'Bajo' },
}

export default function Alerts() {
  const { products, movements } = useInventoryStore()
  const alerts = products
    .filter((p) => stockStatus(p) !== 'ok')
    .sort((a, b) => a.stock / (a.minStock || 1) - b.stock / (b.minStock || 1))

  return (
    <div className="flex flex-col gap-4">
      {alerts.length === 0 ? (
        <Card className="p-10 text-center text-slate-500 dark:text-slate-400">
          No hay alertas activas. Todo el inventario está en niveles saludables.
        </Card>
      ) : (
        alerts.map((p) => {
          const status = stockStatus(p)
          const meta = statusMeta[status]
          const Icon = meta.icon
          const reorderQty = suggestReorderQuantity(p, movements)
          const days = daysUntilStockout(p, movements)

          return (
            <Card key={p.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
                    meta.tone === 'danger'
                      ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                  }`}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{p.name}</p>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {p.category} · Stock: {p.stock} {p.unit} (mínimo {p.minStock} {p.unit})
                    {days !== null && ` · Se agotaría en ~${Math.round(days)} días`}
                  </p>
                </div>
              </div>
              {reorderQty > 0 && (
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:text-right dark:bg-slate-800 dark:text-slate-300">
                  Reponer{' '}
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {reorderQty} {p.unit}
                  </span>
                </div>
              )}
            </Card>
          )
        })
      )}
    </div>
  )
}
