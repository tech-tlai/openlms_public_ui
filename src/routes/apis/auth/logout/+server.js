import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	try {
		cookies.getAll().forEach(({ name }) => {
			console.log('cookies name', name);
			cookies.delete(name, { path: '/' });
		});

		return json({ status: 'success' });
	} catch (error) {
		return json({ status: 'failure' }, { status: 400 });
	}
}