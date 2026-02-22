import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Design 3: DIGITAL GARDEN
 * 
 * Aesthetic: Organic growth patterns with bioluminescent accents,
 * nature-inspired flowing shapes, and living ecosystem visuals.
 * Typography: Fraunces (organic serif) + General Sans (clean modern)
 */

// Organic background with flowing shapes
function OrganicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3
    }
    resize()
    window.addEventListener('resize', resize)
    
    // Draw organic shapes
    const drawBlob = (x: number, y: number, radius: number, color: string, phase: number) => {
      ctx.beginPath()
      for (let i = 0; i <= 360; i += 10) {
        const angle = (i * Math.PI) / 180
        const wobble = Math.sin(angle * 3 + phase) * 20 + Math.sin(angle * 5 + phase * 0.7) * 10
        const r = radius + wobble
        const px = x + Math.cos(angle) * r
        const py = y + Math.sin(angle) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    }
    
    let phase = 0
    let animationId: number
    
    const animate = () => {
      ctx.fillStyle = '#0a1a0f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Large background blobs
      drawBlob(canvas.width * 0.2, canvas.height * 0.15, 250, 'rgba(34, 197, 94, 0.08)', phase)
      drawBlob(canvas.width * 0.8, canvas.height * 0.25, 300, 'rgba(16, 185, 129, 0.06)', phase * 0.8)
      drawBlob(canvas.width * 0.5, canvas.height * 0.45, 280, 'rgba(74, 222, 128, 0.05)', phase * 1.2)
      drawBlob(canvas.width * 0.15, canvas.height * 0.6, 200, 'rgba(34, 197, 94, 0.07)', phase * 0.6)
      drawBlob(canvas.width * 0.85, canvas.height * 0.7, 220, 'rgba(16, 185, 129, 0.06)', phase * 1.1)
      
      phase += 0.01
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

// Floating spores/particles
function Spores() {
  const [spores] = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }))
  )
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {spores.map(spore => (
        <div
          key={spore.id}
          className="absolute rounded-full"
          style={{
            left: `${spore.x}%`,
            top: `${spore.y}%`,
            width: spore.size,
            height: spore.size,
            background: 'radial-gradient(circle, rgba(134, 239, 172, 0.8), rgba(34, 197, 94, 0.3))',
            boxShadow: `0 0 ${spore.size * 2}px rgba(74, 222, 128, 0.5)`,
            animation: `float ${spore.duration}s ease-in-out infinite`,
            animationDelay: `${spore.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.9; }
          50% { transform: translateY(-50px) translateX(-10px); opacity: 0.7; }
          75% { transform: translateY(-20px) translateX(15px); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}

// Grow animation for elements
function GrowIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div 
      className={className}
      style={{
        animation: `growIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms backwards`,
      }}
    >
      {children}
      <style>{`
        @keyframes growIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

// Organic feature card
function GardenCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  return (
    <GrowIn delay={200 + index * 100}>
      <div className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-emerald-950/50 to-emerald-950/20 border border-emerald-800/30 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-500">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <h3 
            className="text-2xl text-emerald-100 mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            {title}
          </h3>
          <p className="text-emerald-400/70 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Corner decoration */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-700/30 rounded-tr-xl opacity-50" />
      </div>
    </GrowIn>
  )
}

// AI Model showcase
function ModelShowcase() {
  const models = [
    { name: 'Gemini 3 Flash', color: '#60a5fa', description: 'Lightning-fast creative synthesis' },
    { name: 'Claude Opus 4.5', color: '#f97316', description: 'Deep strategic thinking' },
    { name: 'GPT-OSS', color: '#10b981', description: 'Open-source innovation' },
    { name: 'Kimi 2.5', color: '#a855f7', description: 'Multilingual brand genius' },
  ]
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {models.map((model, i) => (
        <GrowIn key={model.name} delay={400 + i * 100}>
          <div className="group relative p-6 rounded-2xl bg-emerald-950/30 border border-emerald-800/20 hover:border-emerald-500/40 transition-all duration-500 cursor-pointer">
            <div 
              className="w-12 h-12 rounded-full mb-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ 
                background: `radial-gradient(circle, ${model.color}40, ${model.color}10)`,
                boxShadow: `0 0 30px ${model.color}20`,
              }}
            >
              <div 
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ background: model.color }}
              />
            </div>
            <h4 
              className="text-lg text-emerald-100 mb-2"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
            >
              {model.name}
            </h4>
            <p className="text-sm text-emerald-500/60">{model.description}</p>
          </div>
        </GrowIn>
      ))}
    </div>
  )
}

// Organic pricing section
function PricingGarden() {
  return (
    <GrowIn delay={500}>
      <div className="relative max-w-lg mx-auto">
        {/* Decorative vines */}
        <svg className="absolute -top-20 -left-20 w-40 h-40 text-emerald-800/30" viewBox="0 0 100 100" fill="none">
          <path d="M80 90 Q60 70 50 50 T20 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="10" r="5" fill="currentColor" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
        
        <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-emerald-950/80 to-emerald-900/40 border border-emerald-700/40 backdrop-blur-xl">
          <div className="text-center">
            <p 
              className="text-emerald-400 text-sm uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              Cultivate Your Brand
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span 
                className="text-8xl text-emerald-100"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
              >
                $49
              </span>
              <span className="text-emerald-500/60 text-lg">/month</span>
            </div>
            <p className="text-emerald-400/60 mb-8 max-w-xs mx-auto">
              Plant the seed. Watch your brand grow with unlimited AI-powered discovery.
            </p>
            
            <button 
              className="w-full py-5 rounded-2xl font-semibold text-lg text-emerald-950 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #86efac, #22c55e, #16a34a)',
                boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
              }}
            >
              <span className="relative z-10">Begin Growing ✿</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-200 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-emerald-500/60">
              {['All 4 AI Models', 'Unlimited Checks', '14-day Trial'].map(item => (
                <span key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative vines */}
        <svg className="absolute -bottom-16 -right-16 w-32 h-32 text-emerald-800/30" viewBox="0 0 100 100" fill="none">
          <path d="M10 10 Q30 30 50 40 T90 80" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="90" cy="80" r="5" fill="currentColor" />
        </svg>
      </div>
    </GrowIn>
  )
}

export default function Design3() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    
    const link2 = document.createElement('link')
    link2.href = 'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap'
    link2.rel = 'stylesheet'
    document.head.appendChild(link2)
  }, [])

  const features = [
    { icon: '🌍', title: 'Domain Ecosystem', description: 'Explore availability across 500+ TLDs like a vast digital forest.' },
    { icon: '🌿', title: 'Social Canopy', description: 'Branch out across 30+ social platforms with instant handle verification.' },
    { icon: '⚖️', title: 'Legal Roots', description: 'Deep trademark searches through USPTO, EUIPO, and global databases.' },
    { icon: '🏛️', title: 'Registry Garden', description: 'Plant your business name in any state or international registry.' },
    { icon: '🔔', title: 'Growth Alerts', description: 'Real-time notifications when your watched names become available.' },
    { icon: '🌱', title: 'Seed Ideas', description: 'Cultivate hundreds of brand name variations with AI-powered creativity.' },
  ]

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: '#0a1a0f',
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      <OrganicBackground />
      <Spores />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-emerald-950 text-xl">✿</span>
          </div>
          <span 
            className="text-2xl text-emerald-100 group-hover:text-emerald-300 transition-colors"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            BrandForge
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-emerald-500/60 hover:text-emerald-300 transition-colors">Features</a>
          <a href="#models" className="text-emerald-500/60 hover:text-emerald-300 transition-colors">AI Models</a>
          <a href="#pricing" className="text-emerald-500/60 hover:text-emerald-300 transition-colors">Pricing</a>
        </div>
        
        <button className="px-6 py-2.5 rounded-full bg-emerald-950/50 border border-emerald-700/30 text-emerald-300 hover:bg-emerald-900/50 transition-all text-sm">
          Sign In
        </button>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <GrowIn delay={0}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-950/50 border border-emerald-800/30 text-sm text-emerald-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Powered by 4 AI Models
            </div>
          </GrowIn>
          
          <GrowIn delay={100}>
            <h1 
              className="text-6xl md:text-8xl text-emerald-100 mb-8 leading-[1.1]"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
            >
              Nurture Your
              <span className="block bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                Brand Identity
              </span>
            </h1>
          </GrowIn>
          
          <GrowIn delay={200}>
            <p className="text-xl text-emerald-500/60 max-w-2xl mx-auto mb-12">
              Plant the seeds of innovation. Grow unique brand names using AI and 
              watch them flourish across domains, social media, and beyond.
            </p>
          </GrowIn>
          
          {/* Demo Input */}
          <GrowIn delay={300}>
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center gap-4 p-2 rounded-full bg-emerald-950/50 border border-emerald-800/30 backdrop-blur-sm">
                <input 
                  type="text" 
                  placeholder="Describe your brand vision..."
                  className="flex-1 bg-transparent px-6 py-4 text-emerald-100 placeholder-emerald-700 outline-none text-lg"
                />
                <button 
                  className="px-8 py-4 rounded-full font-semibold text-emerald-950 shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #86efac, #22c55e)',
                    boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
                  }}
                >
                  Cultivate ✿
                </button>
              </div>
            </div>
          </GrowIn>
        </div>
      </section>
      
      {/* AI Models Section */}
      <section id="models" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <GrowIn delay={300}>
            <h2 
              className="text-3xl text-emerald-100 text-center mb-12"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Four AI Seeds, One Garden
            </h2>
          </GrowIn>
          <ModelShowcase />
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <GrowIn delay={100}>
            <div className="text-center mb-16">
              <h2 
                className="text-4xl md:text-5xl text-emerald-100 mb-4"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
              >
                Grow with Confidence
              </h2>
              <p className="text-xl text-emerald-500/60">A complete ecosystem for brand discovery</p>
            </div>
          </GrowIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <GardenCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-8">
        <PricingGarden />
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-emerald-800 text-sm">© 2026 BrandForge. Nurturing brands since day one.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#" className="text-emerald-700 hover:text-emerald-400 text-sm transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
