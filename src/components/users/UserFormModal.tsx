import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Input, Select } from '../ui/Input'
import type { User } from '../../types'

interface UserFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (user: Omit<User, 'id'>) => void
  initial?: User | null
}

const empty: Omit<User, 'id'> = {
  name: '',
  email: '',
  password: 'demo123',
  role: 'empleado',
  active: true,
}

export default function UserFormModal({ open, onClose, onSave, initial }: UserFormModalProps) {
  const [form, setForm] = useState<Omit<User, 'id'>>(empty)

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
    <Modal open={open} title={initial ? 'Editar usuario' : 'Nuevo usuario'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          label="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Rol"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as User['role'] })}
          >
            <option value="admin">Administrador</option>
            <option value="empleado">Empleado</option>
          </Select>
          <Select
            label="Estado"
            value={form.active ? 'active' : 'inactive'}
            onChange={(e) => setForm({ ...form, active: e.target.value === 'active' })}
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {initial ? 'Guardar cambios' : 'Crear usuario'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
