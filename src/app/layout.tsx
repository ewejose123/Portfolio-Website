import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";
import { CSPostHogProvider } from "@/components/PostHogProvider";
import CookiePopup from "@/components/CookiePopup";
import MetaPixelProvider from "@/components/MetaPixelProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ewe José Portfolio | Full Stack Developer & Game Creator", // Clear English title for hiring managers
  description: "I’m Ewe José, a full stack engineer and game creator who ships performant web platforms, internal tools, and playable experiences for product-driven teams.", // Emphasizes capabilities relevant to company recruiters
  keywords: "full stack developer portfolio, game creator, product engineer, Next.js expert, React engineer, hiring-ready developer, technical portfolio",
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
    url: 'https://ewejose.com',
    title: "Ewe José Portfolio | Full Stack Developer & Game Creator", // OG headline tailored for recruiters
    description: "Full stack development, gameplay prototypes, and production-ready systems built to help teams ship faster.",
    siteName: "Ewe José Portfolio",
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
    title: "Ewe José | Full Stack & Game Creator",
    description: "Selected work across web platforms, tools, and games for ambitious companies.",
    images: ['https://ewejose.com/og-image-es.jpg'],
  },
  alternates: {
    canonical: 'https://ewejose.com',
    languages: {
      'es': 'https://ewejose.com/es',
      'en': 'https://ewejose.com',
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <CSPostHogProvider>
          <MetaPixelProvider
            pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID || ''}
            testEventCode={process.env.META_TEST_EVENT_CODE}
          >
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
              {/* Navbar is rendered inside the locale layout to get i18n context */}
              <div className="pt-16">{children}</div>
              <CookiePopup />
            </ThemeProvider>
          </MetaPixelProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
