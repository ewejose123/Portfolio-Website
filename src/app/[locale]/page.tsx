import { getTranslations } from "next-intl/server"
import AnimatedSection from "@/components/AnimatedSection"
import CollapsibleFAQ from "@/components/CollapsibleFAQ"
import ContactTracker from "@/components/ContactTracker"
import TestimonialsCarousel from "@/components/TestimonialsCarousel"
import Image from "next/image"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params

    const baseUrl = 'https://ewejose.com'
    const currentUrl = `${baseUrl}/${locale}`

    if (locale === 'es') {
        return {
            title: "Páginas Web Profesionales desde €300 | Desarrollo Web Rápido",
            description: "Crea tu página web profesional en 3-7 días. Desde €300 para pequeñas empresas. Telemático con 5+ años de experiencia. Diseño responsive, SEO optimizado, soporte 30 días.",
            keywords: "páginas web, desarrollo web, páginas web baratas, diseño web profesional, páginas web para empresas, desarrollo web España, páginas web responsive, SEO web, tiendas online, Shopify España",
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
                title: "Páginas Web Profesionales desde €300 | Desarrollo Web Rápido",
                description: "Crea tu página web profesional en 3-7 días. Desde €300 para pequeñas empresas. Telemático con 5+ años de experiencia.",
                siteName: "Ewe José - Desarrollo Web",
                images: [
                    {
                        url: `${baseUrl}/og-image-es.jpg`,
                        width: 1200,
                        height: 630,
                        alt: "Páginas Web Profesionales - Desarrollo Web España",
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: "Páginas Web Profesionales desde €300",
                description: "Crea tu página web profesional en 3-7 días. Desde €300 para pequeñas empresas.",
                images: [`${baseUrl}/og-image-es.jpg`],
            },
            alternates: {
                canonical: currentUrl,
                languages: {
                    'es': currentUrl,
                    'en': `${baseUrl}/en`,
                },
            },
            verification: {
                google: 'your-google-verification-code',
            },
            category: 'Technology',
        }
    } else {
        return {
            title: "Professional Websites from €300 | Fast Web Development",
            description: "Get your professional website in 3-7 days. From €300 for small businesses. Telematic Engineer with 5+ years experience. Responsive design, SEO optimized, 30-day support.",
            keywords: "website development, web design, cheap websites, professional web design, business websites, web development Spain, responsive websites, SEO websites, online stores, Shopify Spain",
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
                title: "Professional Websites from €300 | Fast Web Development",
                description: "Get your professional website in 3-7 days. From €300 for small businesses. Telematic Engineer with 5+ years experience.",
                siteName: "Ewe José - Web Development",
                images: [
                    {
                        url: `${baseUrl}/og-image-en.jpg`,
                        width: 1200,
                        height: 630,
                        alt: "Professional Websites - Web Development Spain",
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: "Professional Websites from €300",
                description: "Get your professional website in 3-7 days. From €300 for small businesses.",
                images: [`${baseUrl}/og-image-en.jpg`],
            },
            alternates: {
                canonical: currentUrl,
                languages: {
                    'en': currentUrl,
                    'es': `${baseUrl}/es`,
                },
            },
            verification: {
                google: 'your-google-verification-code',
            },
            category: 'Technology',
        }
    }
}

export default async function WebpagesPage({ params }: { params: Promise<{ locale: string }> }) {
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
                        "@type": "ProfessionalService",
                        "name": locale === 'es' ? "Ewe José - Desarrollo Web Profesional" : "Ewe José - Professional Web Development",
                        "description": locale === 'es'
                            ? "Servicios de desarrollo web profesional desde €300. Páginas web para pequeñas empresas, tiendas Shopify y aplicaciones personalizadas."
                            : "Professional web development services from €300. Websites for small businesses, Shopify stores and custom applications.",
                        "url": `https://ewejose.com/${locale}`,
                        "logo": "https://ewejose.com/logo.png",
                        "image": "https://ewejose.com/og-image.jpg",
                        "telephone": "+34 632 239 50",
                        "email": "ewejose@gmail.com",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "ES",
                            "addressRegion": "España"
                        },
                        "founder": {
                            "@type": "Person",
                            "name": "Ewe José Omusi Sáez",
                            "jobTitle": locale === 'es' ? "Ingeniero Telemático" : "Telematic Engineer",
                            "description": locale === 'es'
                                ? "Desarrollador Full Stack con más de 5 años de experiencia especializada"
                                : "Full Stack Developer with more than 5 years specialized experience"
                        },
                        "serviceType": [
                            locale === 'es' ? "Desarrollo de Páginas Web" : "Website Development",
                            locale === 'es' ? "Tiendas Shopify" : "Shopify Stores",
                            locale === 'es' ? "Aplicaciones Web Personalizadas" : "Custom Web Applications"
                        ],
                        "areaServed": {
                            "@type": "Country",
                            "name": "Spain"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": locale === 'es' ? "Servicios de Desarrollo Web" : "Web Development Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": locale === 'es' ? "Páginas Web Simples" : "Simple Websites",
                                        "description": locale === 'es'
                                            ? "Páginas web profesionales para pequeñas empresas desde €300"
                                            : "Professional websites for small businesses from €300"
                                    },
                                    "price": "300",
                                    "priceCurrency": "EUR",
                                    "priceRange": "€300-€500"
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": locale === 'es' ? "Tiendas Shopify" : "Shopify Stores",
                                        "description": locale === 'es'
                                            ? "Tiendas online profesionales desde €1000"
                                            : "Professional online stores from €1000"
                                    },
                                    "price": "1000",
                                    "priceCurrency": "EUR",
                                    "priceRange": "€1000-€1500"
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": locale === 'es' ? "Proyectos Personalizados" : "Custom Projects",
                                        "description": locale === 'es'
                                            ? "Aplicaciones web y tiendas completamente personalizadas desde €1500"
                                            : "Fully custom web applications and stores from €1500"
                                    },
                                    "price": "1500",
                                    "priceCurrency": "EUR",
                                    "priceRange": "€1500+"
                                }
                            ]
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "5",
                            "reviewCount": "10",
                            "bestRating": "5",
                            "worstRating": "1"
                        }
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
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <AnimatedSection animation="fadeInUp" immediate={true}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                                        {t("webpages.hero.title")}
                                    </h1>
                                    <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                                        {t("webpages.hero.subtitle")}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-base text-white/80 font-semibold">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                        {t("webpages.hero.socialProof")}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent"></span>
                                        {t("webpages.hero.pricing")}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        {t("webpages.hero.urgency")}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-base text-white/80 font-semibold">{t("webpages.hero.tagline")}</p>
                                    <ContactTracker contactType="contact_section">
                                        <a
                                            href="#contact"
                                            className="inline-block px-8 py-4 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg drop-shadow-md"
                                        >
                                            {t("webpages.hero.cta")}
                                        </a>
                                    </ContactTracker>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Star Rating Section */}
                <section className="px-6 pt-2 pb-4 bg-muted/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <AnimatedSection animation="fadeInUp">
                            {/* Desktop Layout */}
                            <div className="hidden md:flex items-center justify-center gap-4">
                                <div className="flex gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-2xl font-black">★</span>
                                    ))}
                                </div>
                                <p className="text-xl font-bold text-foreground leading-none">
                                    {t("webpages.starRating.title")}
                                </p>
                                <p className="text-xl text-muted-foreground font-semibold leading-none">
                                    {t("webpages.starRating.subtitle")}
                                </p>
                            </div>

                            {/* Mobile Layout - Compact */}
                            <div className="md:hidden">
                                {/* Stars on top */}
                                <div className="flex justify-center gap-1 text-yellow-400 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-xl font-black">★</span>
                                    ))}
                                </div>
                                {/* Text below in one line - centered in their respective parts */}
                                <div className="flex items-center justify-between text-sm font-semibold leading-none">
                                    <div className="flex-1 text-center">
                                        <span className="text-foreground">
                                            {t("webpages.starRating.title")}
                                        </span>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <span className="text-muted-foreground">
                                            {t("webpages.starRating.subtitle")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Simple Shopify Section - Left Info, Right Visuals */}
                <section id="simple-shopify" className="px-6 py-20 bg-blue-900/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection animation="fadeInLeft">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                                            {t("webpages.services.simpleShopify.title")}
                                        </h2>
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl md:text-4xl font-bold text-primary">
                                                {t("webpages.services.simpleShopify.price")}
                                            </span>
                                        </div>
                                        <p className="text-xl text-muted-foreground">
                                            {t("webpages.services.simpleShopify.target")}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-border">
                                        <p className="text-foreground font-medium">
                                            {t("webpages.services.simpleShopify.painPoint")}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {(t.raw("webpages.services.simpleShopify.features") as string[]).map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                                <span className="text-base text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                                            {t("webpages.services.simpleShopify.timeline")}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {t("webpages.services.simpleShopify.socialProof")}
                                        </div>
                                    </div>

                                    <ContactTracker
                                        contactType="contact_section"
                                        serviceType="simple_shopify"
                                        priceRange="€1000 - €1500"
                                    >
                                        <a
                                            href="#contact"
                                            className="inline-block px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            {t("webpages.services.simpleShopify.cta")}
                                        </a>
                                    </ContactTracker>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInRight">
                                {/* <a href="https://thesamsneakers.com" target="_blank" rel="noopener noreferrer" className="block"> */}
                                <div className="relative h-[28rem] rounded-2xl overflow-hidden border border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                    <Image
                                        src="/projects/shopify-mockup.jpg"
                                        alt="Simple Shopify Shop Mockup"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* </a> */}
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Simple Websites Section - Right Info, Left Visuals */}
                <section id="simple-websites" className="px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Image - Hidden on mobile, shown first on desktop */}
                            <AnimatedSection animation="fadeInLeft" className="hidden lg:block">
                                <a href="https://xenovarush.com" target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="relative h-[28rem] rounded-2xl overflow-hidden border border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                        <Image
                                            src="/projects/xenora-rush.jpg"
                                            alt="Simple Website Mockup"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>
                            </AnimatedSection>

                            {/* Content - Shown first on mobile, second on desktop */}
                            <AnimatedSection animation="fadeInRight">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                            {t("webpages.services.simpleWebsites.title")}
                                        </h2>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl md:text-3xl font-bold text-primary">
                                                {t("webpages.services.simpleWebsites.price")}
                                            </span>
                                            <span className="text-base text-muted-foreground">
                                                {t("webpages.services.simpleWebsites.priceAnchor")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-muted-foreground">
                                            {t("webpages.services.simpleWebsites.target")}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-border">
                                        <p className="text-foreground font-medium">
                                            {t("webpages.services.simpleWebsites.painPoint")}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {(t.raw("webpages.services.simpleWebsites.features") as string[]).map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                                            {t("webpages.services.simpleWebsites.timeline")}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {t("webpages.services.simpleWebsites.guarantee")}
                                        </div>
                                    </div>

                                    <ContactTracker
                                        contactType="contact_section"
                                        serviceType="simple_website"
                                        priceRange="€300 - €500"
                                    >
                                        <a
                                            href="#contact"
                                            className="inline-block px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            {t("webpages.services.simpleWebsites.cta")}
                                        </a>
                                    </ContactTracker>
                                </div>
                            </AnimatedSection>

                            {/* Mobile Image - Shown only on mobile, at the bottom */}
                            <AnimatedSection animation="fadeInUp" className="lg:hidden">
                                <a href="https://xenovarush.com" target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="relative h-[20rem] rounded-2xl overflow-hidden border border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                        <Image
                                            src="/projects/xenora-rush.jpg"
                                            alt="Simple Website Mockup"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Custom Shopify Section - Left Info, Right Visuals */}
                <section id="custom-shopify" className="px-6 py-20 bg-blue-900/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection animation="fadeInLeft">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                                {t("webpages.services.customShopify.title")}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl md:text-3xl font-bold text-primary">
                                                {t("webpages.services.customShopify.price")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-muted-foreground">
                                            {t("webpages.services.customShopify.target")}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-border">
                                        <p className="text-foreground font-medium">
                                            {t("webpages.services.customShopify.painPoint")}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {(t.raw("webpages.services.customShopify.features") as string[]).map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                                            {t("webpages.services.customShopify.timeline")}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {t("webpages.services.customShopify.roi")}
                                        </div>
                                    </div>

                                    <ContactTracker
                                        contactType="contact_section"
                                        serviceType="custom_shopify"
                                        priceRange="€1500+"
                                    >
                                        <a
                                            href="#contact"
                                            className="inline-block px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            {t("webpages.services.customShopify.cta")}
                                        </a>
                                    </ContactTracker>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInRight">
                                <a href="https://taskmanagerpro-jade.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="relative h-[28rem] rounded-2xl overflow-hidden border border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                        <Image
                                            src="/projects/taskmanager-pro.jpg"
                                            alt="Custom Shopify & Web App Mockup"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Why Choose Me Section */}
                <section className="px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("webpages.whyChooseMe.title")}
                            </h2>
                            <p className="text-muted-foreground text-xl">
                                {t("webpages.whyChooseMe.subtitle")}
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatedSection animation="fadeInUp" delay={100}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🎯</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("webpages.whyChooseMe.points.experience.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("webpages.whyChooseMe.points.experience.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={200}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">⚙️</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("webpages.whyChooseMe.points.education.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("webpages.whyChooseMe.points.education.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={300}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🌍</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("webpages.whyChooseMe.points.languages.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("webpages.whyChooseMe.points.languages.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={400}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">⚡</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("webpages.whyChooseMe.points.speed.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("webpages.whyChooseMe.points.speed.description")}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={500}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 hover:border-accent/50 transition-all duration-300 text-center shadow-lg">
                                    <div className="text-4xl mb-4">🤝</div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t("webpages.whyChooseMe.points.support.title")}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("webpages.whyChooseMe.points.support.description")}
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="px-6 pt-20 pb-12 bg-blue-900/10">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("webpages.testimonials.title")}
                            </h2>
                            <p className="text-muted-foreground text-xl">
                                {t("webpages.testimonials.subtitle")}
                            </p>
                        </AnimatedSection>

                        {/* All Screen Sizes Carousel */}
                        <div className="hidden">
                            <AnimatedSection animation="fadeInUp" delay={100}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 text-center shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex justify-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-2xl font-black">★</span>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-foreground text-lg">
                                                {t("webpages.testimonials.items.restaurant.name")}
                                            </h4>
                                            <p className="text-base text-muted-foreground">
                                                {t("webpages.testimonials.items.restaurant.business")}
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground italic text-base">
                                            &ldquo;{t("webpages.testimonials.items.restaurant.quote")}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={200}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 text-center shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex justify-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-2xl font-black">★</span>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-foreground text-lg">
                                                {t("webpages.testimonials.items.consultant.name")}
                                            </h4>
                                            <p className="text-base text-muted-foreground">
                                                {t("webpages.testimonials.items.consultant.business")}
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground italic text-base">
                                            &ldquo;{t("webpages.testimonials.items.consultant.quote")}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={300}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 text-center shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex justify-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-2xl font-black">★</span>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-foreground text-lg">
                                                {t("webpages.testimonials.items.plumber.name")}
                                            </h4>
                                            <p className="text-base text-muted-foreground">
                                                {t("webpages.testimonials.items.plumber.business")}
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground italic text-base">
                                            &ldquo;{t("webpages.testimonials.items.plumber.quote")}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeInUp" delay={400}>
                                <div className="p-6 rounded-2xl border border-border bg-card/95 text-center shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex justify-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-2xl font-black">★</span>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-foreground text-lg">
                                                {t("webpages.testimonials.items.boutique.name")}
                                            </h4>
                                            <p className="text-base text-muted-foreground">
                                                {t("webpages.testimonials.items.boutique.business")}
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground italic text-base">
                                            &ldquo;{t("webpages.testimonials.items.boutique.quote")}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Responsive Carousel */}
                        <TestimonialsCarousel />
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="px-6 py-20 bg-blue-900/10">
                    <div className="max-w-7xl mx-auto">
                        <AnimatedSection animation="fadeInUp" className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t("webpages.faq.title")}
                            </h2>
                            <p className="text-muted-foreground text-xl">
                                {t("webpages.faq.subtitle")}
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(t.raw("webpages.faq.questions") as Record<string, { question: string, answer: string }>).map(([key, faq], index) => (
                                <CollapsibleFAQ
                                    key={key}
                                    question={faq.question}
                                    answer={faq.answer}
                                    delay={index * 50}
                                />
                            ))}
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
                                        {t("webpages.contact.title")}
                                    </h2>
                                    <p className="text-xl text-muted-foreground">
                                        {t("webpages.contact.subtitle")}
                                    </p>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-base text-muted-foreground max-w-5xl mx-auto font-semibold">
                                    <span className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-secondary"></span>
                                        {t("webpages.contact.freeConsultation")}
                                    </span>
                                    <span className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-accent"></span>
                                        {t("webpages.contact.urgency")}
                                    </span>
                                    <span className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                                        {t("webpages.contact.guarantee")}
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="text-3xl">📞</span>
                                            <ContactTracker contactType="phone">
                                                <a
                                                    href={`tel:${t("webpages.contact.phone")}`}
                                                    className="px-8 py-4 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xl drop-shadow-md"
                                                >
                                                    {t("webpages.contact.phone")}
                                                </a>
                                            </ContactTracker>
                                        </div>
                                        <p className="text-base text-muted-foreground">
                                            {t("webpages.contact.phoneCta")}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <ContactTracker contactType="whatsapp">
                                            <a
                                                href={`https://wa.me/${t("webpages.contact.phone").replace(/\s/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-200 font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                                </svg>
                                                {t("webpages.contact.phone")}
                                            </a>
                                        </ContactTracker>
                                        <ContactTracker contactType="email">
                                            <a
                                                href={`mailto:ewejose@gmail.com`}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold"
                                            >
                                                <span className="text-lg">✉️</span>
                                                ewejose@gmail.com
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
