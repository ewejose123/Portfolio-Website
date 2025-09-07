'use client'

import { useTranslations } from 'next-intl'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations()
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border animate-fade-in-up">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center gap-8 text-sm">
        <a
          href="#hero"
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          {t('nav.home')}
        </a>
        <a
          href="#projects"
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          {t('nav.projects')}
        </a>
        <a
          href="#articles"
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          {t('nav.articles')}
        </a>
        <a
          href="#about"
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          {t('nav.about')}
        </a>
        <a
          href="#contact"
          className="hover:text-accent transition-colors duration-200 font-medium ml-auto"
        >
          {t('nav.contact')}
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}


