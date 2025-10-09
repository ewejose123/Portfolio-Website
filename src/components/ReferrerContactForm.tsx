'use client'

import { useState } from "react"
import { useTranslations } from 'next-intl'
import ContactTracker from "@/components/ContactTracker"

export default function ReferrerContactForm() {
    const t = useTranslations()
    const [formData, setFormData] = useState({
        referrerName: '',
        referrerEmail: '',
        referrerPhone: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            const message = `🎯 ${t("referrer.contact.form.telegram.newReferral")}

👤 ${t("referrer.contact.form.telegram.referrer")}:
• ${t("referrer.contact.form.telegram.name")}: ${formData.referrerName}
• ${t("referrer.contact.form.telegram.email")}: ${formData.referrerEmail}
• ${t("referrer.contact.form.telegram.phone")}: ${formData.referrerPhone || t("referrer.contact.form.telegram.notProvided")}

👥 ${t("referrer.contact.form.telegram.client")}:
• ${t("referrer.contact.form.telegram.name")}: ${formData.clientName}
• ${t("referrer.contact.form.telegram.email")}: ${formData.clientEmail || t("referrer.contact.form.telegram.notProvided")}
• ${t("referrer.contact.form.telegram.phone")}: ${formData.clientPhone || t("referrer.contact.form.telegram.notProvided")}

💬 ${t("referrer.contact.form.telegram.additionalMessage")}:
${formData.message}

⏰ ${t("referrer.contact.form.telegram.date")}: ${new Date().toLocaleString('es-ES')}`

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
                    setFormData({
                        referrerName: '',
                        referrerEmail: '',
                        referrerPhone: '',
                        clientName: '',
                        clientEmail: '',
                        clientPhone: '',
                        message: ''
                    })
                } else {
                    throw new Error('Failed to send message')
                }
            } else {
                // Fallback: log to console (for development)
                console.log('Telegram message:', message)
                setSubmitStatus('success')
                setFormData({
                    referrerName: '',
                    referrerEmail: '',
                    referrerPhone: '',
                    clientName: '',
                    clientEmail: '',
                    clientPhone: '',
                    message: ''
                })
            }

        } catch (error) {
            console.error('Error sending message:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="p-0">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t("referrer.contact.form.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {t("referrer.contact.form.subtitle")}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Desktop Layout: Side by side sections */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Referrer Information Section */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-foreground border-b border-border pb-1">
                                👤 {t("webpages.contact.form.sections.referrerData")}
                            </h4>

                            {/* Referrer Name */}
                            <input
                                type="text"
                                name="referrerName"
                                value={formData.referrerName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                                placeholder={t("webpages.contact.form.referrerPlaceholders.name")}
                            />

                            {/* Referrer Email */}
                            <input
                                type="email"
                                name="referrerEmail"
                                value={formData.referrerEmail}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                                placeholder={t("webpages.contact.form.referrerPlaceholders.email")}
                            />

                            {/* Referrer Phone */}
                            <input
                                type="tel"
                                name="referrerPhone"
                                value={formData.referrerPhone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                                placeholder={t("webpages.contact.form.referrerPlaceholders.phone")}
                            />
                        </div>

                        {/* Client Information Section */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-foreground border-b border-border pb-1">
                                👥 {t("webpages.contact.form.sections.clientData")}
                            </h4>

                            {/* Client Name */}
                            <input
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                                placeholder={t("webpages.contact.form.clientPlaceholders.name")}
                            />

                            {/* Client Email */}
                            <input
                                type="email"
                                name="clientEmail"
                                value={formData.clientEmail}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                                placeholder={t("webpages.contact.form.clientPlaceholders.email")}
                            />

                            {/* Client Phone */}
                            <input
                                type="tel"
                                name="clientPhone"
                                value={formData.clientPhone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 text-base"
                                placeholder={t("webpages.contact.form.clientPlaceholders.phone")}
                            />
                        </div>
                    </div>

                    {/* Message Field - Full width below the two columns */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground border-b border-border pb-1">
                            💬 {t("webpages.contact.form.sections.additionalInfo")}
                        </h4>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none text-base"
                            placeholder={t("webpages.contact.form.additionalInfoPlaceholder")}
                        />
                    </div>

                    {/* Submit Button */}
                    <ContactTracker contactType="contact_section">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="cta-button w-full px-6 py-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
                        >
                            {isSubmitting ? t("referrer.contact.form.sending") : t("referrer.contact.form.submit")}
                        </button>
                    </ContactTracker>

                    {/* Promise Text */}
                    <p className="text-xs text-muted-foreground text-center">
                        {t("referrer.contact.form.promise")}
                    </p>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 text-center text-sm">
                            ✅ {t("referrer.contact.form.success")}
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-center text-sm">
                            ❌ {t("referrer.contact.form.error")}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
