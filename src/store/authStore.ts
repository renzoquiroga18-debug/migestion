import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useUserStore } from './userStore'
import type { User } from '../types'

interface AuthState {
  currentUser: Omit<User, 'password'> | null
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      login: (email, password) => {
        const user = useUserStore
          .getState()
          .users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

        if (!user) return { ok: false, error: 'No existe una cuenta con ese email.' }
        if (!user.active) return { ok: false, error: 'Este usuario está deshabilitado.' }
        if (user.password !== password) return { ok: false, error: 'Contraseña incorrecta.' }

        const { password: _pw, ...safeUser } = user
        set({ currentUser: safeUser })
        return { ok: true }
      },
      logout: () => set({ currentUser: null }),
    }),
    { name: 'migestion-auth' },
  ),
)
