import React from 'react'
import { motion } from 'framer-motion'
import { useSiteStore } from '@core/state/siteStore'

const SPACING_CLASSES = {
  compact: 'py-12 md:py-16',
  normal: 'py-16 md:py-24',
  spacious: 'py-20 md:py-32',
}

function HeroSection({ sectionId = 'hero' }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  const global = useSiteStore((s) => s.getGlobal())
  if (!section) return null
  
  const { content, layout, colors = {} } = section
  const variant = layout?.variant || 'centered'
  const spacing = layout?.spacing || 'normal'
  const spacingClass = SPACING_CLASSES[spacing] || SPACING_CLASSES.normal

  // Couleurs avec fallbacks
  const titleColor = colors.title || '#FFFFFF'
  const subtitleColor = colors.subtitle || '#9CA3AF'
  const badgeColor = colors.badge || global?.palette?.primary || '#A78BFA'
  const ctaPrimaryColor = colors.ctaPrimary || global?.palette?.primary || '#A78BFA'

  const renderTitle = () => {
    const title = content?.title || ''
    const highlight = content?.titleHighlight || ''
    if (!highlight || !title.includes(highlight)) {
      return <span style={{ color: titleColor }}>{title}</span>
    }
    const parts = title.split(highlight)
    return (
      <>
        <span style={{ color: titleColor }}>{parts[0]}</span>
        <span className="text-gradient-animated">{highlight}</span>
        <span style={{ color: titleColor }}>{parts[1]}</span>
      </>
    )
  }

  const ImagePlaceholder = ({ emoji = '🫧' }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-primary-20 rounded-3xl blur-3xl" />
      <div className="relative bg-pb-surface border border-pb-border rounded-3xl p-8 flex items-center justify-center min-h-[300px] md:min-h-[350px]">
        <div className="text-center">
          {content?.image ? (
            <img src={content.image} alt="" className="max-w-full max-h-[300px] rounded-2xl object-cover shadow-2xl" />
          ) : (
            <>
              <motion.span 
                className="text-6xl md:text-7xl block mb-4" 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 3, repeat: Infinity }}
              >
                {emoji}
              </motion.span>
              <p className="text-pb-text-muted text-sm">Image ou illustration</p>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const Badge = ({ text }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
      style={{ 
        backgroundColor: badgeColor + '15',
        borderColor: badgeColor + '40',
        color: badgeColor
      }}
    >
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  )

  const CTAButtons = ({ primary, secondary, centered = false }) => (
    <motion.div 
      className={`flex flex-wrap gap-4 ${centered ? 'justify-center' : ''}`} 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.4 }}
    >
      {primary && (
        <motion.button 
          className="px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all"
          style={{ 
            backgroundColor: ctaPrimaryColor,
            boxShadow: `0 10px 40px ${ctaPrimaryColor}40`,
          }}
          whileHover={{ scale: 1.02, y: -2, boxShadow: `0 15px 50px ${ctaPrimaryColor}50` }}
          whileTap={{ scale: 0.98 }}
        >
          {primary}
        </motion.button>
      )}
      {secondary && (
        <motion.button 
          className="btn-secondary" 
          whileHover={{ scale: 1.02, y: -2 }} 
          whileTap={{ scale: 0.98 }}
        >
          {secondary}
        </motion.button>
      )}
    </motion.div>
  )

  const TrustBadges = () => (
    <motion.div 
      className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-pb-text-light" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.6 }}
    >
      {[
        { icon: '✓', text: 'Sans carte bancaire' },
        { icon: '✓', text: 'Setup en 2 min' },
        { icon: '✓', text: 'Support 24/7' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-accent-emerald">{item.icon}</span>
          <span className="text-sm">{item.text}</span>
        </div>
      ))}
    </motion.div>
  )

  if (variant === 'split-left') {
    return (
      <section className={`${spacingClass} overflow-hidden relative`}>
        <HeroBackground />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <ImagePlaceholder emoji="🫧" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {content?.badge && <Badge text={content.badge} />}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                {renderTitle()}
              </h1>
              <p className="text-lg mb-8" style={{ color: subtitleColor }}>{content?.subtitle}</p>
              <CTAButtons primary={content?.ctaPrimary} secondary={content?.ctaSecondary} />
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'split-right') {
    return (
      <section className={`${spacingClass} overflow-hidden relative`}>
        <HeroBackground />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              {content?.badge && <Badge text={content.badge} />}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                {renderTitle()}
              </h1>
              <p className="text-lg mb-8" style={{ color: subtitleColor }}>{content?.subtitle}</p>
              <CTAButtons primary={content?.ctaPrimary} secondary={content?.ctaSecondary} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <ImagePlaceholder emoji="✨" />
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  // Centered (default)
  return (
    <section className={`relative ${spacingClass} overflow-hidden`}>
      <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          {content?.badge && <Badge text={content.badge} />}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            {renderTitle()}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" 
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
          >
            {content?.subtitle}
          </motion.p>
          <CTAButtons primary={content?.ctaPrimary} secondary={content?.ctaSecondary} centered />
          <TrustBadges />
        </motion.div>
      </div>
    </section>
  )
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary opacity-10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-accent-pink opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-cyan opacity-5 rounded-full blur-3xl" />
    </div>
  )
}

export default HeroSection
