'use client'

import { useState } from "react"
import AnimatedSection from "@/components/AnimatedSection"

export default function CollapsibleFAQ({ question, answer, delay }: { question: string, answer: string, delay: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <AnimatedSection animation="fadeInUp" delay={delay}>
            <div className="p-4 rounded-xl border border-border bg-card/95 shadow-sm">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left flex items-center justify-between"
                >
                    <h3 className="text-lg font-semibold text-foreground">
                        {question}
                    </h3>
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
                {isOpen && (
                    <p className="text-base text-muted-foreground leading-relaxed mt-3">
                        {answer}
                    </p>
                )}
            </div>
        </AnimatedSection>
    )
}
