import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Pipette } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'
import { useEditorStore } from '@core/state/editorStore'
import { PALETTES, RADIUS_OPTIONS } from '@core/theme/ThemeProvider'

function StylePanel() {
  const global = useSiteStore((s) => s.getGlobal())
  const updateGlobal = useSiteStore((s) => s.updateGlobal)
  const showToast = useEditorStore((s) => s.showToast)
  
  const [showCustomColor, setShowCustomColor] = useState(false)
  const [customColor, setCustomColor] = useState('#A78BFA')

  const currentPalette = global?.palette?.primary || PALETTES.violet.primary
  const currentRadius = global?.borderRadius || 'large'

  const handlePaletteChange = (palette) => {
    updateGlobal({ palette })
    showToast(`🎨 Palette ${palette.name} appliquée !`, 'success')
  }

  const handleRadiusChange = (radiusId) => {
    updateGlobal({ borderRadius: radiusId })
    showToast('🔲 Style de bordures changé !', 'success')
  }

  const handleCustomColor = () => {
    updateGlobal({ 
      palette: { 
        id: 'custom', 
        name: 'Personnalisée',
        primary: customColor, 
        secondary: customColor, 
        accent: customColor 
      } 
    })
    showToast('🎨 Couleur personnalisée appliquée !', 'success')
    setShowCustomColor(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-pb-border">
        <h4 className="text-sm font-medium text-white flex items-center gap-2">
          🎨 Style Global
        </h4>
        <p className="text-xs text-pb-text-light mt-1">Ces styles s'appliquent à toute la page</p>
      </div>

      {/* Palettes de couleurs */}
      <div className="space-y-3">
        <label className="block text-xs font-medium text-pb-text-muted">Palette de couleurs</label>
        
        <div className="grid grid-cols-4 gap-2">
          {Object.values(PALETTES).map((palette) => {
            const isActive = currentPalette === palette.primary
            return (
              <motion.button
                key={palette.id}
                onClick={() => handlePaletteChange(palette)}
                className={`relative group p-2 rounded-xl border-2 transition-all ${
                  isActive 
                    ? 'border-white bg-white/10' 
                    : 'border-transparent hover:border-white/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={palette.name}
              >
                {/* Cercle de couleur avec dégradé */}
                <div 
                  className="w-full aspect-square rounded-lg shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${palette.secondary}, ${palette.primary}, ${palette.accent})` 
                  }}
                />
                
                {/* Check mark */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-3 h-3 text-pb-bg" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Nom au hover */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-[10px] text-pb-text-muted bg-pb-bg px-1.5 py-0.5 rounded">
                    {palette.name}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Couleur personnalisée */}
        <motion.button
          onClick={() => setShowCustomColor(!showCustomColor)}
          className={`w-full p-3 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-2 ${
            showCustomColor ? 'border-primary bg-primary-10' : 'border-pb-border hover:border-primary/50'
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <Pipette className="w-4 h-4 text-pb-text-muted" />
          <span className="text-sm text-pb-text-muted">Couleur personnalisée</span>
        </motion.button>

        <AnimatePresence>
          {showCustomColor && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 bg-pb-bg rounded-xl border border-pb-border space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="input text-sm font-mono"
                      placeholder="#A78BFA"
                    />
                  </div>
                </div>
                
                {/* Preview */}
                <div className="p-3 rounded-lg" style={{ backgroundColor: customColor + '20' }}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: customColor }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: customColor }}>
                        Aperçu de ta couleur
                      </div>
                      <div className="text-xs text-pb-text-muted">
                        Boutons, accents, liens...
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleCustomColor}
                  className="w-full btn-primary py-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Appliquer cette couleur
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bordures */}
      <div className="space-y-3 pt-4 border-t border-pb-border">
        <label className="block text-xs font-medium text-pb-text-muted">Style des bordures</label>
        
        <div className="grid grid-cols-2 gap-2">
          {Object.values(RADIUS_OPTIONS).map((option) => {
            const isActive = currentRadius === option.id
            return (
              <motion.button
                key={option.id}
                onClick={() => handleRadiusChange(option.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  isActive 
                    ? 'border-primary bg-primary-10' 
                    : 'border-pb-border hover:border-primary/50 bg-pb-bg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Preview visuel */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* Bouton preview */}
                  <div 
                    className="w-10 h-5 bg-primary"
                    style={{ 
                      borderRadius: option.id === 'none' ? '0' 
                        : option.id === 'small' ? '4px' 
                        : option.id === 'medium' ? '8px' 
                        : '9999px' 
                    }}
                  />
                  {/* Card preview */}
                  <div 
                    className="w-8 h-8 border-2 border-primary/50 bg-primary/20"
                    style={{ 
                      borderRadius: option.id === 'none' ? '0' 
                        : option.id === 'small' ? '4px' 
                        : option.id === 'medium' ? '8px' 
                        : '16px' 
                    }}
                  />
                </div>
                
                <div className={`text-xs font-medium ${isActive ? 'text-white' : 'text-pb-text-muted'}`}>
                  {option.name}
                </div>
                
                {isActive && (
                  <motion.div
                    className="absolute top-2 right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Preview global */}
      <div className="space-y-3 pt-4 border-t border-pb-border">
        <label className="block text-xs font-medium text-pb-text-muted">Aperçu des éléments</label>
        
        <div className="p-4 bg-pb-bg rounded-xl border border-pb-border space-y-4">
          {/* Buttons preview */}
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary text-xs py-1.5 px-3">
              Bouton principal
            </button>
            <button className="btn-secondary text-xs py-1.5 px-3">
              Secondaire
            </button>
          </div>
          
          {/* Card preview */}
          <div className="card p-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ backgroundColor: currentPalette + '20', color: currentPalette }}
              >
                ✨
              </div>
              <div>
                <div className="text-sm font-medium">Exemple de carte</div>
                <div className="text-xs text-pb-text-muted">Avec ton style appliqué</div>
              </div>
            </div>
          </div>
          
          {/* Badge preview */}
          <div className="flex items-center gap-2">
            <span 
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ backgroundColor: currentPalette + '20', color: currentPalette }}
            >
              Badge
            </span>
            <span className="text-xs text-pb-text-muted">← Tes couleurs partout</span>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="p-3 bg-accent-cyan/10 rounded-xl border border-accent-cyan/30">
        <p className="text-xs text-accent-cyan">
          💡 Ces styles s'appliquent à toute la page : boutons, cartes, badges, liens...
        </p>
      </div>
    </div>
  )
}

export default StylePanel
