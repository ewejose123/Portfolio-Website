// Global interface for window with custom properties
'use client'

// Global interface for window with custom properties
declare global {
  interface Window {
    pageLoadTime?: number
  }
}

import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

export function usePortfolioTracking() {
  const posthog = usePostHog()

  useEffect(() => {
    if (!posthog) return

    // Track project card interactions
    const trackProjectInteractions = () => {
      const projectCards = document.querySelectorAll('[data-project-card]')
      projectCards.forEach((card, index) => {
        const projectName = card.getAttribute('data-project-name') || `project-${index}`
        
        // Track hover events
        card.addEventListener('mouseenter', () => {
          posthog.capture('project_card_hover', {
            project_name: projectName,
            card_position: index,
          })
        })
        
        // Track click events
        card.addEventListener('click', () => {
          posthog.capture('project_card_click', {
            project_name: projectName,
            card_position: index,
            click_target: 'card'
          })
        })
      })
    }

    // Track skill section interactions
    const trackSkillInteractions = () => {
      const skillItems = document.querySelectorAll('[data-skill]')
      skillItems.forEach((skill) => {
        const skillName = skill.getAttribute('data-skill') || 'unknown'
        const skillCategory = skill.getAttribute('data-skill-category') || 'general'
        
        skill.addEventListener('mouseenter', () => {
          posthog.capture('skill_hover', {
            skill_name: skillName,
            skill_category: skillCategory,
          })
        })
      })
    }

    // Track navigation and section visibility
    const trackSectionVisibility = () => {
      const sections = [
        { id: 'hero', name: 'Hero Section' },
        { id: 'projects', name: 'Projects Section' },
        { id: 'skills', name: 'Skills Section' },
        { id: 'about', name: 'About Section' },
        { id: 'contact', name: 'Contact Section' }
      ]

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = sections.find(s => entry.target.id.includes(s.id))?.name || entry.target.id
            posthog.capture('section_viewed', {
              section_name: sectionName,
              section_id: entry.target.id,
              visibility_ratio: entry.intersectionRatio
            })
          }
        })
      }, { threshold: 0.5 }) // Trigger when 50% visible

      sections.forEach(section => {
        const element = document.querySelector(`[id*=\"${section.id}\"]`)
        if (element) observer.observe(element)
      })

      return () => observer.disconnect()
    }

    // Track external link clicks
    const trackExternalLinks = () => {
      const externalLinks = document.querySelectorAll('a[href^=\"http\"]')
      externalLinks.forEach((link) => {
        link.addEventListener('click', () => {
          const href = link.getAttribute('href')
          const linkText = link.textContent?.trim() || 'No text'
          
          posthog.capture('external_link_click', {
            destination_url: href,
            link_text: linkText,
            link_type: (() => {
              if (href?.includes('github.com')) return 'github'
              if (href?.includes('linkedin.com')) return 'linkedin'
              if (href?.includes('mailto:')) return 'email'
              return 'other'
            })()
          })
        })
      })
    }

    // Track copy-to-clipboard events (for contact info)
    const trackCopyEvents = () => {
      document.addEventListener('copy', () => {
        const selection = window.getSelection()?.toString()
        if (selection && selection.length > 0) {
          posthog.capture('text_copied', {
            copied_text_length: selection.length,
            copied_text_preview: selection.substring(0, 50), // First 50 chars for context
            page_path: window.location.pathname
          })
        }
      })
    }

    // Track keyboard shortcuts usage
    const trackKeyboardShortcuts = () => {
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
          const shortcuts = {
            'ctrl+k': 'search',
            'ctrl+/': 'help',
            'ctrl+shift+d': 'dark_mode_toggle'
          }
          
          const key = `${e.ctrlKey || e.metaKey ? 'ctrl+' : ''}${e.shiftKey ? 'shift+' : ''}${e.key.toLowerCase()}`
          if (shortcuts[key as keyof typeof shortcuts]) {
            posthog.capture('keyboard_shortcut_used', {
              shortcut: key,
              action: shortcuts[key as keyof typeof shortcuts]
            })
          }
        }
      })
    }

    // Track page exit intent
    const trackExitIntent = () => {
      let hasShownExitIntent = false
      
      document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !hasShownExitIntent) {
          hasShownExitIntent = true
          posthog.capture('exit_intent_detected', {
            time_on_page: Date.now() - (window.pageLoadTime || Date.now()),
            page_path: window.location.pathname
          })
        }
      })
    }

    // Initialize all tracking
    const initTracking = () => {
      // Wait for DOM to be fully loaded
      setTimeout(() => {
        trackProjectInteractions()
        trackSkillInteractions()
        trackSectionVisibility()
        trackExternalLinks()
        trackCopyEvents()
        trackKeyboardShortcuts()
        trackExitIntent()
        
        // Set page load time for exit intent calculation
        window.pageLoadTime = Date.now()
      }, 1000)
    }

    initTracking()
  }, [posthog])

  return {
    trackCustomEvent: (eventName: string, properties?: Record<string, unknown>) => {
      if (posthog) {
        posthog.capture(eventName, properties)
      }
    }
  }
}

// Hook for components that want to track custom events
export function useCustomTracking() {
  const posthog = usePostHog()
  
  return {
    trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
      if (posthog) {
        posthog.capture(eventName, {
          ...properties,
          timestamp: new Date().toISOString(),
          page_path: window.location.pathname
        })
      }
    },
    
    identifyUser: (userId: string, properties?: Record<string, unknown>) => {
      if (posthog) {
        posthog.identify(userId, properties)
      }
    },
    
    setUserProperties: (properties: Record<string, unknown>) => {
      if (posthog) {
        posthog.people.set(properties)
      }
    }
  }
}