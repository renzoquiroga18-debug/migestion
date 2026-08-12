export type Category =
  | 'Almacén'
  | 'Bebidas'
  | 'Limpieza'
  | 'Lácteos'
  | 'Panadería'
  | 'Electrónica'
  | 'Papelería'

export interface Product {
  id: string
  name: string
  sku: string
  category: Category
  price: number
  cost: number
  stock: number
  minStock: number
  unit: string
}

export interface StockMovement {
  id: string
  productId: string
  date: string // ISO date
  type: 'in' | 'out'
  quantity: number
  reason: string
}

export type Role = 'admin' | 'empleado'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
  active: boolean
}

export type StockStatus = 'ok' | 'bajo' | 'critico' | 'agotado'

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: number
}
