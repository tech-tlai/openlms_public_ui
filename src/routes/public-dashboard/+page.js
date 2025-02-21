export const ssr = false;

export async function load({ fetch, parent }) {
	const parentData = await parent();

	const lang = parentData?.lang ? parentData.lang : 'en';
	const stateList = parentData.stateData ? parentData.stateData : [];

	const hashmapOfStates = stateList.reduce((acc, item) => {
		acc[item.extId] = item; // Use extId as the key and the entire object as value
		return acc;
	}, {});

	async function fetchStatsStates() {
		try {
			// get overall data of states from api
			const statsResp = await fetch(`/apis/overallStats/trainees/by-state`);
			if (!statsResp.ok) {
				return [];
			}
			let extractedTotalTraineeData = {};
			if (statsResp.status == 200) {
				let data = await statsResp.json();
				// for each element in the data from api
				// make a map of state to data and aggrigate data of multiple years of a state

				data?.forEach((element) => {
					if (!extractedTotalTraineeData?.[element.year]) {
						extractedTotalTraineeData[element.year] = {};
					}
					if (!extractedTotalTraineeData[element.year][element.id]) {
						extractedTotalTraineeData[element.year][element.id] = {};
					}
					if (extractedTotalTraineeData[element.year][element.id]?.traineeCnt) {
						extractedTotalTraineeData[element.year][element.id].traineeCnt =
							extractedTotalTraineeData?.[element.id]?.traineeCnt + element.traineeCnt;
					} else {
						const stateData = hashmapOfStates[element.id];
						if (stateData) {
							extractedTotalTraineeData[element.year][element.id] = {
								traineeCnt: element.trainedCount,
								id: stateData.isoCode ? stateData.isoCode.trim() : '',
								name: stateData.name ? stateData.name : ''
							};
						}
					}
				});

				return extractedTotalTraineeData;
			}
			return [];
		} catch (err) {
			console.log('Error in fetching states stats: ', err.message);
			return [];
		}
	}

	async function fetchTraineeStatsByCourseCategory() {
		let res;
		let data;
		try {
			res = await fetch(`/apis/overallStats/trainees/by-category`);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			if (res.status !== 200) {
				throw new Error('Failed to fetch data');
			}
			data = await res.json();
			if (data?.length === 0 || Object.keys(data)?.length === 0) {
				throw new Error('Data not found');
			}
			return { data, status: 200 };
		} catch (err) {
			return { data: [], error: err.message, status: res?.status || 500 };
		}
	}

	async function fetchTraineesByCourse() {
		let res;
		try {
			res = await fetch(`/apis/overallStats/trainees/by-course`);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			if (res.status !== 200) {
				throw new Error('Failed to fetch data');
			}
			if (res.status === 200) {
				let data = await res.json();
				if (data?.length === 0) {
					throw new Error('No data found');
				}
				return { data, status: 200 };
			}
		} catch (err) {
			return { data: [], error: err.message, status: res?.status || 500 };
		}
	}

	async function fetchTraineesByState() {
		let res;
		try {
			res = await fetch(`/apis/overallStats/trainees/by-state/currentYear`);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			if (res.status !== 200) {
				throw new Error('Failed to fetch data');
			}
			if (res.status === 200) {
				let data = await res.json();
				return { data, status: 200 };
			}
		} catch (err) {
			return { data: [], error: err.message, status: res?.status || 500 };
		}
	}

	async function fetchCoursesByState() {
		let res;
		try {
			res = await fetch(`/apis/overallStats/courses/by-state`);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			if (res.status !== 200) {
				throw new Error('Failed to fetch data');
			}
			if (res.status === 200) {
				let data = await res.json();

				// const transformedData =[];
				const transformedData = data.map((item) => {
					const stateData = hashmapOfStates[item.state_id];
					return {
						value: item.cnt,
						id: stateData.isoCode ? stateData.isoCode.trim() : '',
						name: stateData.name ? stateData.name : ''
					};
				});

				return { data: transformedData, status: 200 };
			}
		} catch (err) {
			return { data: [], error: err.message, status: res?.status || 500 };
		}
	}

	async function fetchStats() {
		let res;
		try {
			res = await fetch(`/apis/overallStats`);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			if (res.status !== 200) {
				throw new Error('Failed to fetch data');
			}
			if (res.status === 200) {
				let data = await res.json();
				return data;
			}
		} catch (err) {
			return [];
		}
	}

	return {
		statesStats: await fetchStatsStates(),
		overallStats: await fetchStats(),
		traineeStatsByCourseCategory: await fetchTraineeStatsByCourseCategory(),
		traineesByCourse: await fetchTraineesByCourse(),
		traineesByState: await fetchTraineesByState(),
		coursesByState: await fetchCoursesByState(),
		courseList: parentData?.allCoursesData ? parentData.allCoursesData : [],
		lang
	};
}
