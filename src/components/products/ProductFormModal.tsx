import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Input, Select } from '../ui/Input'
import { categories } from '../../data/seed'
import type { Product } from '../../types'

interface ProductFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (product: Omit<Product, 'id'>) => void
  initial?: Product | null
}

const empty: Omit<Product, 'id'> = {
  name: '',
  sku: '',
  category: categories[0],
  price: 0,
  cost: 0,
  stock: 0,
  minStock: 5,
  unit: 'un',
}

export default function ProductFormModal({ open, onClose, onSave, initial }: ProductFormModalProps) {
  const [form, setForm] = useState<Omit<Product, 'id'>>(empty)

  useEffect(() => {
    if (initial) {
      const { id: _id, ...rest } = initial
      setForm(rest)
    } else {
      setForm(empty)
    }
  }, [initial, open])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <Modal open={open} title={initial ? 'Editar producto' : 'Nuevo producto'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            required
          />
          <Select
            label="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Product['category'] })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Precio de venta"
            type="number"
            min={0}
            value={form.price || ''}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <Input
            label="Costo"
            type="number"
            min={0}
            value={form.cost || ''}
            onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Stock actual"
            type="number"
            min={0}
            value={form.stock || ''}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            required
          />
          <Input
            label="Stock mínimo"
            type="number"
            min={0}
            value={form.minStock || ''}
            onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })}
            required
          />
          <Input
            label="Unidad"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            required
          />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {initial ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
