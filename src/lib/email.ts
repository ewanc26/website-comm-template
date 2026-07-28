// ─── Module: contact email sender ─────────────────────────
// Encapsulates the email-provider integration behind a single
// function. To swap providers, replace the Resend block below;
// the calling code (contact form action) never needs changing.

import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { site } from '$lib/config';

export interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

/** Raised when the template is still carrying placeholder mail configuration. */
export class ContactConfigError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ContactConfigError';
	}
}

/** Values shipped with the template that must be replaced before going live. */
const PLACEHOLDERS = new Set(['you@example.com', 'My Site <noreply@yourdomain.com>', 're_...']);

/** Abort a hung provider call rather than holding the request open. */
const SEND_TIMEOUT_MS = 10_000;

/**
 * Collapse anything that could terminate a header line.
 *
 * `name` is attacker-controlled and is interpolated into the `Subject`
 * header, so CR/LF (and other control characters) must not survive.
 */
function sanitiseHeaderValue(value: string): string {
	// eslint-disable-next-line no-control-regex
	return value.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim();
}

/**
 * Send a contact-form submission to the site owner.
 *
 * To swap providers, replace the body of this function.
 * `payload` has name, email, and message.
 *
 * The envelope comes from `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` when
 * those are set, otherwise from `contactEmailTo` / `contactEmailFrom` in
 * `src/lib/config.ts`.
 *
 * @throws ContactConfigError if the API key or envelope is missing/placeholder
 */
export async function sendContactEmail(payload: ContactPayload): Promise<void> {
	const apiKey = env.RESEND_API_KEY;
	const to = env.CONTACT_EMAIL_TO || site.contactEmailTo;
	const from = env.CONTACT_EMAIL_FROM || site.contactEmailFrom;

	// Fail loudly during setup rather than silently dropping a real enquiry.
	if (!apiKey || PLACEHOLDERS.has(apiKey)) {
		throw new ContactConfigError(
			'RESEND_API_KEY is not set. Copy .env.example to .env and add a real key.'
		);
	}
	if (!to || PLACEHOLDERS.has(to)) {
		throw new ContactConfigError(
			'Contact recipient is still the template placeholder. Set contactEmailTo in src/lib/config.ts or CONTACT_EMAIL_TO.'
		);
	}
	if (!from || PLACEHOLDERS.has(from)) {
		throw new ContactConfigError(
			'Contact sender is still the template placeholder. Set contactEmailFrom in src/lib/config.ts or CONTACT_EMAIL_FROM.'
		);
	}

	const safeName = sanitiseHeaderValue(payload.name);
	const safeEmail = sanitiseHeaderValue(payload.email);

	const subject = `New message from ${safeName} via ${sanitiseHeaderValue(site.name)}`;
	const text = `Name:    ${safeName}\nEmail:   ${safeEmail}\n\n${payload.message}`;

	// --- Resend (default) ---
	// Replace this block to use a different provider.
	const send = new Resend(apiKey).emails.send({
		from,
		to,
		replyTo: safeEmail,
		subject,
		text
	});

	let timer: ReturnType<typeof setTimeout> | undefined;
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => reject(new Error('Email provider timed out.')), SEND_TIMEOUT_MS);
	});

	try {
		const { error } = await Promise.race([send, timeout]);
		if (error) throw new Error(error.message);
	} finally {
		clearTimeout(timer);
	}
}
