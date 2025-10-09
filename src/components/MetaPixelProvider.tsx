'use client'

import { useEffect } from 'react'
import { initMetaPixel } from '@/lib/meta-pixel'

interface MetaPixelProviderProps {
    children: React.ReactNode
    pixelId: string
    testEventCode?: string
}

export default function MetaPixelProvider({
    children,
    pixelId,
    testEventCode
}: MetaPixelProviderProps) {
    useEffect(() => {
        if (pixelId) {
            // Initialize Meta Pixel
            initMetaPixel(pixelId, testEventCode)
        }
    }, [pixelId, testEventCode])

    return <>{children}</>
}
