import React from 'react'
import { motion } from 'framer-motion'
import { useEditorStore } from '@core/state/editorStore'

function LumiButton() {
  const openLumi = useEditorStore((s) => s.openLumi)

  return (
    <motion.button
      onClick={openLumi}
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
        
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center shadow-2xl border-2 border-white/20">
          <motion.span
            className="text-2xl"
            animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🫧
          </motion.span>
        </div>

        {/* Ping */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-accent-emerald rounded-full border-2 border-pb-bg">
          <span className="absolute inset-0 rounded-full bg-accent-emerald animate-ping" />
        </span>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-3 py-1.5 bg-pb-surface border border-pb-border rounded-lg text-sm text-white whitespace-nowrap shadow-xl">
            Parle-moi ! <span className="text-pb-text-muted ml-1">⌘K</span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default LumiButton
