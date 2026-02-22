import { Link } from 'react-router-dom'

export default function App() {
  const designs = [
    { path: '/1', name: 'Cosmic Nebula', description: 'Dark space theme with floating particles and aurora effects' },
    { path: '/2', name: 'Liquid Chrome', description: 'Brutalist metallic aesthetic with morphing gradients' },
    { path: '/3', name: 'Digital Garden', description: 'Organic growth patterns with bioluminescent accents' },
    { path: '/4', name: 'Retro Terminal', description: 'Nostalgic CRT meets modern AI with scanlines and phosphor glow' },
    { path: '/5', name: 'Prismatic Glass', description: 'Glassmorphism with rainbow refractions and depth layers' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          BrandForge AI
        </h1>
        <p className="text-xl text-slate-300 mb-12">
          Explore 5 unique design concepts for your AI-powered brand discovery platform
        </p>
        <h2 className="text-4xl font-semibold mb-4">One-shot prompt:</h2>
        <pre className="whitespace-pre-wrap break-words bg-slate-950/50 p-6 rounded-xl border border-white/5 text-slate-400 font-mono text-sm leading-relaxed mb-12"><code>I am building a high-end, AI-powered brand discovery and monitoring platform. It bridges the gap between creative brainstorming and technical execution by allowing users to generate brand names using different models and instantly verify their availability across domains, social media, business registries, and trademark databases. The models would be:

- Gemini 3 Flash
- Claude Opus 4.5
- GPT-OSS
- Kimi 2.5

The platform will enable users to generate and monitor brand names using all of those models for a single, flat fee every month.

Your task is to build an incredible marketing homepage for this app. I want it to be creative and unique. Really push the limits of your design capabilities.

You have an empty directory here. I want you to initialize a project with the following specs:

- Vite
- Tailwind
- React
- Typescript
- Bun

Once initialized, I want you to create FIVE different designs.

Each design should be creative and unique from all the others that you create. They should be hosted on /1, /2, /3, /4 and /5 respectively.

Use your frontend design skill to make these designs exceptional.

Use the following port for the dev server: 4000</code></pre>
        <h2 className="text-4xl font-semibold mb-4">Generated designs:</h2>
        <div className="grid gap-6">
          {designs.map((design, i) => (
            <Link
              key={design.path}
              to={design.path}
              className="group block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-white/20 group-hover:text-cyan-400 transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="text-2xl font-semibold group-hover:text-cyan-300 transition-colors">
                    {design.name}
                  </h2>
                  <p className="text-slate-400">{design.description}</p>
                </div>
                <svg className="ml-auto w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
