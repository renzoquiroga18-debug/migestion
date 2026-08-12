export type PaletteKey = 'brand' | 'emerald' | 'violet' | 'sunset'

interface Palette {
  label: string
  line1: string
  line2: string
  bar: string
  categoryColors: string[]
}

export const PALETTES: Record<PaletteKey, Palette> = {
  brand: {
    label: 'Azul',
    line1: '#3170f5',
    line2: '#10b981',
    bar: '#3170f5',
    categoryColors: ['#3170f5', '#60a5fa', '#0ea5e9', '#6366f1', '#38bdf8', '#1d4ed8', '#0284c7'],
  },
  emerald: {
    label: 'Esmeralda',
    line1: '#10b981',
    line2: '#3170f5',
    bar: '#10b981',
    categoryColors: ['#10b981', '#34d399', '#22c55e', '#059669', '#4ade80', '#16a34a', '#84cc16'],
  },
  violet: {
    label: 'Violeta',
    line1: '#8b5cf6',
    line2: '#f59e0b',
    bar: '#8b5cf6',
    categoryColors: ['#8b5cf6', '#a78bfa', '#c084fc', '#7c3aed', '#d946ef', '#6366f1', '#ec4899'],
  },
  sunset: {
    label: 'Atardecer',
    line1: '#f97316',
    line2: '#0ea5e9',
    bar: '#f97316',
    categoryColors: ['#f97316', '#fb923c', '#f59e0b', '#ef4444', '#facc15', '#ea580c', '#fbbf24'],
  },
}

export const paletteOptions = (Object.keys(PALETTES) as PaletteKey[]).map((key) => ({
  value: key,
  label: PALETTES[key].label,
}))

export type StatusPaletteKey = 'vivid' | 'pastel' | 'contrast'

interface StatusPalette {
  label: string
  ok: string
  bajo: string
  critico: string
  agotado: string
}

export const STATUS_PALETTES: Record<StatusPaletteKey, StatusPalette> = {
  vivid: { label: 'Vívido', ok: '#10b981', bajo: '#f59e0b', critico: '#f97316', agotado: '#ef4444' },
  pastel: { label: 'Pastel', ok: '#86efac', bajo: '#fde68a', critico: '#fdba74', agotado: '#fca5a5' },
  contrast: { label: 'Contraste', ok: '#22c55e', bajo: '#eab308', critico: '#a855f7', agotado: '#dc2626' },
}

export const statusPaletteOptions = (Object.keys(STATUS_PALETTES) as StatusPaletteKey[]).map((key) => ({
  value: key,
  label: STATUS_PALETTES[key].label,
}))
