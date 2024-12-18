import { _ } from 'svelte-i18n';

export async function load({ fetch, parent }) {
	const parentData = await parent();
	const langCode = parentData.lang ? parentData.lang : 'en';

	async function generateToken() {
		try {
			let payload = { email: 'sinu.jamal@tensorlogic.ai', displayName: 'Sinu Jamal' };
			const resp = await fetch('/apis/kpoint/token', {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (resp.ok && resp.status === 200) {
				const { result } = await resp.json();

				return result;
			}
		} catch (err) {
			console.log(err);
		}
	}

	const fetchOfficialTestimonials = async () => {
		try {
			const res = await fetch(`/apis/testimonials/official`);
			if (!res.ok) {
				throw new Error('Data not found');
			}
			const data = await res.json();
			if (!data?.length) {
				throw new Error('Data not found');
			}
			return data;
		} catch (err) {
			return { error: err.message };
		}
	};

	const fetchTraineeTestimonials = async () => {
		try {
			const res = await fetch(`/apis/testimonials`);
			if (!res.ok) {
				throw new Error('Data not found');
			}
			const data = await res.json();

			if (!data?.length) {
				throw new Error('Data not found');
			}

			const filteredData = data.filter((item) => item != null);
			return filteredData;
		} catch (err) {
			return { error: err.message };
		}
	};

	const fetchOverAllStats = async () => {
		try {
			const res = await fetch(`/apis/overallStats`);
			if (!res.ok || res.status !== 200) {
				throw new Error('Data not found');
			}
			const data = await res.json();
			if (!Object.keys(data)?.length) {
				throw new Error('Data not found');
			}
			// -------- NOTE ------------
			// The stateName is just a key that is used to get the corresponding state name in the selected language
			// see lib/locals/en.json for actual value
			let generalStats = [
				
				{
					statName: 'ProgrammeCategories',
					statValue: data?.totalCategories,
					iconSvg: '/domainIcon.svg'
				},
				{
					statName: 'courses',
					statValue: data?.totalCourses,
					iconSvg: '/coursesIcon.svg'
				},
				{
					statName: 'trainingCenters',
					statValue: data?.totalTrainingCenters,
					iconSvg: '/learningCentersIcon.svg'
				},
				{
					statName: 'traineesEnrolled',
					statValue: data?.totalTrainees,
					iconSvg: '/traineesEnrolledIcon.svg'
				},
				
				
			];
			return generalStats;
		} catch (err) {
			return { error: err.message };
		}
	};

	return {
		carouselData: await fetchOfficialTestimonials(),
		testimonialData: await fetchTraineeTestimonials(),
		overAllStatsData: await fetchOverAllStats(),
		token: await generateToken()
	};
}
