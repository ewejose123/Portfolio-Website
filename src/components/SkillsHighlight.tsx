'use client'

import { useTranslations } from 'next-intl'
import { useMemo, memo } from 'react'

interface Skill {
  name: string
  level: number // 1-4: 1=Learning, 2=Good Understanding (1+ years), 3=Professional (3+ years), 4=Expert (5+ years)
  category: 'backend' | 'frontend' | 'devops' | 'bigdata'
}

const skills: Skill[] = [
  // Backend & System Architecture (ordered by proficiency: 4→3→2→1)
  { name: 'C#', level: 4, category: 'backend' },
  { name: 'Python', level: 3, category: 'backend' },
  { name: 'TypeScript/JavaScript', level: 3, category: 'backend' },
  { name: 'Node.js', level: 3, category: 'backend' },
  { name: 'RESTful APIs', level: 3, category: 'backend' },
  { name: 'Microservices', level: 2, category: 'backend' },
  { name: 'Express', level: 2, category: 'backend' },
  { name: 'Java', level: 2, category: 'backend' },
  { name: 'SQL', level: 2, category: 'backend' },
  { name: 'PostgreSQL', level: 2, category: 'backend' },
  { name: 'MongoDB', level: 2, category: 'backend' },
  { name: 'C++', level: 1, category: 'backend' },

  // Frontend, Observability & Tools (ordered by proficiency: 4→3→2→1)
  { name: 'React', level: 3, category: 'frontend' },
  { name: 'Next.js', level: 3, category: 'frontend' },
  { name: 'HTML/CSS', level: 3, category: 'frontend' },
  { name: 'Tailwind CSS', level: 3, category: 'frontend' },
  { name: 'ES6+', level: 2, category: 'frontend' },
  { name: 'Vite', level: 2, category: 'frontend' },
  { name: 'Jest', level: 2, category: 'frontend' },
  { name: 'TDD', level: 2, category: 'frontend' },
  { name: 'PostHog', level: 2, category: 'frontend' },
  { name: 'Grafana', level: 1, category: 'frontend' },
  { name: 'OpenTelemetry', level: 1, category: 'frontend' },
  { name: 'AWS X-Ray', level: 1, category: 'frontend' },
  { name: 'CloudWatch', level: 1, category: 'frontend' },
  { name: 'Angular', level: 1, category: 'frontend' },

  // Cloud Infrastructure & DevOps (IaC) (ordered by proficiency: 4→3→2→1)
  { name: 'Git', level: 4, category: 'devops' },
  { name: 'AWS (API Gateway, Lambda, GameLift, DynamoDB, S3, EC2, Cognito...)', level: 2, category: 'devops' },
  { name: 'CI/CD', level: 2, category: 'devops' },
  { name: 'Docker', level: 2, category: 'devops' },
  { name: 'GitHub Actions', level: 2, category: 'devops' },
  { name: 'Vercel', level: 2, category: 'devops' },
  { name: 'Cloudflare', level: 2, category: 'devops' },
  { name: 'Networking (TCP/IP, UDP, WebSocket...)', level: 2, category: 'devops' },
  { name: 'Linux Admin', level: 2, category: 'devops' },
  { name: 'Terraform', level: 1, category: 'devops' },
  { name: 'Terragrunt', level: 1, category: 'devops' },
  { name: 'Jenkins', level: 1, category: 'devops' },
  { name: 'Prisma', level: 1, category: 'devops' },

  // Big Data & Analytics Pipelines (ETL) (ordered by proficiency: 4→3→2→1)
  { name: 'Python', level: 3, category: 'bigdata' },
  { name: 'PySpark', level: 1, category: 'bigdata' },
  { name: 'AWS Glue', level: 1, category: 'bigdata' },
  { name: 'Amazon Athena', level: 1, category: 'bigdata' },
  { name: 'Parquet', level: 1, category: 'bigdata' },
  { name: 'Snappy', level: 1, category: 'bigdata' },
  { name: 'Redis', level: 1, category: 'bigdata' },
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
    { key: 'devops', icon: '☁️', skills: skills.filter(s => s.category === 'devops') },
    { key: 'bigdata', icon: '📊', skills: skills.filter(s => s.category === 'bigdata') },
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
              {t(category.key as 'backend' | 'frontend' | 'devops' | 'bigdata')}
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
