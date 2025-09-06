import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es"], // supported locales
  defaultLocale: "en", // default
  localePrefix: "as-needed", // clean URLs for default
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // match all pages except static assets
};