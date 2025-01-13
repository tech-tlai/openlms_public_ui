export async function GET({ params, request }) {
	let res;
	try {
		let queryparams = request.url.split('?');
		let endPoint = `http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/courses/${params.id}`;
		if (queryparams?.length > 1) {
			endPoint += '?' + queryparams[1];
		}
		res = await fetch(endPoint);

		if (!res.ok || res.status !== 200) {
			return new Error('No Data Found');
		}
		const data = await res.json();

		if (data?.length===0 || Object.keys(data)?.length ===0) {
			throw new Error('No Data Found');
		}

		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(res.body, { status: res.status, headers: res.headers });
	}
}
