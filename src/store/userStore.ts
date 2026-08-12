import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedUsers } from '../data/seed'
import type { User } from '../types'

interface UserState {
  users: User[]
  addUser: (user: Omit<User, 'id'>) => void
  updateUser: (id: string, patch: Partial<Omit<User, 'id'>>) => void
  deleteUser: (id: string) => void
  reset: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: seedUsers,
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, { ...user, id: `u${Date.now()}` }],
        })),
      updateUser: (id, patch) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
        })),
      deleteUser: (id) =>
        set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
      reset: () => set({ users: seedUsers }),
    }),
    { name: 'migestion-users' },
  ),
)
