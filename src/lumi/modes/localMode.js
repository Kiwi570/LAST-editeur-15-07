import { useSiteStore } from '@core/state/siteStore'

// Couleurs disponibles
const COLORS = {
  rose: '#F472B6',
  pink: '#F472B6',
  violet: '#A78BFA',
  purple: '#A78BFA',
  bleu: '#3B82F6',
  blue: '#3B82F6',
  cyan: '#22D3EE',
  turquoise: '#22D3EE',
  vert: '#34D399',
  green: '#34D399',
  jaune: '#FBBF24',
  yellow: '#FBBF24',
  orange: '#FB923C',
  rouge: '#EF4444',
  red: '#EF4444',
  blanc: '#FFFFFF',
  white: '#FFFFFF',
  noir: '#000000',
  black: '#000000',
}

// Éléments modifiables par type de section
const SECTION_ELEMENTS = {
  hero: {
    colorElements: ['title', 'subtitle', 'badge', 'ctaPrimary'],
    colorLabels: { title: 'Titre', subtitle: 'Sous-titre', badge: 'Badge', ctaPrimary: 'Bouton' },
    layouts: [
      { id: 'centered', label: 'Centré' },
      { id: 'split-left', label: 'Image droite' },
      { id: 'split-right', label: 'Image gauche' },
    ]
  },
  features: {
    colorElements: ['title', 'subtitle'],
    colorLabels: { title: 'Titre', subtitle: 'Sous-titre' },
    layouts: [
      { id: 'grid-3', label: '3 colonnes' },
      { id: 'grid-2', label: '2 colonnes' },
      { id: 'list', label: 'Liste' },
    ]
  },
  howItWorks: {
    colorElements: ['title', 'subtitle'],
    colorLabels: { title: 'Titre', subtitle: 'Sous-titre' },
    layouts: [
      { id: 'timeline', label: 'Timeline' },
      { id: 'cards', label: 'Cartes' },
      { id: 'minimal', label: 'Minimal' },
    ]
  },
  pricing: {
    colorElements: ['title', 'subtitle'],
    colorLabels: { title: 'Titre', subtitle: 'Sous-titre' },
    layouts: [
      { id: 'cards', label: 'Cartes' },
      { id: 'table', label: 'Tableau' },
      { id: 'minimal', label: 'Minimal' },
    ]
  },
  faq: {
    colorElements: ['title', 'subtitle'],
    colorLabels: { title: 'Titre', subtitle: 'Sous-titre' },
    layouts: [
      { id: 'accordion', label: 'Accordéon' },
      { id: 'grid', label: 'Grille' },
      { id: 'simple', label: 'Simple' },
    ]
  },
}

// Labels des sections
const SECTION_LABELS = {
  hero: 'Hero',
  features: 'Features', 
  howItWorks: 'Étapes',
  pricing: 'Tarifs',
  faq: 'FAQ',
}

export function processMessage(message, sectionId) {
  const msg = message.toLowerCase().trim()
  
  // Récupérer les fonctions du store
  const store = useSiteStore.getState()
  const updateSectionColor = store.updateSectionColor
  const updateLayout = store.updateLayout
  const section = store.getSection(sectionId)
  
  if (!section) {
    return {
      message: `👆 Sélectionne d'abord une section !`,
      suggestions: [],
    }
  }
  
  // Type de section
  const sectionType = section.type || sectionId.split('_')[0]
  const sectionConfig = SECTION_ELEMENTS[sectionType] || SECTION_ELEMENTS.features
  const sectionLabel = SECTION_LABELS[sectionType] || sectionType
  
  // ═══════════════════════════════════════════
  // COULEURS - Détection directe
  // ═══════════════════════════════════════════
  
  const colorKey = Object.keys(COLORS).find(c => msg.includes(c))
  
  // Si une couleur est mentionnée
  if (colorKey) {
    const color = COLORS[colorKey]
    
    // Chercher quel élément modifier
    let targetElement = 'title' // Par défaut le titre
    
    if (msg.includes('sous-titre') || msg.includes('subtitle') || msg.includes('description')) {
      targetElement = 'subtitle'
    } else if (msg.includes('badge')) {
      targetElement = 'badge'
    } else if (msg.includes('bouton') || msg.includes('cta') || msg.includes('button')) {
      targetElement = 'ctaPrimary'
    } else if (msg.includes('fond') || msg.includes('background')) {
      targetElement = 'background'
    }
    
    // Vérifier que l'élément existe pour cette section
    if (sectionConfig.colorElements.includes(targetElement) || targetElement === 'title') {
      updateSectionColor(sectionId, targetElement, color)
      
      const elementLabel = sectionConfig.colorLabels[targetElement] || 'Titre'
      
      return {
        message: `✨ ${elementLabel} en ${colorKey} ! C'est joli !`,
        action: 'color_applied',
        suggestions: ['Autre couleur', 'Layout', 'Parfait !'],
      }
    }
  }
  
  // ═══════════════════════════════════════════
  // DEMANDE DE COULEURS (menu)
  // ═══════════════════════════════════════════
  
  if (msg === 'couleurs' || msg === 'couleur' || msg === 'autre couleur' || msg === 'colors') {
    // Proposer les éléments modifiables pour cette section
    const elements = sectionConfig.colorElements
    const suggestions = elements.map(el => sectionConfig.colorLabels[el])
    
    return {
      message: `🎨 Sur ${sectionLabel}, tu veux colorier quoi ?`,
      suggestions: suggestions,
    }
  }
  
  // Si l'utilisateur choisit un élément (Titre, Sous-titre, etc.)
  if (msg === 'titre' || msg === 'title') {
    return {
      message: `🎨 Quelle couleur pour le titre ?`,
      suggestions: ['Rose', 'Violet', 'Bleu', 'Cyan'],
      context: { element: 'title' }
    }
  }
  
  if (msg === 'sous-titre' || msg === 'subtitle' || msg === 'sous titre') {
    return {
      message: `🎨 Quelle couleur pour le sous-titre ?`,
      suggestions: ['Rose', 'Violet', 'Bleu', 'Cyan'],
      context: { element: 'subtitle' }
    }
  }
  
  if (msg === 'badge') {
    return {
      message: `🎨 Quelle couleur pour le badge ?`,
      suggestions: ['Rose', 'Violet', 'Bleu', 'Cyan'],
      context: { element: 'badge' }
    }
  }
  
  if (msg === 'bouton' || msg === 'button' || msg === 'cta') {
    return {
      message: `🎨 Quelle couleur pour le bouton ?`,
      suggestions: ['Rose', 'Violet', 'Bleu', 'Cyan'],
      context: { element: 'ctaPrimary' }
    }
  }
  
  // ═══════════════════════════════════════════
  // LAYOUTS
  // ═══════════════════════════════════════════
  
  // Chercher un layout dans le message
  const layouts = sectionConfig.layouts
  const matchedLayout = layouts.find(l => 
    msg.includes(l.label.toLowerCase()) || 
    msg.includes(l.id.toLowerCase())
  )
  
  if (matchedLayout) {
    updateLayout(sectionId, { variant: matchedLayout.id })
    
    return {
      message: `✨ Layout "${matchedLayout.label}" appliqué !`,
      action: 'layout_applied',
      suggestions: ['Couleurs', 'Autre layout', 'Parfait !'],
    }
  }
  
  // Demande de colonnes spécifique
  if (msg.includes('2 colonne') || msg.includes('deux colonne')) {
    updateLayout(sectionId, { variant: 'grid-2' })
    return {
      message: `✨ Passé en 2 colonnes !`,
      action: 'layout_applied',
      suggestions: ['Couleurs', 'Autre layout', 'Parfait !'],
    }
  }
  
  if (msg.includes('3 colonne') || msg.includes('trois colonne')) {
    updateLayout(sectionId, { variant: 'grid-3' })
    return {
      message: `✨ Passé en 3 colonnes !`,
      action: 'layout_applied',
      suggestions: ['Couleurs', 'Autre layout', 'Parfait !'],
    }
  }
  
  // Demande de layout (menu)
  if (msg === 'layout' || msg === 'autre layout' || msg === 'disposition') {
    const suggestions = layouts.map(l => l.label)
    
    return {
      message: `📐 Quel layout pour ${sectionLabel} ?`,
      suggestions: suggestions,
    }
  }
  
  // ═══════════════════════════════════════════
  // RÉPONSES CONTEXTUELLES - Layouts par nom
  // ═══════════════════════════════════════════
  
  // Hero layouts
  if (msg === 'centré' || msg === 'centered') {
    updateLayout(sectionId, { variant: 'centered' })
    return { message: `✨ Layout centré !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'image droite' || msg === 'split-left') {
    updateLayout(sectionId, { variant: 'split-left' })
    return { message: `✨ Image à droite !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'image gauche' || msg === 'split-right') {
    updateLayout(sectionId, { variant: 'split-right' })
    return { message: `✨ Image à gauche !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  // Common layouts
  if (msg === 'timeline') {
    updateLayout(sectionId, { variant: 'timeline' })
    return { message: `✨ Layout timeline !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'cartes' || msg === 'cards') {
    updateLayout(sectionId, { variant: 'cards' })
    return { message: `✨ Layout cartes !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'liste' || msg === 'list') {
    updateLayout(sectionId, { variant: 'list' })
    return { message: `✨ Layout liste !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'accordéon' || msg === 'accordion') {
    updateLayout(sectionId, { variant: 'accordion' })
    return { message: `✨ Layout accordéon !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'grille' || msg === 'grid') {
    updateLayout(sectionId, { variant: 'grid' })
    return { message: `✨ Layout grille !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'minimal') {
    updateLayout(sectionId, { variant: 'minimal' })
    return { message: `✨ Layout minimal !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'simple') {
    updateLayout(sectionId, { variant: 'simple' })
    return { message: `✨ Layout simple !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  if (msg === 'tableau' || msg === 'table') {
    updateLayout(sectionId, { variant: 'table' })
    return { message: `✨ Layout tableau !`, action: 'layout_applied', suggestions: ['Couleurs', 'Parfait !'] }
  }
  
  // ═══════════════════════════════════════════
  // RÉPONSES POSITIVES
  // ═══════════════════════════════════════════
  
  if (msg.includes('parfait') || msg.includes('super') || msg.includes('merci') || msg.includes('ok') || msg.includes('compris') || msg.includes('génial')) {
    return {
      message: `🎉 Super ! Je suis là si tu veux autre chose !`,
      suggestions: ['Couleurs', 'Layout'],
    }
  }
  
  // ═══════════════════════════════════════════
  // AIDE
  // ═══════════════════════════════════════════
  
  if (msg.includes('aide') || msg.includes('help') || msg === '?') {
    return {
      message: `💡 Sur ${sectionLabel}, tu peux :\n\n• Changer les couleurs (titre, sous-titre${sectionType === 'hero' ? ', badge, bouton' : ''})\n• Modifier le layout`,
      suggestions: ['Couleurs', 'Layout'],
    }
  }
  
  // ═══════════════════════════════════════════
  // FALLBACK
  // ═══════════════════════════════════════════
  
  return {
    message: `🤔 Que veux-tu faire sur ${sectionLabel} ?`,
    suggestions: ['Couleurs', 'Layout'],
  }
}
