'use client'

import { useTranslations } from 'next-intl'
import { useMemo, memo } from 'react'

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
  { name: 'Java', level: 3, category: 'backend' },
  { name: 'Python', level: 2, category: 'backend' },
  { name: 'PostgreSQL', level: 2, category: 'backend' },
  { name: 'SQL', level: 2, category: 'backend' },
  { name: 'Express', level: 3, category: 'backend' },
  { name: 'AWS (Lambda, EC2, S3, DynamoDB, Cognito)', level: 2, category: 'backend' },
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
  { name: 'Cursor', level: 4, category: 'tools' },
  { name: 'CI/CD', level: 2, category: 'tools' },
  { name: 'Figma', level: 3, category: 'tools' },
  { name: 'Unity', level: 4, category: 'tools' },
  { name: 'Docker', level: 2, category: 'tools' },
  { name: 'Vercel', level: 2, category: 'tools' },
  { name: 'Cloudflare', level: 2, category: 'tools' },
  { name: 'GitHub Actions', level: 2, category: 'tools' },
  { name: 'Jenkins', level: 1, category: 'tools' },
  { name: 'C++', level: 1, category: 'tools' },
  { name: 'Prisma', level: 1, category: 'tools' },
  { name: 'Terraform', level: 1, category: 'tools' },

  // Soft Skills (ordered by proficiency: 4→3→2→1)
  { name: 'Problem Solving', level: 4, category: 'soft' },
  { name: 'Fast Learning', level: 4, category: 'soft' },
  { name: 'Adaptability', level: 4, category: 'soft' },
  { name: 'Team Collaboration', level: 4, category: 'soft' },
  { name: 'Team Leadership', level: 2, category: 'soft' },
  { name: 'Teaching/Mentoring', level: 2, category: 'soft' },
]

// Pre-computed dot components by level to avoid recreating on every render
const SkillDots = memo(({ level }: { level: number }) => {
  const dots = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      let dotColor = 'bg-muted-foreground/20' // Default for unfilled dots

      if (i < level) {
        // Use simpler solid colors instead of gradients for better performance
        switch (level) {
          case 4: // Expert
            dotColor = 'bg-blue-600'
            break
          case 3: // Professional
            dotColor = 'bg-blue-500'
            break
          case 2: // Intermediate
            dotColor = 'bg-blue-400'
            break
          case 1: // Learning
            dotColor = 'bg-blue-300'
            break
        }
      }

      return (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${dotColor}`}
        />
      )
    })
  }, [level])

  return <div className="flex gap-1">{dots}</div>
})

SkillDots.displayName = 'SkillDots'

const SkillItem = memo(({ skill }: { skill: Skill }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors duration-200">
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
      <SkillDots level={skill.level} />
    </div>
  )
})

SkillItem.displayName = 'SkillItem'

export default function SkillsHighlight() {
  const t = useTranslations('hero.skills')

  // Memoize categories to avoid recalculating on every render
  const categories = useMemo(() => [
    { key: 'backend', icon: '🛠️', skills: skills.filter(s => s.category === 'backend') },
    { key: 'frontend', icon: '🎨', skills: skills.filter(s => s.category === 'frontend') },
    { key: 'tools', icon: '💻', skills: skills.filter(s => s.category === 'tools') },
    { key: 'soft', icon: '🏆', skills: skills.filter(s => s.category === 'soft') },
  ], [])

  return (
    <div className="w-full">
      <div className="mb-6">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 p-3 rounded-lg bg-card border border-border text-sm mb-4">
          <span className="font-medium text-muted-foreground">{t('proficiency.label')}</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <span className="text-muted-foreground">{t('proficiency.learning')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            </div>
            <span className="text-muted-foreground">{t('proficiency.intermediate')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <span className="text-muted-foreground">{t('proficiency.professional')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
            <span className="text-muted-foreground">{t('proficiency.expert')}</span>
          </div>
        </div>
      </div>

      {/* Skills Categories in Columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.key} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground text-center capitalize border-b border-border pb-2 flex items-center justify-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {t(category.key as 'backend' | 'frontend' | 'tools' | 'soft')}
            </h4>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
