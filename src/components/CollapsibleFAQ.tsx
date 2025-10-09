'use client'

import { useState } from "react"
import AnimatedSection from "@/components/AnimatedSection"

export default function CollapsibleFAQ({ question, answer, delay }: { question: string, answer: string, delay: number }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <AnimatedSection animation="fadeInUp" delay={delay}>
            <div
                className="p-4 rounded-xl border border-border bg-card/95 shadow-sm transition-all duration-300 hover:border-accent/50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="w-full text-left flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                        {question}
                    </h3>
                    <span className={`transform transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-base text-muted-foreground leading-relaxed mt-3">
                        {answer}
                    </p>
                </div>
            </div>
        </AnimatedSection>
    )
}
