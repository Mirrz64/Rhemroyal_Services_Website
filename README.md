# Rhemroyal Services — Website

A full multi-page site for Rhemroyal Services (social development & business
consultancy), built as static HTML/CSS/JS — no build step, no framework,
works on any standard web host.

## What's included

- **9 main pages:** Home, About, Services, Programmes, Who We Help,
  Resources, Case Studies, Blog, Contact
- **3 blog articles**, written and ready to publish
- **Legal pages:** Privacy Policy, Terms of Service, Cookie Policy
  (templates — see "Before you publish" below)
- **A branded 404 page**
- **Two downloadable Word templates** in `/resources/`: a Business Plan
  Template and a 90-Day Goal & Action Worksheet
- Working **contact form** and **newsletter signup** (wired for Formspree —
  see setup below)
- **WhatsApp floating button**, **cookie consent banner**, mobile-responsive
  navigation
- **SEO basics:** meta descriptions, Open Graph/Twitter share image,
  `sitemap.xml`, `robots.txt`, favicons generated from your logo

## Before you publish — a few things to configure

The site works as-is, but these are placeholders that should be replaced
with real details. Search for them or use the checklist below.

| What | Where | How to update |
|---|---|---|
| WhatsApp number | `js/main.js` (`RHEMROYAL_CONFIG.whatsappNumber`) | Replace `REPLACE_WITH_WHATSAPP_NUMBER` with the full international number, digits only (e.g. `447123456789`) |
| Contact form | `js/main.js` (`RHEMROYAL_CONFIG.contactFormEndpoint`) | Create a free form at [formspree.io](https://formspree.io), paste your form endpoint URL in place of `https://formspree.io/f/REPLACE_WITH_FORM_ID` |
| Newsletter form | `js/main.js` (`RHEMROYAL_CONFIG.newsletterFormEndpoint`) | Same as above — a second Formspree form, or connect it to Mailchimp/another provider later |
| Phone number | Every page footer + `contact.html` | Find/replace `+44REPLACE` and `+44 (0) REPLACE` |
| Email address | Already set to `hello@rhemroyalservices.com` | Update everywhere if the real inbox will be different |
| Domain name | `<link rel="canonical">` and Open Graph tags on every page, plus `sitemap.xml`/`robots.txt` | Find/replace `www.rhemroyalservices.com` once you've registered a domain |
| Social links | Footer on every page + `contact.html` | Facebook is live. LinkedIn, Instagram and X are still `href="#"` placeholders — update once those profiles exist |
| Team bios | `about.html` | Replace the three placeholder team cards with real names, roles and photos |
| Testimonials | `index.html` | Marked with an orange "Sample testimonial" tag — replace with real client quotes (with permission) once you have them |
| Case studies | `case-studies.html` | Marked "ILLUSTRATIVE EXAMPLE" — these describe how engagements are *designed* to work, not real results. Swap in real, named stories as soon as you can share them |
| Legal pages | `privacy-policy.html`, `terms-of-service.html` | Templates only — have a solicitor review before relying on them, and fill in the bracketed placeholders |

A simple way to find everything at once: search the whole folder for the
word `REPLACE`.

## Previewing locally

No build step needed. Either:
- Double-click `index.html` to open it directly in a browser, or
- Run a tiny local server from this folder so relative paths behave exactly
  as they will online: `python3 -m http.server 8000`, then visit
  `http://localhost:8000`

## Deploying

This is a static site, so any of these work well and are usually free to start:

- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the whole folder
  in their dashboard, or connect a GitHub repo for automatic deploys
- **Traditional web hosting:** upload the contents of this folder to your
  host's `public_html` (or equivalent) via FTP/cPanel

## Project structure

```
index.html, about.html, services.html, ...     Root-level pages
blog.html                                        Blog index
blog/*.html                                      Individual blog posts
css/styles.css                                   All site styling
js/main.js                                        Nav, forms, WhatsApp, cookie banner config
assets/                                           Logo, favicons, OG share image
resources/                                        Downloadable Word templates
sitemap.xml, robots.txt, site.webmanifest         SEO/PWA metadata
```

## Where this could go next

The original brief mentioned a few things that go beyond a static site —
here's how to approach them when you're ready:

- **A CMS so non-developers can edit content:** the simplest path that
  keeps this exact site is [Decap CMS](https://decapcms.org) (free,
  git-based, pairs well with Netlify) — it adds an `/admin` login and edits
  content through a form instead of code. A bigger step up is migrating to
  WordPress or Webflow, which costs more but is more full-featured.
- **Analytics:** add a privacy-friendly tool like Plausible or Google
  Analytics, then mention it by name in `cookie-policy.html`.
- **Booking/scheduling:** the "Book a Consultation" buttons currently jump
  to the contact form. Swapping in a Calendly (or similar) embed on
  `contact.html` would let people book a slot directly.
- **Training/course pages:** if you start running paid courses rather than
  informal coaching, that likely needs its own booking-and-payment setup —
  worth treating as a separate project once the offer is defined.

## A note on placeholder content

Team bios, testimonials and case studies are clearly marked as placeholders
or illustrative examples throughout — this was a deliberate choice rather
than inventing fake people or fake client results. Replace them with the
real thing as it becomes available.
