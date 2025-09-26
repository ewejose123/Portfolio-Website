'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Carousel from 'react-simply-carousel'
import AnimatedSection from './AnimatedSection'

export default function TestimonialsCarousel() {
    const t = useTranslations('webpages.testimonials')
    const [activeSlide, setActiveSlide] = useState(0)
    const [itemsToShow, setItemsToShow] = useState(2)

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

    // Update items to show based on screen size
    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth >= 768) {
                setItemsToShow(3) // Desktop: 3 items
            } else {
                setItemsToShow(2) // Mobile: 2 items
            }
        }

        updateItemsToShow()
        window.addEventListener('resize', updateItemsToShow)
        return () => window.removeEventListener('resize', updateItemsToShow)
    }, [])

    // Auto-scroll functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % testimonials.length)
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <div className="w-full">
            <Carousel
                containerProps={{
                    style: {
                        width: '100%',
                        justifyContent: 'center',
                        userSelect: 'none',
                        padding: '0',
                        display: 'flex',
                        gap: '8px',
                    },
                }}
                activeSlideIndex={activeSlide}
                onRequestChange={setActiveSlide}
                forwardBtnProps={{
                    children: '',
                    style: {
                        display: 'none',
                    },
                }}
                backwardBtnProps={{
                    children: '',
                    style: {
                        display: 'none',
                    },
                }}
                dotsNav={{
                    show: true,
                    itemBtnProps: {
                        style: {
                            height: 8,
                            width: 8,
                            borderRadius: '50%',
                            border: 0,
                            background: 'var(--muted-foreground)',
                            margin: '0 4px',
                            cursor: 'pointer',
                        },
                    },
                    activeItemBtnProps: {
                        style: {
                            height: 8,
                            width: 8,
                            borderRadius: '50%',
                            border: 0,
                            background: 'var(--accent)',
                            margin: '0 4px',
                            cursor: 'pointer',
                        },
                    },
                }}
                itemsToShow={itemsToShow}
                speed={400}
                infinite={true}
            >
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.key} className="px-1 md:px-2 flex-1 min-w-0">
                        <AnimatedSection animation="fadeInUp" delay={index * 100}>
                            <div className="p-4 md:p-6 rounded-2xl border border-border bg-card/95 text-center shadow-lg h-full w-full min-w-[300px] md:min-w-[350px]">
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
            </Carousel>
        </div>
    )
}
