'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 text-xs rounded-md transition-all duration-200 font-medium ${
          locale === 'en' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground hover:bg-card'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('es')}
        className={`px-3 py-1 text-xs rounded-md transition-all duration-200 font-medium ${
          locale === 'es' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground hover:bg-card'
        }`}
      >
        ES
      </button>
    </div>
  )
}
