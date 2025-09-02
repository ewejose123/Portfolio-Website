'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'
  delay?: number
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0 
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeInLeft: 'animate-fade-in-left', 
    fadeInRight: 'animate-fade-in-right'
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? `opacity-100 translate-y-0 ${animationClasses[animation]}` 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
