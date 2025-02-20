import '$lib/locals/i18n.js';

export async function load({ locals, cookies }) {
	const lang = locals.lang;
	let session = {
		language: lang || 'en',
		user: { ...locals.user, name: cookies.get('name') }
	};

	return { session };
}
