// Personnalité de Bulle - Assistante IA ludique

const GREETINGS = [
  "Coucou ! 🌟 Je suis là pour t'aider !",
  "Hello ! ✨ Prête à créer quelque chose de génial ensemble ?",
  "Hey ! 🫧 Comment je peux t'aider aujourd'hui ?",
  "Salut ! 🎨 On crée une landing page qui déchire ?",
]

const MOODS = {
  happy: ['🌟', '✨', '🎉', '💫', '🚀'],
  thinking: ['🤔', '💭', '🧐'],
  success: ['🎉', '✅', '🙌', '💪'],
  creative: ['🎨', '✏️', '💡', '🌈'],
}

export function getGreeting() {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
}

export function getMoodEmoji(mood = 'happy') {
  const emojis = MOODS[mood] || MOODS.happy
  return emojis[Math.floor(Math.random() * emojis.length)]
}

export function getEncouragement() {
  const phrases = [
    "Super choix ! 🎯",
    "J'adore cette idée ! ✨",
    "Excellent ! 🚀",
    "On est sur la bonne voie ! 💪",
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

export default { getGreeting, getMoodEmoji, getEncouragement }
