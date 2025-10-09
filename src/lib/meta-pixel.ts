'use client'

// Meta Pixel initialization using Facebook's official method
export function initMetaPixel(pixelId: string, testEventCode?: string) {
  if (typeof window === 'undefined') return

  // Check if already initialized
  if ((window as unknown as { fbq?: unknown }).fbq) {
    return
  }

  // Create fbq function immediately (Facebook's recommended approach)
  const fbq = (...args: unknown[]) => {
    ;(window as unknown as { _fbq?: unknown[] })._fbq = (window as unknown as { _fbq?: unknown[] })._fbq || []
    ;(window as unknown as { _fbq: unknown[] })._fbq.push(args)
  }

  // Assign fbq to window
  ;(window as unknown as { fbq: typeof fbq }).fbq = fbq

  // Initialize pixel immediately
  fbq('init', pixelId, {}, {
    testEventCode: testEventCode
  })
  
  // Track page view (LOWEST priority)
  fbq('track', 'PageView')

  // Load Facebook script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://connect.facebook.net/en_US/fbevents.js`
  
  document.head?.appendChild(script)
}

// Track contact events (HIGHEST priority)
export function trackContactEvent(contactType: 'phone' | 'whatsapp' | 'email' | 'form', userData?: {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}) {
  if (typeof window === 'undefined' || !(window as unknown as { fbq?: unknown }).fbq) {
    return
  }
  
  // Track Contact event (HIGHEST priority)
  const fbq = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq
  fbq('track', 'Contact', {
    event_source_url: window.location.href,
    action_source: 'website',
    user_data: userData || {},
    custom_data: {
      content_name: `Contact via ${contactType}`,
      content_type: 'contact_method'
    }
  })
}

// Track contact section clicks (MEDIUM priority)
export function trackContactSectionClick() {
  if (typeof window === 'undefined' || !(window as unknown as { fbq?: unknown }).fbq) {
    return
  }
  
  // Track ViewContent event (MEDIUM priority)
  const fbq = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq
  fbq('track', 'ViewContent', {
    event_source_url: window.location.href,
    action_source: 'website',
    custom_data: {
      content_name: 'Contact Section Click',
      content_type: 'navigation'
    }
  })
}

// Declare global fbq function
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: Record<string, unknown>, options?: Record<string, unknown>) => void
  }
}