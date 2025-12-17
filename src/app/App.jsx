import React from 'react'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '@ui/layout/Sidebar'
import Canvas from '@ui/editor/Canvas'
import LumiPanel from '@ui/lumi/LumiPanel'
import Toast from '@ui/feedback/Toast'
import Onboarding from '@ui/onboarding/Onboarding'
import IconPickerModal from '@ui/common/IconPickerModal'
import ConfirmModal from '@ui/common/ConfirmModal'
import { useEditorStore } from '@core/state/editorStore'
import { useKeyboard } from '@core/hooks/useKeyboard'

function App() {
  const lumiOpen = useEditorStore((s) => s.lumiOpen)
  const showOnboarding = useEditorStore((s) => s.showOnboarding)
  const toast = useEditorStore((s) => s.toast)
  const activeModal = useEditorStore((s) => s.activeModal)
  const modalData = useEditorStore((s) => s.modalData)
  const closeModal = useEditorStore((s) => s.closeModal)
  
  useKeyboard()

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0a0f',
    }}>
      {/* Sidebar Dock */}
      <Sidebar />
      
      {/* Preview Canvas */}
      <Canvas />
      
      {/* Bulle Panel */}
      <AnimatePresence>
        {lumiOpen && <LumiPanel />}
      </AnimatePresence>

      {/* Overlays */}
      <AnimatePresence>
        {showOnboarding && <Onboarding />}
      </AnimatePresence>
      
      <AnimatePresence>
        {toast && <Toast />}
      </AnimatePresence>

      {activeModal === 'iconPicker' && (
        <IconPickerModal isOpen={true} onClose={closeModal} {...modalData} />
      )}

      {activeModal === 'confirm' && (
        <ConfirmModal isOpen={true} onClose={closeModal} {...modalData} />
      )}
    </div>
  )
}

export default App
