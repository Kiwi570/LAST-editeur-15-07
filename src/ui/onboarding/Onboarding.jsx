import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sparkles, MessageCircle, Palette, Layers, Rocket, GripVertical } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'

const STEPS = [
  {
    id: 'welcome',
    icon: '🫧',
    title: 'Bienvenue sur Bulle !',
    description: "Je suis ton assistant créatif. Ensemble, on va créer ta landing page parfaite en quelques minutes.",
    visual: 'mascot',
  },
  {
    id: 'chat',
    icon: <MessageCircle className="w-8 h-8 text-accent-cyan" />,
    title: 'Parle-moi naturellement',
    description: 'Dis-moi ce que tu veux : "Change les couleurs en rose", "Ajoute une FAQ", "Layout centré"...',
    visual: 'chat',
  },
  {
    id: 'edit',
    icon: <Layers className="w-8 h-8 text-accent-violet" />,
    title: 'Édite visuellement',
    description: "Clique sur n'importe quelle section pour la modifier. Tout se fait en temps réel.",
    visual: 'sections',
  },
  {
    id: 'drag',
    icon: <GripVertical className="w-8 h-8 text-accent-amber" />,
    title: 'Réordonne comme tu veux',
    description: 'Glisse et dépose les sections dans la sidebar pour changer leur ordre.',
    visual: 'drag',
  },
  {
    id: 'style',
    icon: <Palette className="w-8 h-8 text-accent-pink" />,
    title: 'Personnalise ton style',
    description: 'Couleurs, layouts, bordures... Crée un site unique qui te ressemble.',
    visual: 'style',
  },
  {
    id: 'ready',
    icon: <Rocket className="w-8 h-8 text-accent-emerald" />,
    title: 'Prêt à créer !',
    description: "Tu as toutes les clés. Lance-toi et crée quelque chose de génial !",
    visual: 'ready',
  },
]

function Onboarding() {
  const [step, setStep] = useState(0)
  const skipOnboarding = useEditorStore((s) => s.skipOnboarding)
  const completeOnboarding = useEditorStore((s) => s.completeOnboarding)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const progress = ((step + 1) / STEPS.length) * 100

  const handleNext = () => isLast ? completeOnboarding() : setStep((s) => s + 1)
  const handlePrev = () => setStep((s) => Math.max(0, s - 1))

  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-pb-bg/98 backdrop-blur-xl" />

      {/* Bulles animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{ width: 30 + Math.random() * 60, height: 30 + Math.random() * 60, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.05 + Math.random() * 0.05 }}
            animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-pb-border">
        <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
      </div>

      {/* Modal */}
      <motion.div className="relative w-full max-w-lg mx-4 bg-pb-surface border border-pb-border rounded-3xl shadow-2xl overflow-hidden" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}>
        <button onClick={skipOnboarding} className="absolute top-4 right-4 px-3 py-1.5 text-xs text-pb-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors z-10">
          Passer
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="text-center">
              <motion.div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pb-bg border border-pb-border flex items-center justify-center" animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                {typeof current.icon === 'string' ? <span className="text-4xl">{current.icon}</span> : current.icon}
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-3">{current.title}</h2>
              <p className="text-pb-text-muted leading-relaxed mb-8 max-w-sm mx-auto">{current.description}</p>

              <div className="h-32 mb-8 flex items-center justify-center">
                {current.visual === 'mascot' && <motion.span className="text-8xl" animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>🫧</motion.span>}
                
                {current.visual === 'chat' && (
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <motion.div className="self-end bg-primary text-white px-4 py-2 rounded-2xl rounded-br-sm text-sm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>couleur rose</motion.div>
                    <motion.div className="self-start bg-pb-surface-light text-white px-4 py-2 rounded-2xl rounded-bl-sm text-sm flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}><span>🫧</span> Palette rose appliquée ! ✨</motion.div>
                  </div>
                )}
                
                {current.visual === 'sections' && (
                  <div className="flex gap-3">
                    {['Hero', 'Features', 'FAQ'].map((name, i) => (
                      <motion.div key={name} className="px-4 py-3 bg-pb-bg border border-pb-border rounded-xl text-sm text-pb-text-muted hover:border-primary transition-colors cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}>{name}</motion.div>
                    ))}
                  </div>
                )}

                {current.visual === 'drag' && (
                  <div className="flex flex-col gap-2 w-40">
                    {['Hero', 'Features', 'FAQ'].map((name, i) => (
                      <motion.div key={name} className="flex items-center gap-2 px-3 py-2 bg-pb-bg border border-pb-border rounded-lg text-sm text-pb-text-muted" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, y: i === 1 ? [0, -30, 0] : 0 }} transition={{ delay: i * 0.1, y: { delay: 0.5, duration: 1, repeat: Infinity, repeatDelay: 2 } }}>
                        <GripVertical className="w-4 h-4 text-pb-text-light" />
                        {name}
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {current.visual === 'style' && (
                  <div className="flex gap-3">
                    {['#A78BFA', '#22D3EE', '#F472B6', '#34D399'].map((c, i) => (
                      <motion.div key={c} className="w-12 h-12 rounded-xl cursor-pointer" style={{ backgroundColor: c }} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.1, type: 'spring' }} whileHover={{ scale: 1.15, rotate: 5 }} />
                    ))}
                  </div>
                )}
                
                {current.visual === 'ready' && <motion.span className="text-7xl" animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0], y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🚀</motion.span>}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => setStep(i)} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-primary' : i < step ? 'w-2 bg-primary/50' : 'w-2 bg-pb-border'}`} />
            ))}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between">
            <motion.button onClick={handlePrev} className={`flex items-center gap-1 px-4 py-2 text-sm text-pb-text-muted hover:text-white transition-colors ${step === 0 ? 'invisible' : ''}`} whileHover={{ x: -3 }}>
              <ChevronLeft className="w-4 h-4" /> Précédent
            </motion.button>
            <motion.button onClick={handleNext} className="btn-primary flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {isLast ? <><Sparkles className="w-4 h-4" /> C'est parti !</> : <>Suivant <ChevronRight className="w-4 h-4" /></>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Onboarding
