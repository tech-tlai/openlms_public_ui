import { locale } from 'svelte-i18n';

export const handle = async ({ event, resolve }) => {
	const cookieLang = event?.cookies?.get('language');
	const lang = cookieLang || 'en';

	if (lang) {
		locale.set(lang);
		event.locals.lang = lang; // Pass the language to the load function
	}
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
