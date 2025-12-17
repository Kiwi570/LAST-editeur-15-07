import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { nanoid } from 'nanoid'

// Données initiales
const getDefaultSite = () => ({
  name: 'Mon Super Site',
  theme: 'aurora',
  sectionsOrder: ['hero', 'features', 'howItWorks', 'pricing', 'faq'],
  sectionsVisibility: { hero: true, features: true, howItWorks: true, pricing: true, faq: true },
  global: {
    palette: { id: 'violet', name: 'Violet', primary: '#A78BFA', secondary: '#8B5CF6', accent: '#C4B5FD' },
    borderRadius: 'large',
  },
  sections: {
    hero: {
      type: 'hero',
      content: {
        badge: '✨ Nouveau',
        title: 'Crée ta landing page parfaite en quelques clics',
        titleHighlight: 'parfaite',
        subtitle: 'Un éditeur visuel intuitif avec une assistante IA pour créer des pages qui convertissent.',
        ctaPrimary: 'Commencer gratuitement',
        ctaSecondary: 'Voir la démo',
        image: null,
      },
      layout: { variant: 'centered', spacing: 'normal' },
      colors: { title: '#FFFFFF', subtitle: '#9CA3AF', badge: '#A78BFA', ctaPrimary: '#A78BFA', ctaSecondary: '#FFFFFF' },
    },
    features: {
      type: 'features',
      content: { title: 'Tout ce dont tu as besoin', subtitle: 'Des outils puissants pour créer sans limites' },
      layout: { variant: 'grid-3', spacing: 'normal' },
      colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
      items: [
        { id: 'f1', icon: 'Zap', color: '#FBBF24', title: 'Ultra rapide', description: 'Performance optimisée' },
        { id: 'f2', icon: 'Sparkles', color: '#A78BFA', title: 'IA intégrée', description: 'Bulle t\'aide' },
        { id: 'f3', icon: 'Palette', color: '#F472B6', title: 'Personnalisable', description: 'Thèmes et couleurs' },
        { id: 'f4', icon: 'Shield', color: '#34D399', title: 'Sécurisé', description: 'Données protégées' },
        { id: 'f5', icon: 'Smartphone', color: '#22D3EE', title: 'Responsive', description: 'Mobile-first' },
        { id: 'f6', icon: 'TrendingUp', color: '#FB923C', title: 'Analytics', description: 'Stats en temps réel' },
      ],
    },
    howItWorks: {
      type: 'howItWorks',
      content: { title: 'Comment ça marche ?', subtitle: 'En 3 étapes simples' },
      layout: { variant: 'timeline', spacing: 'normal' },
      colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
      steps: [
        { id: 's1', number: 1, title: 'Choisis un template', description: 'Parcours notre collection' },
        { id: 's2', number: 2, title: 'Personnalise', description: 'Adapte à ta marque' },
        { id: 's3', number: 3, title: 'Publie', description: 'En un clic' },
      ],
    },
    pricing: {
      type: 'pricing',
      content: { title: 'Tarifs simples', subtitle: 'Choisis le plan qui te convient' },
      layout: { variant: 'cards', spacing: 'normal' },
      colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
      plans: [
        { id: 'p1', name: 'Starter', price: 'Gratuit', period: '', description: 'Pour commencer', features: ['1 page', 'Templates de base', 'Support email'], cta: 'Commencer', highlighted: false, badge: '' },
        { id: 'p2', name: 'Pro', price: '19€', period: '/mois', description: 'Pour les pros', features: ['Pages illimitées', 'Tous les templates', 'Support prioritaire', 'Analytics', 'Domaine custom'], cta: 'Essai gratuit', highlighted: true, badge: 'Populaire' },
        { id: 'p3', name: 'Business', price: '49€', period: '/mois', description: 'Pour les équipes', features: ['Tout Pro +', 'Multi-utilisateurs', 'API access', 'SLA garanti'], cta: 'Contacter', highlighted: false, badge: '' },
      ],
    },
    faq: {
      type: 'faq',
      content: { title: 'Questions fréquentes', subtitle: 'Trouve ta réponse' },
      layout: { variant: 'accordion', spacing: 'normal' },
      colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
      items: [
        { id: 'q1', question: 'Est-ce vraiment gratuit ?', answer: 'Oui ! Le plan Starter est 100% gratuit.' },
        { id: 'q2', question: 'Puis-je utiliser mon domaine ?', answer: 'Oui, avec les plans Pro et Business.' },
        { id: 'q3', question: 'Y a-t-il un engagement ?', answer: 'Non, tu peux annuler à tout moment.' },
      ],
    },
  },
})

// Templates pour nouvelles sections
const SECTION_TEMPLATES = {
  features: () => ({
    type: 'features',
    content: { title: 'Nouvelles fonctionnalités', subtitle: 'Découvre ce qu\'on peut faire' },
    layout: { variant: 'grid-3', spacing: 'normal' },
    colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
    items: [
      { id: nanoid(6), icon: 'Star', color: '#A78BFA', title: 'Feature 1', description: 'Description' },
      { id: nanoid(6), icon: 'Heart', color: '#F472B6', title: 'Feature 2', description: 'Description' },
      { id: nanoid(6), icon: 'Globe', color: '#22D3EE', title: 'Feature 3', description: 'Description' },
    ],
  }),
  howItWorks: () => ({
    type: 'howItWorks',
    content: { title: 'Comment ça marche', subtitle: 'Processus simple' },
    layout: { variant: 'timeline', spacing: 'normal' },
    colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
    steps: [
      { id: nanoid(6), number: 1, title: 'Étape 1', description: 'Description' },
      { id: nanoid(6), number: 2, title: 'Étape 2', description: 'Description' },
      { id: nanoid(6), number: 3, title: 'Étape 3', description: 'Description' },
    ],
  }),
  pricing: () => ({
    type: 'pricing',
    content: { title: 'Nos tarifs', subtitle: 'Transparent et simple' },
    layout: { variant: 'cards', spacing: 'normal' },
    colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
    plans: [
      { id: nanoid(6), name: 'Basic', price: '9€', period: '/mois', description: 'Pour débuter', features: ['Feature 1', 'Feature 2'], cta: 'Choisir', highlighted: false, badge: '' },
      { id: nanoid(6), name: 'Premium', price: '29€', period: '/mois', description: 'Le plus populaire', features: ['Feature 1', 'Feature 2', 'Feature 3'], cta: 'Choisir', highlighted: true, badge: 'Recommandé' },
    ],
  }),
  faq: () => ({
    type: 'faq',
    content: { title: 'FAQ', subtitle: 'Questions fréquentes' },
    layout: { variant: 'accordion', spacing: 'normal' },
    colors: { title: '#FFFFFF', subtitle: '#9CA3AF' },
    items: [
      { id: nanoid(6), question: 'Question 1 ?', answer: 'Réponse 1' },
      { id: nanoid(6), question: 'Question 2 ?', answer: 'Réponse 2' },
    ],
  }),
}

export const useSiteStore = create(
  persist(
    immer((set, get) => ({
      site: getDefaultSite(),
      history: [],
      historyIndex: -1,
      maxHistory: 50,

      // === COMPUTED - Sections as array ===
      get sections() {
        const state = get()
        if (!state.site?.sectionsOrder) return []
        return state.site.sectionsOrder
          .filter(id => state.site.sectionsVisibility[id] !== false)
          .map(id => ({ id, ...state.site.sections[id] }))
          .filter(Boolean)
      },

      // === THEME ===
      get theme() {
        return get().site?.theme || 'aurora'
      },
      
      setTheme: (themeId) => {
        set((state) => {
          state.site.theme = themeId
        })
      },

      // === HELPERS ===
      getSection: (id) => get().site?.sections?.[id],
      getGlobal: () => get().site?.global,

      // === SAVE TO HISTORY ===
      saveToHistory: () => {
        set((state) => {
          const current = JSON.stringify(state.site)
          const newHistory = state.history.slice(0, state.historyIndex + 1)
          newHistory.push(current)
          if (newHistory.length > state.maxHistory) newHistory.shift()
          state.history = newHistory
          state.historyIndex = newHistory.length - 1
        })
      },

      // === UNDO / REDO ===
      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,
      undo: () => {
        const { historyIndex, history } = get()
        if (historyIndex > 0) {
          set((state) => {
            state.historyIndex--
            state.site = JSON.parse(history[state.historyIndex])
          })
        }
      },
      redo: () => {
        const { historyIndex, history } = get()
        if (historyIndex < history.length - 1) {
          set((state) => {
            state.historyIndex++
            state.site = JSON.parse(history[state.historyIndex])
          })
        }
      },

      // === GLOBAL UPDATES ===
      updateGlobal: (updates) => {
        get().saveToHistory()
        set((state) => {
          state.site.global = { ...state.site.global, ...updates }
        })
      },

      // === SECTION COLORS ===
      updateSectionColor: (sectionId, element, color) => {
        set((state) => {
          if (!state.site.sections[sectionId].colors) {
            state.site.sections[sectionId].colors = {}
          }
          state.site.sections[sectionId].colors[element] = color
        })
      },

      // === CONTENT UPDATES ===
      updateContent: (sectionId, updates) => {
        get().saveToHistory()
        set((state) => {
          state.site.sections[sectionId].content = { 
            ...state.site.sections[sectionId].content, 
            ...updates 
          }
        })
      },

      // === LAYOUT UPDATES ===
      updateLayout: (sectionId, updates) => {
        get().saveToHistory()
        set((state) => {
          state.site.sections[sectionId].layout = { 
            ...state.site.sections[sectionId].layout, 
            ...updates 
          }
        })
      },

      // === ITEM UPDATES (features, steps, plans, faq) ===
      updateItem: (sectionId, collection, index, updates) => {
        get().saveToHistory()
        set((state) => {
          const items = state.site.sections[sectionId][collection]
          if (items && items[index]) {
            items[index] = { ...items[index], ...updates }
          }
        })
      },

      addItem: (sectionId, collection, newItem) => {
        get().saveToHistory()
        set((state) => {
          const items = state.site.sections[sectionId][collection]
          if (items) {
            items.push({ id: nanoid(6), ...newItem })
          }
        })
      },

      removeItem: (sectionId, collection, index) => {
        get().saveToHistory()
        set((state) => {
          const items = state.site.sections[sectionId][collection]
          if (items) {
            items.splice(index, 1)
          }
        })
      },

      // === SECTION MANAGEMENT ===
      addSection: (type, afterId = null) => {
        get().saveToHistory()
        const newId = `${type}_${nanoid(6)}`
        const template = SECTION_TEMPLATES[type]?.() || { type, content: {}, layout: { variant: 'default' } }
        
        set((state) => {
          state.site.sections[newId] = template
          state.site.sectionsVisibility[newId] = true
          
          if (afterId) {
            const idx = state.site.sectionsOrder.indexOf(afterId)
            state.site.sectionsOrder.splice(idx + 1, 0, newId)
          } else {
            state.site.sectionsOrder.push(newId)
          }
        })
        
        return newId
      },

      deleteSection: (sectionId) => {
        if (sectionId === 'hero') return // Protection du hero
        get().saveToHistory()
        set((state) => {
          delete state.site.sections[sectionId]
          delete state.site.sectionsVisibility[sectionId]
          state.site.sectionsOrder = state.site.sectionsOrder.filter((id) => id !== sectionId)
        })
      },

      duplicateSection: (sectionId) => {
        get().saveToHistory()
        const section = get().site.sections[sectionId]
        if (!section) return null
        
        const newId = `${section.type}_${nanoid(6)}`
        const duplicated = JSON.parse(JSON.stringify(section))
        
        // Régénérer les IDs des items
        if (duplicated.items) duplicated.items.forEach(item => item.id = nanoid(6))
        if (duplicated.steps) duplicated.steps.forEach(step => step.id = nanoid(6))
        if (duplicated.plans) duplicated.plans.forEach(plan => plan.id = nanoid(6))
        
        set((state) => {
          state.site.sections[newId] = duplicated
          state.site.sectionsVisibility[newId] = true
          const idx = state.site.sectionsOrder.indexOf(sectionId)
          state.site.sectionsOrder.splice(idx + 1, 0, newId)
        })
        
        return newId
      },

      toggleVisibility: (sectionId) => {
        set((state) => {
          state.site.sectionsVisibility[sectionId] = !state.site.sectionsVisibility[sectionId]
        })
      },

      reorderSections: (fromIndex, toIndex) => {
        get().saveToHistory()
        set((state) => {
          const newOrder = [...state.site.sectionsOrder]
          const [moved] = newOrder.splice(fromIndex, 1)
          newOrder.splice(toIndex, 0, moved)
          state.site.sectionsOrder = newOrder
        })
      },

      // === RESET ===
      resetSite: () => {
        set({ site: getDefaultSite(), history: [], historyIndex: -1 })
      },

      // === EXPORT / IMPORT ===
      exportSite: () => JSON.stringify(get().site, null, 2),
      importSite: (json) => {
        try {
          const data = JSON.parse(json)
          set({ site: data })
          return true
        } catch {
          return false
        }
      },
    })),
    { name: 'bulle-v3-site-storage' }
  )
)
