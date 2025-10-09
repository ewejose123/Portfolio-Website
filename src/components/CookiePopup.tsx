'use client'

import { useState, useEffect } from 'react'

export default function CookiePopup() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookieConsent = localStorage.getItem('cookieConsent')
        if (!cookieConsent) {
            // Show popup after a short delay to not be intrusive
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted')
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">🍪</div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                            Cookies
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                            We use cookies to improve your experience on our website.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAccept}
                                className="px-3 py-1.5 bg-accent text-accent-foreground rounded text-xs font-medium hover:bg-accent/90 transition-colors duration-200"
                            >
                                OK
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-3 py-1.5 text-muted-foreground hover:text-foreground text-xs font-medium transition-colors duration-200"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
