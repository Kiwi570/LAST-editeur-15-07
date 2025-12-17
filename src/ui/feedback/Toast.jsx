import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'

const TYPES = {
  success: { icon: CheckCircle, bg: 'bg-accent-emerald/10', border: 'border-accent-emerald/30', text: 'text-accent-emerald' },
  error: { icon: XCircle, bg: 'bg-accent-red/10', border: 'border-accent-red/30', text: 'text-accent-red' },
  warning: { icon: AlertCircle, bg: 'bg-accent-amber/10', border: 'border-accent-amber/30', text: 'text-accent-amber' },
  info: { icon: Info, bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/30', text: 'text-accent-cyan' },
}

function Toast() {
  const toast = useEditorStore((s) => s.toast)
  const hideToast = useEditorStore((s) => s.hideToast)

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150]"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
        >
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${TYPES[toast.type]?.bg} ${TYPES[toast.type]?.border} shadow-2xl backdrop-blur-lg`}>
            {React.createElement(TYPES[toast.type]?.icon || Info, {
              className: `w-5 h-5 ${TYPES[toast.type]?.text}`
            })}
            <span className="text-sm font-medium text-white">{toast.message}</span>
            <motion.button
              onClick={hideToast}
              className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-pb-text-muted" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
