<script lang="ts">
	import { site } from '$lib/config';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitted = $state(false);

	// TODO: wire up to a real form service (e.g. Formspree, Resend, or a +page.server.ts action)
	function handleSubmit(e: Event) {
		e.preventDefault();
		// Placeholder — replace with actual submission logic
		submitted = true;
	}
</script>

<svelte:head>
	<title>Contact — {site.name}</title>
	<meta name="description" content="Get in touch with {site.name}." />
</svelte:head>

<section class="mx-auto max-w-xl px-6 py-20">
	<h1 class="mb-2 text-3xl font-bold text-gray-900">Get in touch</h1>
	<p class="mb-10 text-gray-600">
		<!-- TODO: customise this intro -->
		Have a question or want to work together? Fill in the form below and I'll get back to you as soon
		as I can.
	</p>

	{#if submitted}
		<div class="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
			<p class="font-medium">Thanks for reaching out!</p>
			<p class="mt-1 text-sm">I'll be in touch soon.</p>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="flex flex-col gap-5">
			<div class="flex flex-col gap-1.5">
				<label for="name" class="text-sm font-medium text-gray-700">Name</label>
				<input
					id="name"
					type="text"
					required
					bind:value={name}
					placeholder="Your name"
					class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
				/>
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					type="email"
					required
					bind:value={email}
					placeholder="you@example.com"
					class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
				/>
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="message" class="text-sm font-medium text-gray-700">Message</label>
				<textarea
					id="message"
					required
					rows="5"
					bind:value={message}
					placeholder="How can I help?"
					class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
				></textarea>
			</div>

			<button
				type="submit"
				class="self-start rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
			>
				Send message
			</button>
		</form>
	{/if}

	{#if site.socials.email}
		<p class="mt-8 text-sm text-gray-500">
			Prefer email? Reach me directly at
			<a href="mailto:{site.socials.email}" class="font-medium text-gray-800 hover:underline">
				{site.socials.email}
			</a>
		</p>
	{/if}
</section>
