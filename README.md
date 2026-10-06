# Rhemroyal Services — Website

Static website built with [Eleventy](https://www.11ty.dev) and edited through
[Sveltia CMS](https://sveltiacms.app) at `/admin`. Hosted on Cloudflare (Workers static assets).
No database and no monthly software cost.

## How it fits together

```
Editor at /admin  --saves-->  GitHub repo (main)  --auto build-->  Cloudflare  -->  live site
```

Every save in the editor is a commit to this repo. Cloudflare rebuilds the site
(about a minute) and the change goes live. Every change is in Git history, so
anything can be rolled back.

## What the proprietor can edit (no code)

| In the editor | What it controls |
|---|---|
| Blog Posts | Add / edit / delete articles |
| Testimonials | Homepage testimonials |
| Team | Team cards on the About page (with photos) |
| Case Studies | Case Studies page |
| Downloadable Resources | Files and descriptions on the Resources page |
| Site Settings | Email, phone, WhatsApp number, social links, form endpoints, top banner, location |

Page layouts, service/programme wording and the legal pages are deliberately
**not** editable in the CMS — they live in `src/*.njk` and are changed by a developer.

## Project layout

```
src/                  Site source
  *.njk               Page templates (home, about, services ...)
  blog/*.md           Blog posts (one Markdown file each)
  _data/*.json        Editable content: site, testimonials, team, caseStudies, resources
  _includes/layouts/  base.njk (header/footer), post.njk (article layout)
  css/ js/ assets/ resources/    Copied as-is into the build
admin/                The CMS (index.html + config.yml)
.eleventy.js          Build configuration
wrangler.jsonc        Tells Cloudflare to serve the _site build output
```

## Running it locally (needs Node 18+)

```bash
npm install
npm start          # live preview at http://localhost:8080
npm run build      # writes the finished site to _site/
```

## Deploy settings (Cloudflare)

| Setting | Value |
|---|---|
| Build command | `npm install && npm run build` |
| Deploy command | `npx wrangler deploy` |

Full first-time setup, including the login bridge for the editor, is in **CMS_SETUP.md**.
