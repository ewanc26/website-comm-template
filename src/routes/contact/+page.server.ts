import { fail } from '@sveltejs/kit';
import { sendContactEmail } from '$lib/email';
import type { Actions } from './$types';

// Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes.
// For multi-instance deployments, swap this for a Redis-backed store.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const times = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	if (times.length >= MAX_PER_WINDOW) return true;
	submissions.set(ip, [...times, now]);
	return false;
}

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot — bots fill this hidden field; humans never see it
		if (data.get('_hp')) {
			// Silently succeed to avoid giving bots feedback
			return { success: true };
		}

		const name = (data.get('name') ?? '').toString().trim();
		const email = (data.get('email') ?? '').toString().trim();
		const message = (data.get('message') ?? '').toString().trim();

		// --- Validation ---
		const errors: Record<string, string> = {};

		if (!name) errors.name = 'Please enter your name.';
		else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';

		if (!email) errors.email = 'Please enter your email address.';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';

		if (!message) errors.message = 'Please enter a message.';
		else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
		else if (message.length > 5000) errors.message = 'Message must be 5,000 characters or fewer.';

		if (Object.keys(errors).length) {
			return fail(422, { errors, values: { name, email, message } });
		}

		// --- Rate limit ---
		const ip = getClientAddress();
		if (isRateLimited(ip)) {
			return fail(429, {
				errors: { form: 'Too many messages sent. Please wait a few minutes and try again.' },
				values: { name, email, message }
			});
		}

		// --- Send ---
		try {
			await sendContactEmail({ name, email, message });
		} catch (err) {
			console.error('[contact] email send failed:', err);
			return fail(500, {
				errors: { form: 'Something went wrong sending your message. Please try again later.' },
				values: { name, email, message }
			});
		}

		return { success: true };
	}
};
