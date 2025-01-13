export async function load({ parent }) {
	const parentData = await parent();
	// get the currect language from the parent
	// --- OLD LOGIC ---
	// const allCoursesData = parentData.allCoursesData ? parentData.allCoursesData : [];

	return {
		allCoursesData: parentData.allCoursesData
	};
}
