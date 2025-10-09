'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from './AnimatedSection'

export default function TestimonialsCarousel() {
    const t = useTranslations('webpages.testimonials')
    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const testimonials = [
        {
            key: 'restaurant',
            name: t('items.restaurant.name'),
            business: t('items.restaurant.business'),
            quote: t('items.restaurant.quote'),
        },
        {
            key: 'consultant',
            name: t('items.consultant.name'),
            business: t('items.consultant.business'),
            quote: t('items.consultant.quote'),
        },
        {
            key: 'plumber',
            name: t('items.plumber.name'),
            business: t('items.plumber.business'),
            quote: t('items.plumber.quote'),
        },
        {
            key: 'boutique',
            name: t('items.boutique.name'),
            business: t('items.boutique.business'),
            quote: t('items.boutique.quote'),
        },
    ]

    // Create more duplicates for smoother infinite scroll
    const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials]

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2
        containerRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
        setIsHovered(false)
    }

    return (
        <div className="w-full">
            <div
                ref={containerRef}
                className="testimonials-carousel-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ cursor: isHovered ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
                <div className={`testimonials-carousel-track ${isHovered ? 'paused' : ''}`}>
                    {infiniteTestimonials.map((testimonial, index) => (
                        <div key={`${testimonial.key}-${index}`} className="testimonial-card">
                            <AnimatedSection animation="fadeInUp" delay={index * 50}>
                                <div className="p-4 md:p-6 rounded-2xl border border-border bg-card/95 text-center shadow-lg h-full w-full">
                                    <div className="space-y-3 md:space-y-6">
                                        {/* Stars */}
                                        <div className="flex justify-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-xl md:text-3xl font-black">★</span>
                                            ))}
                                        </div>

                                        {/* Name and Business */}
                                        <div className="space-y-1 md:space-y-3">
                                            <h4 className="font-semibold text-foreground text-base md:text-2xl leading-tight">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm md:text-lg text-muted-foreground leading-tight">
                                                {testimonial.business}
                                            </p>
                                        </div>

                                        {/* Quote */}
                                        <p className="text-muted-foreground italic text-sm md:text-lg leading-relaxed">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
