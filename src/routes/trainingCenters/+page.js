import { states } from '$lib/data.js';
import { error } from '@sveltejs/kit';
import { String_Constants } from '../../config/constants';

export const load = async ({ fetch, parent, locals }) => {
	const parentData = await parent();

	const lang = parentData.lang || 'en';

	// fetch the course details form the /apis route
	const fetchCourses = async () => {
		try {
			let data = parentData?.allCoursesData ?? [];

			// Adding all courses option to the list
			if (data?.length > 0) {
				data = [
					{
						title: String_Constants.ALL_COURSES,
						uuid: 0
					},
					...data
				];
			} else {
				// return an option list with no course found
				return [
					{
						title: String_Constants.NO_COURSE_FOUND,
						uuid: 0
					}
				];
			}

			return data;
		} catch (err) {
			return [
				{
					title: String_Constants.NO_COURSE_FOUND,
					uuid: 0
				}
			];
		}
	};

	return {
		courseData: await fetchCourses()
	};
};
