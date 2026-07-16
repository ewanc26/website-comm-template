# AGENTS.md

Guidance for agents working on the SvelteKit/Tailwind website commission starter.

## Template contract

- `src/lib/config.ts` is the primary client customization surface.
- `src/lib/components/` contains shared navigation/footer primitives.
- `src/routes/` contains starter pages and the contact flow.
- `SETUP.md` must let a new client configure and deploy without discovering hidden source edits.
- `meta/` contains preview/reference imagery, not runtime state.

## Rules

- Keep client-specific names, links, colors, and content in configuration where possible; never commit a real client's secrets or correspondence to the template.
- Contact email logic is server-only. Validate input, rate-limit abuse, and avoid exposing provider credentials.
- Preserve semantic HTML, mobile navigation, keyboard focus, contrast, reduced motion, and light/dark behavior.
- Avoid dependencies that make a generated client site unnecessarily heavy.
- Maintain clear placeholders and fail visibly when required setup is missing.

## Validation

Run `pnpm check`, `pnpm lint`, and `pnpm build`, then preview with a synthetic client configuration. Verify every route, nav/footer, contact validation/success/failure, metadata, responsive layouts, theme modes, and missing-config diagnostics. Do not commit `.env` or build output.
