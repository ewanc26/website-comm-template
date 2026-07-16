# AGENTS.md

Guidance for a reusable SvelteKit 2/Svelte 5/Tailwind 4 commission template, not a finished client site. Changes must keep first-time setup understandable, placeholders obvious, deployment choices honest, and the CC BY-SA attribution/licensing requirements intact.

## Customization and runtime map

- `src/lib/config.ts` centralizes the site name/tagline/author, navigation, social links, and default contact envelope. Page-specific client copy still lives in `src/routes/+page.svelte`, `about/+page.svelte`, and `contact/+page.svelte`; `SETUP.md` must enumerate every required edit.
- `Nav.svelte` and `Footer.svelte` are shared responsive chrome. The footer's Ewan Croft attribution and CC BY-SA link are the template's licence notice; do not remove or contradict them without an intentional licensing decision.
- `contact/+page.server.ts` validates and rate-limits progressively enhanced form submissions. `src/lib/email.ts` is server-only Resend integration using `$env/static/private`; no email SDK or secret may enter client imports.
- `svelte.config.js` uses `adapter-auto`. Node/SSR hosting supports the contact action; a static export cannot use it and must remove/replace the action/form backend. `flake.nix` supplies a Node 22/pnpm development shell.
- `meta/` contains checked-in light/dark marketing screenshots. Update them only after intentional visual changes and verify they match the default template.

## Contact and abuse boundaries

- Treat name, email, message, headers, proxy-derived IP, and provider errors as untrusted/personal data. Keep server length checks, normalize line breaks, prevent header injection, cap request bodies, and do not log or commit submissions or Resend payloads.
- The honeypot is only a low-cost signal. The in-memory “3 per IP per 10 minutes” map is per process, unbounded over unique IPs, resets on cold start, consumes a slot before provider success, and is ineffective across serverless instances. Do not describe it as production-grade; use a bounded shared store and trusted client-address configuration where needed.
- Add CSRF/origin checks appropriate to the deployment, provider timeouts, generic client errors, and observable but non-sensitive server failures. A silent honeypot success must never send mail.
- Fail clearly when `RESEND_API_KEY` or placeholder `you@example.com`/sender config remains. Do not send a real test message without explicit authorization and a designated test inbox.
- `.env.example`/SETUP currently claim `CONTACT_EMAIL_TO` and `CONTACT_EMAIL_FROM` override config, but the route never passes those values and `email.ts` does not read them. Keep docs and implementation aligned rather than adding decorative variables.

## Template quality and deployment

- Keep client identity/content configurable without hard-coding a past commission. Validate external social URL schemes and distinguish `mailto:` from web links. Preserve stable routes, metadata, favicon/robots, semantic landmarks/headings, form labels/errors, and progressive enhancement.
- Mobile navigation needs accurate `aria-expanded`/`aria-controls`, focus handling, Escape/outside close, and route-change close. Preserve visible focus, contrast, touch targets, reduced motion, keyboard order, and both color schemes.
- Avoid unnecessary client JavaScript/dependencies. If swapping adapters/providers, update manifest, lockfile, Svelte config, `.env.example`, README, SETUP commands, build/start/output expectations, and static-hosting limitations as one change.
- The VPS setup includes privileged package/service/DNS/TLS commands and examples that drift easily. Treat them as operator actions, not validation commands; verify versions, paths, PM2 start entrypoint, firewall, least-privilege user, and HTTPS before recommending them.
- The supported package manager is pnpm. Preserve `pnpm-lock.yaml` and do not add npm/Yarn locks. Keep the Nix flake lock/input intentional.

## Validation

- Run `pnpm check`, `pnpm lint`, and `pnpm build`, then `pnpm preview` with a fully synthetic client configuration. Run `nix flake check`/enter the dev shell when changing the flake. There is no automated test suite.
- Test all routes and active-nav states, missing/invalid placeholders, external/social links, footer attribution, no-JavaScript form submission, client validation, server validation, honeypot, rate limit, provider timeout/failure/success with a mocked sender, duplicate submission, and missing env.
- Check mobile menu keyboard/screen-reader behavior, narrow/wide layouts, light/dark and system preferences, focus/contrast/reduced motion, metadata/robots/favicon, slow network, and the chosen adapter's actual deployment output. For static mode confirm the contact backend is removed or replaced.
- Preserve the user's untracked `.vscode/` directory. Never commit `.env`, API keys, client correspondence/addresses, provider logs, `.svelte-kit/`, `build/`, deployment archives, or unrelated screenshots.
