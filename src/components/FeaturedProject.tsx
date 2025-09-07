'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import TechnologyIcon from './TechnologyIcon'

export default function FeaturedProject({ locale }: { locale: string }) {
    const t = useTranslations()

    return (
        <div className="w-full">
            <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{t("hero.featuredProject.title")}</h3>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Project Video/Image - Full Width, Much Bigger with 16:9 Ratio */}
                    <a
                        href="https://xenovarush.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div className="w-full h-80 rounded-xl overflow-hidden relative cursor-pointer">
                            {/* Fallback Image */}
                            <Image
                                src="/projects/xenora-rush.jpg"
                                alt="Xenora Rush - Competitive Multiplayer Game"
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 600px"
                                priority
                            />
                            {/* Auto-playing Video Overlay */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                autoPlay
                                loop
                                muted
                                playsInline
                                onError={(e) => {
                                    // Hide video on error, fallback to image
                                    e.currentTarget.style.display = 'none';
                                }}
                            >
                                <source src="/projects/xenova-rush.webm" type="video/webm" />
                            </video>
                        </div>
                    </a>

                    {/* Project Info Below */}
                    <div className="flex gap-4 items-start">
                        {/* Title and Description on Left - Clickable */}
                        <a
                            href="https://xenovarush.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 space-y-3 cursor-pointer group"
                        >
                            <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{t("projects.items.xenora-rush.title")}</h4>
                            <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{t("projects.items.xenora-rush.summary")}</p>
                        </a>

                        {/* Tags on the Right - Not clickable */}
                        <div className="flex flex-wrap gap-1 flex-shrink-0 max-w-xs">
                            {(t.raw("projects.items.xenora-rush.technologies") as string[]).map((tech: string, index: number) => (
                                <div key={index} className="scale-90">
                                    <TechnologyIcon technology={tech} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <a
                        href="#projects"
                        className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors text-sm mt-2"
                    >
                        {t("hero.featuredProject.viewProject")} →
                    </a>
                </div>
            </div>
        </div>
    )
}