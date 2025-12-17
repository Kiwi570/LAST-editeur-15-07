import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, FileText, Layout, Sparkles, HelpCircle } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'
import { useSiteStore } from '@core/state/siteStore'
import { processMessage } from '@lumi/modes/localMode'
import { getGreeting } from '@lumi/personality'
import ContentPanel from '@ui/panels/ContentPanel'
import LayoutPanel from '@ui/panels/LayoutPanel'
import BulleAvatar from './BulleAvatar'
import ChatBubbles from './ChatBubbles'
import SparklesEffect from './Sparkles'
import { SectionIcon } from './SectionIcons'

const LABELS = { hero: 'Hero', features: 'Features', howItWorks: 'Étapes', pricing: 'Tarifs', faq: 'FAQ' }
const GRADIENT = 'linear-gradient(135deg, #A78BFA 0%, #F472B6 50%, #22D3EE 100%)'

const DEFAULT_SUGGESTIONS = []
const SECTION_SUGGESTIONS = ['Couleurs', 'Layout']

function getRelativeTime(timestamp) {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return "à l'instant"
  if (minutes === 1) return "il y a 1 min"
  if (minutes < 60) return `il y a ${minutes} min`
  
  const hours = Math.floor(minutes / 60)
  if (hours === 1) return "il y a 1h"
  if (hours < 24) return `il y a ${hours}h`
  
  return "il y a longtemps"
}

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    }
  },
}

function LumiPanel() {
  const activeSection = useEditorStore((s) => s.activeSection)
  const closeLumi = useEditorStore((s) => s.closeLumi)
  const lumiThinking = useEditorStore((s) => s.lumiThinking)
  const setLumiThinking = useEditorStore((s) => s.setLumiThinking)
  const highlightSection = useEditorStore((s) => s.highlightSection)
  
  const section = useSiteStore((s) => s.getSection(activeSection))
  const sectionType = section?.type || activeSection?.split('_')[0] || 'hero'

  const [messages, setMessages] = useState([{ id: 1, type: 'lumi', text: getGreeting(), timestamp: Date.now() }])
  const [input, setInput] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [currentSuggestions, setCurrentSuggestions] = useState(DEFAULT_SUGGESTIONS)
  const [activePanel, setActivePanel] = useState('chat')
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (activeSection) {
      setCurrentSuggestions(SECTION_SUGGESTIONS)
      setActivePanel('chat')
    } else {
      setCurrentSuggestions(DEFAULT_SUGGESTIONS)
    }
  }, [activeSection])

  const handleSend = (messageText = null) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || lumiThinking) return
    
    const now = Date.now()
    
    if (!activeSection) {
      setMessages(prev => [...prev, 
        { id: now, type: 'user', text: textToSend, timestamp: now },
        { id: now + 1, type: 'lumi', text: '👆 Clique d\'abord sur une section dans la barre de gauche pour que je puisse t\'aider !', timestamp: now + 1 }
      ])
      setInput('')
      return
    }
    
    setInput('')
    setMessages(prev => [...prev, { id: now, type: 'user', text: textToSend, timestamp: now }])
    setLumiThinking(true)
    
    setTimeout(() => {
      const response = processMessage(textToSend, activeSection)
      const responseTime = Date.now()
      setMessages(prev => [...prev, { 
        id: responseTime, 
        type: 'lumi', 
        text: response.message,
        timestamp: responseTime,
      }])
      
      if (response.suggestions) {
        setCurrentSuggestions(response.suggestions.filter(s => s !== 'Aide'))
      } else if (response.action) {
        setCurrentSuggestions(['Autre modification', 'Parfait !'])
      }
      
      if (response.action) highlightSection(activeSection)
      setLumiThinking(false)
    }, 500 + Math.random() * 500)
  }

  const handleHelpClick = () => {
    setActivePanel('chat')
    const now = Date.now()
    setMessages(prev => [...prev, { 
      id: now, 
      type: 'lumi', 
      text: '💡 Voici ce que tu peux me demander :\n\n• "Mets le titre en rose"\n• "Passe en 2 colonnes"\n• "Ajoute plus d\'espacement"\n• "Change le texte du bouton"',
      timestamp: now,
    }])
    setCurrentSuggestions(['Compris !', 'Couleurs', 'Layout'])
  }

  const handleSuggestionClick = (suggestion) => {
    const now = Date.now()
    if (suggestion === 'Parfait !') {
      setMessages(prev => [...prev, { 
        id: now, 
        type: 'lumi', 
        text: '🎉 Super ! N\'hésite pas si tu veux modifier autre chose !',
        timestamp: now,
      }])
      setCurrentSuggestions(SECTION_SUGGESTIONS)
    } else if (suggestion === 'Compris !') {
      setCurrentSuggestions(activeSection ? SECTION_SUGGESTIONS : DEFAULT_SUGGESTIONS)
    } else {
      handleSend(suggestion)
    }
  }

  const handleBackToChat = () => {
    setActivePanel('chat')
  }

  return (
    <motion.aside
      className="h-full flex flex-col overflow-hidden"
      style={{ 
        width: '420px',
        background: '#12121a',
        boxShadow: '-30px 0 60px rgba(0,0,0,0.4)',
      }}
      initial={{ x: 420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 420, opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      {/* ═══════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #12121a 100%)' }}>
        <div style={{ height: '2px', background: GRADIENT }} />
        
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BulleAvatar 
              size={40} 
              onClick={handleBackToChat}
              animated={true}
            />
            
            <div className="flex items-center gap-2">
              <h3 
                className="font-bold text-lg text-white cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1.5"
                onClick={handleBackToChat}
              >
                Bulle
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#A78BFA' }} />
                </motion.span>
              </h3>
              
              <motion.button
                onClick={handleHelpClick}
                className="w-7 h-7 rounded-full flex items-center justify-center relative"
                style={{ background: '#12121a' }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(167,139,250,0.5)' }}
                whileTap={{ scale: 0.9 }}
                title="Aide"
              >
                <div 
                  className="absolute inset-0 rounded-full p-[2px]"
                  style={{ background: GRADIENT }}
                >
                  <div className="w-full h-full rounded-full bg-[#12121a] flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5 text-white/80" />
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
          
          <motion.button
            onClick={closeLumi}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            whileHover={{ 
              scale: 1.1, 
              background: 'rgba(244,114,182,0.2)',
              boxShadow: '0 0 15px rgba(244,114,182,0.4)',
            }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-white/60" />
          </motion.button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CONTENT AREA
          ═══════════════════════════════════════════ */}
      <div className="flex-1 overflow-hidden flex flex-col">
        
        {/* CHAT */}
        {activePanel === 'chat' && (
          <div 
            ref={chatRef}
            className="flex-1 overflow-y-auto p-5 relative"
            style={{ 
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F7FF 50%, #FDF4FF 100%)',
            }}
          >
            <ChatBubbles />
            <SparklesEffect />
            
            <div className="space-y-4 min-h-full flex flex-col justify-end relative z-10">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'lumi' ? (
                      <div className="flex items-start gap-2 max-w-[90%]">
                        <div className="flex-shrink-0 mt-1">
                          <BulleAvatar size={24} />
                        </div>
                        <div className="flex flex-col">
                          <motion.div
                            className="p-4 relative overflow-hidden"
                            style={{
                              background: '#1a1a2e',
                              borderRadius: '18px 18px 18px 4px',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }}
                            whileHover={{ 
                              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                              y: -2,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                              style={{ background: GRADIENT }}
                            />
                            <p className="text-sm text-white leading-relaxed pl-2 whitespace-pre-line">{msg.text}</p>
                          </motion.div>
                          
                          <span className="text-[10px] text-gray-400 mt-1 ml-2">
                            {getRelativeTime(msg.timestamp)}
                          </span>
                          
                          {/* Suggestions */}
                          {index === messages.length - 1 && msg.type === 'lumi' && currentSuggestions.length > 0 && !lumiThinking && (
                            <div className="flex flex-wrap gap-2 mt-3 ml-1">
                              {currentSuggestions.map((suggestion, i) => (
                                <motion.button
                                  key={suggestion + i}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="px-4 py-2 text-xs font-semibold rounded-full text-white"
                                  style={{ 
                                    background: GRADIENT,
                                    boxShadow: '0 4px 15px rgba(167,139,250,0.3)',
                                  }}
                                  whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(167,139,250,0.4)' }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  {suggestion}
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end">
                        <motion.div
                          className="max-w-[85%] p-4"
                          style={{
                            background: GRADIENT,
                            borderRadius: '18px 18px 4px 18px',
                            boxShadow: '0 4px 20px rgba(167,139,250,0.25)',
                          }}
                          whileHover={{ 
                            boxShadow: '0 8px 30px rgba(167,139,250,0.35)',
                            y: -2,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-sm text-white font-medium">{msg.text}</p>
                        </motion.div>
                        <span className="text-[10px] text-gray-400 mt-1 mr-2">
                          {getRelativeTime(msg.timestamp)}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {lumiThinking && (
                <motion.div 
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <BulleAvatar size={24} animated={true} />
                    </div>
                    <div 
                      className="p-4 rounded-2xl flex items-center gap-3 relative overflow-hidden"
                      style={{ background: '#1a1a2e', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: GRADIENT }} />
                      <div className="flex gap-1.5 pl-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div 
                            key={i} 
                            className="w-2 h-2 rounded-full"
                            style={{ background: i === 0 ? '#A78BFA' : i === 1 ? '#F472B6' : '#22D3EE' }}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/50">Bulle réfléchit...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* CONTENT PANEL */}
        {activePanel === 'content' && activeSection && (
          <motion.div 
            className="flex-1 overflow-y-auto p-5" 
            style={{ background: 'linear-gradient(180deg, #0f0f17 0%, #0a0a0f 100%)' }}
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
          >
            <ContentPanel sectionId={activeSection} />
          </motion.div>
        )}

        {/* LAYOUT PANEL */}
        {activePanel === 'layout' && activeSection && (
          <motion.div 
            className="flex-1 overflow-y-auto p-5" 
            style={{ background: 'linear-gradient(180deg, #0f0f17 0%, #0a0a0f 100%)' }}
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
          >
            <LayoutPanel sectionId={activeSection} />
          </motion.div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          SECTION BAR avec icônes style Bulle
          ═══════════════════════════════════════════ */}
      {activeSection && (
        <motion.div 
          className="px-4 py-3 flex items-center justify-center gap-3"
          style={{ 
            background: 'rgba(18, 18, 26, 0.95)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Bouton CONTENU */}
          <motion.button
            onClick={() => setActivePanel(activePanel === 'content' ? 'chat' : 'content')}
            className="relative px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(167,139,250,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {activePanel === 'content' ? (
              <div className="absolute inset-0 rounded-full" style={{ background: GRADIENT }} />
            ) : (
              <div className="absolute inset-0 rounded-full p-[1.5px]" style={{ background: GRADIENT }}>
                <div className="w-full h-full rounded-full bg-[#12121a]" />
              </div>
            )}
            <FileText className="w-3.5 h-3.5 relative z-10 text-white" />
            <span className="relative z-10 text-white">Contenu</span>
          </motion.button>

          {/* Indicateur SECTION avec icône custom */}
          <motion.div 
            className="flex items-center gap-2 px-2 py-1.5 rounded-full cursor-pointer"
            style={{ 
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onClick={handleBackToChat}
            whileHover={{ 
              background: 'rgba(255,255,255,0.08)',
              boxShadow: '0 0 20px rgba(167,139,250,0.2)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Point vert avec glow */}
            <motion.span 
              className="w-2 h-2 rounded-full"
              style={{ 
                background: '#34D399',
                boxShadow: '0 0 8px rgba(52,211,153,0.6)',
              }}
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 8px rgba(52,211,153,0.6)',
                  '0 0 15px rgba(52,211,153,0.8)',
                  '0 0 8px rgba(52,211,153,0.6)',
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Badge avec icône custom et nom */}
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: GRADIENT }}
            >
              <SectionIcon type={sectionType} size={18} />
              <span className="text-xs font-bold text-white">{LABELS[sectionType] || sectionType}</span>
            </div>
          </motion.div>

          {/* Bouton LAYOUT */}
          <motion.button
            onClick={() => setActivePanel(activePanel === 'layout' ? 'chat' : 'layout')}
            className="relative px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(167,139,250,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {activePanel === 'layout' ? (
              <div className="absolute inset-0 rounded-full" style={{ background: GRADIENT }} />
            ) : (
              <div className="absolute inset-0 rounded-full p-[1.5px]" style={{ background: GRADIENT }}>
                <div className="w-full h-full rounded-full bg-[#12121a]" />
              </div>
            )}
            <Layout className="w-3.5 h-3.5 relative z-10 text-white" />
            <span className="relative z-10 text-white">Layout</span>
          </motion.button>
        </motion.div>
      )}

      {/* Message si pas de section */}
      {!activeSection && (
        <motion.div 
          className="px-4 py-3 flex items-center justify-center"
          style={{ 
            background: 'rgba(18, 18, 26, 0.95)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-xs text-white/40">👆 Sélectionne une section à gauche</span>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════
          INPUT
          ═══════════════════════════════════════════ */}
      {activePanel === 'chat' && (
        <div 
          className="p-4" 
          style={{ background: GRADIENT }}
        >
          <motion.div 
            className="flex gap-3 items-center"
            style={{
              padding: '8px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            animate={inputFocused ? {
              boxShadow: '0 0 0 3px rgba(255,255,255,0.3)',
            } : {}}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={activeSection ? "Dis-moi ce que tu veux..." : "Sélectionne une section..."}
              className="flex-1 px-4 py-3 text-sm font-medium focus:outline-none placeholder-gray-400"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#1a1a2e',
              }}
            />
            <motion.button
              onClick={() => handleSend()}
              disabled={!input.trim() || lumiThinking}
              className="px-5 py-3 rounded-xl disabled:opacity-30 relative overflow-hidden"
              style={{ background: '#1a1a2e' }}
              whileHover={input.trim() ? { scale: 1.05 } : {}}
              whileTap={input.trim() ? { scale: 0.95 } : {}}
            >
              <motion.div
                className="absolute inset-0"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  width: '50%',
                }}
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Send className="w-5 h-5 text-white relative z-10" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.aside>
  )
}

export default LumiPanel
