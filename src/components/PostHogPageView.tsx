'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePortfolioTracking } from '@/hooks/usePortfolioTracking'
import { usePortfolioUserIdentification } from '@/hooks/useUserIdentification'

function PostHogPageView(): null {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const posthog = usePostHog()
    const locale = useLocale()
    const { theme } = useTheme()

    // Initialize portfolio-specific tracking
    usePortfolioTracking()

    // Initialize user identification
    const { getUserId, getSessionCount, isFirstVisit } = usePortfolioUserIdentification()

    useEffect(() => {
        if (pathname && posthog) {
            // Enhanced page context properties
            const pageProperties = {
                // Navigation context
                current_path: pathname,
                page_locale: locale,
                current_theme: theme,
                has_query_params: searchParams.toString().length > 0,
                query_params_count: Array.from(searchParams.keys()).length,

                // User identification context
                portfolio_user_id: getUserId(),
                session_count: getSessionCount(),
                is_first_visit: isFirstVisit(),

                // Page categorization
                page_type: (() => {
                    if (pathname === '/' || pathname.match(/^\/[a-z]{2}\/?$/)) return 'homepage'
                    if (pathname.includes('/articles')) return 'articles'
                    return 'other'
                })(),

                // User journey tracking
                referrer: document.referrer || 'direct',
                user_agent: navigator.userAgent,

                // Time-based context
                visit_hour: new Date().getHours(),
                visit_day_of_week: new Date().getDay(), // 0-6 (Sunday-Saturday)
                visit_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD

                // Technical context
                javascript_enabled: true, // Since this runs, JS is enabled
                cookies_enabled: navigator.cookieEnabled,
                do_not_track: navigator.doNotTrack === '1',

                // Performance context
                connection_downlink: (navigator as Navigator & {
                    connection?: { downlink?: number; rtt?: number }
                }).connection?.downlink || null,
                connection_rtt: (navigator as Navigator & {
                    connection?: { downlink?: number; rtt?: number }
                }).connection?.rtt || null,
            }

            // Register page-specific properties
            posthog.register(pageProperties)

            // Track page features being viewed
            const trackPageFeatures = () => {
                setTimeout(() => {
                    const features = []

                    // Check what sections are visible on the page
                    if (document.querySelector('[id*="hero"]')) features.push('hero_section')
                    if (document.querySelector('[id*="projects"]')) features.push('projects_section')
                    if (document.querySelector('[id*="skills"]')) features.push('skills_section')
                    if (document.querySelector('[id*="about"]')) features.push('about_section')
                    if (document.querySelector('[id*="contact"]')) features.push('contact_section')

                    // Check for interactive elements
                    if (document.querySelector('button')) features.push('has_buttons')
                    if (document.querySelector('form')) features.push('has_forms')
                    if (document.querySelector('video')) features.push('has_videos')
                    if (document.querySelector('img')) features.push('has_images')

                    posthog.capture('page_features_loaded', {
                        features_available: features,
                        features_count: features.length,
                        page_path: pathname
                    })
                }, 1000) // Wait for page to load
            }

            trackPageFeatures()
        }
    }, [pathname, searchParams, posthog, locale, theme, getUserId, getSessionCount, isFirstVisit])

    return null
}

export default PostHogPageView