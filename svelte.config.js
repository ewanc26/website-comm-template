// ─── SvelteKit config ────────────────────────────────────
// Uses adapter-auto by default (works on Vercel, Netlify,
// Cloudflare Pages, etc.). Swap to adapter-node or
// adapter-static when deploying to a specific target.

import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
