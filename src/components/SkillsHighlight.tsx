'use client'

import { useTranslations } from 'next-intl'

interface Skill {
  name: string
  level: number // 1-5
  category: 'backend' | 'frontend' | 'tools' | 'soft'
}

const skills: Skill[] = [
  // Backend
  { name: 'Node.js', level: 5, category: 'backend' },
  { name: 'TypeScript', level: 5, category: 'backend' },
  { name: 'PostgreSQL', level: 4, category: 'backend' },
  { name: 'Redis', level: 4, category: 'backend' },
  { name: 'AWS', level: 3, category: 'backend' },
  
  // Frontend
  { name: 'React', level: 5, category: 'frontend' },
  { name: 'Next.js', level: 5, category: 'frontend' },
  { name: 'Tailwind CSS', level: 4, category: 'frontend' },
  { name: 'Vue.js', level: 3, category: 'frontend' },
  
  // Tools
  { name: 'Git', level: 5, category: 'tools' },
  { name: 'Docker', level: 4, category: 'tools' },
  { name: 'Vercel', level: 4, category: 'tools' },
  { name: 'Figma', level: 3, category: 'tools' },
  
  // Soft Skills
  { name: 'Problem Solving', level: 5, category: 'soft' },
  { name: 'Team Leadership', level: 4, category: 'soft' },
  { name: 'Communication', level: 4, category: 'soft' },
  { name: 'Mentoring', level: 4, category: 'soft' },
]

export default function SkillsHighlight() {
  const t = useTranslations('hero.skills')
  
  const categories = [
    { key: 'backend', skills: skills.filter(s => s.category === 'backend') },
    { key: 'frontend', skills: skills.filter(s => s.category === 'frontend') },
    { key: 'tools', skills: skills.filter(s => s.category === 'tools') },
    { key: 'soft', skills: skills.filter(s => s.category === 'soft') },
  ]

  const renderSkillDots = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i < level 
            ? 'bg-accent' 
            : 'bg-muted'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6 animate-fade-in-right">
      <h3 className="text-xl font-semibold text-foreground">{t('title')}</h3>
      
      {categories.map((category, index) => (
        <div key={category.key} className="space-y-3" style={{ animationDelay: `${index * 0.1}s` }}>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {t(category.key as any)}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {category.skills.map((skill, skillIndex) => (
              <div 
                key={skill.name} 
                className="flex items-center justify-between p-2 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200"
                style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
              >
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <div className="flex gap-1">
                  {renderSkillDots(skill.level)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
