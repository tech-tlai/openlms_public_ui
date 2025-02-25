import { json } from '@sveltejs/kit';

// API to get list of all states
export async function GET() {
	let res;
	try {
		res = await fetch(`http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/states`);

		if (!res.ok || res.status !== 200) {
			throw new Error('Failed to fetch states data');
		}
		const data = await res.json();
		// sort data before returning response
		data.sort(function (a, b) {
			if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) {
				return -1;
			}
			if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) {
				return 1;
			}
			return 0;
		});

		return json(data);
	} catch (error) {
		return json({ error: error.message }, { status: res.status });
	}
}
