import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	let res;
	try {
		res = await fetch(
			`http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/stats/rsetis/${params.id}`
		);

		if (res.status != 200 || !res.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await res.json();

		return json(data);
	} catch (error) {
		return json({ error: error.message }, { status: res.status });
	}
}
