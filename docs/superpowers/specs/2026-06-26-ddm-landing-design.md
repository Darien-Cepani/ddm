# DDM — `ddm.al` Landing Page & Multi-Tenant Platform — Design Spec

**Date:** 2026-06-26
**Status:** Approved, in build
**Brand:** DDM — DO DIGITAL MEDIA · *"Stop planning & start doing"*

---

## 0. Summary

`ddm.al` is the brand home of DDM, a B2B digital agency. The root page is a cinematic,
scroll-driven landing page whose job is to **build trust** through a **problem → solution**
narrative, list the agency's services without hard-selling, and convert visitors to the
signature offer:

- **€200 · Free Forever** — premium site live on `ddm.al/yourname`, no hosting fees ever.
- **€200 + €100/year** — same premium site on the client's own custom domain.

Every client site is served as a path on this same app: `ddm.al/[shop]`. The path/routing
mechanics are **never explained to visitors** — clients only ever see beautiful live examples.

**Stack:** Next.js (App Router, TypeScript) · TailwindCSS · GSAP + ScrollTrigger + SplitText
· Lenis (smooth scroll) · Three.js (hero particle/starfield) · `next/font`.

**Default theme:** Light (primary). Dark theme available via toggle (the full "spacey" reward).

---

## 1. Brand Foundations (from Brand Guidelines PDF)

### 1.1 Color tokens

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `--milk` | Milk White | `#FAFFF3` | Light-theme background, dark-theme text |
| `--lime` | Lime Green | `#C0F53D` | Accent — CTAs, highlights, focus, links |
| `--grass` | Grass Green | `#0A0D04` | Dark-theme background, light-theme ink/text |
| `--army` | Army Green | `#1A2209` | Secondary surface, borders, muted text |

Derived (computed in CSS, not new brand colors):
- `--ink-muted` = grass at 60% — secondary text on light.
- `--milk-muted` = milk at 65% — secondary text on dark.
- `--line` = army at 14% (light) / milk at 12% (dark) — hairline borders.
- `--lime-glow` = lime at 22% — radial glows, button halos.
- Surfaces use **near-tints, never pure white/black**: light surface `#F2F7E9` (milk shaded),
  dark surface `#10140A` (grass lifted).

### 1.2 Typography

- **Display / headlines:** **Gelasio** (serif). Oversized, tight tracking. Used for hero line,
  section headlines, big statements. Conveys confidence + editorial premium feel.
- **Body / UI:** **DM Sans** (sans). Paragraphs, nav, buttons, labels, captions.
- **Labels / numbers / eyebrows:** DM Sans, uppercase, letter-spaced `0.18em`, small, often
  prefixed with a monospace-style index — e.g. `(01) — SERVICES`. Numbers in stat counters use
  DM Sans tabular.

**Type scale (fluid, `clamp()`):**

| Use | Min → Max | Font |
|-----|-----------|------|
| Hero display | `3.25rem → 8.5rem` | Gelasio |
| H2 section | `2.25rem → 5rem` | Gelasio |
| H3 | `1.5rem → 2.25rem` | Gelasio / DM Sans |
| Lead paragraph | `1.125rem → 1.5rem` | DM Sans |
| Body | `1rem → 1.125rem` | DM Sans |
| Eyebrow/label | `0.75rem → 0.8125rem` | DM Sans, uppercase |

Line-height: display `0.95–1.02`, body `1.6`. Headlines use SplitText line masks.

### 1.3 Logo / wordmark

The `DDM` wordmark (bold, rounded, the distinctive cut "D" forms) sits top-left in the nav and
large in the hero. In code it is rendered as styled text (DM Sans-derived heavy weight, custom
letter-spacing) until an SVG asset is provided; a `Wordmark` component isolates this so the SVG
can drop in later without touching consumers.

### 1.4 Voice

Direct, confident, plain-spoken, slightly mysterious. Short declaratives. "We don't launch and
disappear." Customer-voiced problem statements. **All page copy in this build is placeholder,
clearly replaceable, but written in-voice so it reads real.**

---

## 2. Information Architecture

### 2.1 Routes

```
/                      → Landing page (the focus of this build)
/[shop]                → Client site, resolved from registry → template (SEO: SSR/SSG per shop)
/[shop]  (unknown)     → Branded 404 (no mention of how routing works)
```

### 2.2 Filesystem

```
app/
  layout.tsx           # fonts, ThemeProvider, SmoothScroll, Cursor, metadata
  page.tsx             # landing — composes sections
  globals.css          # Tailwind layers + brand tokens + theme vars
  [shop]/
    page.tsx           # generateStaticParams from registry; resolves template
    not-found.tsx      # branded 404
components/
  shell/   Nav, Footer, ThemeToggle, Wordmark
  fx/      SmoothScroll(Lenis), Cursor, Starfield(three), Reveal, MagneticButton, Marquee, Counter
  landing/ Hero, Manifesto, Problems, Solutions, Services, Trust, Process, Showcase, CTA
templates/
  aurora/  index.tsx + sections   # one starter client template (structure only)
lib/
  clients.ts           # registry: slug → { template, brand data }
  motion.ts            # shared GSAP eases, durations, SplitText helpers
  theme.ts             # theme constants
docs/superpowers/specs/ # this spec
```

### 2.3 Client registry shape (`lib/clients.ts`)

```ts
type Client = {
  slug: string;            // ddm.al/<slug>
  name: string;
  template: "aurora";      // which template renders it
  tagline?: string;
  brand?: { accent?: string; logo?: string };
  // ...template-specific content
};
```

`[shop]/page.tsx`: look up slug → if found, render `<Template data={client} />`; else `notFound()`.
`generateStaticParams` pre-renders all known slugs. Adding a client = one registry entry.

---

## 3. Landing Page — Section-by-Section Design

Order (problem-led flow, per research): **Hero → Manifesto → Problems → Bridge → Solutions/Services
→ Services index → Trust → Process → Showcase → CTA/Footer.**

A persistent thin **scroll progress line** (lime) sits at the very top of the viewport.

---

### 3.1 Nav (sticky, minimal)

- Left: `DDM` wordmark. Center/right: anchor links (Work, Services, Process, Contact) — magnetic.
- Right: **theme toggle** (sun/moon morph) + a small lime pill CTA "Start a project".
- Transparent over hero; on scroll past hero it gains a frosted blur background
  (`backdrop-blur`, `--milk`/`--grass` at ~70%) and a hairline bottom border. Animated with a
  ScrollTrigger state toggle, not per-frame.
- Mobile: wordmark + hamburger → full-screen overlay menu with staggered SplitText link reveal.

---

### 3.2 Hero — `components/landing/Hero`

**Goal:** Instant "these people are serious." Spacey, clean, confident.

**Layout:**
- Full viewport (`100svh`). Center-left aligned content.
- Eyebrow: `(DO DIGITAL MEDIA)` small uppercase, lime dot.
- Display headline (Gelasio): placeholder e.g.
  *"We build brands that **dominate** the market."* ("dominate" in lime, italic Gelasio).
- Sub (DM Sans lead): one-line positioning + the tagline *"Stop planning & start doing."*
- Primary CTA (magnetic, lime fill) "See how we fix it" → scrolls to Problems.
  Secondary ghost link "Our services".
- Bottom: scroll cue (animated line + "scroll") and a tiny stat tri:
  `sites shipped · avg load <1s · 0 hosting fees`.

**Background — Three.js `Starfield`:**
- A slow-drifting **particle point cloud** (~6–12k points, capped) with subtle cursor parallax.
- Light theme: soft grey-green particles, low opacity, normal blending, gentle vignette so text
  stays readable. Dark theme: brighter milk/lime motes on deep grass — the "milky way" payoff.
- A soft **lime radial glow** + faint **film grain** overlay above the canvas, below text.
- Canvas pauses via IntersectionObserver when off-screen; DPR capped at 2; lazy-inits after first
  paint to protect LCP. **`prefers-reduced-motion` / low-power → static gradient + sparse CSS stars.**

**Animation (load timeline, GSAP):**
1. Grain/glow fade in.
2. Eyebrow fade+rise.
3. Headline SplitText: lines rise from mask, stagger `0.08`, ease `expo.out`.
4. Sub + CTAs fade-rise.
5. Scroll cue loops.
On scroll: hero content parallaxes up slightly and fades; canvas drifts faster then fades out.

---

### 3.3 Manifesto — `components/landing/Manifesto`

- Generous whitespace. One large statement, scrub-driven word reveal: words start at
  `--ink-muted` and ink-in (`color` + opacity) as you scroll through (ScrollTrigger `scrub`).
- Placeholder: *"DDM is digital, development, and management — we don't launch and disappear,
  we stay, manage, and optimize until the numbers speak for themselves."*
- The three letters **D · D · M** expand to **Digital / Development / Management** as inline
  highlighted tokens (lime underline draw via `stroke-dashoffset`).

---

### 3.4 Problems — `components/landing/Problems` ★ trust core

**Goal:** Name the visitor's real headaches so they feel understood. This earns trust.

**Layout — sticky-pinned ledger:**
- Left column **pinned**: eyebrow `(02) — SOUND FAMILIAR?` + a headline that, via scrub, swaps
  from *"Running a business is full of headaches."* → at section end morphs toward
  *"Here's how we end them."* (word-swap hands off into the Bridge/Solutions).
- Right column: a stack of **problem cards** that scroll past / overlap-stack. Each card =
  a concrete, customer-voiced pain (placeholder copy):
  1. *"Your website looks dated and loads slowly — visitors leave before they convert."*
  2. *"Leads slip through the cracks; you've no system tracking them."*
  3. *"Ad budget burns with nothing to show for ROI."*
  4. *"Your content calendar is empty and the brand feels invisible."*
  5. *"Selling online is clunky; checkout loses customers."*
  6. *"Every tool charges you monthly and nothing talks to each other."*
- Each card: large index number (army, tabular), the pain line (Gelasio), a one-word tag
  (lime, e.g. `SPEED`, `LEADS`, `ROI`, `VISIBILITY`, `SALES`, `COST`). Cards reveal via clip-path
  mask + slight skew tied to scroll velocity.
- **Theme/tone tension:** this band sits on a slightly darker tint (light surface shaded toward
  army) to create unease, which the Solutions band releases.

---

### 3.5 Bridge — small transition

- Full-width line: *"You shouldn't have to juggle all of this."* → *"We take the whole thing off
  your plate."* The tone tint pivots from the darker Problems surface back to bright milk —
  **the theme shift is the narrative.** A lime drawn line connects Problems to Solutions.

---

### 3.6 Solutions / Services — `components/landing/Solutions` ★ payoff

**Goal:** For each headache, show the professional fix — confident, no hype. Maps pain → service.

**Layout — pinned service accordion / sticky list:**
- Eyebrow `(03) — HOW WE FIX IT`. Headline *"One team. The whole stack. Zero headache."*
- A vertical list of solution rows, pinned section; the active row expands to show a visual
  (image/preview or animated mock) + a short outcome line. Hover (desktop) or scroll-step (mobile)
  drives the active row. Each row text reveals with SplitText.
- Rows map directly to the six problems:
  | Problem tag | Solution row | One-liner (placeholder) |
  |---|---|---|
  | SPEED | **Premium Websites** | Fast, clean, animated sites that convert. |
  | LEADS | **CRM Systems** | Every lead captured, tracked, followed up. |
  | ROI | **Ads & Marketing** | Spend that returns — measured, optimized. |
  | VISIBILITY | **Content & UGC + Graphic Design** | A brand people actually see and remember. |
  | SALES | **Ecommerce** | Storefronts and checkouts built to sell. |
  | COST | **Free-forever hosting** | One partner, one price, no monthly bleed. |
- Active row shows a lime progress indicator. Magnetic "what this fixes" micro-labels.

---

### 3.7 Services index — `components/landing/Services` (list, not sold)

**Goal:** Per the brief: **list all services without advertising them.** A clean, confident
capability index — proof of range, low-key.

- Eyebrow `(04) — CAPABILITIES`. A quiet grid or a slow **marquee** of service names:
  *Websites · CRM · Ecommerce · Marketing · Paid Ads · SEO · Content Creation · UGC · Graphic
  Design · Brand Identity · Social · Automation.*
- Each item: name + a hairline; on hover, lime fill sweep + slight scale. No paragraphs, no
  pricing — just the list. Marquee speed reacts subtly to scroll velocity.

---

### 3.8 Trust band — `components/landing/Trust`

- **Stat counters** (3–4, roll up on scroll via `Counter`): e.g. `120+ sites shipped`,
  `<1s avg load`, `€0 hosting`, `100% in-house`. Placeholder numbers, flagged.
- A restrained **monochrome logo marquee** (placeholder client/tool logos), grayscale → color on
  hover.
- Optional single large **testimonial** (one quote at a time, big Gelasio, name/role) — placeholder.
- Pillars row: *Fixed timelines · Transparent pricing · One point of contact* (icon-light cards).

---

### 3.9 Process — `components/landing/Process`

- Eyebrow `(05) — HOW IT WORKS`. Numbered steps with a **scroll-drawn connecting line**
  (SVG `stroke-dashoffset` tied to ScrollTrigger): **Discover → Design → Build → Launch → Grow.**
- Each step: number, title (Gelasio), one line. Reinforces "we stay and optimize" (Management).

---

### 3.10 Showcase — `components/landing/Showcase`

- Eyebrow `(06) — LIVE WORK`. A grid/horizontal strip of client-site thumbnails (placeholder
  cards now; real `ddm.al/[shop]` sites later). Clip-path reveal; hover = WebGL/displacement or
  CSS image transition + the client name. **No copy about how the path system works.** Each links
  to its `ddm.al/<shop>` path.

---

### 3.11 The Offer + CTA / Footer — `components/landing/CTA` + `shell/Footer`

**Offer panel (the conversion moment):**
- Big Gelasio line: *"A premium website. For dirt cheap. No headache."*
- Two tier cards:
  - **Free Forever — €200 once.** Premium design + animations, live on `ddm.al/yourname`,
    hosting & domain free forever. No renewals.
  - **Your Own Domain — €200 + €100/year.** Same premium site, your custom domain.
- Bullet reassurances: *clean · fast · optimised · animated · no monthly bleed · more visibility,
  revenue, clients.* Primary magnetic CTA "Start your site".

**CTA footer:**
- Oversized closing line (Gelasio, SplitText): *"Stop planning. Start doing."* with a huge
  magnetic CTA.
- Footer: wordmark, email (`contact@ddm.al` placeholder), Tirana / Albania, social links,
  theme toggle, copyright. Hairline top border.

---

## 4. Motion System

- **Smooth scroll:** Lenis, synced to GSAP ScrollTrigger ticker. Disabled under reduced-motion.
- **Eases:** primary `expo.out` (reveals), `power3.out` (UI), `power2.inOut` (loops). Durations:
  reveals `0.8–1.1s`, micro `0.3–0.5s`. Centralized in `lib/motion.ts`.
- **SplitText** line/word masks on all headlines and the manifesto.
- **Reveal** wrapper component: fade + `y` rise + optional clip-path, via `ScrollTrigger.batch`.
- **MagneticButton:** pointer-follow translate with spring back; scales custom cursor.
- **Cursor:** custom lime ring that lags the pointer (quickTo), grows on interactive hover, hides
  on touch devices.
- **Scroll-velocity skew** on select sections (cap ~5°).
- **Counters** and **drawn lines/underlines** on scroll-in.
- **Accessibility:** every effect has a reduced-motion fallback (instant states, no scrub, static
  canvas). Honors `prefers-reduced-motion` and a low-power heuristic. Focus states use lime ring.

---

## 5. Theming

- Strategy: `class="dark"` on `<html>` toggles CSS custom properties (Tailwind `darkMode: "class"`).
  Default = light. Toggle persists to `localStorage`; initial theme set by an inline pre-paint
  script to avoid flash (FOUC). System preference respected on first visit.
- The toggle animates (sun↔moon morph) and the whole page transitions colors smoothly
  (`transition` on background/text, but NOT on transform-heavy nodes).
- Starfield reads the active theme to pick particle palette/blend.

---

## 6. Performance & SEO

- Server Components by default; mark only interactive/animated leaves `"use client"`.
- Three.js + GSAP loaded in client components, hero canvas lazy-inits post-paint; static fallback
  for reduced-motion/low-power. DPR ≤ 2; RAF paused off-screen.
- `next/font` self-hosts DM Sans + Gelasio (no layout shift). Images via `next/image`.
- Per-route metadata; each `[shop]` page gets its own title/description/OG for real SEO; SSG via
  `generateStaticParams`. Landing has full OG/twitter meta + JSON-LD Organization.
- Target: fast LCP (text hero, not image), no CLS, Lighthouse ≥ 90.

---

## 7. Responsive

- Breakpoints: base (mobile) → `sm` 640 → `md` 768 → `lg` 1024 → `xl` 1280 → `2xl` 1536.
- Mobile: pinned sections degrade to scroll-stepped (no hover); accordion → tap; marquees keep;
  horizontal showcase → vertical stack; reduce particle count.
- Fluid type via `clamp()`; spacing scale via Tailwind + a few CSS vars for section rhythm.

---

## 8. Build Scope (this pass)

**In:** Full landing page (all sections above) with real GSAP/Three motion, light+dark theming,
responsive, placeholder-but-in-voice copy; `templates/` dir with ONE starter template; `lib/clients.ts`
registry; `app/[shop]/page.tsx` resolver + branded 404; working `next build` and dev server.

**Out (later passes):** Real client content/templates beyond the one starter; CMS; forms backend;
analytics; real logos/testimonials/images; SVG wordmark asset.

---

## 9. Open Items / Placeholders to replace later

- Real copy, numbers, testimonials, client logos, showcase images.
- Final `DDM` SVG wordmark.
- Contact form / email wiring.
- Additional client templates.
```