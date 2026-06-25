// ─── Vite config ─────────────────────────────────────────
// Tailwind CSS v4 (the @tailwindcss/vite plugin) and
// SvelteKit are the two build plugins. Order matters:
// tailwindcss runs first so SvelteKit can consume its output.

import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({ plugins: [tailwindcss(), sveltekit()] });
