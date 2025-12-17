# 🫧 Bulle Editor

> Éditeur de landing pages avec assistante IA conversationnelle

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Présentation

**Bulle Editor** est un éditeur visuel de landing pages qui intègre une assistante IA nommée **Bulle**. Plutôt que de naviguer dans des menus complexes, tu discutes simplement avec Bulle pour personnaliser ta page.

```
Toi: "Mets le titre en rose"
Bulle: "✨ Titre en rose ! C'est joli !"
```

## 🎥 Fonctionnalités

### 🤖 Assistante IA "Bulle"
- Chat conversationnel en français
- Suggestions intelligentes contextuelles
- Modifications en temps réel sur la preview
- Personnalité friendly et encourageante

### 🎨 Personnalisation
- **Couleurs** : Titre, sous-titre, badge, boutons
- **Layouts** : Plusieurs variantes par section
- **Contenu** : Textes, images, icônes
- **Espacement** : Compact, normal, aéré

### 📄 Sections disponibles

| Section | Layouts | Éléments colorables |
|---------|---------|---------------------|
| **Hero** | Centré, Image droite, Image gauche | Titre, Sous-titre, Badge, Bouton |
| **Features** | 3 colonnes, 2 colonnes, Liste | Titre, Sous-titre |
| **Étapes** | Timeline, Cartes, Minimal | Titre, Sous-titre |
| **Tarifs** | Cartes, Tableau, Minimal | Titre, Sous-titre |
| **FAQ** | Accordéon, Grille, Simple | Titre, Sous-titre |

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/Kiwi570/LAST-editeur-15-07.git
cd LAST-editeur-15-07

# Installer les dépendances
npm install
npm install immer

# Lancer en développement
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

## 💬 Utiliser Bulle

### Ouvrir Bulle
1. Clique sur une section dans la **sidebar gauche**
2. Le panel Bulle s'ouvre automatiquement à droite

### Commandes de couleur
```
"Mets le titre en violet"
"Change le sous-titre en cyan"
"Bouton rose"
"Badge bleu"
```

**Couleurs disponibles** : rose, violet, bleu, cyan, vert, jaune, orange, rouge, blanc, noir

### Commandes de layout
```
"Layout 2 colonnes"
"Passe en timeline"
"Cartes"
"Minimal"
```

### Navigation par suggestions
Bulle propose des boutons cliquables pour te guider :
- `[Couleurs]` → Affiche les éléments modifiables
- `[Layout]` → Affiche les layouts disponibles
- `[Parfait !]` → Confirme et continue

## 🏗️ Architecture

```
src/
├── app/                    # Point d'entrée
│   └── App.jsx
├── core/
│   ├── state/
│   │   ├── siteStore.js    # État du site (sections, couleurs, layouts)
│   │   └── editorStore.js  # État de l'éditeur (UI, modals)
│   ├── hooks/
│   │   └── useKeyboard.js  # Raccourcis clavier
│   └── theme/
│       └── ThemeProvider.jsx
├── lumi/                   # Logique de Bulle
│   ├── personality.js      # Messages et salutations
│   └── modes/
│       └── localMode.js    # Traitement des messages
├── ui/
│   ├── lumi/               # Composants Bulle
│   │   ├── LumiPanel.jsx   # Panel principal
│   │   ├── BulleAvatar.jsx # Avatar animé
│   │   ├── SectionIcons.jsx # Icônes custom
│   │   ├── ChatBubbles.jsx # Fond décoratif
│   │   └── Sparkles.jsx    # Particules
│   ├── sections/           # Sections de la landing page
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── HowItWorksSection.jsx
│   │   ├── PricingSection.jsx
│   │   └── FaqSection.jsx
│   ├── panels/             # Panels d'édition
│   │   ├── ContentPanel.jsx
│   │   └── LayoutPanel.jsx
│   ├── layout/             # Structure de l'app
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── editor/
│   │   └── Canvas.jsx      # Zone de preview
│   └── common/             # Composants réutilisables
│       ├── ColorPickerPopup.jsx
│       ├── IconPickerModal.jsx
│       └── ...
└── index.css               # Styles globaux + animations
```

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| **React 18** | Framework UI |
| **Vite** | Build tool |
| **Zustand + Immer** | State management |
| **Framer Motion** | Animations |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icônes |

## ⌨️ Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl + Z` | Annuler |
| `Ctrl + Shift + Z` | Refaire |
| `Escape` | Fermer Bulle |

## 🎨 Personnaliser Bulle

### Ajouter des couleurs

Dans `src/lumi/modes/localMode.js` :
```javascript
const COLORS = {
  // ... couleurs existantes
  magenta: '#FF00FF',
  turquoise: '#40E0D0',
}
```

### Modifier les messages

Dans `src/lumi/personality.js` :
```javascript
export const getGreeting = () => {
  const greetings = [
    "Hey ! 💫 Prête à créer quelque chose de génial ?",
    // Ajoute tes propres messages
  ]
  return greetings[Math.floor(Math.random() * greetings.length)]
}
```

## 📦 Build production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`.

## 🤝 Contribution

1. Fork le projet
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m 'Ajout de ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request

## 📄 License

MIT © 2024

---

Fait avec 💜 et beaucoup de ✨
