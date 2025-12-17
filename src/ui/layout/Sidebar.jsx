import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'
import { useEditorStore } from '@core/state/editorStore'
import { SectionIcon } from '@ui/lumi/SectionIcons'

const SECTION_CONFIG = {
  hero: { label: 'Hero' },
  features: { label: 'Feat.' },
  howItWorks: { label: 'Étapes' },
  pricing: { label: 'Tarifs' },
  faq: { label: 'FAQ' },
}

const GRADIENT = 'linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)'

function Sidebar() {
  const sectionsOrder = useSiteStore((s) => s.site?.sectionsOrder || [])
  const sectionsData = useSiteStore((s) => s.site?.sections || {})
  const sectionsVisibility = useSiteStore((s) => s.site?.sectionsVisibility || {})
  const addSection = useSiteStore((s) => s.addSection)
  
  const activeSection = useEditorStore((s) => s.activeSection)
  const setActiveSection = useEditorStore((s) => s.setActiveSection)
  const openLumi = useEditorStore((s) => s.openLumi)
  const showToast = useEditorStore((s) => s.showToast)
  
  const [addMenuOpen, setAddMenuOpen] = useState(false)

  const sections = sectionsOrder
    .filter(id => sectionsVisibility[id] !== false)
    .map(id => ({ id, ...sectionsData[id] }))
    .filter(s => s.type)

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId)
    openLumi()
    console.log('Section clicked:', sectionId)
  }

  const handleAddSection = (type) => {
    addSection(type)
    showToast(`✨ Section ${type} ajoutée !`, 'success')
    setAddMenuOpen(false)
  }

  const availableTypes = ['features', 'howItWorks', 'pricing', 'faq'].filter(
    type => !sections.some(s => s.type === type)
  )

  return (
    <aside 
      className="h-full flex flex-col items-center py-4 px-2"
      style={{ 
        width: '80px', 
        background: '#0a0a0f',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <motion.div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2 cursor-pointer"
        style={{ 
          background: 'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(244,114,182,0.15) 100%)',
          border: '1px solid rgba(167,139,250,0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        🫧
      </motion.div>
      <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-6">BULLE</span>

      {/* Sections */}
      <div className="flex-1 flex flex-col gap-2 w-full overflow-y-auto">
        {sections.map((section) => {
          const type = section.type || section.id.split('_')[0]
          const config = SECTION_CONFIG[type] || SECTION_CONFIG.features
          const isActive = activeSection === section.id

          return (
            <motion.button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className="flex flex-col items-center gap-1 py-2 rounded-xl relative group"
              style={{
                background: isActive ? 'rgba(167,139,250,0.15)' : 'transparent',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(167,139,250,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Indicateur actif */}
              {isActive && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{ background: GRADIENT }}
                  layoutId="activeIndicator"
                />
              )}
              
              {/* Icon container avec l'icône custom */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(167,139,250,0.3) 0%, rgba(139,92,246,0.2) 100%)'
                    : 'rgba(255,255,255,0.05)',
                  border: isActive ? '2px solid rgba(167,139,250,0.5)' : '2px solid transparent',
                  boxShadow: isActive ? '0 0 20px rgba(167,139,250,0.3)' : 'none',
                }}
              >
                <SectionIcon type={type} size={28} />
              </div>
              
              {/* Label */}
              <span 
                className="text-[10px] font-semibold transition-colors"
                style={{ color: isActive ? '#A78BFA' : 'rgba(255,255,255,0.4)' }}
              >
                {config.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Separator */}
      <div className="w-10 h-[1px] my-3" style={{ background: 'rgba(255,255,255,0.1)' }} />

      {/* Add Button */}
      <div className="relative">
        <motion.button
          onClick={() => setAddMenuOpen(!addMenuOpen)}
          className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: addMenuOpen ? GRADIENT : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: addMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-5 h-5 text-white" />
          </motion.div>
        </motion.button>
        <span className="text-[10px] font-semibold text-white/40 mt-1 block text-center">Ajouter</span>

        {/* Add Menu Popup */}
        <AnimatePresence>
          {addMenuOpen && (
            <motion.div
              className="absolute bottom-full left-full ml-2 mb-2 py-2 rounded-xl overflow-hidden"
              style={{
                background: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                minWidth: '160px',
              }}
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -10 }}
            >
              {availableTypes.length > 0 ? (
                availableTypes.map((type) => {
                  const config = SECTION_CONFIG[type]
                  return (
                    <motion.button
                      key={type}
                      onClick={() => handleAddSection(type)}
                      className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-white/5 group"
                      whileHover={{ x: 4 }}
                    >
                      <SectionIcon type={type} size={22} />
                      <span className="text-sm font-medium text-white/80 group-hover:text-white">
                        {config.label}
                      </span>
                    </motion.button>
                  )
                })
              ) : (
                <p className="px-4 py-3 text-sm text-white/40">Toutes les sections ajoutées !</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  )
}

export default Sidebar
