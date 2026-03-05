import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { site } from '$lib/config';

export interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

/**
 * Send a contact-form submission to the site owner.
 *
 * To swap providers, replace the body of this function.
 * `payload` has name, email, and message.
 * `to` and `from` come from config.ts (or CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM env vars).
 */
export async function sendContactEmail(
	payload: ContactPayload,
	overrides?: { to?: string; from?: string }
): Promise<void> {
	const to = overrides?.to ?? site.contactEmailTo;
	const from = overrides?.from ?? site.contactEmailFrom;

	const subject = `New message from ${payload.name} via ${site.name}`;
	const text = `Name:    ${payload.name}\nEmail:   ${payload.email}\n\n${payload.message}`;

	// --- Resend (default) ---
	// Replace this block to use a different provider.
	const { error } = await new Resend(RESEND_API_KEY).emails.send({
		from,
		to,
		replyTo: payload.email,
		subject,
		text
	});

	if (error) throw new Error(error.message);
}
