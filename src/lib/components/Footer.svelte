<!-- ─── Component: Footer ───────────────────────────────────
     Site-wide footer — copyright line, CC BY-SA 4.0
     attribution (required by the template licence), and
     social links from site config. Sticky to the bottom of
     the viewport via the parent layout's mt-auto. -->

<script lang="ts">
	import { site } from '$lib/config';

	const year = new Date().getFullYear();

	/**
	 * Build a safe href for a configured social entry.
	 *
	 * `email` becomes a `mailto:` link; everything else must be an explicit
	 * http(s) URL. A misconfigured value (e.g. a `javascript:` string) is
	 * dropped rather than rendered as a link.
	 */
	function toHref(key: string, value: string): string | null {
		const trimmed = value.trim();
		if (!trimmed) return null;

		if (key === 'email') {
			// Reject anything that isn't a plain address.
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? `mailto:${trimmed}` : null;
		}

		try {
			const url = new URL(trimmed);
			return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
		} catch {
			return null;
		}
	}

	const socials = Object.entries(site.socials)
		.map(([key, value]) => ({ key, href: toHref(key, String(value ?? '')) }))
		.filter((s): s is { key: string; href: string } => s.href !== null);
</script>

<footer class="mt-auto border-t border-border bg-surface-raised">
	<div
		class="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between"
	>
		<div class="flex flex-col gap-1">
			<p class="text-sm text-text-muted">
				© {year}
				{site.author}. All rights reserved.
			</p>
			<!-- CC BY-SA 4.0 attribution — required by the template licence -->
			<p class="text-xs text-text-subtle">
				Built from a template by
				<a
					href="https://ewancroft.uk"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-text-muted"
				>
					Ewan Croft
				</a>
				— licensed under
				<a
					href="https://creativecommons.org/licenses/by-sa/4.0/"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-text-muted"
				>
					CC BY-SA 4.0
				</a>
			</p>
		</div>

		{#if socials.length}
			<ul class="flex gap-4">
				{#each socials as { key, href } (key)}
					<li>
						<a
							{href}
							target={key !== 'email' ? '_blank' : undefined}
							rel={key !== 'email' ? 'noopener noreferrer' : undefined}
							class="text-sm text-text-muted capitalize hover:text-text"
						>
							{key}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</footer>
