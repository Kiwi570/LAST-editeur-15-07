import React from 'react'
import { motion } from 'framer-motion'
import { Grid, Columns, AlignCenter, AlignLeft, AlignRight, Maximize, Minimize, Minus } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'
import { useEditorStore } from '@core/state/editorStore'

const GRADIENT = 'linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)'

const VARIANTS = {
  hero: [
    { id: 'centered', icon: AlignCenter, label: 'Centré' },
    { id: 'split-left', icon: AlignLeft, label: 'Image droite' },
    { id: 'split-right', icon: AlignRight, label: 'Image gauche' },
  ],
  features: [
    { id: 'grid-3', icon: Grid, label: '3 colonnes' },
    { id: 'grid-2', icon: Columns, label: '2 colonnes' },
    { id: 'list', icon: AlignLeft, label: 'Liste' },
  ],
  howItWorks: [
    { id: 'timeline', icon: AlignCenter, label: 'Timeline' },
    { id: 'cards', icon: Grid, label: 'Cartes' },
    { id: 'minimal', icon: Minus, label: 'Minimal' },
  ],
  pricing: [
    { id: 'cards', icon: Grid, label: 'Cartes' },
    { id: 'table', icon: Columns, label: 'Tableau' },
    { id: 'minimal', icon: Minus, label: 'Minimal' },
  ],
  faq: [
    { id: 'accordion', icon: AlignLeft, label: 'Accordéon' },
    { id: 'grid', icon: Grid, label: 'Grille' },
    { id: 'simple', icon: Minus, label: 'Simple' },
  ],
}

const SPACING = [
  { id: 'compact', icon: Minimize, label: 'Compact' },
  { id: 'normal', icon: Minus, label: 'Normal' },
  { id: 'spacious', icon: Maximize, label: 'Aéré' },
]

function LayoutPanel({ sectionId, lightMode = false }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  const updateLayout = useSiteStore((s) => s.updateLayout)
  const highlightSection = useEditorStore((s) => s.highlightSection)
  const showToast = useEditorStore((s) => s.showToast)

  if (!section) return <div className="text-center py-8"><p className="text-white/40 text-sm">Sélectionne une section</p></div>

  const type = section.type || sectionId.split('_')[0]
  const layout = section.layout || {}
  const variants = VARIANTS[type] || VARIANTS.features

  const handleVariantChange = (variant) => {
    updateLayout(sectionId, { variant })
    highlightSection(sectionId)
    showToast(`✨ Layout "${variant}" appliqué !`, 'success')
  }

  const handleSpacingChange = (spacing) => {
    updateLayout(sectionId, { spacing })
    highlightSection(sectionId)
    showToast(`📐 Espacement "${spacing}" appliqué !`, 'success')
  }

  const cardStyle = {
    background: '#1a1a2e',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '16px',
  }

  return (
    <div className="space-y-6">
      {/* Variants */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-4">Disposition</label>
        <div className="grid grid-cols-3 gap-3">
          {variants.map(({ id, icon: Icon, label }) => {
            const isActive = layout.variant === id
            return (
              <motion.button
                key={id}
                onClick={() => handleVariantChange(id)}
                className="p-4 rounded-2xl flex flex-col items-center gap-2 relative overflow-hidden group"
                style={{
                  background: isActive ? 'transparent' : '#1a1a2e',
                  border: isActive ? 'none' : '2px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Gradient background when active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: GRADIENT }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                {/* Hover gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: isActive ? 'transparent' : GRADIENT }}
                />
                <Icon className="w-6 h-6 relative z-10" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }} />
                <span className="text-xs font-semibold relative z-10" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}>{label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-4">Espacement</label>
        <div className="grid grid-cols-3 gap-3">
          {SPACING.map(({ id, icon: Icon, label }) => {
            const isActive = layout.spacing === id
            return (
              <motion.button
                key={id}
                onClick={() => handleSpacingChange(id)}
                className="p-4 rounded-2xl flex flex-col items-center gap-2 relative overflow-hidden group"
                style={{
                  background: isActive ? 'transparent' : '#1a1a2e',
                  border: isActive ? 'none' : '2px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: GRADIENT }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: isActive ? 'transparent' : GRADIENT }}
                />
                <Icon className="w-6 h-6 relative z-10" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }} />
                <span className="text-xs font-semibold relative z-10" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}>{label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Visual Preview */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-4">Aperçu</label>
        <div className="p-6 rounded-2xl relative overflow-hidden" style={cardStyle}>
          {/* Gradient border top */}
          <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full" style={{ background: GRADIENT }} />
          
          <div className="space-y-3 pt-2">
            <div className="h-3 rounded-full w-1/3 mx-auto" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="h-2 rounded-full w-2/3 mx-auto" style={{ background: 'rgba(255,255,255,0.05)' }} />
            
            {/* Dynamic preview based on variant */}
            <div className="pt-4">
              {layout.variant?.includes('grid') || layout.variant === 'cards' ? (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 rounded-xl" style={{ background: `rgba(167,139,250,${0.1 + i * 0.05})` }} />
                  ))}
                </div>
              ) : layout.variant === 'timeline' ? (
                <div className="flex items-center justify-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <React.Fragment key={i}>
                      <div className="w-8 h-8 rounded-full" style={{ background: GRADIENT }} />
                      {i < 3 && <div className="w-8 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-8 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tip */}
      <motion.div 
        className="p-4 rounded-2xl relative overflow-hidden"
        style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: GRADIENT }} />
        <p className="text-sm text-white/70 pl-3">
          💡 <strong>Astuce :</strong> Parle à Bulle pour changer le layout !<br/>
          <span className="text-white/50">Ex: "Passe en 2 colonnes"</span>
        </p>
      </motion.div>
    </div>
  )
}

export default LayoutPanel
