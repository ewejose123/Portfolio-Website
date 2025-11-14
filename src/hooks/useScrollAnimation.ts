'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting && !isVisible) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Add a small delay to ensure element is fully rendered
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, 50)
    }
  }, [isVisible])

  useEffect(() => {
    // Only create observer if ref is available and not already visible
    if (ref.current && !isVisible) {
      observerRef.current = new IntersectionObserver(
        handleIntersection,
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      observerRef.current.observe(ref.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [handleIntersection, isVisible])

  return { ref, isVisible }
}
