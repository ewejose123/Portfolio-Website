'use client'

interface TechnologyIconProps {
  technology: string
  className?: string
}

const technologyIcons: Record<string, { icon: string; color: string }> = {
  // Game Development
  'Unity': { icon: '🎮', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  'C#': { icon: '💎', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  '.NET': { icon: '🔷', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  
  // Backend
  'Node.js': { icon: '🟢', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  'TypeScript': { icon: '🔵', color: 'bg-blue-600/10 text-blue-600 border-blue-600/20' },
  'PostgreSQL': { icon: '🐘', color: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
  'Redis': { icon: '🔴', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  'AWS': { icon: '☁️', color: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
  'Docker': { icon: '🐳', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  
  // Frontend
  'Next.js': { icon: '⚡', color: 'bg-black/10 text-black border-black/20 dark:bg-white/10 dark:text-white dark:border-white/20' },
  'React': { icon: '⚛️', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
  'Tailwind CSS': { icon: '🎨', color: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20' },
  'Vue.js': { icon: '💚', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  
  // Tools
  'Git': { icon: '📝', color: 'bg-orange-600/10 text-orange-600 border-orange-600/20' },
  'Vercel': { icon: '▲', color: 'bg-black/10 text-black border-black/20 dark:bg-white/10 dark:text-white dark:border-white/20' },
  'Figma': { icon: '🎨', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  'PostHog': { icon: '📊', color: 'bg-purple-600/10 text-purple-600 border-purple-600/20' },
  
  // Default
  'default': { icon: '⚙️', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' }
}

export default function TechnologyIcon({ technology, className = '' }: TechnologyIconProps) {
  const tech = technologyIcons[technology] || technologyIcons.default
  
  return (
    <span 
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border ${tech.color} ${className}`}
      title={technology}
    >
      <span className="text-base">{tech.icon}</span>
      <span className="font-medium">{technology}</span>
    </span>
  )
}
