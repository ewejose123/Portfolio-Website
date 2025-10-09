'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode, useEffect, useState } from 'react'

interface StaggeredRevealProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    animationType?: 'title' | 'content' | 'image' | 'stagger'
    immediate?: boolean
}

export default function StaggeredReveal({
    children,
    className = '',
    staggerDelay = 0,
    animationType = 'stagger',
    immediate = false
}: StaggeredRevealProps) {
    const { ref, isVisible } = useScrollAnimation()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const animationClasses = {
        title: 'animate-title-reveal',
        content: 'animate-content-reveal',
        image: 'animate-image-reveal',
        stagger: 'animate-stagger-reveal'
    }

    const shouldShow = immediate || (isVisible && isMounted)

    return (
        <div
            ref={ref}
            className={`${shouldShow
                ? `${animationClasses[animationType]}`
                : 'opacity-0'
                } ${className}`}
            style={{
                animationDelay: `${staggerDelay}ms`,
                animationFillMode: 'forwards',
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    )
}
