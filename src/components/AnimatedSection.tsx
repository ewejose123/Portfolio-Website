'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode, useEffect, useState } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'
  delay?: number
  immediate?: boolean
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  immediate = false
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right'
  }

  // If immediate is true, always show as visible
  const shouldShow = immediate || (isVisible && isMounted)

  return (
    <div
      ref={ref}
      className={`${shouldShow
        ? `opacity-100 translate-y-0 ${animationClasses[animation]}`
        : 'opacity-0 translate-y-8'
        } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transition: shouldShow ? 'opacity 0.6s ease-out, transform 0.6s ease-out' : 'none'
      }}
    >
      {children}
    </div>
  )
}
