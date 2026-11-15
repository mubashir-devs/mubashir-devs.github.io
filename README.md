# Mubashir Ali — Portfolio

React + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide. Hosted free on GitHub Pages at
**https://mubashir-devs.github.io**.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Where to edit things

| What | File |
| --- | --- |
| Name, email, links, headline, contact-form endpoint | [src/data/site.ts](src/data/site.ts) |
| GitHub username, exclusion list, topic names, cache TTL | [src/data/site.ts](src/data/site.ts) (`github`) |
| Skills | [src/sections/Skills.tsx](src/sections/Skills.tsx) |
| Experience / education | [src/sections/Experience.tsx](src/sections/Experience.tsx) |
| Resume PDF | [public/Mubashir_Ali.pdf](public/Mubashir_Ali.pdf) (keep the root copy in sync) |

## How the Projects section works

Nothing is hardcoded. When a visitor opens the site, the browser calls
`https://api.github.com/users/mubashir-devs/repos` (paginated, 100 per page) — no token is used or needed,
so no secrets live in the frontend. A new public repo appears on the next visit (after the cache expires).

- **Sorting:** featured first, then most recently pushed.
- **Filters:** language chips are built from whatever languages your repos use.
- **Live Demo button:** shown when the repo's *Website* field (GitHub → repo → ⚙ About) is set.
- **Control with topics** (repo → ⚙ About → Topics):
  - `portfolio-featured` — pins the repo to the top with a "Featured" badge
  - `portfolio-hidden` — removes the repo from the site
- **Exclude by name:** add to `github.excludeRepos` in `src/data/site.ts`. Forks are hidden by default (`excludeForks`).
- **Caching & rate limits:** responses are cached in `localStorage` for 30 min and revalidated with ETags
  (304 responses don't count against the limit). The unauthenticated limit is 60 requests/hour per visitor IP. If GitHub
  is unreachable or rate-limited, last known data is shown with a notice; otherwise a friendly error with retry.

## Deploy to GitHub Pages (free)

1. Push this project to `https://github.com/mubashir-devs/mubashir-devs.github.io` on branch `main`:
   ```bash
   git add . && git commit -m "Add portfolio" && git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and deploys on every push to `main`
   (and nightly). Watch it under the **Actions** tab; the site goes live at https://mubashir-devs.github.io.

**Routing:** the site is a single page using `#anchors`, so there is nothing to break on refresh. The workflow also
copies `index.html` to `404.html` so any unknown URL still loads the site. `base` is `/` because this is a user-site repo;
if you ever host it as a project repo, change `base` in [vite.config.ts](vite.config.ts) to `/<repo-name>/`.

## Contact form

With no setup, submitting opens the visitor's email client addressed to you. To receive messages directly, create a free
form at [formspree.io](https://formspree.io) and paste its URL into `formEndpoint` in `src/data/site.ts`.
