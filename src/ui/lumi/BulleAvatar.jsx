import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function BulleAvatar({ size = 40, onClick, className = '', animated = false }) {
  const isClickable = !!onClick
  const [isBlinking, setIsBlinking] = useState(false)
  
  // Clignotement aléatoire des yeux
  useEffect(() => {
    if (!animated) return
    
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      }
    }, 2000)
    
    return () => clearInterval(blinkInterval)
  }, [animated])

  return (
    <motion.div
      onClick={onClick}
      className={`${isClickable ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size }}
      whileHover={isClickable ? { scale: 1.1 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      animate={animated ? { 
        y: [0, -2, 0],
      } : {}}
      transition={animated ? { 
        duration: 2, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      } : {}}
      title={isClickable ? "Retour au chat" : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`bulleGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          
          <radialGradient id={`bulleShading-${size}`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
          
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Glow derrière */}
        <circle cx="50" cy="50" r="46" fill="rgba(167,139,250,0.2)" filter="url(#softGlow)" />
        
        {/* Corps principal */}
        <circle cx="50" cy="50" r="45" fill={`url(#bulleGradient-${size})`} />
        <circle cx="50" cy="50" r="45" fill={`url(#bulleShading-${size})`} />
        
        {/* Reflets */}
        <ellipse cx="35" cy="30" rx="12" ry="8" fill="rgba(255,255,255,0.5)" />
        <circle cx="25" cy="42" r="4" fill="rgba(255,255,255,0.4)" />
        
        {/* Yeux - fermés si clignement, sinon ouverts avec sourire */}
        {isBlinking ? (
          <>
            <line x1="30" y1="42" x2="44" y2="42" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
            <line x1="56" y1="42" x2="70" y2="42" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 30 45 Q 37 38, 44 45" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 56 45 Q 63 38, 70 45" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        )}
        
        {/* Sourire */}
        <path d="M 35 60 Q 50 75, 65 60" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* Joues */}
        <ellipse cx="25" cy="55" rx="6" ry="4" fill="rgba(244,114,182,0.5)" />
        <ellipse cx="75" cy="55" rx="6" ry="4" fill="rgba(244,114,182,0.5)" />
        
        {/* Petites bulles décoratives */}
        <circle cx="78" cy="25" r="5" fill="rgba(255,255,255,0.3)" />
        <circle cx="85" cy="35" r="3" fill="rgba(255,255,255,0.25)" />
      </svg>
    </motion.div>
  )
}

export default BulleAvatar
