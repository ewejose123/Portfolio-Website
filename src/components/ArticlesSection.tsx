'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/AnimatedSection'
import WorkInProgressModal from '@/components/WorkInProgressModal'

export default function ArticlesSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const t = useTranslations('articles')

    const handleArticleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsModalOpen(true)
    }

    return (
        <>
            <section id="articles" className="px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
                        <p className="text-muted-foreground text-lg">{t("tagline")}</p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Delta Compression Article */}
                        <AnimatedSection animation="fadeInUp" delay={100}>
                            <div
                                className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col cursor-pointer"
                                onClick={handleArticleClick}
                            >
                                <div className="h-48 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 mb-4 flex items-center justify-center">
                                    <span className="text-4xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">{t("items.delta-compression.title")}</h3>
                                <p className="text-muted-foreground mb-4 flex-grow">{t("items.delta-compression.summary")}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(t.raw("items.delta-compression.tags") as string[]).map((tag: string, index: number) => (
                                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-accent hover:text-accent/80 font-medium transition-colors">
                                    {t("readMore")} →
                                </span>
                            </div>
                        </AnimatedSection>

                        {/* Local Prediction Article */}
                        <AnimatedSection animation="fadeInUp" delay={200}>
                            <div
                                className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col cursor-pointer"
                                onClick={handleArticleClick}
                            >
                                <div className="h-48 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 flex items-center justify-center">
                                    <span className="text-4xl">🎯</span>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">{t("items.local-prediction.title")}</h3>
                                <p className="text-muted-foreground mb-4 flex-grow">{t("items.local-prediction.summary")}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(t.raw("items.local-prediction.tags") as string[]).map((tag: string, index: number) => (
                                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-accent hover:text-accent/80 font-medium transition-colors">
                                    {t("readMore")} →
                                </span>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <WorkInProgressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}