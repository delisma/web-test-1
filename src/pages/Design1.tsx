import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Design 1: COSMIC NEBULA
 * 
 * Aesthetic: Deep space darkness with aurora borealis effects,
 * floating particles, and cosmic energy visualization.
 * Typography: Clash Display (bold display) + Satoshi (clean body)
 */

// Particle component for floating cosmic dust
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number }[] = []
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 180,
      })
    }
    
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`
        ctx.fill()
      })
      
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}

// Aurora effect component
function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-1/2 left-1/4 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.4) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)',
          animation: 'aurora1 15s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232, 121, 249, 0.4) 0%, rgba(34, 211, 238, 0.2) 40%, transparent 70%)',
          animation: 'aurora2 20s ease-in-out infinite',
          filter: 'blur(80px)',
        }}
      />
      <div 
        className="absolute bottom-0 left-1/3 w-[700px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.4) 0%, rgba(34, 211, 238, 0.2) 40%, transparent 70%)',
          animation: 'aurora3 18s ease-in-out infinite',
          filter: 'blur(70px)',
        }}
      />
      <style>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, 50px) scale(1.1); }
          66% { transform: translate(-50px, 100px) scale(0.9); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-80px, -40px) scale(1.15); }
          66% { transform: translate(60px, -80px) scale(0.85); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(120px, -60px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}

// AI Model badge
function ModelBadge({ name, gradient, delay }: { name: string; gradient: string; delay: number }) {
  return (
    <div 
      className="group relative px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden"
      style={{ 
        animation: `fadeSlideUp 0.8s ease-out ${delay}ms backwards`,
        background: 'rgba(255, 255, 255, 0.03)',
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: gradient }}
      />
      <div className="relative flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ background: gradient.replace('15%', '100%') }}
        />
        <span className="font-medium text-white/90">{name}</span>
      </div>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// Feature card
function FeatureCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  return (
    <div 
      className="group relative p-8 rounded-3xl backdrop-blur-xl border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
      style={{ 
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)',
        animation: `fadeSlideUp 0.8s ease-out ${200 + index * 150}ms backwards`,
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15), transparent 70%)' }} />
      </div>
      
      <div className="relative">
        <div className="text-5xl mb-6">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-white/50 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Pricing card
function PricingCard() {
  return (
    <div 
      className="relative p-[1px] rounded-[2rem] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.5), rgba(168, 85, 247, 0.5), rgba(232, 121, 249, 0.5))',
        animation: 'fadeSlideUp 0.8s ease-out 600ms backwards',
      }}
    >
      <div className="relative p-10 rounded-[2rem] bg-slate-950/90 backdrop-blur-xl">
        <div className="text-center">
          <p className="text-cyan-400 font-medium uppercase tracking-wider text-sm mb-4">Simple Pricing</p>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-7xl font-black text-white">$49</span>
            <span className="text-white/40 text-lg">/month</span>
          </div>
          <p className="text-white/50 mb-8">All 4 AI models. Unlimited generations. One flat fee.</p>
          
          <button className="w-full py-4 px-8 rounded-2xl font-bold text-slate-900 text-lg relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #22d3ee, #a78bfa, #e879f9)',
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)',
            }}
          >
            <span className="relative z-10">Start Creating</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <div className="mt-8 grid grid-cols-2 gap-4 text-left text-sm">
            {['Domain checks', 'Social handles', 'Trademark search', 'Business registry', 'Real-time monitoring', 'Export reports'].map(feature => (
              <div key={feature} className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Design1() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Load fonts
    const link = document.createElement('link')
    link.href = 'https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=satoshi@400,500,700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  const models = [
    { name: 'Gemini 3 Flash', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))' },
    { name: 'Claude Opus 4.5', gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.15))' },
    { name: 'GPT-OSS', gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))' },
    { name: 'Kimi 2.5', gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(139, 92, 246, 0.15))' },
  ]

  const features = [
    { icon: '🌐', title: 'Domain Scanner', description: 'Instantly check availability across 500+ TLDs with pricing and registration options.' },
    { icon: '📱', title: 'Social Handle Finder', description: 'Verify usernames on Twitter, Instagram, TikTok, LinkedIn, and 30+ platforms.' },
    { icon: '⚖️', title: 'Trademark Search', description: 'Deep search through USPTO, EUIPO, and global trademark databases.' },
    { icon: '🏢', title: 'Business Registry', description: 'Check business name availability across all 50 US states and international registries.' },
    { icon: '🔔', title: 'Real-time Monitoring', description: 'Get instant alerts when your saved brand names become available.' },
    { icon: '🚀', title: 'AI Brainstorming', description: 'Generate hundreds of creative variations using 4 leading AI models.' },
  ]

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #020617 0%, #0c0a1d 50%, #020617 100%)',
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      {mounted && <Particles />}
      <Aurora />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Clash Display', sans-serif" }}>B</span>
          </div>
          <span className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            BrandForge
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#models" className="text-white/60 hover:text-white transition-colors">AI Models</a>
          <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
        </div>
        
        <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
          Sign In
        </button>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-300 mb-8"
            style={{ animation: 'fadeSlideUp 0.8s ease-out backwards' }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Powered by 4 Leading AI Models
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1]"
            style={{ 
              fontFamily: "'Clash Display', sans-serif",
              animation: 'fadeSlideUp 0.8s ease-out 100ms backwards',
            }}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Legendary Brand
            </span>
          </h1>
          
          <p 
            className="text-xl text-white/50 max-w-2xl mx-auto mb-12"
            style={{ animation: 'fadeSlideUp 0.8s ease-out 200ms backwards' }}
          >
            Generate brilliant brand names using multiple AI models and instantly verify availability 
            across domains, social media, trademarks, and business registries.
          </p>
          
          {/* Demo Input */}
          <div 
            className="relative max-w-2xl mx-auto mb-16"
            style={{ animation: 'fadeSlideUp 0.8s ease-out 300ms backwards' }}
          >
            <div className="relative flex items-center gap-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <input 
                type="text" 
                placeholder="Describe your brand vision..."
                className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/30 outline-none text-lg"
              />
              <button 
                className="px-8 py-4 rounded-xl font-bold text-slate-900 shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)',
                }}
              >
                Generate ✨
              </button>
            </div>
          </div>
          
          {/* Model Badges */}
          <div id="models" className="flex flex-wrap justify-center gap-4">
            {models.map((model, i) => (
              <ModelBadge key={model.name} {...model} delay={400 + i * 100} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Everything You Need
            </h2>
            <p className="text-xl text-white/40">One platform for complete brand discovery and validation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-8">
        <div className="max-w-md mx-auto">
          <PricingCard />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2026 BrandForge AI. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
