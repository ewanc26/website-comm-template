// ─── Route: /robots.txt ───────────────────────────────────
// Served from a route rather than static/ so the Sitemap line
// can carry the absolute URL of whatever domain the commission
// is deployed to, instead of a hardcoded one.

import { siteUrl } from '$lib/siteUrl';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const origin = siteUrl(url.origin);

	const body = `# allow crawling everything by default
User-agent: *
Disallow:

Sitemap: ${origin}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
