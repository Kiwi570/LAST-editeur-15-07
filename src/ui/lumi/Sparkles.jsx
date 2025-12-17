import React from 'react'
import { motion } from 'framer-motion'

// Étoiles scintillantes subtiles
function Sparkles() {
  const sparkles = [
    { x: '20%', y: '30%', size: 4, delay: 0 },
    { x: '80%', y: '20%', size: 3, delay: 1.5 },
    { x: '60%', y: '70%', size: 5, delay: 0.8 },
    { x: '10%', y: '60%', size: 3, delay: 2.2 },
    { x: '90%', y: '50%', size: 4, delay: 0.5 },
    { x: '40%', y: '15%', size: 3, delay: 1.8 },
    { x: '70%', y: '85%', size: 4, delay: 1.2 },
    { x: '25%', y: '90%', size: 3, delay: 2.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
              fill="url(#sparkleGradient)"
            />
            <defs>
              <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default Sparkles
