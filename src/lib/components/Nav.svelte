<!-- ─── Component: Nav ──────────────────────────────────────
     Sticky top navigation bar with desktop link row and
     mobile hamburger menu. Active route is highlighted via
     SvelteKit's $page state. Backdrop blur applied on scroll
     for visual depth on longer pages. -->

<script lang="ts">
	import { site, navLinks } from '$lib/config';
	import { page } from '$app/state';

	let menuOpen = $state(false);
	let navEl = $state<HTMLElement | undefined>();

	// Close on route change so the panel never survives a navigation.
	$effect(() => {
		page.url.pathname;
		menuOpen = false;
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && menuOpen) {
			menuOpen = false;
		}
	}

	function onPointerDown(event: PointerEvent) {
		if (!menuOpen) return;
		if (navEl && !navEl.contains(event.target as Node)) menuOpen = false;
	}
</script>

<svelte:window on:keydown={onKeydown} on:pointerdown={onPointerDown} />

<header
	bind:this={navEl}
	class="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-sm"
>
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
						aria-current={page.url.pathname === link.href ? 'page' : undefined}
						class="text-sm font-medium transition-colors hover:text-text {page.url.pathname ===
						link.href
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
			type="button"
			class="-m-2 flex flex-col gap-1.5 p-2 sm:hidden"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
		>
			<span
				class="block h-0.5 w-6 bg-text transition-all {menuOpen ? 'translate-y-2 rotate-45' : ''}"
			></span>
			<span class="block h-0.5 w-6 bg-text transition-all {menuOpen ? 'opacity-0' : ''}"></span>
			<span
				class="block h-0.5 w-6 bg-text transition-all {menuOpen ? '-translate-y-2 -rotate-45' : ''}"
			></span>
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if menuOpen}
		<ul id="mobile-menu" class="flex flex-col border-t border-border px-6 py-4 sm:hidden">
			{#each navLinks as link}
				<li>
					<a
						href={link.href}
						aria-current={page.url.pathname === link.href ? 'page' : undefined}
						class="block py-2 text-sm font-medium hover:text-text {page.url.pathname === link.href
							? 'text-text'
							: 'text-text-muted'}"
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</header>
