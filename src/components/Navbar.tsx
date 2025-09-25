'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show header
        setIsVisible(true)
      } else {
        // Scrolling down - hide header
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center gap-8 text-sm">
        <Link
          href={`/${locale}`}
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          {t('nav.home')}
        </Link>
        <Link
          href={`/${locale}#simple-websites`}
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          Simple Website
        </Link>
        <Link
          href={`/${locale}#simple-shopify`}
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          Shopify Shop
        </Link>
        <Link
          href={`/${locale}#custom-shopify`}
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          Custom Web
        </Link>
        <Link
          href={`/${locale}/referidos`}
          className="hover:text-accent transition-colors duration-200 font-medium"
        >
          {t('referrer.nav')}
        </Link>
        <Link
          href={`/${locale}#contact`}
          className="hover:text-accent transition-colors duration-200 font-medium ml-auto"
        >
          {t('nav.contact')}
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}


