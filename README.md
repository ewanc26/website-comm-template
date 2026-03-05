# website-comm-template

A SvelteKit + Tailwind CSS starter template for Ko-fi website commissions.

## Quick-start checklist

For each new commission, work through these steps in order:

1. **Clone and install**
   ```sh
   git clone https://github.com/your-username/website-comm-template my-client-site
   cd my-client-site
   pnpm install
   ```

2. **Configure the site** — open `src/lib/config.ts` and update:
   - `site.name` — client's site / business name
   - `site.tagline` — short homepage headline
   - `site.author` — name for the footer copyright
   - `site.socials` — fill in any links, leave others as `''`
   - `navLinks` — add, remove, or rename pages as needed

3. **Edit the pages**
   - `src/routes/+page.svelte` — homepage hero + feature cards
   - `src/routes/about/+page.svelte` — bio / background
   - `src/routes/contact/+page.svelte` — contact form
   - Add new pages by creating `src/routes/<page-name>/+page.svelte`

4. **Wire up the contact form**  
   The form is a client-side placeholder. Options:
   - [Formspree](https://formspree.io) — drop in an `action` URL, no backend needed
   - `+page.server.ts` action with [Resend](https://resend.com) for a fully custom flow

5. **Preview**
   ```sh
   pnpm dev
   ```

6. **Build & deploy**
   ```sh
   pnpm build
   ```
   - Static hosting (Netlify, Vercel, Cloudflare Pages): works out of the box with `adapter-auto`
   - For a specific target, swap the adapter in `svelte.config.js`

---

## Project structure

```
src/
  lib/
    components/
      Nav.svelte      ← sticky top nav, mobile-responsive
      Footer.svelte   ← copyright + social links
    config.ts         ← ✏️  edit this first for every commission
    index.ts
  routes/
    +layout.svelte    ← wraps all pages with Nav + Footer
    +page.svelte      ← homepage
    layout.css        ← Tailwind entry point
    about/
      +page.svelte
    contact/
      +page.svelte
static/               ← put images, fonts, etc. here
```

## Adding a new page

1. Create a folder under `src/routes/`, e.g. `src/routes/portfolio/`
2. Add a `+page.svelte` file inside it
3. Add a matching entry to `navLinks` in `src/lib/config.ts`

## Recreate from scratch

```sh
pnpm dlx sv@0.12.5 create --template minimal --types ts \
  --add prettier tailwindcss="plugins:typography,forms" \
  sveltekit-adapter="adapter:auto" \
  --install pnpm ./
```
