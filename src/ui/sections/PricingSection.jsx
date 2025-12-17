import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'

const SPACING_CLASSES = {
  compact: 'py-12 md:py-16',
  normal: 'py-16 md:py-20',
  spacious: 'py-20 md:py-28',
}

function PricingSection({ sectionId }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  if (!section) return null

  const { content, plans, layout, colors = {} } = section
  const variant = layout?.variant || 'cards'
  const spacing = layout?.spacing || 'normal'
  const spacingClass = SPACING_CLASSES[spacing] || SPACING_CLASSES.normal

  // Couleurs
  const titleColor = colors.title || '#FFFFFF'
  const subtitleColor = colors.subtitle || '#9CA3AF'

  return (
    <section className={`${spacingClass} bg-pb-bg-light/50`}>
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-12 md:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: titleColor }}>{content?.title}</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: subtitleColor }}>{content?.subtitle}</p>
        </motion.div>
        {variant === 'cards' && <CardsLayout plans={plans} />}
        {variant === 'table' && <TableLayout plans={plans} />}
        {variant === 'minimal' && <MinimalLayout plans={plans} />}
      </div>
    </section>
  )
}

function CardsLayout({ plans }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
      {plans?.map((plan, index) => (
        <motion.div key={plan.id} className={`relative ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="px-4 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">{plan.badge}</span>
            </div>
          )}
          <div className={`card p-6 md:p-8 h-full flex flex-col ${plan.highlighted ? 'border-2 border-primary shadow-xl shadow-primary/10' : ''}`}>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-pb-text-muted text-sm mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-extrabold">{plan.price}</span>
                <span className="text-pb-text-muted">{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features?.map((feature, i) => (
                <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05 }}>
                  <span className="w-5 h-5 rounded-full bg-accent-emerald/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent-emerald" />
                  </span>
                  <span className="text-sm text-pb-text-muted">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button className={plan.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              {plan.cta}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TableLayout({ plans }) {
  const allFeatures = [...new Set(plans?.flatMap(p => p.features || []))]
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left border-b border-pb-border"></th>
            {plans?.map((plan) => (
              <th key={plan.id} className={`p-4 text-center border-b ${plan.highlighted ? 'bg-primary-10 border-primary' : 'border-pb-border'}`}>
                {plan.badge && <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">{plan.badge}</span>}
                <div className="text-lg font-bold">{plan.name}</div>
                <div className="text-2xl font-extrabold mt-2">{plan.price}<span className="text-sm font-normal text-pb-text-muted">{plan.period}</span></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, i) => (
            <tr key={i}>
              <td className="p-4 border-b border-pb-border text-sm text-pb-text-muted">{feature}</td>
              {plans?.map((plan) => (
                <td key={plan.id} className={`p-4 text-center border-b ${plan.highlighted ? 'bg-primary-10/50 border-primary/30' : 'border-pb-border'}`}>
                  {plan.features?.includes(feature) ? <Check className="w-5 h-5 text-accent-emerald mx-auto" /> : <span className="text-pb-text-light">—</span>}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-4"></td>
            {plans?.map((plan) => (
              <td key={plan.id} className="p-4 text-center">
                <motion.button className={plan.highlighted ? 'btn-primary' : 'btn-secondary'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{plan.cta}</motion.button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function MinimalLayout({ plans }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {plans?.map((plan, index) => (
        <motion.div 
          key={plan.id} 
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl border transition-all ${
            plan.highlighted 
              ? 'border-primary bg-primary/5' 
              : 'border-white/10 bg-white/5 hover:bg-white/10'
          }`}
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              {plan.badge && (
                <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">{plan.badge}</span>
              )}
            </div>
            <p className="text-pb-text-muted text-sm">{plan.description}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-2xl font-extrabold">{plan.price}</span>
              <span className="text-pb-text-muted text-sm">{plan.period}</span>
            </div>
            <motion.button 
              className={`px-6 py-2 rounded-xl font-semibold text-sm ${
                plan.highlighted 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              {plan.cta}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PricingSection
