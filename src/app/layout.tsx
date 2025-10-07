import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";
import { CSPostHogProvider } from "@/components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ewe José - Desarrollo Web Profesional | Páginas Web desde €300",
  description: "Desarrollador web profesional con 5+ años de experiencia. Páginas web desde €300, tiendas Shopify, aplicaciones personalizadas. Entrega en 3-7 días.",
  keywords: "desarrollo web, páginas web, diseño web profesional, páginas web baratas, desarrollo web España, páginas web responsive, SEO web, tiendas online, Shopify España",
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
    url: 'https://ewejose.com',
    title: "Ewe José - Desarrollo Web Profesional | Páginas Web desde €300",
    description: "Desarrollador web profesional con 5+ años de experiencia. Páginas web desde €300, tiendas Shopify, aplicaciones personalizadas.",
    siteName: "Ewe José - Desarrollo Web",
    images: [
      {
        url: 'https://ewejose.com/og-image-es.jpg',
        width: 1200,
        height: 630,
        alt: "Desarrollo Web Profesional - Páginas Web España",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ewe José - Desarrollo Web Profesional",
    description: "Desarrollador web profesional con 5+ años de experiencia. Páginas web desde €300.",
    images: ['https://ewejose.com/og-image-es.jpg'],
  },
  alternates: {
    canonical: 'https://ewejose.com',
    languages: {
      'es': 'https://ewejose.com',
      'en': 'https://ewejose.com/en',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Technology',
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get locale from URL for lang attribute
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CSPostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {/* Navbar is rendered inside the locale layout to get i18n context */}
            <div className="pt-16">{children}</div>
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
