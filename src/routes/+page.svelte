<script lang="ts">
	import { site } from '$lib/config';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.tagline} />
</svelte:head>

<!-- Hero -->
<section class="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-36">
	<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
		{site.tagline}
	</h1>
	<p class="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
		<!-- TODO: add a short paragraph introducing the site or the person behind it -->
		Welcome to {site.name}. Replace this with a warm, concise introduction — who you are, what you
		do, and why visitors should stick around.
	</p>
	<div class="flex flex-wrap gap-4">
		<a
			href="/about"
			class="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
		>
			Learn more
		</a>
		<a
			href="/contact"
			class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500"
		>
			Get in touch
		</a>
	</div>
</section>

<!-- Feature / highlights section — duplicate or remove blocks as needed -->
<section class="bg-gray-50 py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-10 text-2xl font-semibold text-gray-900 dark:text-gray-100">
			<!-- TODO: section heading -->
			What I offer
		</h2>
		<div class="grid gap-8 sm:grid-cols-3">
			{#each ['Feature one', 'Feature two', 'Feature three'] as feature}
				<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
					<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">{feature}</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						<!-- TODO: describe this feature/service/highlight -->
						Short description goes here. Explain what makes this valuable to your visitor.
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
