<script>
	import { page } from '$app/stores';
	import CourseListingPage from '$lib/courseListing/CourseListingPage.svelte';
	let route = $page.route.id;
	let params = $page.params;
	let category = $page.url.searchParams.get('filter');
	export let data;
</script>

<CourseListingPage {route} {params} {category} allCoursesData={data.allCoursesData} />
