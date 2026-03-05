<script lang="ts">
	import { site, navLinks } from '$lib/config';
	import { page } from '$app/state';

	let menuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
	<nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
		<!-- Logo / site name -->
		<a href="/" class="text-lg font-semibold tracking-tight text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400">
			{site.name}
		</a>

		<!-- Desktop links -->
		<ul class="hidden gap-6 sm:flex">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100 {page.url.pathname ===
						link.href
							? 'text-gray-900 dark:text-gray-100'
							: 'text-gray-500 dark:text-gray-400'}"
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
			<span class="block h-0.5 w-6 bg-gray-800 transition-all dark:bg-gray-200 {menuOpen ? 'translate-y-2 rotate-45' : ''}"></span>
			<span class="block h-0.5 w-6 bg-gray-800 transition-all dark:bg-gray-200 {menuOpen ? 'opacity-0' : ''}"></span>
			<span class="block h-0.5 w-6 bg-gray-800 transition-all dark:bg-gray-200 {menuOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if menuOpen}
		<ul class="flex flex-col border-t border-gray-100 px-6 py-4 dark:border-gray-800 sm:hidden">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						class="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</header>
