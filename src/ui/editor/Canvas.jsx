import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditorStore } from '@core/state/editorStore'
import { useSiteStore } from '@core/state/siteStore'
import HeroSection from '@ui/sections/HeroSection'
import FeaturesSection from '@ui/sections/FeaturesSection'
import HowItWorksSection from '@ui/sections/HowItWorksSection'
import PricingSection from '@ui/sections/PricingSection'
import FaqSection from '@ui/sections/FaqSection'

const SECTION_COMPONENTS = {
  hero: HeroSection,
  features: FeaturesSection,
  howItWorks: HowItWorksSection,
  pricing: PricingSection,
  faq: FaqSection,
}

function Canvas() {
  const sections = useSiteStore((s) => s.sections)
  const activeSection = useEditorStore((s) => s.activeSection)
  const setActiveSection = useEditorStore((s) => s.setActiveSection)
  const highlightedSection = useEditorStore((s) => s.highlightedSection)
  const containerRef = useRef(null)

  // Scroll vers la section active
  useEffect(() => {
    if (activeSection && containerRef.current) {
      const el = document.getElementById(activeSection)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeSection])

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto"
      style={{ background: '#0a0a0f' }}
    >
      <div className="min-h-full">
        {sections.map((section) => {
          const Component = SECTION_COMPONENTS[section.type]
          if (!Component) return null

          const isActive = activeSection === section.id
          const isHighlighted = highlightedSection === section.id

          return (
            <motion.div
              key={section.id}
              id={section.id}
              className="relative cursor-pointer"
              onClick={() => setActiveSection(section.id)}
              animate={isHighlighted ? {
                boxShadow: [
                  '0 0 0 0 rgba(167,139,250,0)',
                  '0 0 30px 10px rgba(167,139,250,0.3)',
                  '0 0 0 0 rgba(167,139,250,0)',
                ]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Indicateur de section active - Petit et ludique */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 z-20 flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    {/* Petit curseur gradient */}
                    <motion.div
                      className="relative"
                      style={{
                        width: '4px',
                        height: '60px',
                        borderRadius: '0 4px 4px 0',
                        background: 'linear-gradient(180deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)',
                        boxShadow: '0 0 20px rgba(167,139,250,0.5), 0 0 40px rgba(244,114,182,0.3)',
                      }}
                      animate={{
                        height: ['60px', '80px', '60px'],
                        boxShadow: [
                          '0 0 20px rgba(167,139,250,0.5), 0 0 40px rgba(244,114,182,0.3)',
                          '0 0 30px rgba(167,139,250,0.7), 0 0 60px rgba(244,114,182,0.5)',
                          '0 0 20px rgba(167,139,250,0.5), 0 0 40px rgba(244,114,182,0.3)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    {/* Petite bulle indicatrice */}
                    <motion.div
                      className="absolute -right-3 top-1/2 -translate-y-1/2"
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)',
                        boxShadow: '0 0 10px rgba(167,139,250,0.6)',
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bordure hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  border: isActive ? 'none' : '2px solid transparent',
                  background: isActive 
                    ? 'transparent' 
                    : 'linear-gradient(90deg, rgba(167,139,250,0.1), transparent)',
                }}
              />

              {/* Contenu de la section */}
              <Component sectionId={section.id} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Canvas
