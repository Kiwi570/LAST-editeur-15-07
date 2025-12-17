import { useEffect } from 'react'
import { useSiteStore } from '@core/state/siteStore'
import { useEditorStore } from '@core/state/editorStore'

export function useKeyboard() {
  const undo = useSiteStore((s) => s.undo)
  const redo = useSiteStore((s) => s.redo)
  const canUndo = useSiteStore((s) => s.canUndo())
  const canRedo = useSiteStore((s) => s.canRedo())
  
  const toggleMode = useEditorStore((s) => s.toggleMode)
  const toggleLumi = useEditorStore((s) => s.toggleLumi)
  const clearSelection = useEditorStore((s) => s.clearSelection)
  const showToast = useEditorStore((s) => s.showToast)
  const openModal = useEditorStore((s) => s.openModal)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape') e.target.blur()
        return
      }

      const cmd = navigator.platform.includes('Mac') ? e.metaKey : e.ctrlKey

      if (cmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) { undo(); showToast('↩️ Annulé', 'info') }
      }

      if ((cmd && e.shiftKey && e.key === 'z') || (cmd && e.key === 'y')) {
        e.preventDefault()
        if (canRedo) { redo(); showToast('↪️ Rétabli', 'info') }
      }

      if (cmd && e.key === 'p') { e.preventDefault(); toggleMode() }
      if (cmd && e.key === 'k') { e.preventDefault(); toggleLumi() }
      if (cmd && e.key === 'e') { e.preventDefault(); openModal('export') }
      if (e.key === 'Escape') { clearSelection() }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo, toggleMode, toggleLumi, clearSelection, showToast, openModal])
}

export default useKeyboard
