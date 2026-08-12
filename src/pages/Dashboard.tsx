import { useMemo } from 'react'
import { Package, DollarSign, BellRing, Boxes } from 'lucide-react'
import { useInventoryStore, stockStatus } from '../store/inventoryStore'
import { getDashboardInsights } from '../lib/ai'
import KpiCard from '../components/dashboard/KpiCard'
import { StockTrendChart, CategoryBarChart, StatusDonutChart } from '../components/dashboard/Charts'
import InsightCard, { InsightsHeader } from '../components/dashboard/InsightCard'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const statusTone: Record<string, 'ok' | 'warning' | 'danger'> = {
  ok: 'ok',
  bajo: 'warning',
  critico: 'danger',
  agotado: 'danger',
}

export default function Dashboard() {
  const products = useInventoryStore((s) => s.products)
  const movements = useInventoryStore((s) => s.movements)

  const insights = useMemo(() => getDashboardInsights(products, movements), [products, movements])

  const totalUnits = products.reduce((s, p) => s + p.stock, 0)
  const totalValue = products.reduce((s, p) => s + p.stock * p.price, 0)
  const alerts = products.filter((p) => stockStatus(p) !== 'ok')

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Package} label="Productos activos" value={String(products.length)} tone="brand" />
        <KpiCard icon={Boxes} label="Unidades en stock" value={totalUnits.toLocaleString('es-AR')} tone="emerald" />
        <KpiCard
          icon={DollarSign}
          label="Valor del inventario"
          value={totalValue.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}
          tone="brand"
        />
        <KpiCard icon={BellRing} label="Alertas activas" value={String(alerts.length)} tone="red" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StockTrendChart movements={movements} />
        </div>
        <StatusDonutChart products={products} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CategoryBarChart products={products} />
        </div>
        <Card className="p-5">
          <InsightsHeader />
          <div className="flex flex-col gap-3">
            {insights.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No hay insights relevantes por ahora.</p>
            ) : (
              insights.map((insight) => <InsightCard key={insight.id} insight={insight} />)
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Últimas alertas</h3>
        {alerts.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Todo el inventario está en niveles saludables.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
                  <th className="pb-2 pr-4 font-medium">Producto</th>
                  <th className="pb-2 pr-4 font-medium">Categoría</th>
                  <th className="pb-2 pr-4 font-medium">Stock</th>
                  <th className="pb-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {alerts.slice(0, 6).map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 last:border-0 dark:border-slate-800">
                    <td className="py-2.5 pr-4 font-medium text-slate-800 dark:text-slate-200">{p.name}</td>
                    <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{p.category}</td>
                    <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">
                      {p.stock} {p.unit}
                    </td>
                    <td className="py-2.5">
                      <Badge tone={statusTone[stockStatus(p)]}>{stockStatus(p)}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
