# CMS setup — step by step

Do these in order. Total cost: **£0** (Eleventy, Sveltia CMS, the GitHub OAuth app and the
login Worker are all free; the Worker sits inside Cloudflare's free tier).

Part A switches the site over. Part B turns on the editor login. Part C hands it to the proprietor.
Run each Git Bash command **on its own** and wait for it to finish.

---

## Part A — Move the site onto the new structure

**A1. Set the Cloudflare build command first** (so the next push builds properly)

Cloudflare dashboard -> your `rhemroyal-services-website` project -> **Settings** -> **Builds**
(labels can differ slightly; you're looking for *Build command*).

- Build command: `npm install && npm run build`
- Deploy command: leave as `npx wrangler deploy`

**A2. Bring your local repo up to date** (you added `wrangler.jsonc` from your phone, so it's ahead of your PC)

```bash
cd ~/OneDrive/Documents/GitHub/Rhemroyal_Services_Website
```
```bash
git pull
```

**A3. Remove the old flat files**

```bash
git rm -r -q 404.html about.html assets blog blog.html case-studies.html contact.html cookie-policy.html css favicon.ico index.html js privacy-policy.html programmes.html resources resources.html robots.txt services.html site.webmanifest sitemap.xml terms-of-service.html who-we-help.html
```

Keep `LICENSE`. Do not delete anything else.

**A4. Add the new files**

Unzip `rhemroyal-cms-site.zip` with File Explorer (right-click -> Extract All), then copy
**everything inside the extracted folder** into the repo folder, including the hidden files
`.eleventy.js` and `.gitignore`. Say yes to overwriting `README.md` and `wrangler.jsonc`.
You should now see `src/`, `admin/`, `package.json`, `.eleventy.js` in the repo.

**A5. Commit and push**

```bash
git add -A
```
```bash
git commit -m "feat: migrate site to Eleventy and add Sveltia CMS content editor"
```
```bash
git push
```

**A6. Watch the build.** Cloudflare -> project -> **Deployments**. A green "Build completed"
means the site is live from the new structure and should look identical to before.
This is the first time Eleventy runs for real, so if the build fails, copy the red lines from the
log and send them over — it will be a small fix.

---

## Part B — Turn on the editor login

The editor saves changes by signing in to GitHub. A tiny Cloudflare Worker (from the Sveltia
project) handles that sign-in.

**B1. Deploy the Worker.** Open
`https://deploy.workers.cloudflare.com/?url=https://github.com/sveltia/sveltia-cms-auth`,
follow the prompts, and when it finishes copy the Worker URL. It looks like
`https://sveltia-cms-auth.<your-subdomain>.workers.dev`.

**B2. Register a GitHub OAuth app.** Go to `https://github.com/settings/applications/new`:

- Application name: `Rhemroyal CMS`
- Homepage URL: your live site address
- Authorization callback URL: **the Worker URL from B1 + `/callback`**
  (e.g. `https://sveltia-cms-auth.<your-subdomain>.workers.dev/callback`)

Register it, then click **Generate a new client secret**. Keep the Client ID and Client Secret handy.

**B3. Give the Worker its keys.** Cloudflare -> the `sveltia-cms-auth` Worker -> **Settings** -> **Variables**:

| Name | Value |
|---|---|
| `GITHUB_CLIENT_ID` | the Client ID |
| `GITHUB_CLIENT_SECRET` | the Client Secret — click **Encrypt** |
| `ALLOWED_DOMAINS` | your site's hostname only, no `https://` (e.g. `rhemroyal-services-website.<your-subdomain>.workers.dev`). Add the real domain later, comma-separated |

Save and deploy. `ALLOWED_DOMAINS` is optional but strongly recommended: it stops other websites using your Worker.

**B4. Tell the CMS where the Worker is.** On GitHub, open `admin/config.yml` and replace
`https://REPLACE_WITH_WORKER_NAME.workers.dev` with your Worker URL. Commit:
`feat: connect CMS login to auth worker`.

**B5. Test it yourself.** Visit `<your site>/admin/`, click **Sign in with GitHub**, approve.
You should see the editor with six sections (Blog Posts, Testimonials, Team, Case Studies,
Downloadable Resources, Site Settings). Make a harmless edit, save, and watch the site rebuild.

---

## Part C — Hand it to the proprietor

1. They create a free GitHub account (github.com/signup).
2. On the repo: **Settings -> Collaborators -> Add people**, give them **Write** access. They accept the emailed invite.
3. They open `<site>/admin/`, sign in with GitHub, and can edit. Saves go live in about a minute.

**For full independence later** (the ownership-transfer conversation): the pieces that currently
sit under *your* accounts are (1) the GitHub repo, (2) the Cloudflare project, (3) the login Worker
and (4) the GitHub OAuth app. Transfer or recreate each under their accounts, then update
`repo:` and `base_url:` in `admin/config.yml`.

---

## Notes for the proprietor

- **Edit, then Save/Publish.** Nothing is live until saved; the site updates after the rebuild (~1 min).
- **Blog posts:** the web address is created automatically from the file name Sveltia generates from the title. Pick the category from the list.
- **Testimonials and Case Studies:** each has a tick box marking it as a *sample*. Untick it only once it is a real, permitted client quote or result — that removes the orange "sample" label.
- **Photos:** compress before uploading (large phone photos slow the site down).
- **Contact details:** change the email, phone, WhatsApp number or social links once in **Site Settings** and every page updates.
- **Made a mistake?** Every save is in the repo history and can be reverted.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Build fails with `eleventy: not found` | Build command is missing `npm install &&` |
| Deploy fails with "assets directory ... doesn't exist" | The build step didn't run or failed; fix the build first |
| Login popup says the app isn't authorised / redirect mismatch | Callback URL in the OAuth app must be exactly `<Worker URL>/callback` |
| Login works but "repository not found" | The person signing in hasn't been added to the repo (Part C) |
| Login window opens then nothing happens | `ALLOWED_DOMAINS` doesn't include the hostname you're visiting from |
| New blog post doesn't appear | Check Deployments for a failed build, and that the post has a title, date and category |

## What was and wasn't tested before delivery

Checked offline: every template renders without undefined variables, every internal link and
anchor resolves, HTML tags balance on all pages, the CMS config is valid YAML, and the data files
are valid JSON. **Not** possible to run in the build environment: the real `eleventy` build
(no network to install it) and a live CMS login. Both are covered by steps A6 and B5.
