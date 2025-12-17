import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, GripHorizontal, Pipette } from 'lucide-react'
import { PALETTES } from '@core/theme/ThemeProvider'

// Palette de couleurs étendue
const COLOR_PALETTE = [
  // Couleurs primaires des thèmes
  ...Object.values(PALETTES).map(p => p.primary),
  // Couleurs additionnelles
  '#FFFFFF', // Blanc
  '#F3F4F6', // Gris très clair
  '#9CA3AF', // Gris
  '#4B5563', // Gris foncé
  '#1F2937', // Presque noir
  '#000000', // Noir
]

function ColorPickerPopup({ 
  isOpen, 
  onClose, 
  onSelect, 
  currentColor = '#FFFFFF',
  elementName = 'Élément',
  position = { x: 0, y: 0 }
}) {
  const [selectedColor, setSelectedColor] = useState(currentColor)
  const [hexInput, setHexInput] = useState(currentColor)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [popupPosition, setPopupPosition] = useState(position)
  const popupRef = useRef(null)
  const colorInputRef = useRef(null)

  // Reset quand la popup s'ouvre
  useEffect(() => {
    if (isOpen) {
      setSelectedColor(currentColor)
      setHexInput(currentColor)
      // Positionner au centre de l'écran
      setPopupPosition({
        x: Math.max(50, Math.min(position.x, window.innerWidth - 320)),
        y: Math.max(50, Math.min(position.y, window.innerHeight - 400))
      })
    }
  }, [isOpen, currentColor, position])

  // Drag functionality
  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true)
      const rect = popupRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPopupPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  const handleColorClick = (color) => {
    setSelectedColor(color)
    setHexInput(color)
  }

  const handleHexChange = (e) => {
    let value = e.target.value
    if (!value.startsWith('#')) value = '#' + value
    setHexInput(value)
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setSelectedColor(value)
    }
  }

  const handleNativeColorChange = (e) => {
    const color = e.target.value.toUpperCase()
    setSelectedColor(color)
    setHexInput(color)
  }

  const handleConfirm = () => {
    onSelect(selectedColor, false)
    onClose()
  }

  const handleCancel = () => {
    onSelect(currentColor, false)
    onClose()
  }

  if (!isOpen) return null

  // Utiliser createPortal pour rendre au niveau du body
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay transparent pour fermer au clic dehors */}
          <motion.div
            className="fixed inset-0 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
          />
          
          {/* Popup */}
          <motion.div
            ref={popupRef}
            className="fixed z-[9999] select-none"
            style={{ 
              left: popupPosition.x, 
              top: popupPosition.y,
              cursor: isDragging ? 'grabbing' : 'auto'
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            onMouseDown={handleMouseDown}
          >
            {/* Popup Container - FORME RONDE */}
            <div 
              className="w-80 bg-gradient-to-br from-pb-surface via-pb-surface to-pb-bg border-2 border-pb-border shadow-2xl overflow-hidden"
              style={{ 
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Header draggable - ROND */}
              <div 
                className="drag-handle px-5 py-4 flex items-center justify-between cursor-grab active:cursor-grabbing bg-pb-bg/50 border-b border-pb-border"
                style={{ borderRadius: '32px 32px 0 0' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-pb-text-muted/30" />
                    <div className="w-2 h-2 rounded-full bg-pb-text-muted/30" />
                    <div className="w-2 h-2 rounded-full bg-pb-text-muted/30" />
                  </div>
                  <span className="text-sm font-semibold text-white">🎨 {elementName}</span>
                </div>
                <motion.button
                  onClick={handleCancel}
                  className="w-7 h-7 rounded-full bg-pb-surface-light hover:bg-red-500/20 flex items-center justify-center text-pb-text-muted hover:text-red-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="p-5 space-y-5">
                {/* Palette de couleurs en CERCLE */}
                <div className="flex flex-wrap justify-center gap-3">
                  {COLOR_PALETTE.map((color, index) => {
                    const isSelected = selectedColor.toUpperCase() === color.toUpperCase()
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleColorClick(color)}
                        className={`relative w-10 h-10 rounded-full border-3 transition-all ${
                          isSelected 
                            ? 'border-white shadow-lg ring-2 ring-white/30 ring-offset-2 ring-offset-pb-surface' 
                            : 'border-transparent hover:border-white/40'
                        }`}
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className={`w-5 h-5 ${
                              ['#FFFFFF', '#F3F4F6'].includes(color)
                                ? 'text-gray-800'
                                : 'text-white'
                            }`} strokeWidth={3} />
                          </motion.div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Preview - ROND */}
                <div 
                  className="h-20 flex items-center justify-center border-2 border-white/10"
                  style={{ 
                    backgroundColor: selectedColor + '25',
                    borderRadius: '20px'
                  }}
                >
                  <div className="text-center">
                    <span 
                      className="text-2xl font-bold block"
                      style={{ color: selectedColor }}
                    >
                      Aperçu
                    </span>
                    <span className="text-xs text-pb-text-muted">Live preview</span>
                  </div>
                </div>

                {/* Hex Input + Color Picker - ROND */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={hexInput}
                      onChange={handleHexChange}
                      className="w-full text-sm font-mono pl-12 pr-4 py-3 bg-pb-bg border-2 border-pb-border focus:border-primary outline-none transition-colors"
                      style={{ borderRadius: '14px' }}
                      placeholder="#A78BFA"
                      maxLength={7}
                    />
                    <div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                  
                  {/* Native Color Picker */}
                  <motion.button
                    onClick={() => colorInputRef.current?.click()}
                    className="w-12 h-12 rounded-2xl bg-pb-bg border-2 border-pb-border hover:border-primary flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Pipette"
                  >
                    <Pipette className="w-5 h-5 text-pb-text-muted" />
                  </motion.button>
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={selectedColor}
                    onChange={handleNativeColorChange}
                    className="sr-only"
                  />
                </div>

                {/* Actions - ROND */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    onClick={handleCancel}
                    className="flex-1 py-3 bg-pb-bg border-2 border-pb-border text-pb-text-muted hover:text-white hover:border-pb-border-light font-semibold text-sm transition-all"
                    style={{ borderRadius: '14px' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    onClick={handleConfirm}
                    className="flex-1 py-3 bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30"
                    style={{ borderRadius: '14px' }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✓ Appliquer
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ColorPickerPopup
