<script lang="ts">
	import { site } from '$lib/config';

	const year = new Date().getFullYear();

	const socials = Object.entries(site.socials).filter(([, v]) => v);
</script>

<footer class="mt-auto border-t border-gray-200 bg-gray-50">
	<div class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
		<p class="text-sm text-gray-500">
			© {year}
			{site.author}. All rights reserved.
		</p>

		{#if socials.length}
			<ul class="flex gap-4">
				{#each socials as [key, href]}
					<li>
						<a
							href={key === 'email' ? `mailto:${href}` : href}
							target={key !== 'email' ? '_blank' : undefined}
							rel="noopener noreferrer"
							class="text-sm capitalize text-gray-500 hover:text-gray-900"
						>
							{key}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</footer>
