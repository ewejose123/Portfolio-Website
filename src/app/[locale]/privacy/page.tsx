import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import Link from "next/link"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'privacy' })

    return {
        title: t('title'),
        description: t('introduction'),
    }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'privacy' })

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {t('lastUpdated')}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    {/* Introduction */}
                    <div className="mb-8">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {t('introduction')}
                        </p>
                    </div>

                    {/* Data Collection */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {t('dataCollection.title')}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('dataCollection.content')}
                        </p>
                    </div>

                    {/* Data Usage */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {t('dataUsage.title')}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('dataUsage.content')}
                        </p>
                    </div>

                    {/* Data Protection */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {t('dataProtection.title')}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('dataProtection.content')}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {t('contact.title')}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('contact.content')}
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
