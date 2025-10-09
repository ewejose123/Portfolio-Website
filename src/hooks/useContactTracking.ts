'use client'

import { usePostHog } from 'posthog-js/react'

export function useContactTracking() {
  const posthog = usePostHog()

  const trackContactClick = (contactType: 'phone' | 'whatsapp' | 'email' | 'contact_section', properties?: Record<string, unknown>) => {
    const baseProperties = {
      contact_type: contactType,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      ...properties
    }

    // Track with PostHog (keep existing functionality)
    if (posthog) {
      switch (contactType) {
        case 'phone':
          posthog.capture('contact_phone_click', {
            ...baseProperties,
            action: 'phone_call_initiated',
            device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
          })
          break

        case 'whatsapp':
          posthog.capture('contact_whatsapp_click', {
            ...baseProperties,
            action: 'whatsapp_chat_initiated',
            device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
          })
          break

        case 'email':
          posthog.capture('contact_email_click', {
            ...baseProperties,
            action: 'email_compose_initiated',
            email_address: 'ewejose@gmail.com'
          })
          break

        case 'contact_section':
          posthog.capture('contact_section_click', {
            ...baseProperties,
            action: 'scroll_to_contact',
            section_target: 'contact'
          })
          break

        default:
          posthog.capture('contact_interaction', baseProperties)
      }
    }
  }

  const trackServiceInterest = (serviceType: 'basic_website' | 'shopping_website' | 'custom_website', action: 'cta_click' | 'section_view') => {
    // Track with PostHog only
    if (posthog) {
      posthog.capture('service_interest', {
        service_type: serviceType,
        action: action,
        timestamp: new Date().toISOString(),
        page_path: window.location.pathname,
        user_engagement_level: action === 'cta_click' ? 'high' : 'medium'
      })
    }
  }

  const trackReferralInterest = (action: 'page_view' | 'cta_click' | 'section_view') => {
    if (!posthog) return

    posthog.capture('referral_program_interest', {
      action: action,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      program_type: 'website_referral'
    })
  }

  const trackTestimonialView = (testimonialIndex: number, testimonialName: string) => {
    if (!posthog) return

    posthog.capture('testimonial_viewed', {
      testimonial_index: testimonialIndex,
      testimonial_name: testimonialName,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      social_proof_engagement: true
    })
  }

  const trackFAQInteraction = (questionIndex: number, question: string, action: 'expand' | 'collapse') => {
    if (!posthog) return

    posthog.capture('faq_interaction', {
      question_index: questionIndex,
      question_text: question.substring(0, 100), // First 100 chars for context
      action: action,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      user_help_seeking: true
    })
  }

  const trackPricingInterest = (priceRange: string, serviceType: string) => {
    // Track with PostHog only
    if (posthog) {
      posthog.capture('pricing_interest', {
        price_range: priceRange,
        service_type: serviceType,
        timestamp: new Date().toISOString(),
        page_path: window.location.pathname,
        conversion_intent: 'high'
      })
    }
  }

  return {
    trackContactClick,
    trackServiceInterest,
    trackReferralInterest,
    trackTestimonialView,
    trackFAQInteraction,
    trackPricingInterest
  }
}
