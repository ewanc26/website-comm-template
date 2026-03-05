# Site setup guide

This file walks you through configuring and deploying your site.

## Quick-start checklist

1. **Install dependencies**
   ```sh
   pnpm install
   ```

2. **Configure the site** — open `src/lib/config.ts` and update:
   - `site.name` — your site / business name
   - `site.tagline` — short homepage headline
   - `site.author` — name for the footer copyright
   - `site.socials` — fill in any links, leave others as `''`
   - `navLinks` — add, remove, or rename pages as needed

3. **Edit the pages**
   - `src/routes/+page.svelte` — homepage hero + feature cards
   - `src/routes/about/+page.svelte` — bio / background
   - `src/routes/contact/+page.svelte` — contact form intro text
   - Add new pages by creating `src/routes/<page-name>/+page.svelte`

4. **Wire up the contact form** — see [Contact form setup](#contact-form-setup) below

5. **Preview**
   ```sh
   pnpm dev
   ```

6. **Build & deploy**
   ```sh
   pnpm build
   ```
   Static hosting (Netlify, Vercel, Cloudflare Pages) works out of the box with `adapter-auto`. For a specific target, swap the adapter in `svelte.config.js`.

---

## Contact form setup

The contact form uses [Resend](https://resend.com) by default to send emails. Resend has a free tier (3,000 emails/month) and requires no credit card to start.

### 1. Create a Resend account

Sign up at <https://resend.com>.

### 2. Verify your sending domain

In the Resend dashboard go to **Domains → Add domain** and follow the DNS instructions for your domain. Until a custom domain is verified you can send from `onboarding@resend.dev` for testing only — it cannot deliver to arbitrary addresses.

> **Shared-hosting tip:** if your platform doesn't support server-side rendering (e.g. plain GitHub Pages), switch `svelte.config.js` to `adapter-static` and replace the form with a third-party service like [Formspree](https://formspree.io).

### 3. Create an API key

In the Resend dashboard go to **API Keys → Create API key**. Give it *Sending access* only.

### 4. Configure environment variables

```sh
cp .env.example .env
```

Then edit `.env`:

```dotenv
RESEND_API_KEY=re_your_key_here
```

For production, add `RESEND_API_KEY` as an environment variable in your hosting dashboard instead of committing `.env`.

### 5. Update config.ts

In `src/lib/config.ts` set the two email fields:

```ts
contactEmailTo:   'you@yourdomain.com',              // where submissions land
contactEmailFrom: 'My Site <noreply@yourdomain.com>', // must match verified domain
```

### 6. Test it

```sh
pnpm dev
```

Fill in the contact form and check the inbox for `contactEmailTo`. Send failures are logged to the console.

---

## Swapping the email provider

Open `src/lib/email.ts` and replace the Resend block with whatever SDK you need. The variables `to`, `from`, `subject`, and `text` are already assembled above it:

```ts
// example: Nodemailer over SMTP
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '$env/static/private';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST, port: Number(SMTP_PORT), auth: { user: SMTP_USER, pass: SMTP_PASS }
});
await transporter.sendMail({ from, to, replyTo: payload.email, subject, text });
```

---

## How the contact form works

| File | Role |
|---|---|
| `src/lib/email.ts` | Email sender; swap the provider block here |
| `src/routes/contact/+page.server.ts` | Form action: validates input, rate-limits by IP, calls `sendContactEmail` |
| `src/routes/contact/+page.svelte` | Progressive-enhancement form; shows per-field errors echoed from the server |

The form also includes:
- **Honeypot field** — a hidden `_hp` input that bots fill in but browsers hide from real users; submissions with it populated are silently discarded.
- **In-memory rate limiter** — max 3 submissions per IP per 10 minutes. For multi-instance deployments (e.g. serverless) replace with a Redis-backed store.
