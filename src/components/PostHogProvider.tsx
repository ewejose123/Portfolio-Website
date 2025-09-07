'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
        person_profiles: 'identified_only',

        // Enhanced autocapture settings
        autocapture: {
            css_selector_allowlist: [
                '[ph-capture]', // Elements with ph-capture attribute
                'a', // All links
                'button', // All buttons
                'form', // All forms
                'input[type="submit"]', // Submit inputs
                'input[type="button"]', // Button inputs
                '[role="button"]', // Elements with button role
                '[data-track]', // Custom tracking attribute
            ],
            url_allowlist: [window.location.origin],
            capture_copied_text: true, // Track when users copy text
        },

        // Page tracking
        capture_pageview: true,
        capture_pageleave: true,

        // Advanced behavioral tracking
        rageclick: true, // Detect rage clicks
        session_recording: {
            recordCrossOriginIframes: false,
            maskAllInputs: true, // Privacy protection
            maskTextSelector: '[data-sensitive]', // Custom mask selector
        },

        // Performance and user experience tracking
        capture_performance: true, // Track page load performance

        // Advanced options for better insights
        enable_recording_console_log: false, // Privacy consideration

        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
                console.log('PostHog loaded with enhanced tracking')
                console.log('Autocapture config:', posthog.config.autocapture)
            }

            // Set global properties that will be sent with every event
            posthog.register({
                // Device and browser info
                screen_resolution: `${window.screen.width}x${window.screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                device_pixel_ratio: window.devicePixelRatio,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

                // Connection info
                connection_type: (navigator as Navigator & {
                    connection?: { effectiveType?: string }
                }).connection?.effectiveType || 'unknown',

                // Browser capabilities
                supports_webp: (() => {
                    const canvas = document.createElement('canvas')
                    return canvas.toDataURL('image/webp').indexOf('webp') > -1
                })(),

                // Portfolio-specific properties
                portfolio_version: '2025',
                visit_timestamp: new Date().toISOString(),
            })

            // Track initial page load performance
            if (window.performance && window.performance.navigation) {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
                posthog.capture('page_load_performance', {
                    load_time_ms: loadTime,
                    navigation_type: window.performance.navigation.type,
                })
            }

            // Track scroll depth
            let maxScrollDepth = 0
            const trackScrollDepth = () => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                )
                if (scrollPercent > maxScrollDepth) {
                    maxScrollDepth = scrollPercent
                    // Track significant scroll milestones
                    if ([25, 50, 75, 100].includes(scrollPercent)) {
                        posthog.capture('scroll_depth', {
                            scroll_percent: scrollPercent,
                            page_path: window.location.pathname
                        })
                    }
                }
            }

            // Track time spent on page
            const startTime = Date.now()
            const trackTimeOnPage = () => {
                const timeSpent = Math.round((Date.now() - startTime) / 1000)
                posthog.capture('time_on_page', {
                    time_spent_seconds: timeSpent,
                    page_path: window.location.pathname
                })
            }

            // Track user engagement patterns
            let clickCount = 0
            let keyPressCount = 0

            const trackEngagement = () => {
                posthog.capture('user_engagement', {
                    clicks: clickCount,
                    keystrokes: keyPressCount,
                    page_path: window.location.pathname
                })
            }

            // Add event listeners
            window.addEventListener('scroll', trackScrollDepth, { passive: true })
            window.addEventListener('beforeunload', () => {
                trackTimeOnPage()
                trackEngagement()
            })

            document.addEventListener('click', () => clickCount++)
            document.addEventListener('keypress', () => keyPressCount++)

            // Track engagement every 30 seconds
            setInterval(trackEngagement, 30000)

            // Track visibility changes (tab switching)
            document.addEventListener('visibilitychange', () => {
                posthog.capture('visibility_change', {
                    visibility_state: document.visibilityState,
                    page_path: window.location.pathname
                })
            })

            // Track network status changes
            window.addEventListener('online', () => {
                posthog.capture('network_status', { status: 'online' })
            })

            window.addEventListener('offline', () => {
                posthog.capture('network_status', { status: 'offline' })
            })
        }
    })
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider client={posthog}>
            {children}
        </PostHogProvider>
    )
}