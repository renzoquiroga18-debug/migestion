import { useInventoryStore, stockStatus } from '../store/inventoryStore'
import { daysUntilStockout, suggestReorderQuantity } from './ai'

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

function findProductByName(query: string) {
  const { products } = useInventoryStore.getState()
  const q = normalize(query)

  const exact = products.find((p) => q.includes(normalize(p.name)))
  if (exact) return exact

  return products.find((p) => {
    const words = normalize(p.name)
      .split(' ')
      .filter((w) => w.length >= 4)
    return words.some((w) => q.includes(w))
  })
}

function listAlertProducts() {
  const { products } = useInventoryStore.getState()
  return products.filter((p) => stockStatus(p) !== 'ok')
}

export function getBotResponse(rawMessage: string): string {
  const msg = normalize(rawMessage)

  if (/^(hola|buenas|hey|que tal)/.test(msg)) {
    return '¡Hola! Soy el asistente de MiGestion. Puedo ayudarte con consultas de stock, alertas y cómo usar la plataforma. ¿Qué necesitás saber?'
  }

  if (msg.includes('gracias')) {
    return '¡De nada! Estoy para ayudarte con tu inventario cuando lo necesites.'
  }

  if (msg.includes('agregar producto') || msg.includes('crear producto') || msg.includes('nuevo producto')) {
    return 'Para agregar un producto, andá a la sección "Productos" en el menú lateral y tocá el botón "Nuevo producto". Completá nombre, categoría, precio, costo y stock mínimo.'
  }

  if (msg.includes('agregar usuario') || msg.includes('crear usuario') || msg.includes('nuevo usuario')) {
    return 'En la sección "Usuarios" podés crear un nuevo usuario con el botón "Nuevo usuario", asignarle un rol (admin o empleado) y activarlo o desactivarlo.'
  }

  if (msg.includes('ajustar stock') || msg.includes('cargar stock') || msg.includes('entrada de stock') || msg.includes('salida de stock')) {
    return 'En "Inventario" podés registrar entradas o salidas de stock para cada producto usando el botón "Ajustar", indicando la cantidad y el motivo del movimiento.'
  }

  if (msg.includes('reponer') || msg.includes('reposicion') || msg.includes('cuanto pedir') || msg.includes('cuanto comprar')) {
    const { products, movements } = useInventoryStore.getState()
    const needsReorder = products
      .map((p) => ({ product: p, qty: suggestReorderQuantity(p, movements) }))
      .filter((x) => x.qty > 0)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5)

    if (needsReorder.length === 0) {
      return 'Por ahora ningún producto necesita reposición según el consumo proyectado. ¡Buen nivel de stock!'
    }
    return `Te sugiero reponer:\n${needsReorder.map((x) => `• ${x.product.name}: ${x.qty} ${x.product.unit}`).join('\n')}`
  }

  if (msg.includes('alerta') || msg.includes('bajo stock') || msg.includes('poco stock') || msg.includes('agotado')) {
    const alerts = listAlertProducts()
    if (alerts.length === 0) {
      return 'No hay alertas activas en este momento. Todo el stock está en niveles saludables.'
    }
    return `Tenés ${alerts.length} producto(s) en alerta:\n${alerts
      .slice(0, 6)
      .map((p) => `• ${p.name} — ${stockStatus(p)} (${p.stock} ${p.unit})`)
      .join('\n')}`
  }

  if (msg.includes('stock de') || msg.includes('cuanto stock') || msg.includes('cuanta stock') || msg.includes('queda de')) {
    const product = findProductByName(msg)
    if (!product) {
      return 'No encontré ese producto. Probá con el nombre exacto o revisá la sección "Productos".'
    }
    const { movements } = useInventoryStore.getState()
    const days = daysUntilStockout(product, movements)
    const status = stockStatus(product)
    const eta = days !== null ? ` Se agotaría en ~${Math.round(days)} días al ritmo actual.` : ''
    return `${product.name} tiene ${product.stock} ${product.unit} en stock (estado: ${status}).${eta}`
  }

  if (msg.includes('quien sos') || msg.includes('que sos') || msg.includes('quien eres')) {
    return 'Soy un asistente virtual de demostración integrado en MiGestion. Respondo preguntas frecuentes y consulto el inventario en tiempo real.'
  }

  const genericProduct = findProductByName(msg)
  if (genericProduct) {
    const { movements } = useInventoryStore.getState()
    const status = stockStatus(genericProduct)
    const reorderQty = suggestReorderQuantity(genericProduct, movements)
    return `${genericProduct.name}: ${genericProduct.stock} ${genericProduct.unit} en stock, estado ${status}. ${reorderQty > 0 ? `Se sugiere reponer ${reorderQty} ${genericProduct.unit}.` : 'No necesita reposición por ahora.'}`
  }

  return 'No estoy seguro de haber entendido. Puedo ayudarte con: stock de un producto, alertas activas, sugerencias de reposición, o cómo usar el dashboard, productos y usuarios.'
}
