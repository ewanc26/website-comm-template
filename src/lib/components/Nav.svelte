<script lang="ts">
	import { site, navLinks } from '$lib/config';
	import { page } from '$app/state';

	let menuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-sm">
	<nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
		<!-- Logo / site name -->
		<a href="/" class="text-lg font-semibold tracking-tight text-text hover:text-text-muted">
			{site.name}
		</a>

		<!-- Desktop links -->
		<ul class="hidden gap-6 sm:flex">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="text-sm font-medium transition-colors hover:text-text {page.url.pathname === link.href
							? 'text-text'
							: 'text-text-muted'}"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile hamburger -->
		<button
			class="flex flex-col gap-1.5 sm:hidden"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
		>
			<span class="block h-0.5 w-6 bg-text transition-all {menuOpen ? 'translate-y-2 rotate-45' : ''}"></span>
			<span class="block h-0.5 w-6 bg-text transition-all {menuOpen ? 'opacity-0' : ''}"></span>
			<span class="block h-0.5 w-6 bg-text transition-all {menuOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if menuOpen}
		<ul class="flex flex-col border-t border-border px-6 py-4 sm:hidden">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="block py-2 text-sm font-medium text-text-muted hover:text-text"
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</header>
