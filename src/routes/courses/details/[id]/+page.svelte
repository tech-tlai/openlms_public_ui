<script>
	import AboutCourse from '$lib/courses/AboutCourse.svelte';
	import CourseSection from '$lib/courses/CourseSection.svelte';
	import { page } from '$app/stores';
	import { _, locale } from 'svelte-i18n';

	export let data;

	const { courseDetails, rsetiOfCourse, videos, lang, courseStats } = data;
	const { centersData, statesData } = rsetiOfCourse;
	let route = $page.route.id;
	let params = $page.params;
</script>

<AboutCourse {params} {route} {courseDetails} {courseStats} />
<div class="lg:mx-[92px] mx-4 my-8 mt-0 lg:mb-9 lg:mt-0">
	<div class="mt-4">
		<CourseSection
			{params}
			chapters={courseDetails?.chapters ?? []}
			courseUuid={courseDetails?.uuid}
			{centersData}
			{statesData}
			{lang}
		/>
	</div>
</div>
