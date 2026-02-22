import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Design 2: LIQUID CHROME
 * 
 * Aesthetic: Brutalist metallic chrome with morphing gradients,
 * sharp geometry, heavy typography, and liquid metal effects.
 * Typography: Monument Extended + Space Mono
 */

// Morphing blob background
function MorphingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          </filter>
          <linearGradient id="chrome1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e5e5" />
            <stop offset="50%" stopColor="#a3a3a3" />
            <stop offset="100%" stopColor="#525252" />
          </linearGradient>
          <linearGradient id="chrome2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fafafa" />
            <stop offset="50%" stopColor="#d4d4d4" />
            <stop offset="100%" stopColor="#737373" />
          </linearGradient>
        </defs>
        <g filter="url(#goo)" opacity="0.15">
          <circle cx="300" cy="300" r="150" fill="url(#chrome1)">
            <animate attributeName="cx" values="300;500;300;100;300" dur="20s" repeatCount="indefinite" />
            <animate attributeName="cy" values="300;500;700;400;300" dur="25s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="500" r="180" fill="url(#chrome2)">
            <animate attributeName="cx" values="700;400;700;900;700" dur="22s" repeatCount="indefinite" />
            <animate attributeName="cy" values="500;300;600;400;500" dur="18s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="800" r="120" fill="url(#chrome1)">
            <animate attributeName="cx" values="500;700;500;300;500" dur="24s" repeatCount="indefinite" />
            <animate attributeName="cy" values="800;600;900;700;800" dur="20s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}

// Chrome text effect
function ChromeText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span 
      className={`relative ${className}`}
      style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #d4d4d4 25%, #737373 50%, #d4d4d4 75%, #fafafa 100%)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'chromeShift 8s ease infinite',
      }}
    >
      {children}
      <style>{`
        @keyframes chromeShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </span>
  )
}

// Brutalist card
function BrutalistCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <div 
      className="group relative border-2 border-neutral-300 p-8 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
      style={{ animation: `slideInUp 0.6s ease-out ${index * 100}ms backwards` }}
    >
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-mono group-hover:bg-white group-hover:text-black transition-colors">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 
        className="text-2xl font-black uppercase tracking-tight mb-4"
        style={{ fontFamily: "'Monument Extended', sans-serif" }}
      >
        {title}
      </h3>
      <p className="text-neutral-500 group-hover:text-neutral-300 font-mono text-sm leading-relaxed transition-colors">
        {description}
      </p>
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// Model strip
function ModelStrip() {
  const models = ['GEMINI 3 FLASH', 'CLAUDE OPUS 4.5', 'GPT-OSS', 'KIMI 2.5']
  
  return (
    <div className="relative overflow-hidden py-6 border-y-2 border-neutral-200">
      <div 
        className="flex gap-16 animate-scroll"
        style={{ 
          animation: 'scroll 20s linear infinite',
          width: 'max-content',
        }}
      >
        {[...models, ...models, ...models].map((model, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span 
              className="text-4xl font-black uppercase tracking-tighter text-neutral-900"
              style={{ fontFamily: "'Monument Extended', sans-serif" }}
            >
              {model}
            </span>
            <span className="text-4xl text-neutral-300">◆</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  )
}

// Pricing block
function PricingBlock() {
  return (
    <div 
      className="relative border-2 border-black p-12"
      style={{ animation: 'slideInUp 0.6s ease-out 400ms backwards' }}
    >
      <div className="absolute -top-6 left-8 bg-white px-4">
        <span 
          className="text-sm font-black uppercase tracking-widest"
          style={{ fontFamily: "'Monument Extended', sans-serif" }}
        >
          Pricing
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span 
              className="text-9xl font-black"
              style={{ fontFamily: "'Monument Extended', sans-serif" }}
            >
              $49
            </span>
            <span className="text-2xl font-mono text-neutral-400">/MO</span>
          </div>
          <p className="font-mono text-neutral-500 text-sm">
            UNLIMITED ACCESS TO ALL FOUR AI MODELS.<br />
            UNLIMITED BRAND GENERATIONS.<br />
            UNLIMITED AVAILABILITY CHECKS.<br />
            NO HIDDEN FEES. CANCEL ANYTIME.
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            className="w-full py-5 bg-black text-white font-black uppercase tracking-widest text-lg hover:bg-neutral-800 transition-colors relative overflow-hidden group"
            style={{ fontFamily: "'Monument Extended', sans-serif" }}
          >
            <span className="relative z-10">START NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
          
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            {['SSL SECURE', '14-DAY TRIAL', 'INSTANT ACCESS'].map(label => (
              <div key={label} className="border border-neutral-200 py-2 text-center text-neutral-400">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Design2() {
  const [, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    setMounted(true)
    // Load fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { title: 'Domain Verification', description: 'Instant checks across 500+ TLDs including all major extensions. Real-time pricing and registrar availability.' },
    { title: 'Social Handles', description: 'Cross-platform username verification. Twitter, Instagram, TikTok, LinkedIn, YouTube, and 25+ more.' },
    { title: 'Trademark Search', description: 'Deep trademark database search. USPTO, EUIPO, WIPO, and 180+ national databases.' },
    { title: 'Business Registry', description: 'State and international business name availability. All 50 US states plus UK, EU, and more.' },
    { title: 'Real-time Alerts', description: 'Automatic monitoring of saved brand names. Instant notifications when availability changes.' },
    { title: 'Export & Reports', description: 'Detailed PDF and CSV exports. Share with stakeholders or keep for records.' },
  ]

  return (
    <div 
      className="min-h-screen bg-neutral-50 text-black"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <MorphingBlobs />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/90 backdrop-blur-sm border-b-2 border-neutral-200">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="group">
            <span 
              className="text-2xl font-black tracking-tighter"
              style={{ fontFamily: "'Monument Extended', sans-serif" }}
            >
              BRAND
              <span className="text-neutral-400 group-hover:text-black transition-colors">FORGE</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
            <a href="#features" className="text-neutral-400 hover:text-black transition-colors">Features</a>
            <a href="#models" className="text-neutral-400 hover:text-black transition-colors">Models</a>
            <a href="#pricing" className="text-neutral-400 hover:text-black transition-colors">Pricing</a>
          </div>
          
          <button 
            className="px-6 py-2 border-2 border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all"
          >
            Login
          </button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className="grid md:grid-cols-12 gap-8 items-end"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="md:col-span-8">
              <p 
                className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6"
                style={{ animation: 'slideInUp 0.6s ease-out backwards' }}
              >
                AI-Powered Brand Discovery Platform
              </p>
              <h1 
                className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter mb-8"
                style={{ 
                  fontFamily: "'Monument Extended', sans-serif",
                  animation: 'slideInUp 0.6s ease-out 100ms backwards',
                }}
              >
                <ChromeText>FORGE</ChromeText>
                <br />
                <span className="text-neutral-300">YOUR</span>
                <br />
                <ChromeText>BRAND</ChromeText>
              </h1>
            </div>
            
            <div 
              className="md:col-span-4 pb-4"
              style={{ animation: 'slideInUp 0.6s ease-out 200ms backwards' }}
            >
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Generate creative brand names using four leading AI models. 
                Instantly verify availability across domains, social media, 
                trademarks, and business registries.
              </p>
              <div className="flex gap-4">
                <button 
                  className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Try Free →
                </button>
              </div>
            </div>
          </div>
          
          {/* Demo Input */}
          <div 
            className="mt-16 border-2 border-black p-4 flex gap-4"
            style={{ animation: 'slideInUp 0.6s ease-out 300ms backwards' }}
          >
            <input 
              type="text"
              placeholder="DESCRIBE YOUR BRAND VISION..."
              className="flex-1 bg-transparent px-4 py-4 text-lg uppercase tracking-wider placeholder-neutral-300 outline-none"
              style={{ fontFamily: "'Monument Extended', sans-serif" }}
            />
            <button className="px-12 bg-black text-white font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shrink-0">
              Generate
            </button>
          </div>
        </div>
      </section>
      
      {/* Model Strip */}
      <section id="models" className="py-8">
        <ModelStrip />
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <BrutalistCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <PricingBlock />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t-2 border-neutral-200 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm uppercase tracking-wider">
            © 2026 BrandForge. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm uppercase tracking-wider">
            {['Privacy', 'Terms', 'Support'].map(link => (
              <a key={link} href="#" className="text-neutral-400 hover:text-black transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
      
      {/* Custom font face */}
      <style>{`
        @font-face {
          font-family: 'Monument Extended';
          src: url('https://fonts.cdnfonts.com/s/29660/MonumentExtended-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Monument Extended';
          src: url('https://fonts.cdnfonts.com/s/29660/MonumentExtended-Ultrabold.woff') format('woff');
          font-weight: 900;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}
