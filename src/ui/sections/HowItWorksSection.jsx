import React from 'react'
import { motion } from 'framer-motion'
import { useSiteStore } from '@core/state/siteStore'

const SPACING_CLASSES = {
  compact: 'py-12 md:py-16',
  normal: 'py-16 md:py-20',
  spacious: 'py-20 md:py-28',
}

function HowItWorksSection({ sectionId }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  if (!section) return null

  const { content, steps, layout, colors = {} } = section
  const variant = layout?.variant || 'timeline'
  const spacing = layout?.spacing || 'normal'
  const spacingClass = SPACING_CLASSES[spacing] || SPACING_CLASSES.normal

  // Couleurs
  const titleColor = colors.title || '#FFFFFF'
  const subtitleColor = colors.subtitle || '#9CA3AF'

  return (
    <section className={spacingClass}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: titleColor }}>{content?.title}</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: subtitleColor }}>{content?.subtitle}</p>
        </motion.div>

        {variant === 'timeline' && <TimelineLayout steps={steps} />}
        {variant === 'cards' && <CardsLayout steps={steps} />}
        {variant === 'minimal' && <MinimalLayout steps={steps} />}
      </div>
    </section>
  )
}

function TimelineLayout({ steps }) {
  return (
    <div className="max-w-3xl mx-auto relative">
      <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />
      <div className="space-y-8 md:space-y-12">
        {steps?.map((step, index) => (
          <motion.div key={step.id} className="flex gap-4 md:gap-6 relative" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
            <div className="relative z-10">
              <motion.div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-primary/30" whileHover={{ scale: 1.1 }}>
                {step.number}
              </motion.div>
            </div>
            <div className="flex-1 pt-2 md:pt-3">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-pb-text-muted">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CardsLayout({ steps }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {steps?.map((step, index) => (
        <motion.div key={step.id} className="card-interactive p-6 text-center relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
          <motion.div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-lg" whileHover={{ scale: 1.1, y: -2 }}>
            {step.number}
          </motion.div>
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
            <p className="text-pb-text-muted text-sm">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function MinimalLayout({ steps }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {steps?.map((step, index) => (
        <motion.div 
          key={step.id} 
          className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: index * 0.1 }}
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">
            {step.number}
          </span>
          <div>
            <h3 className="font-semibold mb-1">{step.title}</h3>
            <p className="text-pb-text-muted text-sm">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default HowItWorksSection
