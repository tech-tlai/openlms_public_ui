import '$lib/locals/i18n.js';

export async function load({ locals }) {
	const lang = locals.lang;
	let session = {
		language: lang || 'en'
	};

	return { session };
}
