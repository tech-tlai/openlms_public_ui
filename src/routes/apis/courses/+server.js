import { json } from '@sveltejs/kit';

export async function GET() {
	let res;
	try {
		let endPoint = 'http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/courses';

		res = await fetch(endPoint);
		if (!res.ok || res.status !== 200) {
			return new Response(res.body, { status: res.status, headers: res.headers });
		}

		const data = await res.json();

		if (data?.length === 0 || Object.keys(data)?.length === 0) {
			throw new Error('No Data Found');
		}

		return json(data);
	} catch (error) {
		return json({ error: error.message }, { status: res.status });
	}
}
