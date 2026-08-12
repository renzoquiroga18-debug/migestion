import type { Product, StockMovement, User, Category } from '../types'

// Small seeded PRNG so the demo data is reproducible on every reset.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(42)

export const categories: Category[] = [
  'Almacén',
  'Bebidas',
  'Limpieza',
  'Lácteos',
  'Panadería',
  'Electrónica',
  'Papelería',
]

export const seedProducts: Product[] = [
  { id: 'p1', name: 'Arroz Largo Fino 1kg', sku: 'ALM-001', category: 'Almacén', price: 1450, cost: 980, stock: 42, minStock: 20, unit: 'un' },
  { id: 'p2', name: 'Fideos Spaghetti 500g', sku: 'ALM-002', category: 'Almacén', price: 890, cost: 560, stock: 8, minStock: 15, unit: 'un' },
  { id: 'p3', name: 'Aceite de Girasol 900ml', sku: 'ALM-003', category: 'Almacén', price: 2350, cost: 1700, stock: 26, minStock: 12, unit: 'un' },
  { id: 'p4', name: 'Azúcar 1kg', sku: 'ALM-004', category: 'Almacén', price: 1100, cost: 750, stock: 3, minStock: 18, unit: 'un' },
  { id: 'p5', name: 'Yerba Mate 1kg', sku: 'ALM-005', category: 'Almacén', price: 3200, cost: 2300, stock: 34, minStock: 15, unit: 'un' },
  { id: 'p6', name: 'Agua Mineral 2L', sku: 'BEB-001', category: 'Bebidas', price: 950, cost: 600, stock: 60, minStock: 25, unit: 'un' },
  { id: 'p7', name: 'Gaseosa Cola 1.5L', sku: 'BEB-002', category: 'Bebidas', price: 1600, cost: 1050, stock: 12, minStock: 20, unit: 'un' },
  { id: 'p8', name: 'Jugo de Naranja 1L', sku: 'BEB-003', category: 'Bebidas', price: 1350, cost: 900, stock: 0, minStock: 10, unit: 'un' },
  { id: 'p9', name: 'Cerveza Lata 473ml', sku: 'BEB-004', category: 'Bebidas', price: 780, cost: 520, stock: 48, minStock: 24, unit: 'un' },
  { id: 'p10', name: 'Lavandina 1L', sku: 'LIM-001', category: 'Limpieza', price: 1050, cost: 680, stock: 22, minStock: 10, unit: 'un' },
  { id: 'p11', name: 'Detergente 750ml', sku: 'LIM-002', category: 'Limpieza', price: 1400, cost: 950, stock: 5, minStock: 12, unit: 'un' },
  { id: 'p12', name: 'Papel Higiénico x4', sku: 'LIM-003', category: 'Limpieza', price: 2100, cost: 1500, stock: 30, minStock: 15, unit: 'pack' },
  { id: 'p13', name: 'Leche Entera 1L', sku: 'LAC-001', category: 'Lácteos', price: 990, cost: 700, stock: 18, minStock: 20, unit: 'un' },
  { id: 'p14', name: 'Queso Cremoso 500g', sku: 'LAC-002', category: 'Lácteos', price: 3400, cost: 2600, stock: 9, minStock: 8, unit: 'un' },
  { id: 'p15', name: 'Yogur Bebible 1L', sku: 'LAC-003', category: 'Lácteos', price: 1250, cost: 850, stock: 14, minStock: 12, unit: 'un' },
  { id: 'p16', name: 'Pan Lactal', sku: 'PAN-001', category: 'Panadería', price: 1600, cost: 1050, stock: 11, minStock: 10, unit: 'un' },
  { id: 'p17', name: 'Facturas Surtidas x6', sku: 'PAN-002', category: 'Panadería', price: 2200, cost: 1400, stock: 2, minStock: 8, unit: 'pack' },
  { id: 'p18', name: 'Auriculares Bluetooth', sku: 'ELE-001', category: 'Electrónica', price: 18500, cost: 12000, stock: 7, minStock: 5, unit: 'un' },
  { id: 'p19', name: 'Cargador USB-C', sku: 'ELE-002', category: 'Electrónica', price: 6200, cost: 3800, stock: 15, minStock: 8, unit: 'un' },
  { id: 'p20', name: 'Cuaderno A4 Rayado', sku: 'PAP-001', category: 'Papelería', price: 1300, cost: 780, stock: 40, minStock: 15, unit: 'un' },
]

export const seedUsers: User[] = [
  { id: 'u1', name: 'Renzo Quiroga', email: 'admin@migestion.com', password: 'demo123', role: 'admin', active: true },
  { id: 'u2', name: 'Camila Torres', email: 'camila@migestion.com', password: 'demo123', role: 'empleado', active: true },
  { id: 'u3', name: 'Lucas Fernández', email: 'lucas@migestion.com', password: 'demo123', role: 'empleado', active: true },
  { id: 'u4', name: 'Sofía Ramírez', email: 'sofia@migestion.com', password: 'demo123', role: 'admin', active: false },
]

function genMovements(): StockMovement[] {
  const movements: StockMovement[] = []
  const today = new Date()
  let counter = 0
  const outReasons = ['Venta mostrador', 'Venta online', 'Merma', 'Traslado a sucursal']
  const inReasons = ['Compra a proveedor', 'Devolución', 'Ajuste de inventario']

  for (const product of seedProducts) {
    const dailyBase = 1 + Math.floor(rand() * 4)
    for (let d = 29; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(date.getDate() - d)
      const dateStr = date.toISOString().slice(0, 10)

      if (rand() < 0.75) {
        const qty = Math.max(1, Math.round(dailyBase * (0.5 + rand())))
        movements.push({
          id: `m${counter++}`,
          productId: product.id,
          date: dateStr,
          type: 'out',
          quantity: qty,
          reason: outReasons[Math.floor(rand() * outReasons.length)],
        })
      }
      if (rand() < 0.12) {
        const qty = Math.round(dailyBase * (3 + rand() * 4))
        movements.push({
          id: `m${counter++}`,
          productId: product.id,
          date: dateStr,
          type: 'in',
          quantity: qty,
          reason: inReasons[Math.floor(rand() * inReasons.length)],
        })
      }
    }
  }
  return movements
}

export const seedMovements: StockMovement[] = genMovements()
