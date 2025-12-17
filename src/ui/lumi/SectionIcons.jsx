import React from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════
// HERO ICON - Soleil souriant style Bulle
// ═══════════════════════════════════════════
export function HeroIcon({ size = 24 }) {
  const center = size / 2
  const faceRadius = size * 0.35
  const rayLength = size * 0.18
  const rayStart = faceRadius + size * 0.05
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={`heroGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <filter id={`heroGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Rayons */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = center + Math.cos(rad) * rayStart
        const y1 = center + Math.sin(rad) * rayStart
        const x2 = center + Math.cos(rad) * (rayStart + rayLength)
        const y2 = center + Math.sin(rad) * (rayStart + rayLength)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={`url(#heroGrad-${size})`}
            strokeWidth={size * 0.08}
            strokeLinecap="round"
          />
        )
      })}
      
      {/* Cercle principal (visage) */}
      <circle
        cx={center}
        cy={center}
        r={faceRadius}
        fill={`url(#heroGrad-${size})`}
        filter={`url(#heroGlow-${size})`}
      />
      
      {/* Highlight */}
      <ellipse
        cx={center - faceRadius * 0.3}
        cy={center - faceRadius * 0.3}
        rx={faceRadius * 0.25}
        ry={faceRadius * 0.15}
        fill="rgba(255,255,255,0.4)"
      />
      
      {/* Yeux souriants */}
      <path
        d={`M ${center - faceRadius * 0.35} ${center - faceRadius * 0.1} 
            Q ${center - faceRadius * 0.35} ${center - faceRadius * 0.35}, 
              ${center - faceRadius * 0.15} ${center - faceRadius * 0.1}`}
        stroke="#1a1a2e"
        strokeWidth={size * 0.06}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${center + faceRadius * 0.15} ${center - faceRadius * 0.1} 
            Q ${center + faceRadius * 0.35} ${center - faceRadius * 0.35}, 
              ${center + faceRadius * 0.35} ${center - faceRadius * 0.1}`}
        stroke="#1a1a2e"
        strokeWidth={size * 0.06}
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Sourire */}
      <path
        d={`M ${center - faceRadius * 0.3} ${center + faceRadius * 0.15} 
            Q ${center} ${center + faceRadius * 0.5}, 
              ${center + faceRadius * 0.3} ${center + faceRadius * 0.15}`}
        stroke="#1a1a2e"
        strokeWidth={size * 0.06}
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Joues roses */}
      <circle cx={center - faceRadius * 0.5} cy={center + faceRadius * 0.1} r={faceRadius * 0.12} fill="rgba(244,114,182,0.5)" />
      <circle cx={center + faceRadius * 0.5} cy={center + faceRadius * 0.1} r={faceRadius * 0.12} fill="rgba(244,114,182,0.5)" />
    </svg>
  )
}

// ═══════════════════════════════════════════
// FEATURES ICON - Étoiles/Sparkles style Bulle
// ═══════════════════════════════════════════
export function FeaturesIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`featGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Grande étoile */}
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill={`url(#featGrad-${size})`}
      />
      {/* Petite étoile */}
      <path
        d="M18 14L18.75 16.25L21 17L18.75 17.75L18 20L17.25 17.75L15 17L17.25 16.25L18 14Z"
        fill={`url(#featGrad-${size})`}
        opacity="0.7"
      />
    </svg>
  )
}

// ═══════════════════════════════════════════
// STEPS ICON - Liste/Étapes style Bulle
// ═══════════════════════════════════════════
export function StepsIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`stepsGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <circle cx="6" cy="6" r="3" fill={`url(#stepsGrad-${size})`} />
      <rect x="11" y="5" width="9" height="2" rx="1" fill={`url(#stepsGrad-${size})`} opacity="0.6" />
      <circle cx="6" cy="12" r="3" fill={`url(#stepsGrad-${size})`} opacity="0.8" />
      <rect x="11" y="11" width="9" height="2" rx="1" fill={`url(#stepsGrad-${size})`} opacity="0.5" />
      <circle cx="6" cy="18" r="3" fill={`url(#stepsGrad-${size})`} opacity="0.6" />
      <rect x="11" y="17" width="9" height="2" rx="1" fill={`url(#stepsGrad-${size})`} opacity="0.4" />
    </svg>
  )
}

// ═══════════════════════════════════════════
// PRICING ICON - Diamant style Bulle
// ═══════════════════════════════════════════
export function PricingIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`priceGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L4 8L12 22L20 8L12 2Z"
        fill={`url(#priceGrad-${size})`}
      />
      <path
        d="M4 8H20L12 2L4 8Z"
        fill="rgba(255,255,255,0.3)"
      />
      <path
        d="M8 8L12 22L16 8"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}

// ═══════════════════════════════════════════
// FAQ ICON - Bulle de chat style Bulle
// ═══════════════════════════════════════════
export function FaqIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`faqGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C10.5 20 9 19.5 8 19L4 20L5 16C4.4 15 4 13.5 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
        fill={`url(#faqGrad-${size})`}
      />
      <text x="12" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1a1a2e">?</text>
    </svg>
  )
}

// ═══════════════════════════════════════════
// EXPORT MAP
// ═══════════════════════════════════════════
export const SectionIconMap = {
  hero: HeroIcon,
  features: FeaturesIcon,
  howItWorks: StepsIcon,
  pricing: PricingIcon,
  faq: FaqIcon,
}

export function SectionIcon({ type, size = 24 }) {
  const IconComponent = SectionIconMap[type]
  if (!IconComponent) return <span style={{ fontSize: size * 0.7 }}>✨</span>
  return <IconComponent size={size} />
}
