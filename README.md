# Mayur Children Sr. Sec. School — Website

Bilingual (English / हिंदी) school website with two wings (English Medium and Hindi Medium), built as a static site so hosting is free and nothing needs a server or database.

**Stack:** [Astro](https://astro.build) (static site) · [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (staff-friendly admin at `/admin`) · Cloudflare Pages (free hosting) · [Web3Forms](https://web3forms.com) (contact form → email).

## Local development

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
```

## Project layout

| Path | What it is |
|---|---|
| `src/pages/*.astro` | The 12 pages (home, about, admissions, results, faculty, fees, calendar, gallery, achievements, downloads, announcements, contact) |
| `src/layouts/BaseLayout.astro` | Shared ticker + header + nav + footer, wing-tab logic |
| `src/content/` | **All editable content** — announcements, events, results, faculty, fees, gallery, downloads, achievements, alumni, and `settings/site.yaml` (phone, email, banner, stats, form key) |
| `public/admin/` | CMS admin panel (`index.html` + `config.yml`) |
| `public/uploads/` | Photos and PDFs uploaded through the CMS |

## Going live — one-time setup

### 1. Push to GitHub

Create a repo (e.g. `mayur-school-site`) and push this project to it.

### 2. Deploy on Cloudflare Pages (free)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Pages → **Connect to Git** → pick the repo.
2. Framework preset: **Astro** (build command `npm run build`, output `dist`).
3. Deploy. The site is now live at `https://<project>.pages.dev`, and **every push to `main` redeploys automatically** (~1 minute).

### 3. Contact form (Web3Forms)

1. Get a free access key at [web3forms.com](https://web3forms.com) using the school's email address (submissions are delivered there).
2. Put the key in `src/content/settings/site.yaml` → `web3formsKey` (or via CMS → Site Settings once the CMS is up).

### 4. CMS login for staff (Sveltia + GitHub OAuth)

The admin panel needs a tiny auth relay so staff can log in with GitHub:

1. Deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) to Cloudflare Workers (one-click "Deploy to Cloudflare Workers" button in that repo's README).
2. Create a **GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth Apps):
   - Homepage URL: your site URL
   - Callback URL: `https://<your-worker>.workers.dev/callback`
3. Set the Worker's `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` variables from the OAuth app, and `ALLOWED_DOMAINS` to your site domain.
4. In `public/admin/config.yml`, replace:
   - `repo: REPLACE-WITH-GITHUB-USER/mayur-school-site` → the real repo
   - `base_url: https://REPLACE-WITH-AUTH-WORKER.workers.dev` → the Worker URL
5. For each staff editor: create a free GitHub account and invite it as a **collaborator with Write access** on the repo.

Staff then open `https://<site>/admin`, log in with GitHub, and edit announcements, results, photos, fees, etc. through forms. Saving publishes the change to the live site in about a minute.

### 5. Custom domain

1. Buy a `.in`/`.com` domain (~₹600–900/yr — Hostinger, GoDaddy, BigRock, Namecheap…).
2. Add the domain to Cloudflare (free plan) and point the registrar at Cloudflare's nameservers.
3. Cloudflare Pages → project → Custom domains → add the domain. SSL is automatic.
4. Update `site` in `astro.config.mjs` and `site_url`/`display_url` in `public/admin/config.yml` to the new domain, then push.

(`.edu.in` requires institutional verification via ERNET India — can be added later; the `.in` domain works immediately.)

## Routine content updates (for staff)

Everything below is done at `https://<site>/admin` — no code:

- **New announcement / event** → Announcements or Calendar events → New
- **Board results season** → Results & Toppers → update pass %, toppers, add last year to history
- **Photos** → Gallery → New photo (upload + caption + category)
- **Circulars / forms / holiday list PDFs** → Downloads → attach the PDF file
- **Fees for a new session** → Fee Structure → edit rows
- **Admissions banner on/off, phone, hours, homepage numbers** → Site Settings
