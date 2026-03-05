// ============================================================
//  Site Configuration
//  Edit this file to customise the site for each commission.
// ============================================================

export const site = {
	/** Displayed in the browser tab, nav logo, and footer */
	name: 'Site Name',

	/** Short tagline shown on the homepage hero */
	tagline: 'A short description of what this site is about.',

	/** Footer copyright name */
	author: 'Your Name',

	/** Social / contact links — remove any you don't need */
	socials: {
		email: 'hello@example.com',
		github: '',
		twitter: '',
		instagram: '',
		linkedin: ''
	}
};

/** Primary navigation links */
export const navLinks: { label: string; href: string }[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
];
