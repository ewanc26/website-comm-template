<script lang="ts">
	import { site } from '$lib/config';
</script>

<svelte:head>
	<title>About — {site.name}</title>
	<meta name="description" content="Learn more about {site.name}." />
</svelte:head>

<article class="prose prose-gray mx-auto max-w-2xl px-6 py-20 dark:prose-invert">
	<h1>About</h1>

	<!-- TODO: replace the placeholder content below -->
	<p>
		This is the about page. Write a few paragraphs here — your background, what you do, your values,
		or anything else that helps visitors understand who you are.
	</p>

	<p>
		You can add images, lists, or any other content. The <code>prose</code> class from
		<a href="https://tailwindcss.com/docs/typography-plugin" target="_blank" rel="noopener">
			@tailwindcss/typography
		</a>
		handles all the formatting automatically.
	</p>

	<h2>Skills / experience</h2>
	<ul>
		<li>Skill or experience one</li>
		<li>Skill or experience two</li>
		<li>Skill or experience three</li>
	</ul>
</article>
