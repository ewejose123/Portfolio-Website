'use client'

import { useTranslations } from 'next-intl'

interface WorkInProgressModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function WorkInProgressModal({ isOpen, onClose }: WorkInProgressModalProps) {
    const t = useTranslations('articles.workInProgress')

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{t('title')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {t('message')}
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-200 transform hover:scale-105"
                    >
                        {t('close')}
                    </button>
                </div>
            </div>
        </div>
    )
}