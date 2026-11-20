# Contributing to website-comm-template

A SvelteKit + Tailwind CSS starter template for Ko-fi website commissions — the scaffold behind client sites, meant to be cloned per commission with `src/lib/config.ts` edited first. Thanks for wanting to help!

Per-client setup instructions live in [SETUP.md](SETUP.md).

## Getting started

```bash
pnpm install
pnpm dev
```

## Notes for this template

- **The template must keep working as a template.** Anything client-specific belongs in `config.ts` (or a file it points to), not scattered through components — a commission shouldn't require an archaeology dig through `Nav.svelte` to rebrand.
- Adding a page means a folder under `src/routes/` plus a matching `navLinks` entry in `src/lib/config.ts`: keep that two-step story intact for non-technical users.
- The contact form's email sender is designed to be swappable (`src/lib/email.ts`); keep provider specifics isolated there.
- `meta/index-light.png` and `index-dark.png` are the README previews; update them if you change the default look materially.
- Recreating from scratch has a one-liner in the README — if you add structural tooling, that command and the README must stay truthful.

## Before opening a PR

- `pnpm build` passes; `pnpm check` if the toolchain is present.
- Conventional commits; focused PRs; describe what you verified.
- AI-assisted PRs welcome; stand behind every line and run the build.

## Licence

CC BY-SA 4.0 (see the README). By contributing you agree your changes are licensed under the same terms.