/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'pb': {
          'bg': '#0A0E1A',
          'bg-light': '#0F1629',
          'surface': '#111827',
          'surface-light': '#1E293B',
          'border': '#1E293B',
          'border-light': '#334155',
          'text': '#FFFFFF',
          'text-muted': '#94A3B8',
          'text-light': '#64748B',
        },
        'accent': {
          'cyan': '#22D3EE',
          'violet': '#A78BFA',
          'pink': '#F472B6',
          'emerald': '#34D399',
          'amber': '#FBBF24',
          'rose': '#FB7185',
          'blue': '#3B82F6',
          'red': '#F87171',
          'orange': '#FB923C',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'highlight': 'highlight 1.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px var(--color-primary-30)' },
          '50%': { boxShadow: '0 0 40px var(--color-primary-50)' },
        },
        highlight: {
          '0%': { boxShadow: '0 0 0 4px var(--color-primary)' },
          '100%': { boxShadow: '0 0 0 4px transparent' },
        },
      },
    },
  },
  plugins: [],
}
