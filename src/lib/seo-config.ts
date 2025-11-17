// SEO Configuration for Ewe José Website
export const seoConfig = {
  // Main Website SEO
  mainPage: {
    en: {
      title: "Ewe José Portfolio | Full Stack Developer & Game Creator", // English-first messaging for recruiters
      description: "Full stack engineer and game creator showcasing production web platforms, automation tooling, and playable prototypes built for hiring teams.",
      keywords: [
        "full stack developer portfolio",
        "game creator portfolio", 
        "nextjs developer",
        "react full stack engineer",
        "typescript portfolio",
        "company ready developer",
        "technical art prototypes",
        "web systems engineer",
        "automation tooling",
        "product engineer portfolio",
        "ux focused developer",
        "hire full stack developer",
        "game prototyping",
        "interactive experiences",
        "engineering portfolio"
      ],
      targetAudience: [
        "small business owners",
        "restaurant owners", 
        "local service providers",
        "entrepreneurs",
        "startups",
        "freelancers",
        "consultants",
        "retail businesses"
      ]
    },
    es: {
      title: "Ewe José Portfolio | Full Stack Developer & Game Creator", // Spanish locale now mirrors English hiring pitch
      description: "Full stack engineer and game creator focused on partnering with companies to deliver performant platforms, internal tools, and experimental games.",
      keywords: [
        "full stack developer portfolio",
        "game creator portfolio",
        "desarrollador Next.js",
        "ingeniero React",
        "portfolio TypeScript", 
        "desarrollador para empresas",
        "prototipos de juego",
        "sistemas web personalizados",
        "automatización para equipos",
        "ingeniería de producto",
        "desarrollador UX",
        "contratar full stack developer",
        "experimentos interactivos",
        "experiencias jugables",
        "portfolio ingeniería"
      ],
      targetAudience: [
        "pequeños empresarios",
        "dueños de restaurantes",
        "proveedores de servicios locales", 
        "emprendedores",
        "startups",
        "freelancers",
        "consultores",
        "comercios minoristas"
      ]
    }
  },

  // Referrer Page SEO
  referrerPage: {
    en: {
      title: "Earn €50-€200+ Per Website Referral | Referral Program",
      description: "Get paid 10% commission for every person you refer for website creation. No work required, just connect people. Payment in 3 days via Bizum, PayPal or bank transfer.",
      keywords: [
        "referral program",
        "earn money referrals", 
        "website commission",
        "referrals Spain",
        "make money online",
        "web affiliate program",
        "web development commission",
        "website referrals",
        "referral marketing",
        "affiliate marketing Spain",
        "commission based referrals",
        "referral rewards",
        "earn from referrals",
        "referral income",
        "referral business"
      ],
      targetAudience: [
        "business networkers",
        "consultants",
        "marketers", 
        "freelancers",
        "entrepreneurs",
        "people with business contacts",
        "affiliate marketers",
        "referral program participants"
      ]
    },
    es: {
      title: "Gana €50-€200+ Por Cada Referido | Programa de Referidos Web",
      description: "Cobra 10% de comisión por cada persona que refieras para crear páginas web. Sin trabajo requerido, solo conecta personas. Pago en 3 días por Bizum, PayPal o transferencia.",
      keywords: [
        "programa referidos",
        "ganar dinero referidos",
        "comisión páginas web",
        "referidos España", 
        "ganar dinero online",
        "programa afiliados web",
        "comisión desarrollo web",
        "referidos páginas web",
        "marketing referidos",
        "marketing afiliados España",
        "referidos comisión",
        "recompensas referidos",
        "ganar referidos",
        "ingresos referidos",
        "negocio referidos"
      ],
      targetAudience: [
        "networkers de negocios",
        "consultores",
        "marketers",
        "freelancers", 
        "emprendedores",
        "personas con contactos de negocio",
        "marketers afiliados",
        "participantes programas referidos"
      ]
    }
  },

  // Technical SEO
  technical: {
    baseUrl: "https://ewejose.com",
    defaultLocale: "es",
    supportedLocales: ["es", "en"],
    sitemapPriority: {
      main: 1.0,
      referrer: 0.8,
      webs: 0.6
    },
    changeFrequency: {
      main: "weekly",
      referrer: "monthly", 
      webs: "monthly"
    }
  },

  // Social Media SEO
  social: {
    twitter: "@ewejose",
    facebook: "ewejose.webdev",
    linkedin: "ewejose",
    instagram: "ewejose.dev"
  },

  // Local SEO
  local: {
    businessName: "Ewe José - Desarrollo Web",
    address: "España",
    phone: "+34 632 239 50",
    email: "ewejose@gmail.com",
    businessType: "Professional Service",
    serviceArea: "Spain"
  }
}
