import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Zap, Sparkles, Palette, Shield, Smartphone, TrendingUp, Star, Heart, Globe, Lock, Layers, Clock, Check, Rocket, Users, Code, MessageCircle, Settings, Bell, Camera, Music, Video, Mail, Map, Gift, Award, Target, Lightbulb } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'
import { useSiteStore } from '@core/state/siteStore'

const ICONS = [
  { name: 'Zap', icon: Zap },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Palette', icon: Palette },
  { name: 'Shield', icon: Shield },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'Star', icon: Star },
  { name: 'Heart', icon: Heart },
  { name: 'Globe', icon: Globe },
  { name: 'Lock', icon: Lock },
  { name: 'Layers', icon: Layers },
  { name: 'Clock', icon: Clock },
  { name: 'Check', icon: Check },
  { name: 'Rocket', icon: Rocket },
  { name: 'Users', icon: Users },
  { name: 'Code', icon: Code },
  { name: 'MessageCircle', icon: MessageCircle },
  { name: 'Settings', icon: Settings },
  { name: 'Bell', icon: Bell },
  { name: 'Camera', icon: Camera },
  { name: 'Music', icon: Music },
  { name: 'Video', icon: Video },
  { name: 'Mail', icon: Mail },
  { name: 'Map', icon: Map },
  { name: 'Gift', icon: Gift },
  { name: 'Award', icon: Award },
  { name: 'Target', icon: Target },
  { name: 'Lightbulb', icon: Lightbulb },
]

const COLORS = [
  '#22D3EE', '#A78BFA', '#F472B6', '#34D399', '#FBBF24', '#FB7185',
  '#3B82F6', '#F87171', '#FB923C', '#A3E635', '#E879F9', '#6366F1',
]

function IconPickerModal() {
  const closeModal = useEditorStore((s) => s.closeModal)
  const modalData = useEditorStore((s) => s.modalData)
  const showToast = useEditorStore((s) => s.showToast)
  const updateItem = useSiteStore((s) => s.updateItem)

  const { sectionId, collection, index, currentIcon, currentColor } = modalData || {}
  
  const [selectedIcon, setSelectedIcon] = useState(currentIcon || 'Star')
  const [selectedColor, setSelectedColor] = useState(currentColor || '#A78BFA')

  const handleSave = () => {
    updateItem(sectionId, collection, index, { icon: selectedIcon, color: selectedColor })
    showToast('✨ Icône mise à jour !', 'success')
    closeModal()
  }

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <motion.div className="relative w-full max-w-md bg-pb-surface border border-pb-border rounded-2xl shadow-2xl overflow-hidden" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
        <div className="flex items-center justify-between p-5 border-b border-pb-border">
          <h2 className="text-lg font-semibold text-white">🎨 Choisir une icône</h2>
          <motion.button onClick={closeModal} className="btn-icon" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><X className="w-5 h-5" /></motion.button>
        </div>

        <div className="p-5 space-y-5">
          {/* Preview */}
          <div className="flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${selectedColor}20` }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
              key={`${selectedIcon}-${selectedColor}`}
            >
              {React.createElement(ICONS.find(i => i.name === selectedIcon)?.icon || Star, {
                className: 'w-10 h-10',
                style: { color: selectedColor }
              })}
            </motion.div>
          </div>

          {/* Couleurs */}
          <div>
            <label className="block text-xs font-medium text-pb-text-muted mb-2">Couleur</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <motion.button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-lg ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-pb-surface' : ''}`}
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          </div>

          {/* Icônes */}
          <div>
            <label className="block text-xs font-medium text-pb-text-muted mb-2">Icône</label>
            <div className="grid grid-cols-7 gap-2 max-h-[200px] overflow-y-auto pr-1">
              {ICONS.map(({ name, icon: Icon }) => (
                <motion.button
                  key={name}
                  onClick={() => setSelectedIcon(name)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${selectedIcon === name ? 'bg-primary-20 border-2 border-primary' : 'bg-pb-bg border border-pb-border hover:border-pb-border-light'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-5 h-5 ${selectedIcon === name ? 'text-primary' : 'text-pb-text-muted'}`} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-pb-border flex gap-3">
          <motion.button onClick={closeModal} className="flex-1 btn-secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Annuler</motion.button>
          <motion.button onClick={handleSave} className="flex-1 btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Appliquer</motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default IconPickerModal
