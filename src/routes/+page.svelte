<script lang="ts">
	import { site } from '$lib/config';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.tagline} />
</svelte:head>

<!-- Hero -->
<section class="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-36">
	<h1 class="text-4xl font-bold tracking-tight text-text sm:text-6xl">
		{site.tagline}
	</h1>
	<p class="max-w-2xl text-lg text-text-muted">
		<!-- TODO: add a short paragraph introducing the site or the person behind it -->
		Welcome to {site.name}. Replace this with a warm, concise introduction — who you are, what you
		do, and why visitors should stick around.
	</p>
	<div class="flex flex-wrap gap-4">
		<a
			href="/about"
			class="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg hover:bg-primary-hover"
		>
			Learn more
		</a>
		<a
			href="/contact"
			class="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:border-text-subtle"
		>
			Get in touch
		</a>
	</div>
</section>

<!-- Feature / highlights section — duplicate or remove blocks as needed -->
<section class="bg-surface-raised py-20">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-10 text-2xl font-semibold text-text">
			<!-- TODO: section heading -->
			What I offer
		</h2>
		<div class="grid gap-8 sm:grid-cols-3">
			{#each ['Feature one', 'Feature two', 'Feature three'] as feature}
				<div class="rounded-xl border border-border bg-surface p-6 shadow-sm">
					<h3 class="mb-2 font-semibold text-text">{feature}</h3>
					<p class="text-sm text-text-muted">
						<!-- TODO: describe this feature/service/highlight -->
						Short description goes here. Explain what makes this valuable to your visitor.
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
