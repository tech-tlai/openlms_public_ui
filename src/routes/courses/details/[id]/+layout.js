import { error } from '@sveltejs/kit';
import { String_Constants } from '../../../../config/constants';
import { formatDateMMMYYYY } from '$lib/utils/helper.js';

export async function load({ params, fetch, parent }) {
	const parentData = await parent();
	const lang = parentData?.lang ? parentData.lang : 'en';
	const statesMap = parentData.statesMap ? parentData.statesMap : {};

	let centersData = [];
	let statesData = [];

	async function fetchRsetisOfCourse() {
		try {
			const rsetisOfCourseResp = await fetch(`/apis/courses/details/${params.id}/rsetis`);
			if (rsetisOfCourseResp?.status === 'rejected') {
				return { centersData, statesData };
			}

			if (!rsetisOfCourseResp.ok) {
				return { centersData, statesData };
			}

			if (rsetisOfCourseResp.status == 200) {
				let restiUUIDs = await rsetisOfCourseResp.json();
				const allCentersMap = parentData.allCentersMap;

				//checking for a known field
				if (!restiUUIDs?.rsetiCourses?.length) {
					return { centersData, statesData };
				}

				centersData =
					restiUUIDs?.rsetiCourses
						?.filter((elem) => elem && elem.rsetiUuid && elem.startDate) // Ensure elem and required properties exist
						?.map((elem) => {
							const center = allCentersMap?.[elem.rsetiUuid] || {}; // Fallback to an empty object if the center is not found
							return {
								...center,
								startDateObj: new Date(elem.startDate),
								plannedDate: formatDateMMMYYYY(elem.startDate) || null
							};
						})
						?.map((rseti) => {
							if (!rseti || !rseti.stateId) return { ...rseti, stateName: '' };
							return {
								...rseti,
								stateName: statesMap?.[rseti.stateId] || ''
							};
						})
						?.sort((a, b) => {
							// Ensure valid dates for comparison
							const dateA = a.startDateObj.getTime() || 0;
							const dateB = b.startDateObj.getTime() || 0;
							return dateB - dateA; // Sort descending (latest first)
						}) || [];

				// extract all unique state names from the data
				let uniqueStateIds = [
					...new Set(
						centersData.map((element) => {
							return element.stateId;
						})
					)
				];
				// Add all states option to the list
				// uniqueStateIds = [String_Constants.ALL_STATES, ...uniqueStateIds];
				statesData = uniqueStateIds.map((element) => {
					return {
						name: statesMap[element],
						extId: element
					};
				});
				statesData = [{ extId: -1, name: String_Constants.ALL_STATES }, ...statesData];
				return { centersData, statesData };
			}
			return { centersData, statesData };
		} catch (err) {
			return { centersData, statesData };
		}
	}

	async function fetchCourseDetails() {
		let courseDetailsResp;
		try {
			courseDetailsResp = await fetch(`/apis/courses/details/${params.id}`);
			if (courseDetailsResp?.status !== 200 && !courseDetailsResp.ok) {
				throw new Error('Failed to fetch course details');
			}
			//when promise is fulfilled, then only value property will be returned in response
			const courseDetails = await courseDetailsResp.json();

			// extract the language data and make it top level in data
			let languageFilteredcourseDetails = {};
			const translationData = courseDetails?.translations?.find(
				(translation) => translation.languageCode === lang
			);
			languageFilteredcourseDetails = { ...courseDetails, ...translationData };

			return languageFilteredcourseDetails;
		} catch (err) {
			throw error(courseDetailsResp.status, {
				message: 'Failed to fetch course details',
				status: courseDetailsResp.status
			});
		}
	}

	async function fetchCourseStats() {
		let res;
		try {
			res = await fetch(`/apis/courses/details/${params.id}/stats`);
			if (res?.status !== 200 && !res.ok) {
				throw new Error('Failed to fetch course stats');
			}
			const courseStats = await res.json();

			return courseStats;
		} catch (err) {
			return {};
		}
	}

	return {
		courseDetails: await fetchCourseDetails(),
		rsetiOfCourse: await fetchRsetisOfCourse(),
		courseStats: await fetchCourseStats(),
		lang
	};
}
