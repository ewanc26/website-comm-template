<script lang="ts">
	import { enhance } from '$app/forms';
	import { site } from '$lib/config';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);

	// Repopulate fields with the values the server echoed back on error
	const v = $derived(form && !form.success ? (form as { values?: Record<string, string> }).values ?? {} : {});
	const errors = $derived(form && !form.success ? (form as { errors?: Record<string, string> }).errors ?? {} : {});
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

	{#if form?.success}
		<div class="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
			<p class="font-medium">Thanks for reaching out!</p>
			<p class="mt-1 text-sm">I'll be in touch soon.</p>
		</div>
	{:else}
		{#if errors.form}
			<div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{errors.form}
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
			class="flex flex-col gap-5"
		>
			<!-- Honeypot — hidden from real users, catches bots -->
			<input type="text" name="_hp" tabindex="-1" autocomplete="off" aria-hidden="true"
				class="hidden" />

			<div class="flex flex-col gap-1.5">
				<label for="name" class="text-sm font-medium text-gray-700">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					value={v.name ?? ''}
					placeholder="Your name"
					class="rounded-lg border px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none
						{errors.name
							? 'border-red-400 focus:border-red-500'
							: 'border-gray-300 focus:border-gray-500'}"
				/>
				{#if errors.name}
					<p class="text-xs text-red-600">{errors.name}</p>
				{/if}
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={v.email ?? ''}
					placeholder="you@example.com"
					class="rounded-lg border px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none
						{errors.email
							? 'border-red-400 focus:border-red-500'
							: 'border-gray-300 focus:border-gray-500'}"
				/>
				{#if errors.email}
					<p class="text-xs text-red-600">{errors.email}</p>
				{/if}
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="message" class="text-sm font-medium text-gray-700">Message</label>
				<textarea
					id="message"
					name="message"
					required
					rows="5"
					placeholder="How can I help?"
					class="rounded-lg border px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none
						{errors.message
							? 'border-red-400 focus:border-red-500'
							: 'border-gray-300 focus:border-gray-500'}"
				>{v.message ?? ''}</textarea>
				{#if errors.message}
					<p class="text-xs text-red-600">{errors.message}</p>
				{/if}
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="self-start rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white
					hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{submitting ? 'Sending…' : 'Send message'}
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
