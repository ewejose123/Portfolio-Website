'use client'

import { trackContactEvent, trackContactSectionClick } from '@/lib/meta-pixel'

// Meta tracking hook focused on contact events
export function useMetaTracking() {
  
  // Track contact events (HIGHEST priority)
  const trackContact = (
    contactType: 'phone' | 'whatsapp' | 'email' | 'form',
    userData?: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
    }
  ) => {
    trackContactEvent(contactType, userData)
  }

  // Track contact section clicks (MEDIUM priority)
  const trackContactSection = () => {
    trackContactSectionClick()
  }

  return {
    trackContact,
    trackContactSection
  }
}
