import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Upload, X, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { useSiteStore } from '@core/state/siteStore'
import { useEditorStore } from '@core/state/editorStore'
import ColorPickerPopup from '@ui/common/ColorPickerPopup'

const GRADIENT = 'linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)'

function ContentPanel({ sectionId, lightMode = false }) {
  const section = useSiteStore((s) => s.getSection(sectionId))
  const updateContent = useSiteStore((s) => s.updateContent)
  const updateSectionColor = useSiteStore((s) => s.updateSectionColor)
  const updateItem = useSiteStore((s) => s.updateItem)
  const addItem = useSiteStore((s) => s.addItem)
  const removeItem = useSiteStore((s) => s.removeItem)
  const showToast = useEditorStore((s) => s.showToast)
  const openModal = useEditorStore((s) => s.openModal)
  const highlightSection = useEditorStore((s) => s.highlightSection)

  const [colorPicker, setColorPicker] = useState({ isOpen: false, element: null, currentColor: '#FFFFFF', position: { x: 0, y: 0 } })

  if (!section) return <div className="text-center py-8"><p className="text-white/40 text-sm">Sélectionne une section</p></div>

  const type = section.type || sectionId.split('_')[0]
  const content = section.content || {}
  const colors = section.colors || {}
  const defaultColors = { title: '#FFFFFF', subtitle: '#9CA3AF', badge: '#A78BFA', ctaPrimary: '#A78BFA' }
  const getColor = (element) => colors[element] || defaultColors[element] || '#FFFFFF'

  const handleContentChange = (field, value) => { updateContent(sectionId, { [field]: value }); highlightSection(sectionId) }

  const openColorPicker = (element, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setColorPicker({ isOpen: true, element, currentColor: getColor(element), position: { x: Math.min(rect.right + 10, window.innerWidth - 320), y: Math.max(rect.top - 100, 10) } })
  }

  const handleColorSelect = (color, isPreview) => {
    updateSectionColor(sectionId, colorPicker.element, color)
    if (!isPreview) { highlightSection(sectionId); showToast('🎨 Couleur appliquée !', 'success') }
  }

  const inputStyle = {
    background: '#1a1a2e',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    color: '#fff',
    width: '100%',
    padding: '14px 16px',
    fontSize: '14px',
    outline: 'none',
  }

  const cardStyle = { background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px' }

  const ColorLabel = ({ label, element }) => (
    <div className="flex items-center justify-between mb-2">
      <label className="text-xs font-bold uppercase tracking-wider text-white/40">{label}</label>
      <motion.button onClick={(e) => openColorPicker(element, e)} className="w-8 h-8 rounded-full"
        style={{ backgroundColor: getColor(element), border: '3px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} />
    </div>
  )

  // Version compacte pour les petits éléments
  const ColorDot = ({ element }) => (
    <motion.button 
      onClick={(e) => openColorPicker(element, e)} 
      className="w-6 h-6 rounded-full flex-shrink-0"
      style={{ backgroundColor: getColor(element), border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      whileHover={{ scale: 1.15 }} 
      whileTap={{ scale: 0.9 }} 
    />
  )

  return (
    <div className="space-y-5">
      <div>
        <ColorLabel label="Titre" element="title" />
        <input type="text" value={content.title || ''} onChange={(e) => handleContentChange('title', e.target.value)} placeholder="Titre" style={inputStyle} />
      </div>
      <div>
        <ColorLabel label="Sous-titre" element="subtitle" />
        <textarea value={content.subtitle || ''} onChange={(e) => handleContentChange('subtitle', e.target.value)} placeholder="Description" style={{ ...inputStyle, minHeight: '100px', resize: 'none' }} />
      </div>

      {type === 'hero' && (
        <>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-2">Image Hero</label>
            {content.image ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={content.image} alt="Hero" className="w-full h-32 object-cover" />
                <motion.button onClick={() => handleContentChange('image', null)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center" whileHover={{ scale: 1.1 }}>
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            ) : (
              <label className="block p-8 rounded-2xl text-center cursor-pointer transition-all" style={{ background: '#1a1a2e', border: '2px dashed rgba(255,255,255,0.2)' }}>
                <Upload className="w-8 h-8 mx-auto mb-2 text-white/40" />
                <p className="text-sm text-white/40">Clique pour uploader</p>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (ev) => handleContentChange('image', ev.target.result)
                    reader.readAsDataURL(file)
                  }
                }} />
              </label>
            )}
          </div>
          <div>
            <ColorLabel label="Texte gradient" element="titleHighlight" />
            <input type="text" value={content.titleHighlight || ''} onChange={(e) => handleContentChange('titleHighlight', e.target.value)} placeholder="Mot en gradient" style={inputStyle} />
          </div>
          <div>
            <ColorLabel label="Badge" element="badge" />
            <input type="text" value={content.badge || ''} onChange={(e) => handleContentChange('badge', e.target.value)} placeholder="✨ Nouveau !" style={inputStyle} />
          </div>
          
          {/* CTA avec couleur */}
          <div>
            <ColorLabel label="Bouton principal" element="ctaPrimary" />
            <input type="text" value={content.ctaPrimary || ''} onChange={(e) => handleContentChange('ctaPrimary', e.target.value)} placeholder="Commencer" style={inputStyle} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-2">Bouton secondaire</label>
            <input type="text" value={content.ctaSecondary || ''} onChange={(e) => handleContentChange('ctaSecondary', e.target.value)} placeholder="En savoir plus" style={inputStyle} />
          </div>
        </>
      )}

      {type === 'features' && section.items && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Fonctionnalités</span>
            <motion.button onClick={() => { addItem(sectionId, 'items', { icon: 'Star', color: '#A78BFA', title: 'Nouvelle', description: 'Description' }); showToast('✨ Ajouté', 'success') }}
              className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRADIENT }} whileHover={{ scale: 1.1 }}><Plus className="w-4 h-4 text-white" /></motion.button>
          </div>
          {section.items.map((item, i) => (
            <motion.div key={item.id} className="relative group" style={cardStyle}>
              <motion.button onClick={() => { removeItem(sectionId, 'items', i); showToast('🗑️ Supprimé', 'info') }}
                className="absolute top-3 right-3 p-2 rounded-xl opacity-0 group-hover:opacity-100 bg-red-500/20" whileHover={{ scale: 1.1 }}><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: (item.color || '#A78BFA') + '20' }}>{getIconEmoji(item.icon)}</div>
                <input type="text" value={item.title} onChange={(e) => updateItem(sectionId, 'items', i, { title: e.target.value })} style={{ ...inputStyle, fontWeight: '600' }} />
              </div>
              <textarea value={item.description} onChange={(e) => updateItem(sectionId, 'items', i, { description: e.target.value })} style={{ ...inputStyle, minHeight: '60px', resize: 'none' }} />
            </motion.div>
          ))}
        </div>
      )}

      {type === 'howItWorks' && section.steps && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Étapes</span>
            <motion.button onClick={() => { addItem(sectionId, 'steps', { number: section.steps.length + 1, title: 'Étape', description: 'Description' }); showToast('✨ Ajouté', 'success') }}
              className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRADIENT }} whileHover={{ scale: 1.1 }}><Plus className="w-4 h-4 text-white" /></motion.button>
          </div>
          {section.steps.map((step, i) => (
            <motion.div key={step.id} className="relative group" style={cardStyle}>
              <motion.button onClick={() => { removeItem(sectionId, 'steps', i); showToast('🗑️ Supprimé', 'info') }}
                className="absolute top-3 right-3 p-2 rounded-xl opacity-0 group-hover:opacity-100 bg-red-500/20" whileHover={{ scale: 1.1 }}><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: GRADIENT }}>{step.number}</span>
                <input type="text" value={step.title} onChange={(e) => updateItem(sectionId, 'steps', i, { title: e.target.value })} style={{ ...inputStyle, fontWeight: '600' }} />
              </div>
              <textarea value={step.description} onChange={(e) => updateItem(sectionId, 'steps', i, { description: e.target.value })} style={{ ...inputStyle, minHeight: '60px', resize: 'none' }} />
            </motion.div>
          ))}
        </div>
      )}

      {type === 'pricing' && section.plans && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Plans</span>
            <motion.button onClick={() => { addItem(sectionId, 'plans', { name: 'Plan', price: '0€', period: '/mois', features: ['Feature'], cta: 'Choisir', highlighted: false }); showToast('✨ Ajouté', 'success') }}
              className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRADIENT }} whileHover={{ scale: 1.1 }}><Plus className="w-4 h-4 text-white" /></motion.button>
          </div>
          {section.plans.map((plan, i) => (
            <motion.div key={plan.id} className="relative group" style={{ ...cardStyle, borderColor: plan.highlighted ? '#A78BFA' : 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <motion.button onClick={() => updateItem(sectionId, 'plans', i, { highlighted: !plan.highlighted })}
                  className="p-2 rounded-xl" style={{ background: plan.highlighted ? '#A78BFA30' : 'transparent' }} whileHover={{ scale: 1.1 }}>
                  <Star className="w-4 h-4" fill={plan.highlighted ? '#A78BFA' : 'none'} stroke={plan.highlighted ? '#A78BFA' : '#fff'} />
                </motion.button>
                <input type="text" value={plan.name} onChange={(e) => updateItem(sectionId, 'plans', i, { name: e.target.value })} className="flex-1 bg-transparent border-none text-white font-bold" style={{ outline: 'none' }} />
                {section.plans.length > 1 && <motion.button onClick={() => { removeItem(sectionId, 'plans', i); showToast('🗑️ Supprimé', 'info') }} className="p-2 rounded-xl bg-red-500/20" whileHover={{ scale: 1.1 }}><Trash2 className="w-4 h-4 text-red-400" /></motion.button>}
              </div>
              <div className="flex gap-2 mb-2">
                <input type="text" value={plan.price} onChange={(e) => updateItem(sectionId, 'plans', i, { price: e.target.value })} className="w-20" style={{ ...inputStyle, padding: '10px 12px' }} />
                <input type="text" value={plan.period} onChange={(e) => updateItem(sectionId, 'plans', i, { period: e.target.value })} className="w-20" style={{ ...inputStyle, padding: '10px 12px' }} />
                <input type="text" value={plan.cta} onChange={(e) => updateItem(sectionId, 'plans', i, { cta: e.target.value })} className="flex-1" style={{ ...inputStyle, padding: '10px 12px' }} placeholder="Bouton" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {type === 'faq' && section.items && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Questions</span>
            <motion.button onClick={() => { addItem(sectionId, 'items', { question: 'Question ?', answer: 'Réponse' }); showToast('✨ Ajouté', 'success') }}
              className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRADIENT }} whileHover={{ scale: 1.1 }}><Plus className="w-4 h-4 text-white" /></motion.button>
          </div>
          {section.items.map((item, i) => (
            <motion.div key={item.id} className="relative group" style={cardStyle}>
              <motion.button onClick={() => { removeItem(sectionId, 'items', i); showToast('🗑️ Supprimé', 'info') }}
                className="absolute top-3 right-3 p-2 rounded-xl opacity-0 group-hover:opacity-100 bg-red-500/20" whileHover={{ scale: 1.1 }}><Trash2 className="w-4 h-4 text-red-400" /></motion.button>
              <input type="text" value={item.question} onChange={(e) => updateItem(sectionId, 'items', i, { question: e.target.value })} className="mb-2" style={{ ...inputStyle, fontWeight: '600' }} />
              <textarea value={item.answer} onChange={(e) => updateItem(sectionId, 'items', i, { answer: e.target.value })} style={{ ...inputStyle, minHeight: '60px', resize: 'none' }} />
            </motion.div>
          ))}
        </div>
      )}

      <ColorPickerPopup isOpen={colorPicker.isOpen} onClose={() => setColorPicker(prev => ({ ...prev, isOpen: false }))} onSelect={handleColorSelect} currentColor={colorPicker.currentColor} elementName={colorPicker.element} position={colorPicker.position} />
    </div>
  )
}

function getIconEmoji(icon) {
  const map = { Zap: '⚡', Sparkles: '✨', Palette: '🎨', Shield: '🛡️', Smartphone: '📱', TrendingUp: '📈', Star: '⭐', Heart: '❤️', Globe: '🌍', Lock: '🔒', Layers: '📚', Clock: '⏰', Check: '✓', Rocket: '🚀', Users: '👥', Code: '💻' }
  return map[icon] || '✨'
}

export default ContentPanel
