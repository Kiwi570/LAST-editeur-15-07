import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Tablet, Smartphone, Eye, Edit3, Upload, Download, Palette, Sparkles } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'
import { useSiteStore } from '@core/state/siteStore'
import ThemePopup from '@ui/common/ThemePopup'

function Header() {
  const mode = useEditorStore((s) => s.mode)
  const setMode = useEditorStore((s) => s.setMode)
  const previewDevice = useEditorStore((s) => s.previewDevice)
  const setPreviewDevice = useEditorStore((s) => s.setPreviewDevice)
  const openModal = useEditorStore((s) => s.openModal)
  const triggerConfetti = useEditorStore((s) => s.triggerConfetti)
  const showToast = useEditorStore((s) => s.showToast)
  const canUndo = useSiteStore((s) => s.canUndo())
  const canRedo = useSiteStore((s) => s.canRedo())
  const undo = useSiteStore((s) => s.undo)
  const redo = useSiteStore((s) => s.redo)

  const [themePopupOpen, setThemePopupOpen] = useState(false)
  const themeButtonRef = useRef(null)

  const handlePublish = () => {
    triggerConfetti()
    showToast('🎉 Site publié avec succès !', 'success')
  }

  return (
    <header className="h-14 bg-pb-surface/80 backdrop-blur-lg border-b border-pb-border flex items-center justify-between px-4 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center">
            <span className="text-lg">🫧</span>
          </div>
          <span className="font-bold text-white hidden sm:block">Bulle</span>
          <span className="text-xs text-primary font-medium hidden sm:block">v2</span>
        </motion.div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1 ml-4 border-l border-pb-border pl-4">
          <motion.button
            onClick={undo}
            disabled={!canUndo}
            className="btn-icon disabled:opacity-30"
            whileHover={{ scale: canUndo ? 1.1 : 1 }}
            whileTap={{ scale: 0.95 }}
            title="Annuler (⌘Z)"
          >
            <span className="text-sm">↩</span>
          </motion.button>
          <motion.button
            onClick={redo}
            disabled={!canRedo}
            className="btn-icon disabled:opacity-30"
            whileHover={{ scale: canRedo ? 1.1 : 1 }}
            whileTap={{ scale: 0.95 }}
            title="Rétablir (⌘Y)"
          >
            <span className="text-sm">↪</span>
          </motion.button>
        </div>
      </div>

      {/* Center - Theme + Device Selector */}
      <div className="flex items-center gap-2">
        {/* 🎨 Bouton Thème */}
        <div className="relative">
          <motion.button
            ref={themeButtonRef}
            onClick={() => setThemePopupOpen(!themePopupOpen)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              themePopupOpen 
                ? 'bg-primary text-white' 
                : 'bg-pb-bg hover:bg-primary/20 text-pb-text-muted hover:text-primary'
            }`}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            title="Thème global"
          >
            <Palette className="w-5 h-5" />
          </motion.button>

          {/* Theme Popup */}
          <AnimatePresence>
            {themePopupOpen && (
              <ThemePopup onClose={() => setThemePopupOpen(false)} />
            )}
          </AnimatePresence>
        </div>

        {/* Séparateur */}
        <div className="w-px h-6 bg-pb-border mx-2" />

        {/* Device Selector (preview only) */}
        {mode === 'preview' && (
          <motion.div 
            className="flex items-center gap-1 bg-pb-bg rounded-xl p-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {[
              { id: 'desktop', icon: Monitor },
              { id: 'tablet', icon: Tablet },
              { id: 'mobile', icon: Smartphone },
            ].map(({ id, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setPreviewDevice(id)}
                className={`p-2 rounded-lg transition-all ${
                  previewDevice === id
                    ? 'bg-primary text-white'
                    : 'text-pb-text-muted hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Mode Toggle */}
        <motion.button
          onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            mode === 'preview'
              ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
              : 'bg-pb-bg text-pb-text-muted hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {mode === 'preview' ? (
            <>
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Éditer</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Aperçu</span>
            </>
          )}
        </motion.button>

        {/* Export */}
        <motion.button
          onClick={() => openModal('export')}
          className="btn-icon"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Exporter"
        >
          <Download className="w-4 h-4" />
        </motion.button>

        {/* Publish */}
        <motion.button
          onClick={handlePublish}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Publier</span>
          <Sparkles className="w-3 h-3 hidden sm:block" />
        </motion.button>
      </div>
    </header>
  )
}

export default Header
