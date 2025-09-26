import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '404 - Página No Encontrada | Ewe José',
    description: 'La página que buscas no existe. Regresa a nuestra página principal para encontrar nuestros servicios de desarrollo web.',
    robots: {
        index: false,
        follow: true,
    },
}

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-muted/20">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* 404 Number */}
                <div className="space-y-4">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 select-none">
                        404
                    </h1>
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            ¡Ups! Página No Encontrada
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-md mx-auto">
                            La página que buscas no existe o ha sido movida. Pero no te preocupes,
                            podemos ayudarte a encontrar lo que necesitas.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <span className="text-xl">🏠</span>
                        Ir a la Página Principal
                    </Link>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border hover:border-accent hover:bg-card transition-all duration-200 font-semibold"
                    >
                        <span className="text-xl">📞</span>
                        Contactar
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        O explora nuestros servicios:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        <Link
                            href="/#simple-websites"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            Páginas Web Simples
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link
                            href="/#simple-shopify"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            Tiendas Shopify
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link
                            href="/#custom-shopify"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            Proyectos Personalizados
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link
                            href="/referidos"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            Programa de Referidos
                        </Link>
                    </div>
                </div>

                {/* Contact Info */}
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
    )
}
