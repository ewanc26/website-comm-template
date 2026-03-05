<script lang="ts">
	import { site } from '$lib/config';

	const year = new Date().getFullYear();

	const socials = Object.entries(site.socials).filter(([, v]) => v);
</script>

<footer class="mt-auto border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
	<div class="mx-auto max-w-5xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-col gap-1">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				© {year} {site.author}. All rights reserved.
			</p>
			<!-- CC BY-SA 4.0 attribution — required by the template licence -->
			<p class="text-xs text-gray-400 dark:text-gray-500">
				Built from a template by
				<a
					href="https://ewancroft.uk"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-gray-600 dark:hover:text-gray-300"
				>
					Ewan Croft
				</a>
				— licensed under
				<a
					href="https://creativecommons.org/licenses/by-sa/4.0/"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-gray-600 dark:hover:text-gray-300"
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
							class="text-sm capitalize text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
						>
							{key}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</footer>
