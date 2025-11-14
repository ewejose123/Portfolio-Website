import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || 'en'
  try {
    const messages = (await import(`./translations/${validLocale}.json`)).default
    return {
      locale: validLocale,
      messages
    }
  } catch (error) {
    // Fallback to English if translation file is not found
    console.error(`Failed to load translations for locale: ${validLocale}`, error)
    const fallbackMessages = (await import(`./translations/en.json`)).default
    return {
      locale: 'en',
      messages: fallbackMessages
    }
  }
});