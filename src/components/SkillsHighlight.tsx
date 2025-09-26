'use client'

import { useTranslations } from 'next-intl'

interface Skill {
  name: string
  level: number // 1-4: 1=Learning, 2=Good Understanding (1+ years), 3=Professional (3+ years), 4=Expert (5+ years)
  category: 'backend' | 'frontend' | 'tools' | 'soft'
}

const skills: Skill[] = [
  // Backend (ordered by proficiency: 4→3→2→1)
  { name: 'C#', level: 4, category: 'backend' },
  { name: 'Node.js', level: 3, category: 'backend' },
  { name: 'TypeScript/JavaScript', level: 3, category: 'backend' },
  { name: 'Python', level: 3, category: 'backend' },
  { name: 'Java', level: 3, category: 'backend' },
  { name: 'PostgreSQL', level: 3, category: 'backend' },
  { name: 'SQL', level: 3, category: 'backend' },
  { name: 'Express', level: 3, category: 'backend' },
  { name: 'AWS', level: 3, category: 'backend' },
  { name: 'MongoDB', level: 2, category: 'backend' },

  // Frontend (ordered by proficiency: 4→3→2→1)
  { name: 'React', level: 3, category: 'frontend' },
  { name: 'Next.js', level: 3, category: 'frontend' },
  { name: 'HTML/CSS', level: 3, category: 'frontend' },
  { name: 'Tailwind CSS', level: 3, category: 'frontend' },
  { name: 'PostHog', level: 2, category: 'frontend' },
  { name: 'Angular', level: 1, category: 'frontend' },
  { name: 'Vite', level: 1, category: 'frontend' },

  // Tools (ordered by proficiency: 4→3→2→1)
  { name: 'Git', level: 4, category: 'tools' },
  { name: 'Unity', level: 4, category: 'tools' },
  { name: 'CI/CD', level: 3, category: 'tools' },
  { name: 'Docker', level: 2, category: 'tools' },
  { name: 'Figma', level: 2, category: 'tools' },
  { name: 'Vercel', level: 2, category: 'tools' },
  { name: 'Jenkins', level: 1, category: 'tools' },
  { name: 'C++', level: 1, category: 'tools' },
  { name: 'Prisma', level: 1, category: 'tools' },

  // Soft Skills (ordered by proficiency: 4→3→2→1)
  { name: 'Problem Solving', level: 4, category: 'soft' },
  { name: 'Fast Learning', level: 4, category: 'soft' },
  { name: 'Adaptability', level: 4, category: 'soft' },
  { name: 'Team Collaboration', level: 4, category: 'soft' },
  { name: 'Team Leadership', level: 3, category: 'soft' },
  { name: 'Teaching/Mentoring', level: 3, category: 'soft' },
]

export default function SkillsHighlight() {
  const t = useTranslations('hero.skills')

  const categories = [
    { key: 'backend', icon: '🛠️', skills: skills.filter(s => s.category === 'backend') },
    { key: 'frontend', icon: '🎨', skills: skills.filter(s => s.category === 'frontend') },
    { key: 'tools', icon: '💻', skills: skills.filter(s => s.category === 'tools') },
    { key: 'soft', icon: '🏆', skills: skills.filter(s => s.category === 'soft') },
  ]

  const renderSkillDots = (level: number) => {
    return Array.from({ length: 4 }, (_, i) => {
      let dotColor = 'bg-muted-foreground/20' // Default for unfilled dots

      if (i < level) {
        // Dynamic color based on skill level
        switch (level) {
          case 4: // Expert - Brightest blue
            dotColor = 'bg-gradient-to-r from-blue-500 to-blue-800'
            break
          case 3: // Professional - Medium-bright blue
            dotColor = 'bg-gradient-to-r from-blue-400 to-blue-500'
            break
          case 2: // Intermediate - Medium blue
            dotColor = 'bg-gradient-to-r from-blue-300 to-blue-400'
            break
          case 1: // Learning - Darker blue
            dotColor = 'bg-gradient-to-r from-blue-200 to-blue-300'
            break
        }
      }

      return (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${dotColor}`}
        />
      )
    })
  }

  return (
    <div className="w-full animate-fade-in-right">
      <div className="mb-6">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 p-3 rounded-lg bg-card border border-border text-sm mb-4">
          <span className="font-medium text-muted-foreground">{t('proficiency.label')}</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-300"></div>
            <span className="text-muted-foreground">{t('proficiency.learning')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-300 to-blue-400"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-300 to-blue-400"></div>
            </div>
            <span className="text-muted-foreground">{t('proficiency.intermediate')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
            </div>
            <span className="text-muted-foreground">{t('proficiency.professional')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
            </div>
            <span className="text-muted-foreground">{t('proficiency.expert')}</span>
          </div>
        </div>
      </div>

      {/* Skills Categories in Columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div key={category.key} className="space-y-4" style={{ animationDelay: `${index * 0.1}s` }}>
            <h4 className="text-lg font-semibold text-foreground text-center capitalize border-b border-border pb-2 flex items-center justify-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {t(category.key as 'backend' | 'frontend' | 'tools' | 'soft')}
            </h4>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200"
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
    </div>
  )
}