import { getTranslations } from "next-intl/server"
import SkillsHighlight from "@/components/SkillsHighlight"
import AnimatedSection from "@/components/AnimatedSection"
import FeaturedProject from "@/components/FeaturedProject"
import TechnologyIcon from "@/components/TechnologyIcon"
import Image from "next/image"
import Link from "next/link"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return (
    <main>
      <section id="hero" className="px-24 py-20">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Profile */}
          <AnimatedSection animation="fadeInLeft" className="flex justify-center lg:justify-start">
            <div className="w-full max-w-3xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Profile Image */}
                <div className="relative w-100 h-140 rounded-2xl overflow-hidden border border-border shadow-2xl flex-shrink-0">
                  <Image
                    src="/profile-main.jpg"
                    alt="José Sáez - Profile Photo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Personal Info */}
                <div className="text-center lg:text-left space-y-4 flex-1">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                    {t("hero.name")}
                  </h1>
                  <h2 className="text-xl lg:text-2xl text-primary font-semibold">
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
                  <p className="text-lg text-muted-foreground leading-relaxed">
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
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#projects"
                      className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {t("hero.ctaProjects")}
                    </a>
                    <a
                      href="#contact"
                      className="px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold"
                    >
                      {t("hero.ctaContact")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right side - Featured Project */}
          <AnimatedSection animation="fadeInRight" className="flex justify-center lg:justify-end">
            <FeaturedProject />
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Preview Indicator - Middle of page */}
      <div className="flex justify-center py-8 bg-muted/5">
        <AnimatedSection animation="fadeInUp">
          <a
            href="#skills"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group px-6 py-3 rounded-full border border-border hover:border-accent hover:bg-card"
          >
            <span className="font-medium">{t("hero.skillsPreview")}</span>
            <span className="transform group-hover:translate-y-1 transition-transform text-lg">↓</span>
          </a>
        </AnimatedSection>
      </div>

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
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={100}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full">
                <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src="/projects/xenora-rush.jpg"
                    alt="Xenora Rush - Competitive Multiplayer Game"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.xenora-rush.title")}</h3>
                <p className="text-muted-foreground mb-4">{t("projects.items.xenora-rush.summary")}</p>
                <div className="flex flex-wrap gap-2">
                  {(t.raw("projects.items.xenora-rush.technologies") as string[]).map((tech: string, index: number) => (
                    <TechnologyIcon key={index} technology={tech} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full">
                <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src="/projects/taskmanager-pro.jpg"
                    alt="TaskManager Pro - Full-stack Task Management"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.taskmanager-pro.title")}</h3>
                <p className="text-muted-foreground mb-4">{t("projects.items.taskmanager-pro.summary")}</p>
                <div className="flex flex-wrap gap-2">
                  {(t.raw("projects.items.taskmanager-pro.technologies") as string[]).map((tech: string, index: number) => (
                    <TechnologyIcon key={index} technology={tech} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full">
                <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src="/projects/portfolio-website.jpg"
                    alt="Portfolio Website - Modern Next.js Portfolio"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("projects.items.portfolio-site.title")}</h3>
                <p className="text-muted-foreground mb-4">{t("projects.items.portfolio-site.summary")}</p>
                <div className="flex flex-wrap gap-2">
                  {(t.raw("projects.items.portfolio-site.technologies") as string[]).map((tech: string, index: number) => (
                    <TechnologyIcon key={index} technology={tech} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="articles" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t("articles.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("articles.tagline")}</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={100}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                <div className="h-48 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 flex items-center justify-center">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("articles.items.api-performance.title")}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{t("articles.items.api-performance.summary")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(t.raw("articles.items.api-performance.tags") as string[]).map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/articles/api-performance"
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  {t("articles.readMore")} →
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                <div className="h-48 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-4xl">🎮</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("articles.items.game-matchmaking.title")}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{t("articles.items.game-matchmaking.summary")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(t.raw("articles.items.game-matchmaking.tags") as string[]).map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/articles/game-matchmaking"
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  {t("articles.readMore")} →
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-full flex flex-col">
                <div className="h-48 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 mb-4 flex items-center justify-center">
                  <span className="text-4xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("articles.items.debugging-physics.title")}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{t("articles.items.debugging-physics.summary")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(t.raw("articles.items.debugging-physics.tags") as string[]).map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/articles/debugging-physics"
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  {t("articles.readMore")} →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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
                <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200">
                  <span className="text-lg">{t("about.personalLife.item1")}</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200">
                  <span className="text-lg">{t("about.personalLife.item2")}</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200">
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
              {/* Fallback for missing image */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-muted-foreground">Add working photo to /public/profile-about.jpg</p>
                </div>
              </div> */}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-6">{t("contact.cta")}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="#"
                aria-label={t("contact.github")}
                className="px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold text-foreground transform hover:scale-105"
              >
                {t("contact.github")}
              </a>
              <a
                href="#"
                aria-label={t("contact.linkedin")}
                className="px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold text-foreground transform hover:scale-105"
              >
                {t("contact.linkedin")}
              </a>
              <a
                href="mailto:email@example.com"
                className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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


