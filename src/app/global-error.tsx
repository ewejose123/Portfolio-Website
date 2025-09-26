'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-muted/20">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 select-none">
                                500
                            </h1>
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                    ¡Ups! Algo salió mal
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                    Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={reset}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <span className="text-xl">🔄</span>
                                Intentar de nuevo
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold"
                            >
                                <span className="text-xl">🏠</span>
                                Ir al inicio
                            </Link>
                        </div>

                        <div className="pt-4 text-xs text-muted-foreground">
                            <p>
                                ¿Necesitas ayuda? Contáctanos:
                                <a href="tel:+3463223950" className="text-primary hover:text-primary/80 ml-1">
                                    +34 632 239 50
                                </a>
                                {' '}o{' '}
                                <a href="mailto:ewejose@gmail.com" className="text-primary hover:text-primary/80">
                                    ewejose@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
