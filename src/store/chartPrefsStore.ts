import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PaletteKey, StatusPaletteKey } from '../lib/chartPalettes'

export type TrendStyle = 'area' | 'line' | 'bar'
export type CategoryStyle = 'vertical' | 'horizontal'
export type StatusStyle = 'donut' | 'pie'

interface ChartPrefsState {
  trendStyle: TrendStyle
  trendPalette: PaletteKey
  categoryStyle: CategoryStyle
  categoryPalette: PaletteKey
  statusStyle: StatusStyle
  statusPalette: StatusPaletteKey
  setTrendStyle: (v: TrendStyle) => void
  setTrendPalette: (v: PaletteKey) => void
  setCategoryStyle: (v: CategoryStyle) => void
  setCategoryPalette: (v: PaletteKey) => void
  setStatusStyle: (v: StatusStyle) => void
  setStatusPalette: (v: StatusPaletteKey) => void
}

export const useChartPrefsStore = create<ChartPrefsState>()(
  persist(
    (set) => ({
      trendStyle: 'area',
      trendPalette: 'brand',
      categoryStyle: 'vertical',
      categoryPalette: 'brand',
      statusStyle: 'donut',
      statusPalette: 'vivid',
      setTrendStyle: (v) => set({ trendStyle: v }),
      setTrendPalette: (v) => set({ trendPalette: v }),
      setCategoryStyle: (v) => set({ categoryStyle: v }),
      setCategoryPalette: (v) => set({ categoryPalette: v }),
      setStatusStyle: (v) => set({ statusStyle: v }),
      setStatusPalette: (v) => set({ statusPalette: v }),
    }),
    { name: 'migestion-chart-prefs' },
  ),
)
