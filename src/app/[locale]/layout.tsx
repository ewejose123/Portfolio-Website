import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import PostHogPageView from "../../components/PostHogPageView"
import "../globals.css"

export const metadata: Metadata = {}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  let messages
  try {
    messages = (await import(`@/i18n/translations/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PostHogPageView />
      <Navbar />
      {children}
    </NextIntlClientProvider>
  )
}


