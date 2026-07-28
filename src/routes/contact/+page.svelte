<!-- ─── Route: /contact ─────────────────────────────────────
     Progressive-enhancement contact form. Uses SvelteKit's
     use:enhance to submit without a full page reload.
     Server errors (validation, rate-limit, send failure) are
     echoed back per-field. A honeypot field catches bots;
     legitimate users never see it. -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { site } from '$lib/config';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);

	// Repopulate fields with the values the server echoed back on error
	const v = $derived(
		form && !form.success ? ((form as { values?: Record<string, string> }).values ?? {}) : {}
	);
	const errors = $derived(
		form && !form.success ? ((form as { errors?: Record<string, string> }).errors ?? {}) : {}
	);

	// A visible focus ring replaces the removed default outline — border colour
	// alone is not a sufficient focus indicator.
	const inputBase =
		'rounded-lg border bg-surface px-4 py-2.5 text-sm text-text placeholder-text-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface';
	const inputOk = 'border-border focus:border-text-muted';
	const inputErr = 'border-red-400 focus:border-red-500';
</script>

<svelte:head>
	<title>Contact — {site.name}</title>
	<meta name="description" content="Get in touch with {site.name}." />
</svelte:head>

<section class="mx-auto max-w-xl px-6 py-20">
	<h1 class="mb-2 text-3xl font-bold text-text">Get in touch</h1>
	<p class="mb-10 text-text-muted">
		<!-- TODO: customise this intro -->
		Have a question or want to work together? Fill in the form below and I'll get back to you as soon
		as I can.
	</p>

	{#if form?.success}
		<div
			role="status"
			aria-live="polite"
			class="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
		>
			<p class="font-medium">Thanks for reaching out!</p>
			<p class="mt-1 text-sm">I'll be in touch soon.</p>
		</div>
	{:else}
		{#if errors.form}
			<div
				role="alert"
				class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
			>
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
			<input
				type="text"
				name="_hp"
				tabindex="-1"
				autocomplete="off"
				aria-hidden="true"
				class="hidden"
			/>

			<div class="flex flex-col gap-1.5">
				<label for="name" class="text-sm font-medium text-text-muted">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					autocomplete="name"
					value={v.name ?? ''}
					placeholder="Your name"
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={errors.name ? 'name-error' : undefined}
					class="{inputBase} {errors.name ? inputErr : inputOk}"
				/>
				{#if errors.name}
					<p id="name-error" class="text-xs text-red-600 dark:text-red-400">{errors.name}</p>
				{/if}
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium text-text-muted">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					autocomplete="email"
					value={v.email ?? ''}
					placeholder="you@example.com"
					aria-invalid={errors.email ? 'true' : undefined}
					aria-describedby={errors.email ? 'email-error' : undefined}
					class="{inputBase} {errors.email ? inputErr : inputOk}"
				/>
				{#if errors.email}
					<p id="email-error" class="text-xs text-red-600 dark:text-red-400">{errors.email}</p>
				{/if}
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="message" class="text-sm font-medium text-text-muted">Message</label>
				<textarea
					id="message"
					name="message"
					required
					rows="5"
					placeholder="How can I help?"
					aria-invalid={errors.message ? 'true' : undefined}
					aria-describedby={errors.message ? 'message-error' : undefined}
					class="{inputBase} {errors.message ? inputErr : inputOk}">{v.message ?? ''}</textarea
				>
				{#if errors.message}
					<p id="message-error" class="text-xs text-red-600 dark:text-red-400">{errors.message}</p>
				{/if}
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="self-start rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-fg hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
			>
				{submitting ? 'Sending…' : 'Send message'}
			</button>
		</form>
	{/if}

	{#if site.socials.email}
		<p class="mt-8 text-sm text-text-muted">
			Prefer email? Reach me directly at
			<a href="mailto:{site.socials.email}" class="font-medium text-text hover:underline">
				{site.socials.email}
			</a>
		</p>
	{/if}
</section>
