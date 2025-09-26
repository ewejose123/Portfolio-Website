'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import TechnologyIcon from './TechnologyIcon'

export default function FeaturedProject() {
    const t = useTranslations()

    return (
        <div className="w-full">
            <div className="p-5 2xl:p-4 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full featured-project">
                <div className="text-center mb-3 2xl:mb-4">
                    <h3 className="text-lg 2xl:text-2xl font-semibold text-foreground featured-project-title">{t("hero.featuredProject.title")}</h3>
                </div>

                <div className="flex flex-col gap-3 2xl:gap-6">
                    {/* Project Video/Image - Full Width, Much Bigger with 16:9 Ratio */}
                    <a
                        href="https://xenovarush.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 2xl:h-64 rounded-xl overflow-hidden relative cursor-pointer featured-project-image">
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
                    <div className="flex flex-col gap-3 2xl:gap-6 lg:items-start">
                        {/* Title and Description - Clickable */}
                        <a
                            href="https://xenovarush.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="space-y-2 2xl:space-y-4 cursor-pointer group"
                        >
                            <h4 className="text-base 2xl:text-xl font-semibold text-foreground group-hover:text-accent transition-colors featured-project-name">{t("projects.items.xenora-rush.title")}</h4>
                            <p className="text-xs sm:text-sm 2xl:text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors featured-project-description">{t("projects.items.xenora-rush.summary")}</p>
                        </a>

                        {/* Tags - Not clickable, more compact layout */}
                        <div className="flex flex-wrap gap-0.5 2xl:gap-1.5 justify-start">
                            {(t.raw("projects.items.xenora-rush.technologies") as string[]).map((tech: string, index: number) => (
                                <div key={index} className="scale-[0.6] sm:scale-[0.7] lg:scale-75 2xl:scale-90 tech-icon">
                                    <TechnologyIcon technology={tech} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <a
                        href="#projects"
                        className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors text-xs 2xl:text-base mt-1 2xl:mt-3"
                    >
                        {t("hero.featuredProject.viewProject")} →
                    </a>
                </div>
            </div>
        </div>
    )
}