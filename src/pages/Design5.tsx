import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Design 5: PRISMATIC GLASS
 * 
 * Aesthetic: Premium glassmorphism with rainbow refractions,
 * layered depth, soft shadows, and iridescent color shifts.
 * Typography: Plus Jakarta Sans + DM Serif Display
 */

// Rainbow refraction background
function PrismaticBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #faf5ff 0%, #f0fdfa 50%, #ecfeff 100%)',
        }}
      />
      
      {/* Floating prismatic orbs */}
      <div 
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full opacity-60"
        style={{
          background: 'conic-gradient(from 0deg, #f0abfc, #c4b5fd, #a5f3fc, #86efac, #fde68a, #fca5a5, #f0abfc)',
          filter: 'blur(100px)',
          animation: 'float1 25s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full opacity-50"
        style={{
          background: 'conic-gradient(from 120deg, #a5f3fc, #86efac, #fde68a, #fca5a5, #f0abfc, #c4b5fd, #a5f3fc)',
          filter: 'blur(80px)',
          animation: 'float2 30s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-40"
        style={{
          background: 'conic-gradient(from 240deg, #fde68a, #fca5a5, #f0abfc, #c4b5fd, #a5f3fc, #86efac, #fde68a)',
          filter: 'blur(90px)',
          animation: 'float3 20s ease-in-out infinite',
        }}
      />
      
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(50px, 30px) rotate(10deg); }
          66% { transform: translate(-30px, 50px) rotate(-5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, -30px) rotate(-15deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(60px, -20px); }
          66% { transform: translate(-40px, 30px); }
        }
      `}</style>
    </div>
  )
}

// Glass card component
function GlassCard({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div 
      className={`relative overflow-hidden rounded-3xl ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''} transition-all duration-500 ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.5)',
      }}
    >
      {/* Rainbow edge highlight */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(240,171,252,0.3) 45%, rgba(165,243,252,0.3) 55%, transparent 60%)',
        }}
      />
      {children}
    </div>
  )
}

// Iridescent button
function IridescentButton({ children, className = '', size = 'default' }: { children: React.ReactNode; className?: string; size?: 'default' | 'large' }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
  }
  
  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        size === 'large' ? 'px-10 py-5 text-lg rounded-2xl' : 'px-8 py-4 rounded-xl'
      } ${className}`}
      style={{
        background: `
          radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(240,171,252,0.8), transparent 50%),
          linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ec4899)
        `,
        backgroundSize: '200% 200%',
        animation: 'shimmer 5s ease infinite',
        color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }}
    >
      <span className="relative z-10">{children}</span>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </button>
  )
}

// Feature card with glass effect
function FeatureGlassCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  return (
    <GlassCard className="p-8 group">
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))',
          backdropFilter: 'blur(10px)',
        }}
      >
        {icon}
      </div>
      <h3 
        className="text-2xl text-slate-800 mb-3"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {title}
      </h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
      
      {/* Decorative number */}
      <div 
        className="absolute top-4 right-6 text-6xl font-bold opacity-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </GlassCard>
  )
}

// AI Model pill with rainbow effect
function ModelPill({ name, color }: { name: string; color: string }) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      }}
    >
      <div 
        className="w-3 h-3 rounded-full"
        style={{ 
          background: color,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
      <span className="font-medium text-slate-700">{name}</span>
    </div>
  )
}

// Pricing card
function PricingGlassCard() {
  return (
    <GlassCard className="max-w-md mx-auto p-10" hover={false}>
      {/* Premium badge */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div 
          className="px-6 py-2 rounded-full text-sm font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            boxShadow: '0 4px 15px rgba(139,92,246,0.4)',
          }}
        >
          All Inclusive
        </div>
      </div>
      
      <div className="text-center pt-4">
        <p className="text-slate-500 mb-4">Unlimited access to</p>
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span 
            className="text-7xl font-bold text-slate-800"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            $49
          </span>
          <span className="text-slate-400 text-lg">/month</span>
        </div>
        <p className="text-slate-500 mb-8">All 4 AI models included</p>
        
        <IridescentButton size="large" className="w-full mb-8">
          Start Your Journey
        </IridescentButton>
        
        {/* Features list */}
        <div className="space-y-4 text-left">
          {[
            '500+ domain TLDs checked',
            '30+ social platforms',
            'Global trademark search',
            'Business registry access',
            'Real-time availability alerts',
            'Unlimited AI generations',
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

// Floating brand name examples
function FloatingBrands() {
  const brands = ['Lumina', 'Nexora', 'Vividly', 'Zenith', 'Prisma', 'Aether']
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {brands.map((brand, i) => (
        <div
          key={brand}
          className="absolute text-2xl font-light text-slate-300/40"
          style={{
            fontFamily: "'DM Serif Display', serif",
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
            animation: `floatBrand 20s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        >
          {brand}
        </div>
      ))}
      <style>{`
        @keyframes floatBrand {
          0%, 100% { transform: translateY(0) rotate(-2deg); opacity: 0.2; }
          50% { transform: translateY(-30px) rotate(2deg); opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

export default function Design5() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  const models = [
    { name: 'Gemini 3 Flash', color: '#3b82f6' },
    { name: 'Claude Opus 4.5', color: '#f97316' },
    { name: 'GPT-OSS', color: '#10b981' },
    { name: 'Kimi 2.5', color: '#a855f7' },
  ]

  const features = [
    { icon: '🌐', title: 'Domain Discovery', description: 'Explore availability across 500+ TLDs with real-time pricing and instant registration.' },
    { icon: '📱', title: 'Social Presence', description: 'Verify username availability across Twitter, Instagram, TikTok, and 30+ platforms.' },
    { icon: '⚖️', title: 'Legal Protection', description: 'Deep trademark searches through USPTO, EUIPO, and 180+ national databases.' },
    { icon: '🏛️', title: 'Business Registry', description: 'Check business name availability in all 50 US states and international markets.' },
    { icon: '🔔', title: 'Smart Alerts', description: 'AI-powered monitoring notifies you when saved brand names become available.' },
    { icon: '✨', title: 'AI Creativity', description: 'Generate hundreds of unique brand names using four leading AI models.' },
  ]

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <PrismaticBackground />
      <FloatingBrands />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link to="/" className="group flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              boxShadow: '0 4px 15px rgba(139,92,246,0.4)',
            }}
          >
            B
          </div>
          <span 
            className="text-2xl text-slate-800 group-hover:text-violet-600 transition-colors"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            BrandForge
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-500 hover:text-slate-800 transition-colors">Features</a>
          <a href="#models" className="text-slate-500 hover:text-slate-800 transition-colors">AI Models</a>
          <a href="#pricing" className="text-slate-500 hover:text-slate-800 transition-colors">Pricing</a>
        </div>
        
        <GlassCard className="px-6 py-2.5 cursor-pointer">
          <span className="text-slate-600 font-medium">Sign In</span>
        </GlassCard>
      </nav>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/50 text-sm text-slate-600 mb-8"
            style={{ animation: 'fadeIn 0.8s ease-out backwards' }}
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
            Powered by 4 Leading AI Models
          </div>
          
          <h1 
            className="text-6xl md:text-8xl text-slate-800 mb-8 leading-[1.1]"
            style={{ 
              fontFamily: "'DM Serif Display', serif",
              animation: 'fadeIn 0.8s ease-out 100ms backwards',
            }}
          >
            Craft Your
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981, #f59e0b)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Perfect Brand
            </span>
          </h1>
          
          <p 
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-12"
            style={{ animation: 'fadeIn 0.8s ease-out 200ms backwards' }}
          >
            Generate unique brand names using AI intelligence and instantly verify 
            availability across domains, social media, trademarks, and more.
          </p>
          
          {/* Demo Input */}
          <div 
            className="relative max-w-2xl mx-auto mb-16"
            style={{ animation: 'fadeIn 0.8s ease-out 300ms backwards' }}
          >
            <GlassCard className="p-2 flex items-center gap-4" hover={false}>
              <input 
                type="text" 
                placeholder="Describe your perfect brand..."
                className="flex-1 bg-transparent px-6 py-4 text-slate-700 placeholder-slate-400 outline-none text-lg"
              />
              <IridescentButton>
                Generate ✨
              </IridescentButton>
            </GlassCard>
          </div>
          
          {/* Model Pills */}
          <div 
            id="models" 
            className="flex flex-wrap justify-center gap-4"
            style={{ animation: 'fadeIn 0.8s ease-out 400ms backwards' }}
          >
            {models.map(model => (
              <ModelPill key={model.name} {...model} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl text-slate-800 mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Everything You Need
            </h2>
            <p className="text-xl text-slate-500">A complete suite for brand discovery and validation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureGlassCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl text-slate-800 mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Simple Pricing
          </h2>
          <p className="text-slate-500">One plan. Everything included.</p>
        </div>
        <PricingGlassCard />
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-8">
        <GlassCard className="max-w-7xl mx-auto py-8 px-12" hover={false}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">© 2026 BrandForge. Crafting brands with AI.</p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Contact'].map(link => (
                <a key={link} href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </GlassCard>
      </footer>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
