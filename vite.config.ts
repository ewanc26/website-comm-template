// ─── SvelteKit config ────────────────────────────────────
// Uses adapter-auto by default (works on Vercel, Netlify,
// Cloudflare Pages, etc.). Swap to adapter-node or
// adapter-static when deploying to a specific target.
import adapter from '@sveltejs/adapter-auto';

// ─── Vite config ─────────────────────────────────────────
// Tailwind CSS v4 (the @tailwindcss/vite plugin) and
// SvelteKit are the two build plugins. Order matters:
// tailwindcss runs first so SvelteKit can consume its output.

import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	]
});
