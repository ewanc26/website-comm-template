<!-- ─── Root Layout ─────────────────────────────────────────
     Wraps every page with Nav (top), Footer (bottom), and
     the global CSS entry point. The min-h-screen + flex
     layout keeps the footer pinned to the bottom even on
     short pages. Favicon is injected once here via <svelte:head>. -->

<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-surface">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
