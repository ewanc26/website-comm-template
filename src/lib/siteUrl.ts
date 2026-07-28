// ─── Module: siteUrl ──────────────────────────────────────
// Resolves the canonical origin for absolute-URL consumers
// (sitemap.xml, robots.txt). The environment variable wins so
// a deployment can be moved without editing source, falling
// back to the per-commission value in config.ts.

import { env } from '$env/dynamic/public';
import { site } from '$lib/config';

/** Canonical origin with any trailing slash removed. */
export function siteUrl(requestOrigin?: string): string {
	const raw = env.PUBLIC_SITE_URL || site.url || requestOrigin || '';
	return raw.replace(/\/$/, '');
}
