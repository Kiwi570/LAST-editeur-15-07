import React from 'react'
import { motion } from 'framer-motion'

// Bulles flottantes - OPACITÉ RÉDUITE
function ChatBubbles() {
  const bubbles = [
    { size: 80, x: '5%', y: '15%', duration: 8, delay: 0, color: 'rgba(167,139,250,0.12)' },
    { size: 60, x: '75%', y: '25%', duration: 10, delay: 1, color: 'rgba(244,114,182,0.10)' },
    { size: 100, x: '65%', y: '65%', duration: 12, delay: 2, color: 'rgba(34,211,238,0.10)' },
    { size: 50, x: '15%', y: '75%', duration: 9, delay: 0.5, color: 'rgba(167,139,250,0.10)' },
    { size: 70, x: '45%', y: '45%', duration: 11, delay: 1.5, color: 'rgba(244,114,182,0.08)' },
    { size: 45, x: '85%', y: '8%', duration: 7, delay: 3, color: 'rgba(34,211,238,0.12)' },
    { size: 55, x: '3%', y: '55%', duration: 13, delay: 2.5, color: 'rgba(167,139,250,0.09)' },
    { size: 40, x: '55%', y: '85%', duration: 10, delay: 4, color: 'rgba(244,114,182,0.11)' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
            background: `radial-gradient(circle at 30% 30%, ${bubble.color}, transparent 70%)`,
            border: `1px solid ${bubble.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default ChatBubbles
