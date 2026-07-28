// ─── Route: /sitemap.xml ──────────────────────────────────
// robots.txt advertises this file, so it has to exist. The page
// set is small and fixed, so it is derived from navLinks rather
// than crawled; adding a page to the nav adds it to the sitemap.

import { navLinks } from '$lib/config';
import { siteUrl } from '$lib/siteUrl';
import type { RequestHandler } from './$types';

/** Escape the five XML predefined entities. */
function escapeXml(value: string): string {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = ({ url }) => {
	const origin = siteUrl(url.origin);

	// Only internal routes belong in a sitemap; navLinks may carry
	// absolute URLs if a commission points the nav at an external page.
	const paths = navLinks.map((link) => link.href).filter((href) => href.startsWith('/'));

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
	.map(
		(path) =>
			`	<url>
		<loc>${escapeXml(origin + path)}</loc>
		<priority>${path === '/' ? '1.0' : '0.7'}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
