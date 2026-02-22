import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Design 4: RETRO TERMINAL
 * 
 * Aesthetic: Nostalgic CRT monitor meets modern AI, with scanlines,
 * phosphor glow, command-line interfaces, and vintage computing vibes.
 * Typography: IBM Plex Mono + VT323
 */

// CRT overlay effect
function CRTOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      {/* Subtle flicker */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ animation: 'flicker 0.15s infinite' }}
      />
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.03; }
        }
      `}</style>
    </div>
  )
}

// Typing animation hook
function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState('')
  const [started, setStarted] = useState(false)
  
  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(delayTimer)
  }, [startDelay])
  
  useEffect(() => {
    if (!started) return
    
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    
    return () => clearInterval(timer)
  }, [text, speed, started])
  
  return displayText
}

// Terminal prompt component
function TerminalPrompt({ children, delay = 0, showCursor = true }: { children: string; delay?: number; showCursor?: boolean }) {
  const text = useTypewriter(children, 30, delay)
  
  return (
    <div className="flex items-start gap-2 font-mono">
      <span className="text-emerald-400 shrink-0">&gt;</span>
      <span className="text-emerald-100">
        {text}
        {showCursor && text.length < children.length && (
          <span className="inline-block w-2 h-5 bg-emerald-400 animate-pulse ml-0.5" />
        )}
      </span>
    </div>
  )
}

// Glowing text
function GlowText({ children, color = '#22c55e', className = '' }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <span 
      className={`relative ${className}`}
      style={{
        color: color,
        textShadow: `0 0 10px ${color}, 0 0 20px ${color}80, 0 0 30px ${color}40`,
      }}
    >
      {children}
    </span>
  )
}

// Terminal card
function TerminalCard({ title, content, index }: { title: string; content: string; index: number }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300 + index * 150)
    return () => clearTimeout(timer)
  }, [index])
  
  if (!visible) return null
  
  return (
    <div 
      className="border border-emerald-900/60 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden"
      style={{ animation: 'fadeIn 0.5s ease-out' }}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 border-b border-emerald-900/40">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-xs text-emerald-600 font-mono ml-2">{title}.exe</span>
      </div>
      <div className="p-4 font-mono text-sm">
        <TerminalPrompt delay={500 + index * 200}>{content}</TerminalPrompt>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ASCII art logo
function ASCIILogo() {
  const ascii = `
██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██████╔╝██████╔╝███████║██╔██╗ ██║██║  ██║
██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║  ██║
██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝`
  
  return (
    <pre 
      className="text-[0.35rem] sm:text-[0.5rem] md:text-xs leading-tight text-center"
      style={{
        color: '#22c55e',
        textShadow: '0 0 10px #22c55e, 0 0 20px #22c55e80',
        fontFamily: "'VT323', monospace",
      }}
    >
      {ascii}
    </pre>
  )
}

// Status bar component
function StatusBar() {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/90 border-t border-emerald-800/40 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-mono">
        <div className="flex items-center gap-6 text-emerald-600">
          <span>▶ SYSTEM ONLINE</span>
          <span>■ 4 AI MODELS ACTIVE</span>
          <span>● MEM: 2.4GB</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-400">
          <span>{time.toLocaleTimeString()}</span>
          <span className="text-emerald-600">|</span>
          <span>v4.2.0</span>
        </div>
      </div>
    </div>
  )
}

// Model status
function ModelStatus({ name, status, delay }: { name: string; status: 'online' | 'syncing'; delay: number }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  if (!visible) return null
  
  return (
    <div 
      className="flex items-center justify-between py-3 px-4 border border-emerald-900/40 bg-black/30 rounded"
      style={{ animation: 'fadeIn 0.4s ease-out' }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-400' : 'bg-yellow-400'} animate-pulse`} />
        <span className="font-mono text-emerald-200">{name}</span>
      </div>
      <span className={`text-xs font-mono ${status === 'online' ? 'text-emerald-500' : 'text-yellow-500'}`}>
        [{status.toUpperCase()}]
      </span>
    </div>
  )
}

// Interactive terminal input
function TerminalInput() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  return (
    <div 
      className="border border-emerald-700/50 bg-black/60 rounded-lg p-6 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 text-emerald-600 text-sm font-mono mb-4">
        <span>brandforge@ai:~$</span>
        <span className="text-emerald-400">generate --brand</span>
      </div>
      <div className="flex items-center gap-2 font-mono">
        <span className="text-emerald-400">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your brand vision..."
          className="flex-1 bg-transparent text-emerald-100 outline-none placeholder-emerald-800"
          style={{
            textShadow: '0 0 5px #22c55e40',
          }}
        />
        <span className="w-2 h-5 bg-emerald-400 animate-pulse" />
      </div>
      <div className="mt-4 flex gap-2">
        <button 
          className="px-6 py-2 bg-emerald-600 text-black font-mono font-bold hover:bg-emerald-400 transition-colors"
          style={{ boxShadow: '0 0 20px #22c55e40' }}
        >
          EXECUTE
        </button>
        <button className="px-6 py-2 border border-emerald-700 text-emerald-500 font-mono hover:bg-emerald-950 transition-colors">
          CLEAR
        </button>
      </div>
    </div>
  )
}

// Pricing terminal
function PricingTerminal() {
  return (
    <div 
      className="max-w-lg mx-auto border border-emerald-700/50 bg-black/60 rounded-lg overflow-hidden"
      style={{ animation: 'fadeIn 0.6s ease-out 800ms backwards' }}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-emerald-950/70 border-b border-emerald-800/40">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-xs text-emerald-600 font-mono ml-2">pricing.exe</span>
      </div>
      
      <div className="p-8">
        <div className="font-mono text-sm text-emerald-600 mb-6">
          <p className="mb-2">&gt; Loading pricing module...</p>
          <p className="mb-2">&gt; Calculating optimal value...</p>
          <p className="text-emerald-400">&gt; SUBSCRIPTION_READY</p>
        </div>
        
        <div className="text-center py-6 border border-emerald-800/30 bg-emerald-950/30 rounded mb-6">
          <p className="text-emerald-600 font-mono text-sm mb-2">MONTHLY_ACCESS</p>
          <div 
            className="text-7xl font-bold"
            style={{
              color: '#22c55e',
              textShadow: '0 0 20px #22c55e, 0 0 40px #22c55e80',
              fontFamily: "'VT323', monospace",
            }}
          >
            $49
          </div>
          <p className="text-emerald-700 font-mono text-sm mt-2">/month</p>
        </div>
        
        <div className="space-y-2 font-mono text-sm mb-8">
          {[
            '[✓] All 4 AI models included',
            '[✓] Unlimited brand generations',
            '[✓] Domain + social checks',
            '[✓] Trademark database access',
            '[✓] Real-time monitoring',
          ].map((item, i) => (
            <p key={i} className="text-emerald-400">{item}</p>
          ))}
        </div>
        
        <button 
          className="w-full py-4 bg-emerald-500 text-black font-mono font-bold text-lg hover:bg-emerald-400 transition-colors"
          style={{ boxShadow: '0 0 30px #22c55e60' }}
        >
          &gt; INITIALIZE_SUBSCRIPTION
        </button>
      </div>
    </div>
  )
}

export default function Design4() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=VT323&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  const models = [
    { name: 'Gemini 3 Flash', status: 'online' as const },
    { name: 'Claude Opus 4.5', status: 'online' as const },
    { name: 'GPT-OSS', status: 'online' as const },
    { name: 'Kimi 2.5', status: 'syncing' as const },
  ]

  const features = [
    { title: 'domain_scan', content: 'Scanning 500+ TLDs for availability...' },
    { title: 'social_check', content: 'Verifying handles across 30+ platforms...' },
    { title: 'trademark_db', content: 'Searching USPTO, EUIPO databases...' },
    { title: 'registry_lookup', content: 'Checking business registries...' },
    { title: 'monitor_init', content: 'Initializing real-time alerts...' },
    { title: 'ai_brainstorm', content: 'Loading neural brand generators...' },
  ]

  return (
    <div 
      className="min-h-screen relative pb-16"
      style={{ 
        background: 'linear-gradient(180deg, #000000 0%, #052e16 100%)',
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <CRTOverlay />
      <StatusBar />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-emerald-900/40">
        <Link to="/" className="group flex items-center gap-3">
          <span 
            className="text-emerald-400 text-xl"
            style={{ textShadow: '0 0 10px #22c55e' }}
          >
            [BF]
          </span>
          <span className="text-emerald-600 group-hover:text-emerald-400 transition-colors">
            BRANDFORGE_v4.2
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-emerald-700 hover:text-emerald-400 transition-colors">&gt; FEATURES</a>
          <a href="#models" className="text-emerald-700 hover:text-emerald-400 transition-colors">&gt; MODELS</a>
          <a href="#pricing" className="text-emerald-700 hover:text-emerald-400 transition-colors">&gt; PRICING</a>
        </div>
        
        <button className="px-4 py-2 border border-emerald-700 text-emerald-500 text-sm hover:bg-emerald-950 transition-colors">
          LOGIN
        </button>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <ASCIILogo />
          </div>
          
          <div className="text-center mb-8">
            <GlowText className="text-sm uppercase tracking-[0.3em]">
              AI-POWERED BRAND DISCOVERY TERMINAL
            </GlowText>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-emerald-600 max-w-2xl mx-auto leading-relaxed">
              Initialize brand discovery protocols. Generate unique names using 
              four advanced AI models. Verify availability across all digital channels.
            </p>
          </div>
          
          {/* Terminal Input */}
          <TerminalInput />
        </div>
      </section>
      
      {/* AI Models Section */}
      <section id="models" className="relative z-10 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-emerald-500 font-mono mb-8 text-center">
            &gt; CONNECTED_AI_MODELS
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {models.map((model, i) => (
              <ModelStatus key={model.name} {...model} delay={200 + i * 150} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-emerald-500 font-mono mb-8 text-center">
            &gt; SYSTEM_MODULES
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <TerminalCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-16 px-8">
        <PricingTerminal />
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-8 border-t border-emerald-900/40 mb-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono">
          <p className="text-emerald-800">© 2026 BRANDFORGE SYSTEMS</p>
          <div className="flex gap-4 text-emerald-700">
            {['PRIVACY', 'TERMS', 'SUPPORT'].map(link => (
              <a key={link} href="#" className="hover:text-emerald-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
