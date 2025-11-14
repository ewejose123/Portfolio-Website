import { getTranslations } from "next-intl/server"
import SkillsHighlight from "@/components/SkillsHighlight"
import AnimatedSection from "@/components/AnimatedSection"
import FeaturedProject from "@/components/FeaturedProject"
import ArticlesSection from "@/components/ArticlesSection"
import TechnologyIcon from "@/components/TechnologyIcon"
import Image from "next/image"
// import Link from "next/link"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })
    return (
        <main>
            <section id="hero" className="min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 pt-6 pb-16">
                {/* Main Hero Content */}
                <div className="flex-1 flex items-center py-2">
                    <div className="w-full max-w-8xl mx-auto grid xl:grid-cols-2 gap-24 lg:gap-20 xl:gap-28 2xl:gap-32 3xl:gap-40 items-start grid-gap">
                        {/* Left side - Profile */}
                        <AnimatedSection animation="fadeInLeft" className="flex justify-center xl:justify-end items-start" immediate={true}>
                            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl profile-container">
                                <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 items-center xl:items-start">
                                    {/* Profile Image */}
                                    <div className="relative w-64 h-80 lg:w-72 lg:h-96 xl:w-80 xl:h-[26rem] 2xl:w-96 2xl:h-[32rem] 3xl:w-[28rem] 3xl:h-[36rem] rounded-2xl overflow-hidden border border-border shadow-2xl flex-shrink-0 profile-image">
                                        <Image
                                            src="/profile-main.jpg"
                                            alt="José Sáez - Profile Photo"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    {/* Personal Info */}
                                    <div className="text-center xl:text-left space-y-2 lg:space-y-3 2xl:space-y-4 3xl:space-y-5 flex-1 min-w-0">
                                        <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-foreground hero-name">
                                            {t("hero.name")}
                                        </h1>
                                        <h2 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-primary font-semibold hero-title">
                                            {t("hero.title")}
                                        </h2>
                                        <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                                {t("hero.age")}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-accent"></span>
                                                {t("hero.location")}
                                            </span>
                                        </div>
                                        <p className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-muted-foreground leading-relaxed hero-tagline">
                                            {t("hero.tagline")}
                                        </p>

                                        {/* Language Skills */}
                                        <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl">🇪🇸</span>
                                                    <span className="text-sm font-medium text-muted-foreground">{t("hero.languages.spanish")}</span>
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl">🇺🇸</span>
                                                    <span className="text-sm font-medium text-muted-foreground">{t("hero.languages.english")}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
                                            <a
                                                href="#projects"
                                                className="px-4 sm:px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap text-sm sm:text-base"
                                            >
                                                {t("hero.ctaProjects")}
                                            </a>
                                            <a
                                                href="#contact"
                                                className="px-4 sm:px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold whitespace-nowrap text-sm sm:text-base"
                                            >
                                                {t("hero.ctaContact")}
                                            </a>
                                        </div>

                                        {/* Work Status */}
                                        <p className="text-accent font-semibold text-center xl:text-left text-sm sm:text-base mt-4">{t("hero.workStatus")}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Right side - Featured Project */}
                        <AnimatedSection animation="fadeInRight" className="flex justify-center xl:justify-start items-center" immediate={true}>
                            <div className="w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl featured-project-container">
                                <FeaturedProject />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                {/* Skills Preview Indicator - Bottom of Hero */}
                <div className="flex justify-center py-2">
                    <AnimatedSection animation="fadeInUp" delay={0} immediate={true}>
                        <a
                            href="#skills"
                            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group px-6 py-3 rounded-full border border-border hover:border-accent hover:bg-card"
                        >
                            <span className="font-medium">{t("hero.skillsPreview")}</span>
                            <span className="transform group-hover:translate-y-1 transition-transform text-lg">↓</span>
                        </a>
                    </AnimatedSection>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="px-6 py-20 bg-muted/10">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">{t("skills.title")}</h2>
                        <p className="text-muted-foreground text-lg">{t("skills.tagline")}</p>
                    </AnimatedSection>

                    <div className="w-full">
                        <SkillsHighlight />
                    </div>
                </div>
            </section>

            <section id="projects" className="min-h-screen px-6 py-20 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">{t("projects.title")}</h2>
                        <p className="text-muted-foreground text-lg">{t("projects.tagline")}</p>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-2 gap-8">
                        <AnimatedSection animation="fadeInUp" delay={100}>
                            <a
                                href="https://xenovarush.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                                    <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                                        <Image
                                            src="/projects/xenora-rush.jpg"
                                            alt="Xenora Rush - Competitive Multiplayer Game"
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.xenora-rush.title")}</h3>
                                    <p className="text-muted-foreground mb-4 flex-1">{t("projects.items.xenora-rush.summary")}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {(t.raw("projects.items.xenora-rush.technologies") as string[]).map((tech: string, index: number) => (
                                            <TechnologyIcon key={index} technology={tech} />
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={200}>
                            <a
                                href="https://taskmanagerpro-jade.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="p-6 pb-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                                    <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                                        <Image
                                            src="/projects/taskmanager-pro.jpg"
                                            alt="TaskManager Pro - Full-stack Task Management"
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.taskmanager-pro.title")}</h3>
                                    <p className="text-muted-foreground mb-4 flex-1">{t("projects.items.taskmanager-pro.summary")}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {(t.raw("projects.items.taskmanager-pro.technologies") as string[]).map((tech: string, index: number) => (
                                            <TechnologyIcon key={index} technology={tech} />
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={300}>
                            <a
                                href="https://brutoria.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                                    <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                                        <Image
                                            src="/projects/brutoria.jpg"
                                            alt="Brutoria - Mobile Autobattler Game"
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.brutoria.title")}</h3>
                                    <p className="text-muted-foreground mb-4 flex-1">{t("projects.items.brutoria.summary")}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {(t.raw("projects.items.brutoria.technologies") as string[]).map((tech: string, index: number) => (
                                            <TechnologyIcon key={index} technology={tech} />
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={400}>
                            <a
                                href="https://otakucollector.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="p-6 pb-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                                    <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                                        <Image
                                            src="/projects/otakucollector.jpg"
                                            alt="OtakuCollector - Professional Anime Products E-commerce"
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.otaku-collector.title")}</h3>
                                    <p className="text-muted-foreground mb-4 flex-1">{t("projects.items.otaku-collector.summary")}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {(t.raw("projects.items.otaku-collector.technologies") as string[]).map((tech: string, index: number) => (
                                            <TechnologyIcon key={index} technology={tech} />
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <ArticlesSection />

            <section id="about" className="px-6 py-20 bg-muted/30">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection animation="fadeInLeft">
                        <h2 className="text-4xl font-bold text-foreground mb-6">{t("about.title")}</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">{t("about.bio")}</p>

                        {/* Resume Download Button */}
                        <div className="mb-8">
                            <a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <span>📎</span>
                                {t("about.resumeText")}
                            </a>
                        </div>

                        {/* Personal Interests */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground">{t("about.personalLife.title")}</h3>
                            <p className="text-muted-foreground text-lg mb-4">{t("about.personalLife.intro")}</p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                    <span className="text-lg">{t("about.personalLife.item1")}</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                    <span className="text-lg">{t("about.personalLife.item2")}</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                    <span className="text-lg">{t("about.personalLife.item3")}</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection animation="fadeInRight">
                        <div className="relative h-[28rem] w-80 rounded-2xl overflow-hidden border border-border shadow-2xl mx-auto">
                            <Image
                                src="/profile-about.jpg"
                                alt="José Sáez - Working Photo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <section id="contact" className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl font-bold text-foreground mb-6">{t("contact.cta")}</h2>
                        <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
                            <a
                                href="https://github.com/ewejose123"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t("contact.github")}
                                className="px-4 sm:px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold text-foreground transform hover:scale-105 text-sm sm:text-base"
                            >
                                {t("contact.github")}
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ewejose/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t("contact.linkedin")}
                                className="px-4 sm:px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold text-foreground transform hover:scale-105 text-sm sm:text-base"
                            >
                                {t("contact.linkedin")}
                            </a>
                            <a
                                href="mailto:ewejose@gmail.com"
                                className="px-4 sm:px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                {t("contact.email")}
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}
