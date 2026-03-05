<script lang="ts">
	import { site } from '$lib/config';

	const year = new Date().getFullYear();

	const socials = Object.entries(site.socials).filter(([, v]) => v);
</script>

<footer class="mt-auto border-t border-border bg-surface-raised">
	<div class="mx-auto max-w-5xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-col gap-1">
			<p class="text-sm text-text-muted">
				© {year} {site.author}. All rights reserved.
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
				{#each socials as [key, href]}
					<li>
						<a
							href={key === 'email' ? `mailto:${href}` : href}
							target={key !== 'email' ? '_blank' : undefined}
							rel="noopener noreferrer"
							class="text-sm capitalize text-text-muted hover:text-text"
						>
							{key}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</footer>
