'use client'

import { useContactTracking } from '@/hooks/useContactTracking'
import { useMetaTracking } from '@/hooks/useMetaTracking'

interface ContactTrackerProps {
    children: React.ReactNode
    contactType: 'phone' | 'whatsapp' | 'email' | 'contact_section'
    serviceType?: 'basic_website' | 'shopping_website' | 'custom_website'
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

    const { trackContact, trackContactSection } = useMetaTracking()

    const handleClick = (e: React.MouseEvent) => {
        // Track contact clicks with PostHog
        if (contactType) {
            trackContactClick(contactType, {
                element_text: e.currentTarget.textContent?.trim(),
                element_type: e.currentTarget.tagName.toLowerCase()
            })
        }

        // Track with Meta Pixel based on contact type
        if (contactType === 'contact_section') {
            // MEDIUM priority - Contact section click
            trackContactSection()
        } else {
            // HIGHEST priority - Actual contact (phone/WhatsApp/email)
            trackContact(contactType)
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
