import { useState, type FormEvent } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Input, Select } from '../ui/Input'
import type { Product } from '../../types'

interface AdjustStockModalProps {
  open: boolean
  product: Product | null
  onClose: () => void
  onAdjust: (type: 'in' | 'out', quantity: number, reason: string) => void
}

export default function AdjustStockModal({ open, product, onClose, onAdjust }: AdjustStockModalProps) {
  const [type, setType] = useState<'in' | 'out'>('in')
  const [quantity, setQuantity] = useState(1)
  const [reason, setReason] = useState('Compra a proveedor')

  if (!product) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onAdjust(type, quantity, reason)
    onClose()
  }

  return (
    <Modal open={open} title={`Ajustar stock — ${product.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-slate-500">
          Stock actual: <span className="font-medium text-slate-800">{product.stock} {product.unit}</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Tipo de movimiento" value={type} onChange={(e) => setType(e.target.value as 'in' | 'out')}>
            <option value="in">Entrada</option>
            <option value="out">Salida</option>
          </Select>
          <Input
            label="Cantidad"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <Input label="Motivo" value={reason} onChange={(e) => setReason(e.target.value)} required />

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Confirmar ajuste
          </Button>
        </div>
      </form>
    </Modal>
  )
}
