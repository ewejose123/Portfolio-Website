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
  title: "Ewe José Omusi Sáez — Portfolio",
  description: "Full Stack Developer & Game Creator",
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
