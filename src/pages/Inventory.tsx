import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useInventoryStore, stockStatus } from '../store/inventoryStore'
import { daysUntilStockout } from '../lib/ai'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import AdjustStockModal from '../components/inventory/AdjustStockModal'
import type { Product } from '../types'

const statusTone: Record<string, 'ok' | 'warning' | 'danger'> = {
  ok: 'ok',
  bajo: 'warning',
  critico: 'danger',
  agotado: 'danger',
}

export default function Inventory() {
  const { products, movements, adjustStock } = useInventoryStore()
  const [selected, setSelected] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  function openAdjust(product: Product) {
    setSelected(product)
    setModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Producto</th>
                <th className="px-5 py-3 font-medium">Stock actual</th>
                <th className="px-5 py-3 font-medium">Mínimo</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium">Estimación IA</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const days = daysUntilStockout(p, movements)
                return (
                  <tr
                    key={p.id}
                    className="border-t border-slate-100 hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{p.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{p.category}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                      {p.stock} {p.unit}
                    </td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                      {p.minStock} {p.unit}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone[stockStatus(p)]}>{stockStatus(p)}</Badge>
                    </td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                      {days !== null ? `~${Math.round(days)} días restantes` : 'Sin consumo reciente'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="secondary" icon={<SlidersHorizontal size={14} />} onClick={() => openAdjust(p)}>
                        Ajustar
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <AdjustStockModal
        open={modalOpen}
        product={selected}
        onClose={() => setModalOpen(false)}
        onAdjust={(type, qty, reason) => selected && adjustStock(selected.id, type, qty, reason)}
      />
    </div>
  )
}
