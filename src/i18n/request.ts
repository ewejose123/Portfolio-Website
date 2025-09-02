import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Get locale from the URL path
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';

  return {
    locale,
    messages: (await import(`../i18n/translations/${locale}.json`)).default
  };
});