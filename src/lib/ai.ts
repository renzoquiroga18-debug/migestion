import type { Product, StockMovement } from '../types'

const ANALYSIS_WINDOW_DAYS = 14
const LEAD_TIME_DAYS = 5

/**
 * Motor de cálculos "IA" para el demo: son fórmulas determinísticas
 * (no llaman a ningún modelo externo) que analizan el historial de
 * movimientos para estimar consumo, quiebre de stock y reposición.
 */

export function avgDailyConsumption(productId: string, movements: StockMovement[]): number {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - ANALYSIS_WINDOW_DAYS)

  const totalOut = movements
    .filter((m) => m.productId === productId && m.type === 'out' && new Date(m.date) >= cutoff)
    .reduce((sum, m) => sum + m.quantity, 0)

  return totalOut / ANALYSIS_WINDOW_DAYS
}

export function daysUntilStockout(product: Product, movements: StockMovement[]): number | null {
  const rate = avgDailyConsumption(product.id, movements)
  if (rate <= 0) return null
  return Math.max(0, product.stock / rate)
}

export function suggestReorderQuantity(product: Product, movements: StockMovement[]): number {
  const rate = avgDailyConsumption(product.id, movements)
  const projectedDemand = rate * LEAD_TIME_DAYS
  const safetyStock = product.minStock
  const target = Math.ceil(projectedDemand + safetyStock - product.stock)
  return Math.max(0, target)
}

export interface DashboardInsight {
  id: string
  tone: 'danger' | 'warning' | 'info'
  title: string
  description: string
}

export function getDashboardInsights(
  products: Product[],
  movements: StockMovement[],
): DashboardInsight[] {
  const insights: DashboardInsight[] = []

  const critical = products
    .map((p) => ({ product: p, days: daysUntilStockout(p, movements) }))
    .filter((x) => x.days !== null && x.days <= 7)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))

  if (critical.length > 0) {
    insights.push({
      id: 'stockout-risk',
      tone: 'danger',
      title: `${critical.length} producto${critical.length > 1 ? 's' : ''} se ${critical.length > 1 ? 'agotarán' : 'agotará'} pronto`,
      description: critical
        .slice(0, 3)
        .map((x) => `${x.product.name} (~${Math.round(x.days ?? 0)}d)`)
        .join(', '),
    })
  }

  const reorderNeeded = products
    .map((p) => ({ product: p, qty: suggestReorderQuantity(p, movements) }))
    .filter((x) => x.qty > 0)
    .sort((a, b) => b.qty - a.qty)

  if (reorderNeeded.length > 0) {
    const top = reorderNeeded[0]
    insights.push({
      id: 'reorder',
      tone: 'warning',
      title: `Se recomienda reponer ${reorderNeeded.length} producto${reorderNeeded.length > 1 ? 's' : ''}`,
      description: `Prioridad: ${top.product.name} — reponer ${top.qty} ${top.product.unit} según consumo proyectado (${LEAD_TIME_DAYS} días de lead time).`,
    })
  }

  const topMover = products
    .map((p) => ({ product: p, rate: avgDailyConsumption(p.id, movements) }))
    .sort((a, b) => b.rate - a.rate)[0]

  if (topMover && topMover.rate > 0) {
    insights.push({
      id: 'top-mover',
      tone: 'info',
      title: 'Producto con mayor rotación',
      description: `${topMover.product.name} se vende a un ritmo de ~${topMover.rate.toFixed(1)} unidades/día.`,
    })
  }

  return insights
}
