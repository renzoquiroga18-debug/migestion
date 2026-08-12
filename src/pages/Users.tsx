import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { useAuthStore } from '../store/authStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import UserFormModal from '../components/users/UserFormModal'
import type { User } from '../types'

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useUserStore()
  const currentUser = useAuthStore((s) => s.currentUser)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)

  function handleNew() {
    setEditing(null)
    setModalOpen(true)
  }

  function handleEdit(user: User) {
    setEditing(user)
    setModalOpen(true)
  }

  function handleSave(data: Omit<User, 'id'>) {
    if (editing) updateUser(editing.id, data)
    else addUser(data)
  }

  function handleDelete(user: User) {
    if (user.id === currentUser?.id) {
      alert('No podés eliminar tu propio usuario.')
      return
    }
    if (confirm(`¿Eliminar a "${user.name}"?`)) deleteUser(user.id)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="primary" icon={<Plus size={16} />} onClick={handleNew}>
          Nuevo usuario
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Nombre</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Rol</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-slate-100 hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                        {u.name.charAt(0)}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{u.email}</td>
                  <td className="px-5 py-3">
                    <Badge tone={u.role === 'admin' ? 'info' : 'neutral'}>{u.role}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={u.active ? 'ok' : 'neutral'}>{u.active ? 'Activo' : 'Inactivo'}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleEdit(u)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 cursor-pointer dark:hover:bg-slate-800 dark:hover:text-brand-400"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 cursor-pointer dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <UserFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
    </div>
  )
}
