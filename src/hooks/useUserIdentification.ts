'use client'

import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'

// Extended type definitions for enhanced APIs
interface ExtendedNavigator extends Navigator {
  userAgentData?: {
    mobile: boolean
    brands: { brand: string; version: string }[]
  }
  deviceMemory?: number
  connection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
    type?: string
    saveData?: boolean
  }
  mozConnection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
  }
  webkitConnection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
  }
  getBattery?: () => Promise<{
    charging: boolean
    level: number
  }>
}

interface ExtendedWindow extends Window {
  chrome?: unknown
  opr?: unknown
  InstallTrigger?: unknown
}

interface ExtendedPerformance extends Performance {
  memory?: {
    jsHeapSizeLimit: number
    totalJSHeapSize: number
    usedJSHeapSize: number
  }
}

// Enhanced user ID generation using direct APIs
export async function generatePortfolioUserId(): Promise<string> {
  const components = []
  
  // 1. Country code (2 chars) - Direct geolocation first, fallback to timezone
  const countryCode = await getCountryCode()
  components.push(countryCode)
  
  // 2. Referrer source (3 chars)
  const referrerCode = getReferrerCode(document.referrer)
  components.push(referrerCode)
  
  // 3. Device type (1 char) - Enhanced detection
  const deviceType = getDeviceType()
  components.push(deviceType)
  
  // 4. Hour of entry (2 chars)
  const hour = new Date().getHours().toString().padStart(2, '0')
  components.push(hour)
  
  // 5. Day of week (1 char)
  const dayOfWeek = new Date().getDay().toString()
  components.push(dayOfWeek)
  
  // 6. Browser type (2 chars) - Direct detection
  const browserCode = getBrowserCode()
  components.push(browserCode)
  
  // 7. Connection quality (1 char) - Direct from Network Information API
  const connectionCode = getConnectionCode()
  components.push(connectionCode)
  
  // 8. Random suffix (4 chars) for uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
  components.push(randomSuffix)
  
  return components.join('')
}

// Direct country detection using multiple methods
async function getCountryCode(): Promise<string> {
  // Method 1: Try IP-based geolocation API (most direct)
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      signal: AbortSignal.timeout(3000), // 3 second timeout
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.country_code) {
        console.log('Country detected via IP geolocation:', data.country_code)
        return data.country_code.toUpperCase()
      }
    }
  } catch {
    console.log('IP geolocation failed, trying fallback')
  }
  
  // Method 2: Try CloudFlare trace (faster alternative)
  try {
    const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
      signal: AbortSignal.timeout(2000),
    })
    
    if (response.ok) {
      const text = await response.text()
      const locMatch = text.match(/loc=([A-Z]{2})/)
      if (locMatch && locMatch[1]) {
        console.log('Country detected via CloudFlare:', locMatch[1])
        return locMatch[1]
      }
    }
  } catch {
    console.log('CloudFlare geolocation failed')
  }
  
  // Method 3: Use browser language as indicator
  const browserLang = navigator.language || navigator.languages?.[0]
  if (browserLang) {
    const langCountryMap: Record<string, string> = {
      'en-US': 'US', 'en-GB': 'GB', 'en-CA': 'CA', 'en-AU': 'AU',
      'es-ES': 'ES', 'es-MX': 'MX', 'es-AR': 'AR',
      'fr-FR': 'FR', 'fr-CA': 'CA',
      'de-DE': 'DE', 'de-AT': 'AT', 'de-CH': 'CH',
      'it-IT': 'IT', 'pt-BR': 'BR', 'pt-PT': 'PT',
      'ja-JP': 'JP', 'zh-CN': 'CN', 'zh-TW': 'TW',
      'ko-KR': 'KR', 'ru-RU': 'RU', 'ar-SA': 'SA'
    }
    
    const countryFromLang = langCountryMap[browserLang]
    if (countryFromLang) {
      console.log('Country detected via browser language:', countryFromLang)
      return countryFromLang
    }
  }
  
  // Method 4: Fallback to timezone-based detection
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const countryFromTimezone = getCountryFromTimezone(timezone)
  console.log('Country detected via timezone fallback:', countryFromTimezone)
  return countryFromTimezone
}

// Helper functions for ID generation
function getCountryFromTimezone(timezone: string): string {
  const timezoneToCountry: Record<string, string> = {
    // North America
    'America/New_York': 'US',
    'America/Chicago': 'US',
    'America/Denver': 'US',
    'America/Los_Angeles': 'US',
    'America/Toronto': 'CA',
    'America/Vancouver': 'CA',
    'America/Mexico_City': 'MX',
    
    // Europe
    'Europe/London': 'GB',
    'Europe/Paris': 'FR',
    'Europe/Berlin': 'DE',
    'Europe/Madrid': 'ES',
    'Europe/Rome': 'IT',
    'Europe/Amsterdam': 'NL',
    'Europe/Stockholm': 'SE',
    'Europe/Zurich': 'CH',
    
    // Asia Pacific
    'Asia/Tokyo': 'JP',
    'Asia/Shanghai': 'CN',
    'Asia/Hong_Kong': 'HK',
    'Asia/Singapore': 'SG',
    'Asia/Seoul': 'KR',
    'Asia/Kolkata': 'IN',
    'Australia/Sydney': 'AU',
    'Australia/Melbourne': 'AU',
    
    // South America
    'America/Sao_Paulo': 'BR',
    'America/Argentina/Buenos_Aires': 'AR',
    'America/Santiago': 'CL',
    
    // Others
    'Africa/Cairo': 'EG',
    'Africa/Lagos': 'NG',
    'Africa/Johannesburg': 'ZA'
  }
  
  return timezoneToCountry[timezone] || 'XX'
}

function getReferrerCode(referrer: string): string {
  if (!referrer) return 'DIR' // Direct traffic
  
  const url = referrer.toLowerCase()
  
  // Social Media
  if (url.includes('linkedin.com')) return 'LIN'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'TWX'
  if (url.includes('facebook.com')) return 'FBK'
  if (url.includes('instagram.com')) return 'IGM'
  if (url.includes('github.com')) return 'GHB'
  
  // Search Engines
  if (url.includes('google.com')) return 'GOG'
  if (url.includes('bing.com')) return 'BNG'
  if (url.includes('duckduckgo.com')) return 'DDG'
  if (url.includes('yahoo.com')) return 'YAH'
  
  // Professional Platforms
  if (url.includes('stackoverflow.com')) return 'SOF'
  if (url.includes('reddit.com')) return 'RED'
  if (url.includes('dev.to')) return 'DEV'
  if (url.includes('hashnode.com')) return 'HSH'
  
  // Portfolio/CV Platforms
  if (url.includes('dribbble.com')) return 'DRB'
  if (url.includes('behance.net')) return 'BHN'
  
  // Email
  if (url.includes('mail.google.com') || url.includes('outlook.')) return 'EML'
  
  // Other known domains
  try {
    const domain = new URL(referrer).hostname
    return domain.split('.')[0].substring(0, 3).toUpperCase()
  } catch {
    return 'UNK'
  }
}

function getDeviceType(): string {
  // Method 1: Direct screen and touch detection
  const screenWidth = window.screen.width
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const hasOrientationAPI = 'orientation' in window || 'onorientationchange' in window
  
  // Method 2: Use User-Agent Client Hints API (modern browsers)
  const extNav = navigator as ExtendedNavigator
  const uaData = extNav.userAgentData
  if (uaData) {
    if (uaData.mobile) return 'M' // Mobile
    // Check for tablet indicators in brands
    const brands = uaData.brands || []
    for (const brand of brands) {
      if (brand.brand.toLowerCase().includes('tablet')) return 'T'
    }
  }
  
  // Method 3: Direct hardware detection
  const deviceMemory = extNav.deviceMemory // GB
  const hardwareConcurrency = navigator.hardwareConcurrency // CPU cores
  
  // Mobile indicators (multiple signals)
  if (hasTouch && hasOrientationAPI && screenWidth <= 768) {
    return 'M' // Mobile
  }
  
  // Tablet indicators (multiple signals)
  if (hasTouch && screenWidth > 768 && screenWidth <= 1366) {
    return 'T' // Tablet
  }
  
  // Specific device detection
  const userAgent = navigator.userAgent.toLowerCase()
  if (/ipad/.test(userAgent)) return 'T' // iPad
  if (/iphone|android.*mobile/.test(userAgent)) return 'M' // Mobile
  
  // High-end mobile/tablet detection
  if (hasTouch && deviceMemory && deviceMemory <= 4 && hardwareConcurrency <= 8) {
    return screenWidth <= 768 ? 'M' : 'T'
  }
  
  return 'D' // Desktop
}

function getBrowserCode(): string {
  // Method 1: User-Agent Client Hints API (most accurate)
  const extNav = navigator as ExtendedNavigator
  const uaData = extNav.userAgentData
  if (uaData && uaData.brands) {
    for (const brand of uaData.brands) {
      const brandName = brand.brand.toLowerCase()
      if (brandName.includes('chrome')) return 'CH'
      if (brandName.includes('edge')) return 'ED'
      if (brandName.includes('opera')) return 'OP'
    }
  }
  
  // Method 2: Direct feature detection
  const extWin = window as ExtendedWindow
  
  // Firefox detection (unique property)
  if (typeof extWin.InstallTrigger !== 'undefined') {
    return 'FF'
  }
  
  // Safari detection (unique properties)
  if (navigator.vendor && navigator.vendor.includes('Apple') && !navigator.userAgent.includes('Chrome')) {
    return 'SF'
  }
  
  // Edge detection (unique property)
  if (navigator.userAgent.includes('Edg/')) {
    return 'ED'
  }
  
  // Chrome detection (check for chrome-specific APIs)
  if (extWin.chrome && navigator.userAgent.includes('Chrome')) {
    return 'CH'
  }
  
  // Opera detection (unique property)
  if (extWin.opr || navigator.userAgent.includes('OPR/')) {
    return 'OP'
  }
  
  // Method 3: Fallback to user agent parsing
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes('edg')) return 'ED'
  if (userAgent.includes('chrome')) return 'CH'
  if (userAgent.includes('firefox')) return 'FF'
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'SF'
  if (userAgent.includes('opera') || userAgent.includes('opr')) return 'OP'
  
  return 'UN' // Unknown
}

function getConnectionCode(): string {
  // Direct Network Information API access
  const extNav = navigator as ExtendedNavigator
  const connection = extNav.connection || extNav.mozConnection || extNav.webkitConnection
  
  if (!connection) return 'U' // Unknown
  
  // Method 1: Direct effective type from API
  if (connection.effectiveType) {
    switch (connection.effectiveType) {
      case 'slow-2g': return '1'
      case '2g': return '2'
      case '3g': return '3'
      case '4g': return '4'
      case '5g': return '5' // Future-proof
      default: return 'U'
    }
  }
  
  // Method 2: Direct downlink speed measurement (Mbps)
  if (typeof connection.downlink === 'number') {
    if (connection.downlink >= 10) return '4' // Very fast (4G+)
    if (connection.downlink >= 1.5) return '3' // Medium (3G)
    if (connection.downlink >= 0.15) return '2' // Slow (2G)
    return '1' // Very slow
  }
  
  // Method 3: Round-trip time assessment
  if (typeof connection.rtt === 'number') {
    if (connection.rtt <= 100) return '4' // Fast
    if (connection.rtt <= 300) return '3' // Medium
    if (connection.rtt <= 1000) return '2' // Slow
    return '1' // Very slow
  }
  
  return 'U' // Unknown
}

// Main hook for user identification
export function usePortfolioUserIdentification() {
  const posthog = usePostHog()
  const locale = useLocale()
  const { theme } = useTheme()
  
  useEffect(() => {
    if (!posthog) return
    
    const initializeUser = async () => {
      // Check if user is already identified
      const existingUserId = localStorage.getItem('portfolio_user_id')
      
      if (!existingUserId) {
        try {
          // Generate new user ID (now async)
          const userId = await generatePortfolioUserId()
          
          // Store locally to maintain consistency across sessions
          localStorage.setItem('portfolio_user_id', userId)
          localStorage.setItem('portfolio_first_visit', new Date().toISOString())
          
          // Get additional direct information
          const additionalContext = await getAdditionalUserContext()
          
          // Identify user in PostHog
          posthog.identify(userId, {
            // Context at identification
            first_visit_locale: locale,
            first_visit_theme: theme,
            identification_timestamp: new Date().toISOString(),
            
            // Parse ID components for filtering
            user_country: userId.substring(0, 2),
            user_referrer_source: userId.substring(2, 5),
            user_device_type: userId.substring(5, 6),
            user_entry_hour: userId.substring(6, 8),
            user_entry_day: userId.substring(8, 9),
            user_browser: userId.substring(9, 11),
            user_connection: userId.substring(11, 12),
            
            // Additional direct context
            ...additionalContext,
            
            // Session info
            is_first_visit: true,
            session_start: new Date().toISOString()
          })
          
          console.log(`Portfolio User Identified: ${userId}`)
        } catch (error) {
          console.error('Failed to generate user ID:', error)
          // Fallback to a simple ID if generation fails
          const fallbackId = `FALLBACK${Date.now().toString(36).toUpperCase()}`
          localStorage.setItem('portfolio_user_id', fallbackId)
          posthog.identify(fallbackId, {
            identification_method: 'fallback',
            first_visit_locale: locale,
            first_visit_theme: theme,
            is_first_visit: true
          })
        }
      } else {
        // Existing user - update session info
        const additionalContext = await getAdditionalUserContext()
        
        posthog.identify(existingUserId, {
          current_locale: locale,
          current_theme: theme,
          last_visit: new Date().toISOString(),
          is_returning_user: true,
          
          // Update with current context
          ...additionalContext,
          
          // Update session count
          session_count: (parseInt(localStorage.getItem('portfolio_session_count') || '0') + 1)
        })
        
        // Update session count
        const sessionCount = parseInt(localStorage.getItem('portfolio_session_count') || '0') + 1
        localStorage.setItem('portfolio_session_count', sessionCount.toString())
        localStorage.setItem('portfolio_last_visit', new Date().toISOString())
      }
    }
    
    initializeUser()
  }, [posthog, locale, theme])
  
  return {
    getUserId: () => localStorage.getItem('portfolio_user_id'),
    getSessionCount: () => parseInt(localStorage.getItem('portfolio_session_count') || '1'),
    isFirstVisit: () => !localStorage.getItem('portfolio_user_id')
  }
}

// Get additional user context using direct APIs
async function getAdditionalUserContext(): Promise<Record<string, unknown>> {
  const context: Record<string, unknown> = {}
  const extNav = navigator as ExtendedNavigator
  
  // Direct hardware information
  context.device_memory = extNav.deviceMemory || null
  context.hardware_concurrency = navigator.hardwareConcurrency || null
  context.max_touch_points = navigator.maxTouchPoints || 0
  
  // Direct network information
  const connection = extNav.connection
  if (connection) {
    context.connection_downlink = connection.downlink || null
    context.connection_rtt = connection.rtt || null
    context.connection_type = connection.type || null
    context.connection_save_data = connection.saveData || false
  }
  
  // Direct screen information
  context.screen_width = window.screen.width
  context.screen_height = window.screen.height
  context.screen_color_depth = window.screen.colorDepth
  context.pixel_ratio = window.devicePixelRatio
  
  // Direct browser capabilities
  context.cookies_enabled = navigator.cookieEnabled
  context.do_not_track = navigator.doNotTrack === '1'
  context.online_status = navigator.onLine
  
  // Direct language and locale
  context.browser_language = navigator.language
  context.browser_languages = navigator.languages || []
  context.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  
  // Direct performance information (if available)
  const extPerf = window.performance as ExtendedPerformance
  if (extPerf && extPerf.memory) {
    const memory = extPerf.memory
    context.js_heap_size_limit = memory.jsHeapSizeLimit || null
    context.total_js_heap_size = memory.totalJSHeapSize || null
    context.used_js_heap_size = memory.usedJSHeapSize || null
  }
  
  // Battery API (if available)
  try {
    const battery = await extNav.getBattery?.()
    if (battery) {
      context.battery_charging = battery.charging
      context.battery_level = Math.round(battery.level * 100)
    }
  } catch {
    // Battery API not available or blocked
  }
  
  return context
}

// Utility to decode user ID for analytics
export function decodePortfolioUserId(userId: string) {
  if (userId.length < 12) return null
  
  return {
    country: userId.substring(0, 2),
    referrerSource: userId.substring(2, 5),
    deviceType: userId.substring(5, 6),
    entryHour: userId.substring(6, 8),
    entryDay: userId.substring(8, 9),
    browser: userId.substring(9, 11),
    connection: userId.substring(11, 12),
    randomSuffix: userId.substring(12)
  }
}