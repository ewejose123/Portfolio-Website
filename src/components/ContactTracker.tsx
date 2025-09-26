'use client'

import { useContactTracking } from '@/hooks/useContactTracking'

interface ContactTrackerProps {
    children: React.ReactNode
    contactType: 'phone' | 'whatsapp' | 'email' | 'contact_section'
    serviceType?: 'simple_website' | 'simple_shopify' | 'custom_shopify'
    priceRange?: string
    testimonialIndex?: number
    testimonialName?: string
    questionIndex?: number
    question?: string
    faqAction?: 'expand' | 'collapse'
    className?: string
}

export default function ContactTracker({
    children,
    contactType,
    serviceType,
    priceRange,
    testimonialIndex,
    testimonialName,
    questionIndex,
    question,
    faqAction,
    className
}: ContactTrackerProps) {
    const {
        trackContactClick,
        trackServiceInterest,
        trackTestimonialView,
        trackFAQInteraction,
        trackPricingInterest
    } = useContactTracking()

    const handleClick = (e: React.MouseEvent) => {
        // Track contact clicks
        if (contactType) {
            trackContactClick(contactType, {
                element_text: e.currentTarget.textContent?.trim(),
                element_type: e.currentTarget.tagName.toLowerCase()
            })
        }

        // Track service interest for CTAs
        if (serviceType && contactType === 'contact_section') {
            trackServiceInterest(serviceType, 'cta_click')
        }

        // Track pricing interest
        if (priceRange && serviceType) {
            trackPricingInterest(priceRange, serviceType)
        }

        // Track testimonial views
        if (testimonialIndex !== undefined && testimonialName) {
            trackTestimonialView(testimonialIndex, testimonialName)
        }

        // Track FAQ interactions
        if (questionIndex !== undefined && question && faqAction) {
            trackFAQInteraction(questionIndex, question, faqAction)
        }
    }

    const handleMouseEnter = () => {
        // Track testimonial hover
        if (testimonialIndex !== undefined && testimonialName) {
            trackTestimonialView(testimonialIndex, testimonialName)
        }
    }

    return (
        <div
            className={className}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
        >
            {children}
        </div>
    )
}
