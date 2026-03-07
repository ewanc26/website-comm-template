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

---

## Hosting with Hostinger

This section covers buying a domain and deploying your site through [Hostinger](https://www.hostinger.com). Three deployment paths are available depending on your plan.

> **Which path to pick?**
> - **Business / Cloud hosting** — recommended. Hostinger's hPanel has a built-in Node.js Apps feature that handles builds, deploys, and SSL for you. The contact form works without any changes. Requires a **Business**, Cloud Startup, Cloud Professional, or Cloud Enterprise plan.
> - **VPS hosting** — full root access; set up the server yourself. More effort but maximum control. The contact form works without changes.
> - **Starter / Premium shared hosting** — cheapest option; Node.js is not supported. Must export a static site, which means the contact form will not work server-side.

---

### 1. Register a domain

1. Go to <https://www.hostinger.com/domain-name-search> and search for your domain.
2. Add it to your cart and complete the purchase. Hostinger includes **free WHOIS Privacy** on most TLDs — enable it at checkout.
3. After purchase your domain appears in **hPanel → Domains**. You will manage DNS records here.

> If your domain is already registered elsewhere, point it to Hostinger by updating the nameservers with your registrar to the ones shown in hPanel under **Domains → DNS / Nameservers**.

---

### 2a. Deploy via hPanel Node.js Apps (Business / Cloud hosting)

This is the simplest production path. Hostinger builds and runs the app for you — no server management required. The contact form and all SSR features work out of the box.

#### Switch to adapter-node

`adapter-auto` will work, but explicitly using `adapter-node` is clearer:

```sh
pnpm add -D @sveltejs/adapter-node
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: { adapter: adapter() }
};
```

Push these changes to a GitHub repository.

#### Deploy from GitHub

1. In hPanel go to **Websites → Add Website**.
2. Select **Node.js Apps** from the options.
3. Choose **Import Git Repository** and authorise Hostinger to access your GitHub account.
4. Select your repository and branch.
5. Hostinger auto-detects SvelteKit and pre-fills the build settings. Confirm:
   - **Build command:** `pnpm install && pnpm build`
   - **Output directory:** `build`
   - **Start command:** `node build`
6. Click **Deploy**.

Subsequent pushes to the connected branch trigger automatic redeployments.

#### Deploy by ZIP upload

If you prefer not to use GitHub:

1. Build locally: `pnpm build`
2. Zip the project root (including `build/`, `package.json`, and `pnpm-lock.yaml`).
3. In hPanel go to **Websites → Add Website → Node.js Apps → Upload your website files** and upload the zip.
4. Confirm the build settings as above and click **Deploy**.

#### Set environment variables

In the Node.js Apps dashboard go to **Environment Variables** and add:

```
RESEND_API_KEY   re_your_key_here
```

Redeploy after saving.

#### Assign your domain

If you registered your domain with Hostinger on the same account it will be available to assign during setup. Otherwise, in hPanel go to **Domains → DNS / Nameservers** and point the A record at the IP shown under **Hosting → Manage → Details**.

Hostinger provisions a free managed SSL certificate automatically once the domain propagates.

---

### 2b. Deploy to a VPS (Node.js, full SSR)

> This path gives you full root access. The contact form and all server-side features work without modification.

#### Provision the VPS

1. In hPanel go to **VPS → Create New VPS**.
2. Choose the **Ubuntu 24.04** template (or the Node.js + Ubuntu template for a pre-installed environment), any plan with ≥ 1 GB RAM.
3. Note the **public IP** from the VPS overview.

#### Initial server setup

SSH in as root (password is emailed, or set an SSH key at creation time):

```sh
ssh root@<your-vps-ip>
```

Install Node.js (via nvm) and a process manager:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
npm install -g pnpm pm2
```

#### Switch to adapter-node and build

If you haven't already (see 2a above), swap in `adapter-node`:

```sh
pnpm add -D @sveltejs/adapter-node
```

Update `svelte.config.js` as shown in 2a, then build locally:

```sh
pnpm build
```

#### Copy files to the server

```sh
rsync -avz build/ package.json pnpm-lock.yaml root@<your-vps-ip>:/var/www/mysite/
```

On the server, install production dependencies and start the app:

```sh
cd /var/www/mysite
pnpm install --prod
pm2 start build/index.js --name mysite
pm2 save
pm2 startup   # follow the printed command to enable auto-start on reboot
```

Confirm it's running:

```sh
curl http://localhost:3000
```

#### Set environment variables

Create `/var/www/mysite/.env`:

```dotenv
RESEND_API_KEY=re_your_key_here
HOST=0.0.0.0
PORT=3000
```

Then restart: `pm2 restart mysite`.

#### Point the domain

In hPanel go to **Domains → DNS / Nameservers** and set:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `<your-vps-ip>` |
| A | `www` | `<your-vps-ip>` |

Changes propagate within minutes to a few hours.

#### Add HTTPS with nginx (recommended)

```sh
apt install -y nginx certbot python3-certbot-nginx
```

Create `/etc/nginx/sites-available/mysite`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the config and obtain a certificate:

```sh
ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot auto-renews certificates via a systemd timer — no further action needed.

#### Alternative: HTTPS with Caddy

If you prefer Caddy (automatic HTTPS, simpler config):

```sh
apt install -y caddy
```

Edit `/etc/caddy/Caddyfile`:

```
yourdomain.com, www.yourdomain.com {
    reverse_proxy localhost:3000
}
```

```sh
systemctl restart caddy
```

---

### 2c. Static export (Starter / Premium shared hosting only)

> Use this only if your plan does not support Node.js. The built-in contact form will **not** work — replace it with [Formspree](https://formspree.io) or remove it.

#### Switch to adapter-static

```sh
pnpm add -D @sveltejs/adapter-static
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({ fallback: '404.html' })
  }
};
```

Add a root layout option so SvelteKit prerenders all pages:

```ts
// src/routes/+layout.ts
export const prerender = true;
```

#### Build and upload

```sh
pnpm build
```

The output lands in `build/`. Upload its contents to `public_html/` via **hPanel → Hosting → Manage → File Manager** (or via FTP using credentials from **Advanced → FTP Accounts**).

Visit your domain — the site should be live immediately.

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
