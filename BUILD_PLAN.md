# Portfolio Build Plan

This is a living plan. We'll update checkpoints as we implement features.

## Tech Stack
- Next.js (App Router, TypeScript) ✅
- Tailwind CSS ✅
- next-intl for i18n (EN/ES) ✅
- Next.js API Routes (contact, view counter) ⏳
- Prisma + SQLite (local) → switchable to Postgres/Supabase in prod ⏳
- Deployment: Vercel ⏳
- Analytics: Vercel Analytics (or Plausible) ⏳

## 0) Project Bootstrap ✅ COMPLETED
- [x] Initialize Next.js (TypeScript, App Router)
- [x] Add Tailwind CSS
- [x] Configure ESLint + Prettier
- [x] Set up absolute imports/aliases
- [x] Add favicon, app icons, manifest

## 1) Global Foundation ✅ COMPLETED
- [x] Layout skeleton with one-page scroll sections
- [x] Theme: Dark mode default, optional toggle
- [x] Typography scale and accent color
- [x] Reusable UI components (Button, Card, Section, Icon)
- [x] Assets folder structure for images/gifs/og
- [x] Internationalization (i18n) with next-intl
- [x] Language switcher (EN/ES)
- [x] Scroll-triggered animations

## 2) Content System (Simplified) ✅ COMPLETED
- [x] Translation-based content system (replaced MDX)
- [x] Article previews on main page
- [x] Skills highlight component with proficiency dots
- [x] Profile image placeholders ready

## 3) Sections (One-Page) ✅ COMPLETED
- [x] Hero: name, role, tagline, skill dots, quick links, centered layout
- [x] Featured Projects: 3 highlight cards with stack icons and CTAs
- [x] Problem-Solving Mini-Articles: 3 preview cards with "Read more" links
- [x] About Me: short bio, "What drives me" chips, profile image
- [x] Contact: CTA headline, social icons

## 4) Backend Utilities
- [ ] API: `/api/contact` (POST) with rate limiting
- [ ] API: `/api/views/[slug]` (GET/POST) counters
- [ ] Prisma schema for `View` and `ContactMessage`
- [ ] Middleware for simple IP-based throttling

## 5) Performance & Media ✅ COMPLETED
- [x] Next/Image usage for all images/gifs
- [x] Lazy loading, priority hero images
- [x] Responsive image sizes and placeholders

## 6) SEO & Social ⏳ NEXT PRIORITY
- [ ] `metadata` in layout + per-page overrides
- [ ] OG images for projects (static generation)
- [ ] Sitemap and robots.txt

## 7) DevOps ⏳ NEXT PRIORITY
- [ ] Vercel deployment (Preview + Prod)
- [ ] Environment variables for API keys
- [ ] Optional: GitHub Actions CI (lint, type-check, build)

## 8) Polish & QA ✅ MOSTLY COMPLETED
- [x] Accessibility pass (keyboard nav, contrast, labels)
- [x] Motion: subtle fade/hover, reduced-motion respect
- [ ] Lighthouse targets: Perf ≥ 90, SEO ≥ 95, A11y ≥ 95

---

## Implementation Order & Checklists

### Phase A: Bootstrap & Foundation ✅ COMPLETED
- [x] Create Next.js app and Tailwind
- [x] Global layout and design tokens (colors/typography)
- [x] Core components: `Section`, `Container`, `Button`, `Icon`
- [x] i18n setup with next-intl
- [x] Scroll animations and interactions

### Phase B: Content & Routing ✅ COMPLETED
- [x] Translation-based content system
- [x] Article previews on main page
- [x] Skills highlight component
- [x] Profile image placeholders

### Phase C: Sections ✅ COMPLETED
- [x] Implement Hero section with skill dots and links
- [x] Implement Featured Projects with images and CTAs
- [x] Implement Mini-Articles grid with previews
- [x] Implement About Me with profile image
- [x] Implement Contact with links

### Phase D: Backend Utilities ⏳ NEXT PRIORITY
- [ ] Contact form API with rate limiting
- [ ] Views API + client hooks
- [ ] Prisma models & DB wiring

### Phase E: SEO/Perf/Deploy ⏳ NEXT PRIORITY
- [ ] Metadata + OG images
- [ ] Image optimization pass
- [ ] Deploy to Vercel and verify analytics

---

## Data Inputs Needed ✅ MOSTLY COMPLETED
- [x] Full name, role, tagline
- [x] Profile photos (hero + optional about) - placeholders ready
- [x] Skills list grouped: Backend | Frontend | Tools | Soft Skills with 0–5 levels
- [x] Project list (title, slug, short tagline, tech stack, hero image/gif, links)
- [x] 2–3 mini-articles (headline, 2–3 sentences, optional long content)
- [x] About bio (short), timeline items, "What drives me" keywords
- [ ] Social links: GitHub, LinkedIn, Email, Resume URL (for QR) - need actual URLs

## Current Status
- ✅ **Core portfolio is complete and functional**
- ✅ **All major sections implemented with animations**
- ✅ **Full i18n support (EN/ES)**
- ✅ **Responsive design with vibrant colors**
- ⏳ **Next: API routes, SEO, and deployment**

## Notes
- Keep text concise; visuals first. ✅
- Dark mode default; one accent color. ✅
- Prefer SSG/ISR for content; avoid unnecessary SSR. ✅
