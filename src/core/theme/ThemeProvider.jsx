import { useEffect } from 'react'
import { useSiteStore } from '@core/state/siteStore'

export const PALETTES = {
  violet: { id: 'violet', name: 'Violet', primary: '#A78BFA', secondary: '#8B5CF6', accent: '#7C3AED' },
  cyan: { id: 'cyan', name: 'Cyan', primary: '#22D3EE', secondary: '#06B6D4', accent: '#0891B2' },
  pink: { id: 'pink', name: 'Rose', primary: '#F472B6', secondary: '#EC4899', accent: '#DB2777' },
  emerald: { id: 'emerald', name: 'Émeraude', primary: '#34D399', secondary: '#10B981', accent: '#059669' },
  amber: { id: 'amber', name: 'Ambre', primary: '#FBBF24', secondary: '#F59E0B', accent: '#D97706' },
  blue: { id: 'blue', name: 'Bleu', primary: '#3B82F6', secondary: '#2563EB', accent: '#1D4ED8' },
  red: { id: 'red', name: 'Rouge', primary: '#F87171', secondary: '#EF4444', accent: '#DC2626' },
  orange: { id: 'orange', name: 'Orange', primary: '#FB923C', secondary: '#F97316', accent: '#EA580C' },
}

export const RADIUS_OPTIONS = {
  none: { id: 'none', name: 'Carré', preview: '0' },
  small: { id: 'small', name: 'Léger', preview: '4px' },
  medium: { id: 'medium', name: 'Moyen', preview: '8px' },
  large: { id: 'large', name: 'Arrondi', preview: '16px' },
}

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 167, g: 139, b: 250 }
}

export const applyTheme = (palette, borderRadius) => {
  const root = document.documentElement
  const body = document.body
  
  if (palette) {
    const primary = palette.primary || '#A78BFA'
    const secondary = palette.secondary || '#8B5CF6'
    const accent = palette.accent || '#7C3AED'
    
    root.style.setProperty('--color-primary', primary)
    root.style.setProperty('--color-secondary', secondary)
    root.style.setProperty('--color-accent', accent)
    
    const rgb = hexToRgb(primary)
    root.style.setProperty('--color-primary-10', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`)
    root.style.setProperty('--color-primary-20', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`)
    root.style.setProperty('--color-primary-30', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`)
    root.style.setProperty('--color-primary-50', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`)
  }
  
  if (borderRadius) body.setAttribute('data-radius', borderRadius)
}

export const useTheme = () => {
  const palette = useSiteStore((state) => state.site?.global?.palette)
  const borderRadius = useSiteStore((state) => state.site?.global?.borderRadius || 'large')
  const currentPalette = Object.values(PALETTES).find(p => p.primary === palette?.primary) || PALETTES.violet
  
  return {
    palette,
    borderRadius,
    currentPalette,
    palettes: Object.values(PALETTES),
    radiusOptions: Object.values(RADIUS_OPTIONS),
  }
}

export const ThemeProvider = ({ children }) => {
  const palette = useSiteStore((state) => state.site?.global?.palette)
  const borderRadius = useSiteStore((state) => state.site?.global?.borderRadius)
  
  useEffect(() => {
    applyTheme(palette, borderRadius)
  }, [palette, borderRadius])
  
  return children
}

export default ThemeProvider
