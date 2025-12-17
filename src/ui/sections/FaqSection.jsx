import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'

const SPACING_CLASSES = {
  compact: 'py-12 md:py-16',
  normal: 'py-16 md:py-20',
  spacious: 'py-20 md:py-28',
}

function FaqSection({ sectionId }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  if (!section) return null

  const { content, items, layout, colors = {} } = section
  const variant = layout?.variant || 'accordion'
  const spacing = layout?.spacing || 'normal'
  const spacingClass = SPACING_CLASSES[spacing] || SPACING_CLASSES.normal

  // Couleurs
  const titleColor = colors.title || '#FFFFFF'
  const subtitleColor = colors.subtitle || '#9CA3AF'

  return (
    <section className={spacingClass}>
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-12 md:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: titleColor }}>{content?.title}</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: subtitleColor }}>{content?.subtitle}</p>
        </motion.div>
        {variant === 'accordion' && <AccordionLayout items={items} />}
        {variant === 'grid' && <GridLayout items={items} />}
        {variant === 'simple' && <SimpleLayout items={items} />}
        <motion.div className="mt-12 md:mt-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-pb-text-muted mb-4">Tu ne trouves pas ta réponse ?</p>
          <motion.button className="btn-secondary inline-flex items-center gap-2" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <MessageCircle className="w-4 h-4" />Contacte-nous
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function AccordionLayout({ items }) {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items?.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <motion.div key={item.id} className={`card overflow-hidden ${isOpen ? 'border-primary' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <button onClick={() => setOpenIndex(isOpen ? -1 : index)} className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
              <span className="font-medium pr-4">{item.question}</span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="w-5 h-5 text-pb-text-muted flex-shrink-0" /></motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="px-5 pb-5 text-pb-text-muted">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

function GridLayout({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items?.map((item, index) => (
        <motion.div key={item.id} className="card p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
          <h3 className="font-semibold mb-3 flex items-start gap-2"><span className="text-primary">Q:</span>{item.question}</h3>
          <p className="text-pb-text-muted text-sm pl-5">{item.answer}</p>
        </motion.div>
      ))}
    </div>
  )
}

function SimpleLayout({ items }) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {items?.map((item, index) => (
        <motion.div 
          key={item.id} 
          className="border-b border-white/10 pb-6 last:border-0"
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
          <p className="text-pb-text-muted">{item.answer}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default FaqSection
