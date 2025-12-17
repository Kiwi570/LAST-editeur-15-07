import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'
import { useEditorStore } from '@core/state/editorStore'

const THEMES = [
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Violet & Rose',
    colors: {
      primary: '#A78BFA',
      secondary: '#F472B6',
      accent: '#22D3EE',
    },
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Bleu profond',
    colors: {
      primary: '#3B82F6',
      secondary: '#06B6D4',
      accent: '#8B5CF6',
    },
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Orange & Rouge',
    colors: {
      primary: '#F97316',
      secondary: '#EF4444',
      accent: '#FBBF24',
    },
    gradient: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Vert nature',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#6EE7B7',
    },
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Bleu nuit',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#A78BFA',
    },
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  },
  {
    id: 'candy',
    name: 'Candy',
    description: 'Rose & Cyan',
    colors: {
      primary: '#EC4899',
      secondary: '#F472B6',
      accent: '#22D3EE',
    },
    gradient: 'linear-gradient(135deg, #EC4899 0%, #22D3EE 100%)',
  },
]

function ThemePopup({ isOpen, onClose }) {
  const currentTheme = useSiteStore((s) => s.theme) || 'aurora'
  const setTheme = useSiteStore((s) => s.setTheme)
  const showToast = useEditorStore((s) => s.showToast)

  const handleSelectTheme = (themeId) => {
    setTheme(themeId)
    showToast(`🎨 Thème "${THEMES.find(t => t.id === themeId)?.name}" appliqué !`, 'success')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-lg rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #12121f 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(167,139,250,0.2)' }}>
                🎨
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Thème</h2>
                <p className="text-sm text-white/50">Choisis l'ambiance de ton site</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              whileHover={{ background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-white/60" />
            </motion.button>
          </div>
          
          {/* Themes Grid */}
          <div className="p-6 grid grid-cols-2 gap-4">
            {THEMES.map((theme) => {
              const isActive = currentTheme === theme.id
              return (
                <motion.button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className="relative p-4 rounded-2xl text-left transition-all overflow-hidden"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                    border: isActive ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ 
                    background: 'rgba(255,255,255,0.08)',
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient preview */}
                  <div 
                    className="h-12 rounded-xl mb-3"
                    style={{ background: theme.gradient }}
                  />
                  
                  {/* Theme info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-sm">{theme.name}</p>
                      <p className="text-xs text-white/50">{theme.description}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: theme.colors.primary }}
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Color dots */}
                  <div className="flex gap-1.5 mt-3">
                    {Object.values(theme.colors).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full"
                        style={{ background: color, border: '2px solid rgba(255,255,255,0.2)' }}
                      />
                    ))}
                  </div>
                </motion.button>
              )
            })}
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <motion.button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)',
                boxShadow: '0 4px 15px rgba(167,139,250,0.3)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(167,139,250,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Fermer
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemePopup
