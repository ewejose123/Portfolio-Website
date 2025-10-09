'use client'

import { useState } from "react"
import { useTranslations } from 'next-intl'
import ContactTracker from "@/components/ContactTracker"

export default function CompactContactForm() {
    const t = useTranslations()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        websiteType: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // Send message to Telegram bot
            const message = `🆕 ${t("webpages.contact.form.telegram.newInquiry")}

👤 ${t("webpages.contact.form.telegram.name")}: ${formData.name}
📧 ${t("webpages.contact.form.telegram.email")}: ${formData.email}
📱 ${t("webpages.contact.form.telegram.phone")}: ${formData.phone || t("webpages.contact.form.telegram.notProvided")}
🌐 ${t("webpages.contact.form.telegram.websiteType")}: ${formData.websiteType || t("webpages.contact.form.telegram.notSpecified")}

💬 ${t("webpages.contact.form.telegram.message")}:
${formData.message}

⏰ ${t("webpages.contact.form.telegram.date")}: ${new Date().toLocaleString('es-ES')}`

            const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
            const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

            if (telegramBotToken && telegramChatId) {
                const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: message,
                        parse_mode: 'HTML'
                    })
                })

                if (response.ok) {
                    setSubmitStatus('success')
                    setFormData({ name: '', email: '', phone: '', message: '', websiteType: '' })
                } else {
                    throw new Error('Failed to send message')
                }
            } else {
                // Fallback: log to console (for development)
                console.log('Telegram message:', message)
                setSubmitStatus('success')
                setFormData({ name: '', email: '', phone: '', message: '', websiteType: '' })
            }

        } catch (error) {
            console.error('Error sending message:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="p-6 rounded-lg border border-border bg-card/95 shadow-sm">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t("webpages.contact.form.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {t("webpages.contact.form.subtitle")}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                        placeholder={t("webpages.contact.form.placeholders.name")}
                    />

                    {/* Email Field */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                        placeholder={t("webpages.contact.form.placeholders.email")}
                    />

                    {/* Phone Field */}
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                        placeholder={t("webpages.contact.form.placeholders.phone")}
                    />

                    {/* Website Type Selector */}
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">{t("webpages.contact.form.websiteType")}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: 'simple', label: t("webpages.contact.form.websiteTypes.simple"), icon: '🌐' },
                                { value: 'shopify', label: t("webpages.contact.form.websiteTypes.shopify"), icon: '🛒' },
                                { value: 'custom', label: t("webpages.contact.form.websiteTypes.custom"), icon: '⚙️' },
                                { value: 'other', label: t("webpages.contact.form.websiteTypes.other"), icon: '💡' }
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, websiteType: option.value }))}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${formData.websiteType === option.value
                                        ? 'border-accent bg-accent/10 text-accent'
                                        : 'border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground'
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full transition-all duration-200 ${formData.websiteType === option.value
                                        ? 'bg-accent'
                                        : 'bg-muted-foreground/30'
                                        }`}></div>
                                    <span className="text-base">{option.icon}</span>
                                    <span className="font-medium">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Field */}
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none text-base"
                        placeholder={t("webpages.contact.form.placeholders.message")}
                    />

                    {/* Submit Button */}
                    <ContactTracker contactType="contact_section">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cta-button w-full px-6 py-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
                        >
                            {isSubmitting ? t("webpages.contact.form.sending") : t("webpages.contact.form.submit")}
                        </button>
                    </ContactTracker>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 text-center text-sm">
                            ✅ {t("webpages.contact.form.success")}
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-center text-sm">
                            ❌ {t("webpages.contact.form.error")}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
