import { json } from '@sveltejs/kit';

export async function GET({ params, request }) {
	let res;
	try {
		let endPoint = `http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/courses/${params.id}/rsetis`;
		res = await fetch(endPoint);

		if (!res.ok || res.status !== 200) {
			return new Response(res.body, { status: res.status, headers: res.headers });
		}
		const data = await res.json();
		// console.log('data', data);
		return json(data);
	} catch (error) {
		return new Response(undefined, { status: 500 });
	}
}
