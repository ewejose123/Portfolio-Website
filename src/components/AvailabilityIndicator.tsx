'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface AvailabilityIndicatorProps {
    className?: string
}

export default function AvailabilityIndicator({ className = '' }: AvailabilityIndicatorProps) {
    const t = useTranslations('availability')
    const [isAvailable, setIsAvailable] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        const checkAvailability = () => {
            // Get current time in Spain timezone (Europe/Madrid)
            const now = new Date()
            const spainTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Madrid" }))
            const hour = spainTime.getHours()

            // Available from 10am to 10pm Spain time
            const available = hour >= 10 && hour < 22
            setIsAvailable(available)

            // Format current time for display
            const timeString = spainTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
            setCurrentTime(timeString)
        }

        // Check immediately
        checkAvailability()

        // Update every minute
        const interval = setInterval(checkAvailability, 60000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`w-3 h-3 rounded-full ${isAvailable
                    ? ''
                    : 'bg-orange-500'
                    }`}
                style={isAvailable ? {
                    animation: 'availabilityBreathe 3s ease-in-out infinite'
                } : {}}
            />
            <span className="text-sm font-medium">
                {isAvailable ? (
                    <>
                        {t('available')} • {currentTime} ({t('spainTime')})
                    </>
                ) : (
                    <>
                        {t('busy')} • {currentTime} ({t('spainTime')}) • {t('willCallLater')}
                    </>
                )}
            </span>
        </div>
    )
}
