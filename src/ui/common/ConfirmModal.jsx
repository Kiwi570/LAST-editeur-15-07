import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'

function ConfirmModal() {
  const closeModal = useEditorStore((s) => s.closeModal)
  const modalData = useEditorStore((s) => s.modalData)

  const { title, message, confirmText, confirmStyle, onConfirm } = modalData || {}

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    closeModal()
  }

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <motion.div className="relative w-full max-w-sm bg-pb-surface border border-pb-border rounded-2xl shadow-2xl overflow-hidden" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
        <div className="p-6 text-center">
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${confirmStyle === 'danger' ? 'bg-accent-red/20' : 'bg-accent-amber/20'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
          >
            <AlertTriangle className={`w-8 h-8 ${confirmStyle === 'danger' ? 'text-accent-red' : 'text-accent-amber'}`} />
          </motion.div>
          <h2 className="text-lg font-semibold text-white mb-2">{title || 'Confirmer ?'}</h2>
          <p className="text-sm text-pb-text-muted">{message || 'Cette action est irréversible.'}</p>
        </div>
        <div className="p-4 border-t border-pb-border flex gap-3">
          <motion.button onClick={closeModal} className="flex-1 btn-secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Annuler
          </motion.button>
          <motion.button
            onClick={handleConfirm}
            className={`flex-1 font-semibold py-2.5 rounded-full transition-all ${confirmStyle === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {confirmText || 'Confirmer'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConfirmModal
