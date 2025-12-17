import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles, Palette, Shield, Smartphone, TrendingUp, Star, Heart, Globe, Lock, Layers, Clock, Check, Rocket, Users, Code } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'

const ICONS = { Zap, Sparkles, Palette, Shield, Smartphone, TrendingUp, Star, Heart, Globe, Lock, Layers, Clock, Check, Rocket, Users, Code }

const SPACING_CLASSES = {
  compact: 'py-12 md:py-16',
  normal: 'py-16 md:py-20',
  spacious: 'py-20 md:py-28',
}

function FeaturesSection({ sectionId }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  if (!section) return null

  const { content, items, layout, colors = {} } = section
  const variant = layout?.variant || 'grid-3'
  const spacing = layout?.spacing || 'normal'
  const spacingClass = SPACING_CLASSES[spacing] || SPACING_CLASSES.normal

  // Couleurs avec fallbacks
  const titleColor = colors.title || '#FFFFFF'
  const subtitleColor = colors.subtitle || '#9CA3AF'

  const gridClass = {
    'grid-2': 'grid-cols-1 md:grid-cols-2 gap-6',
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    'list': 'grid-cols-1 gap-4 max-w-3xl mx-auto',
  }[variant] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <section className={`${spacingClass} bg-pb-bg-light/50`}>
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

        <div className={`grid ${gridClass}`}>
          {items?.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ item, index, variant }) {
  const Icon = ICONS[item.icon] || Sparkles
  const isListVariant = variant === 'list'

  if (isListVariant) {
    return (
      <motion.div
        className="card-interactive p-5 flex items-start gap-5"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color: item.color }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-pb-text-muted">{item.description}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="card-interactive p-6 text-center group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
        style={{ backgroundColor: `${item.color}20` }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-7 h-7" style={{ color: item.color }} />
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
      <p className="text-pb-text-muted text-sm">{item.description}</p>
    </motion.div>
  )
}

export default FeaturesSection
