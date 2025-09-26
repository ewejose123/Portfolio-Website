import { getTranslations } from "next-intl/server"
import AnimatedSection from "@/components/AnimatedSection"
import CollapsibleFAQ from "@/components/CollapsibleFAQ"
import ContactTracker from "@/components/ContactTracker"
import Image from "next/image"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params

    const baseUrl = 'https://ewejose.com'
    const currentUrl = `${baseUrl}/${locale}/referidos`

    if (locale === 'es') {
        return {
            title: "Gana €50-€200+ Por Cada Referido | Programa de Referidos Web",
            description: "Cobra 10% de comisión por cada persona que refieras para crear páginas web. Sin trabajo requerido, solo conecta personas. Pago en 3 días por Bizum, PayPal o transferencia.",
            keywords: "programa referidos, ganar dinero referidos, comisión páginas web, referidos España, ganar dinero online, programa afiliados web, comisión desarrollo web, referidos páginas web",
            authors: [{ name: "Ewe José Omusi Sáez" }],
            creator: "Ewe José Omusi Sáez",
            publisher: "Ewe José Omusi Sáez",
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            openGraph: {
                type: 'website',
                locale: 'es_ES',
                url: currentUrl,
                title: "Gana €50-€200+ Por Cada Referido | Programa de Referidos Web",
                description: "Cobra 10% de comisión por cada persona que refieras para crear páginas web. Sin trabajo requerido, solo conecta personas.",
                siteName: "Ewe José - Programa de Referidos",
                images: [
                    {
                        url: `${baseUrl}/og-image-referidos-es.jpg`,
                        width: 1200,
                        height: 630,
                        alt: "Programa de Referidos - Gana Dinero Refiriendo Clientes",
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: "Gana €50-€200+ Por Cada Referido",
                description: "Cobra 10% de comisión por cada persona que refieras para crear páginas web.",
                images: [`${baseUrl}/og-image-referidos-es.jpg`],
            },
            alternates: {
                canonical: currentUrl,
                languages: {
                    'es': currentUrl,
                    'en': `${baseUrl}/en/referidos`,
                },
            },
            verification: {
                google: 'your-google-verification-code',
            },
            category: 'Business',
        }
    } else {
        return {
            title: "Earn €50-€200+ Per Website Referral | Referral Program",
            description: "Get paid 10% commission for every person you refer for website creation. No work required, just connect people. Payment in 3 days via Bizum, PayPal or bank transfer.",
            keywords: "referral program, earn money referrals, website commission, referrals Spain, make money online, web affiliate program, web development commission, website referrals",
            authors: [{ name: "Ewe José Omusi Sáez" }],
            creator: "Ewe José Omusi Sáez",
            publisher: "Ewe José Omusi Sáez",
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            openGraph: {
                type: 'website',
                locale: 'en_US',
                url: currentUrl,
                title: "Earn €50-€200+ Per Website Referral | Referral Program",
                description: "Get paid 10% commission for every person you refer for website creation. No work required, just connect people.",
                siteName: "Ewe José - Referral Program",
                images: [
                    {
                        url: `${baseUrl}/og-image-referidos-en.jpg`,
                        width: 1200,
                        height: 630,
                        alt: "Referral Program - Earn Money Referring Clients",
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: "Earn €50-€200+ Per Website Referral",
                description: "Get paid 10% commission for every person you refer for website creation.",
                images: [`${baseUrl}/og-image-referidos-en.jpg`],
            },
            alternates: {
                canonical: currentUrl,
                languages: {
                    'en': currentUrl,
                    'es': `${baseUrl}/es/referidos`,
                },
            },
            verification: {
                google: 'your-google-verification-code',
            },
            category: 'Business',
        }
    }
}

export default async function ReferrerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale })

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProgramMembership",
                        "name": locale === 'es' ? "Programa de Referidos Web" : "Website Referral Program",
                        "description": locale === 'es'
                            ? "Gana €50-€200+ por cada persona que refieras para crear páginas web. Sin trabajo requerido, solo conecta personas."
                            : "Earn €50-€200+ for every person you refer for website creation. No work required, just connect people.",
                        "url": `https://ewejose.com/${locale}/referidos`,
                        "provider": {
                            "@type": "ProfessionalService",
                            "name": "Ewe José - Desarrollo Web",
                            "telephone": "+34 632 239 50",
                            "email": "ewejose@gmail.com"
                        },
                        "member": {
                            "@type": "Person",
                            "name": locale === 'es' ? "Referidos del Programa" : "Program Referrers"
                        },
                        "programName": locale === 'es' ? "Programa de Referidos Web" : "Website Referral Program",
                        "membershipPoints": [
                            {
                                "@type": "Text",
                                "text": locale === 'es'
                                    ? "€50 comisión por páginas web simples (10% de €500)"
                                    : "€50 commission for simple websites (10% of €500)"
                            },
                            {
                                "@type": "Text",
                                "text": locale === 'es'
                                    ? "€150 comisión por tiendas Shopify (10% de €1500)"
                                    : "€150 commission for Shopify stores (10% of €1500)"
                            },
                            {
                                "@type": "Text",
                                "text": locale === 'es'
                                    ? "€200+ comisión por proyectos personalizados (10% de €2000+)"
                                    : "€200+ commission for custom projects (10% of €2000+)"
                            }
                        ],
                        "termsOfService": locale === 'es'
                            ? "Pago en 3 días por Bizum, PayPal o transferencia bancaria"
                            : "Payment in 3 days via Bizum, PayPal or bank transfer",
                        "category": "Business"
                    })
                }}
            />
            <main>
                {/* Hero Section */}
                <section id="hero" className="min-h-[70vh] flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 py-16 relative">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-background.jpg"
                            alt="Hero Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/70"></div>
                    </div>
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <AnimatedSection animation="fadeInUp" immediate={true}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                                        {t("referrer.hero.title")}
                                    </h1>
                                    <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                                        {t("referrer.hero.subtitle")}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-white/90 font-bold max-w-4xl mx-auto">
                                    <span className="flex items-center gap-2 text-center">
                                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                        {t("referrer.hero.fomo")}
                                    </span>
                                    <span className="flex items-center gap-2 text-center">
                                        <span className="w-2 h-2 rounded-full bg-accent"></span>
                                        {t("referrer.hero.limited")}
                                    </span>
                                    <span className="flex items-center gap-2 text-center">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        {t("referrer.hero.easy")}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-base text-white/80 font-semibold">{t("referrer.hero.tagline")}</p>
                                    <ContactTracker contactType="contact_section">
                                        <a
                                            href="#contact"
                                            className="inline-block px-8 py-4 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg drop-shadow-md"
                                        >
                                            {t("referrer.hero.cta")}
                                        </a>
                                    </ContactTracker>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="px-6 py-20 bg-blue-900/5">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("referrer.howItWorks.title")}
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                {t("referrer.howItWorks.subtitle")}
                            </p>
                        </AnimatedSection>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                            <AnimatedSection animation="fadeInUp" delay={100}>
                                <div className="text-center p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 shadow-lg">
                                    <div className="text-6xl mb-4">👥</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">
                                        {t("referrer.howItWorks.step1.title")}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {t("referrer.howItWorks.step1.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <div className="text-4xl text-accent md:hidden">↓</div>
                            <div className="text-4xl text-accent hidden md:block">→</div>

                            <AnimatedSection animation="fadeInUp" delay={200}>
                                <div className="text-center p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 shadow-lg">
                                    <div className="text-6xl mb-4">📞</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">
                                        {t("referrer.howItWorks.step2.title")}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {t("referrer.howItWorks.step2.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <div className="text-4xl text-accent md:hidden">↓</div>
                            <div className="text-4xl text-accent hidden md:block">→</div>

                            <AnimatedSection animation="fadeInUp" delay={300}>
                                <div className="text-center p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 shadow-lg">
                                    <div className="text-6xl mb-4">💰</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">
                                        {t("referrer.howItWorks.step3.title")}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {t("referrer.howItWorks.step3.description")}
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Commission Structure Section */}
                <section className="px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("referrer.commission.title")}
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                {t("referrer.commission.subtitle")}
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 gap-8">
                            <AnimatedSection animation="fadeInUp" delay={100}>
                                <div className="p-8 rounded-2xl border border-border bg-card/95 hover:border-primary/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🌐</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {t("referrer.commission.simple.title")}
                                    </h3>
                                    <div className="text-4xl font-bold text-primary mb-4">
                                        €50
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        {t("referrer.commission.simple.description")}
                                    </p>
                                    <div className="p-3 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-border">
                                        <p className="text-sm font-medium text-foreground">
                                            {t("referrer.commission.simple.price")}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={200}>
                                <div className="p-8 rounded-2xl border border-border bg-card/95 hover:border-primary/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🛒</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {t("referrer.commission.shopify.title")}
                                    </h3>
                                    <div className="text-4xl font-bold text-primary mb-4">
                                        €150
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        {t("referrer.commission.shopify.description")}
                                    </p>
                                    <div className="p-3 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-border">
                                        <p className="text-sm font-medium text-foreground">
                                            {t("referrer.commission.shopify.price")}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={300}>
                                <div className="p-8 rounded-2xl border border-border bg-card/95 hover:border-primary/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">⚡</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {t("referrer.commission.custom.title")}
                                    </h3>
                                    <div className="text-4xl font-bold text-primary mb-4">
                                        €200+
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        {t("referrer.commission.custom.description")}
                                    </p>
                                    <div className="p-3 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-border">
                                        <p className="text-sm font-medium text-foreground">
                                            {t("referrer.commission.custom.price")}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Why Refer Section */}
                <section className="px-6 py-20 bg-blue-900/10">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("referrer.whyRefer.title")}
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                {t("referrer.whyRefer.subtitle")}
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatedSection animation="fadeInUp" delay={100}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">⚡</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("referrer.whyRefer.fast.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("referrer.whyRefer.fast.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={200}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🎯</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("referrer.whyRefer.quality.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("referrer.whyRefer.quality.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={300}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🤝</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("referrer.whyRefer.support.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("referrer.whyRefer.support.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={400}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">📈</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("referrer.whyRefer.conversion.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("referrer.whyRefer.conversion.description")}
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("referrer.faq.title")}
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                {t("referrer.faq.subtitle")}
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-6">
                            <CollapsibleFAQ
                                question={t("referrer.faq.items.payment.question")}
                                answer={t("referrer.faq.items.payment.answer")}
                                delay={100}
                            />
                            <CollapsibleFAQ
                                question={t("referrer.faq.items.referral.question")}
                                answer={t("referrer.faq.items.referral.answer")}
                                delay={200}
                            />
                            <CollapsibleFAQ
                                question={t("referrer.faq.items.tracking.question")}
                                answer={t("referrer.faq.items.tracking.answer")}
                                delay={300}
                            />
                            <CollapsibleFAQ
                                question={t("referrer.faq.items.friends.question")}
                                answer={t("referrer.faq.items.friends.answer")}
                                delay={400}
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="px-6 py-20 bg-muted/20">
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimatedSection animation="fadeInUp">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                                        {t("referrer.contact.title")}
                                    </h2>
                                    <p className="text-xl text-muted-foreground">
                                        {t("referrer.contact.subtitle")}
                                    </p>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-base text-muted-foreground max-w-5xl mx-auto font-semibold">
                                    <span className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-secondary"></span>
                                        {t("referrer.contact.freeConsultation")}
                                    </span>
                                    <span className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-accent"></span>
                                        {t("referrer.contact.urgency")}
                                    </span>
                                    <span className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                                        {t("referrer.contact.guarantee")}
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="text-3xl">📞</span>
                                            <ContactTracker contactType="phone">
                                                <a
                                                    href={`tel:${t("referrer.contact.phone")}`}
                                                    className="px-8 py-4 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xl drop-shadow-md"
                                                >
                                                    {t("referrer.contact.phone")}
                                                </a>
                                            </ContactTracker>
                                        </div>
                                        <p className="text-base text-muted-foreground">
                                            {t("referrer.contact.phoneCta")}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <ContactTracker contactType="whatsapp">
                                            <a
                                                href={`https://wa.me/${t("referrer.contact.phone").replace(/\s/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-200 font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                                </svg>
                                                {t("referrer.contact.whatsapp")}
                                            </a>
                                        </ContactTracker>
                                        <ContactTracker contactType="email">
                                            <a
                                                href={`mailto:ewejose@gmail.com`}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold"
                                            >
                                                <span className="text-lg">✉️</span>
                                                {t("referrer.contact.email")}
                                            </a>
                                        </ContactTracker>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>
        </>
    )
}
