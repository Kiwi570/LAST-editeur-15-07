import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Download, FileJson, Code, Copy, Check, Loader2 } from 'lucide-react'
import { useEditorStore } from '@core/state/editorStore'
import { useSiteStore } from '@core/state/siteStore'

const OPTIONS = [
  { id: 'json', icon: FileJson, title: 'JSON', desc: 'Données du site (réimportable)', color: '#22D3EE' },
  { id: 'html', icon: Code, title: 'HTML', desc: 'Page complète standalone', color: '#A78BFA' },
]

function ExportModal() {
  const closeModal = useEditorStore((s) => s.closeModal)
  const showToast = useEditorStore((s) => s.showToast)
  const site = useSiteStore((s) => s.site)
  const exportJSON = useSiteStore((s) => s.exportJSON)

  const [format, setFormat] = useState('json')
  const [exporting, setExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    await new Promise(r => setTimeout(r, 500))
    try {
      if (format === 'json') {
        download(exportJSON(), `${site.meta?.name || 'bulle-site'}.json`, 'application/json')
      } else {
        download(generateHTML(site), `${site.meta?.name || 'bulle-site'}.html`, 'text/html')
      }
      showToast(`📦 ${format.toUpperCase()} téléchargé !`, 'success')
      closeModal()
    } catch (e) {
      showToast("Erreur d'export", 'error')
    } finally {
      setExporting(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportJSON())
      setCopied(true)
      showToast('📋 JSON copié !', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch { showToast('Erreur de copie', 'error') }
  }

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <motion.div className="relative w-full max-w-md bg-pb-surface border border-pb-border rounded-2xl shadow-2xl overflow-hidden" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
        <div className="flex items-center justify-between p-5 border-b border-pb-border">
          <div>
            <h2 className="text-lg font-semibold text-white">📦 Exporter ton site</h2>
            <p className="text-sm text-pb-text-muted">Télécharge ton travail</p>
          </div>
          <motion.button onClick={closeModal} className="btn-icon" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><X className="w-5 h-5" /></motion.button>
        </div>

        <div className="p-5 space-y-3">
          {OPTIONS.map((opt) => (
            <motion.button
              key={opt.id}
              onClick={() => setFormat(opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${format === opt.id ? 'border-primary bg-primary-10' : 'border-pb-border hover:border-pb-border-light bg-pb-bg/50'}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${opt.color}20` }}>
                <opt.icon className="w-6 h-6" style={{ color: opt.color }} />
              </div>
              <div className="flex-1">
                <h3 className={`font-medium ${format === opt.id ? 'text-white' : 'text-pb-text-muted'}`}>{opt.title}</h3>
                <p className="text-sm text-pb-text-light">{opt.desc}</p>
              </div>
              {format === opt.id && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><Check className="w-4 h-4 text-white" /></motion.div>}
            </motion.button>
          ))}

          {format === 'json' && (
            <motion.button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 p-3 bg-pb-bg rounded-xl border border-pb-border text-sm text-pb-text-muted hover:text-white hover:border-pb-border-light transition-all" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              {copied ? <><Check className="w-4 h-4 text-accent-emerald" /> Copié !</> : <><Copy className="w-4 h-4" /> Copier dans le presse-papier</>}
            </motion.button>
          )}
        </div>

        <div className="p-5 border-t border-pb-border bg-pb-bg/50 flex gap-3">
          <motion.button onClick={closeModal} className="flex-1 btn-secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Annuler</motion.button>
          <motion.button onClick={handleExport} disabled={exporting} className="flex-1 btn-primary flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Télécharger
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function download(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function generateHTML(site) {
  const p = site.global?.palette?.primary || '#A78BFA'
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${site.meta?.name || 'Ma Landing Page'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body{font-family:'Inter',sans-serif;background:#0A0E1A;color:white}.text-gradient{background:linear-gradient(135deg,#22D3EE,${p},#F472B6);-webkit-background-clip:text;background-clip:text;color:transparent}</style>
</head>
<body class="min-h-screen">
  <section class="py-20 text-center">
    <div class="container mx-auto px-6">
      <h1 class="text-5xl font-bold mb-6">${site.sections?.hero?.content?.title || 'Bienvenue'}</h1>
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">${site.sections?.hero?.content?.subtitle || ''}</p>
      <button class="px-8 py-3 rounded-full font-semibold text-white" style="background:linear-gradient(135deg,${p},#F472B6)">${site.sections?.hero?.content?.ctaPrimary || 'Commencer'}</button>
    </div>
  </section>
  <footer class="py-8 text-center text-gray-500 border-t border-gray-800">Fait avec 🫧 <span class="text-gradient font-semibold">Bulle</span></footer>
</body>
</html>`
}

export default ExportModal
