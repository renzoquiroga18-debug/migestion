import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedProducts, seedMovements } from '../data/seed'
import type { Product, StockMovement, StockStatus } from '../types'

export function stockStatus(product: Product): StockStatus {
  if (product.stock <= 0) return 'agotado'
  if (product.stock <= product.minStock * 0.5) return 'critico'
  if (product.stock <= product.minStock) return 'bajo'
  return 'ok'
}

interface InventoryState {
  products: Product[]
  movements: StockMovement[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, patch: Partial<Omit<Product, 'id'>>) => void
  deleteProduct: (id: string) => void
  adjustStock: (
    productId: string,
    type: 'in' | 'out',
    quantity: number,
    reason: string,
  ) => void
  reset: () => void
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      products: seedProducts,
      movements: seedMovements,
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: `p${Date.now()}` }],
        })),
      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          movements: state.movements.filter((m) => m.productId !== id),
        })),
      adjustStock: (productId, type, quantity, reason) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  stock: Math.max(0, p.stock + (type === 'in' ? quantity : -quantity)),
                }
              : p,
          ),
          movements: [
            {
              id: `m${Date.now()}`,
              productId,
              date: new Date().toISOString().slice(0, 10),
              type,
              quantity,
              reason,
            },
            ...state.movements,
          ],
        })),
      reset: () => set({ products: seedProducts, movements: seedMovements }),
    }),
    { name: 'migestion-inventory' },
  ),
)
