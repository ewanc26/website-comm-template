import { defineEnvVars } from '@sveltejs/kit/env';

// Every variable is optional: `sendContactEmail` and `siteUrl` handle a missing value.
export const variables = defineEnvVars({
	RESEND_API_KEY: { schema: (input) => input },
	CONTACT_EMAIL_TO: { schema: (input) => input },
	CONTACT_EMAIL_FROM: { schema: (input) => input },
	PUBLIC_SITE_URL: { public: true, schema: (input) => input }
});
