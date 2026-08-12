import { useMemo, useState } from 'react'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { useInventoryStore, stockStatus } from '../store/inventoryStore'
import { categories } from '../data/seed'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProductFormModal from '../components/products/ProductFormModal'
import type { Product } from '../types'

const statusTone: Record<string, 'ok' | 'warning' | 'danger'> = {
  ok: 'ok',
  bajo: 'warning',
  critico: 'danger',
  agotado: 'danger',
}

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventoryStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  function handleNew() {
    setEditing(null)
    setModalOpen(true)
  }

  function handleEdit(product: Product) {
    setEditing(product)
    setModalOpen(true)
  }

  function handleSave(data: Omit<Product, 'id'>) {
    if (editing) updateProduct(editing.id, data)
    else addProduct(data)
  }

  function handleDelete(product: Product) {
    if (confirm(`¿Eliminar "${product.name}" del catálogo?`)) deleteProduct(product.id)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o SKU..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button variant="primary" icon={<Plus size={16} />} onClick={handleNew}>
            Nuevo producto
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Producto</th>
                <th className="px-5 py-3 font-medium">Categoría</th>
                <th className="px-5 py-3 font-medium">Precio</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-slate-100 hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{p.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{p.sku}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{p.category}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {p.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {p.stock} {p.unit}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={statusTone[stockStatus(p)]}>{stockStatus(p)}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleEdit(p)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 cursor-pointer dark:hover:bg-slate-800 dark:hover:text-brand-400"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 cursor-pointer dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  )
}
