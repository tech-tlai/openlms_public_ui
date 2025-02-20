import { convertYMDtoDMY } from '$lib/utils/helper';

export async function GET({ params, cookies }) {
	let res
	try {
		 res = await fetch(
			`http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/rsetis/${params.id}/courses`
		);
		if (res.status !== 200 || !res.ok) throw new Error('Failed to fetch courses');

		const data = await res.json();

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// console.log("Reached here", error.message)
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { 'Content-Type': 'application/json' },
			status: res?.status
		});
	}
}
