<script>
	import { page } from '$app/stores';
	import { format } from 'svelte-i18n';
	import AboutDashboard from '$lib/dashboard/AboutDashboard.svelte';
	import Tabs from '$lib/courses/Tabs.svelte';
	import TraineeStatsContainer from '$lib/dashboard/TraineeStatsContainer.svelte';
	import CourseStatsContainer from '$lib/dashboard/CourseStatsContainer.svelte';
	import Assessment from '$lib/dashboard/Assessment.svelte';

	// Importing params and route for bread crumbs
	export let data;

	const {
		statesStats,
		overallStats,
		traineesByCourse,
		courseList,
		traineeStatsByCourseCategory,
		coursesByState,
		traineesByState,
		stateData,
		lang
	} = data;

	let route = $page.route.id;
	let params = $page.params;

	let tabs = [
		{
			text: 'Trainee Stats',
			component: TraineeStatsContainer,
			clicked: false,
			textDispaly: $format('Trainee Stats'),
			historicalData: {
				traineesByCourse,
				courseList,
				statesStatsData: statesStats,
				traineeStatsByCourseCategory,
				traineesByState,
				statesData: stateData,
				overallStats
			},
			lang: lang,
			icon: '/traineesEnrolledIcon.svg'
		},
		{
			text: 'Course Stats',
			component: CourseStatsContainer,
			clicked: false,
			textDispaly: $format('CourseStats'),
			historicalData: { coursesByState, overallStats },
			lang: lang,
			icon: '/coursesIcon.svg'
		}
		// {
		// 	text: 'Assessment',
		// 	component: Assessment,
		// 	clicked: false,
		// 	textDispaly: $format('Assessment'),
		// 	lang:lang,
		// 	icon: '/assessment.svg'
		// }
	];

	$: setTabsData($format);

	function setTabsData() {
		tabs = [
			{
				text: 'Trainee Stats',
				component: TraineeStatsContainer,
				clicked: false,
				textDispaly: $format('TraineeStats'),
				historicalData: {
					traineesByCourse,
					courseList,
					statesStatsData: statesStats,
					traineeStatsByCourseCategory,
					traineesByState,
					statesData: stateData,
					overallStats
				},
				icon: '/traineesEnrolledIcon.svg'
			},
			{
				text: 'Course Stats',
				component: CourseStatsContainer,
				clicked: false,
				textDispaly: $format('CourseStats'),
				historicalData: { coursesByState, overallStats },
				icon: '/coursesIcon.svg'
			}
			// {
			// 	text: 'Assessment',
			// 	component: Assessment,
			// 	clicked: false,
			// 	textDispaly: $format('Assessment'),
			// 	// historicalData: ,
			// 	icon: '/assessment.svg'
			// }
		];
	}
	let componentToRender = tabs[0];

	// Tab to remain selected on page load
	let activeTabText = tabs[0]?.text;
	let historicalData = tabs[0]?.historicalData;

	function handleActiveTab(e) {
		activeTabText = e.detail;
		let [matchedObj] = activeTabText
			? tabs?.filter((tab) =>
					tab?.text?.toLowerCase().trim().includes(activeTabText?.toLowerCase().trim())
				)
			: [componentToRender];
		componentToRender = matchedObj;
		historicalData = matchedObj?.historicalData;
	}
</script>

<AboutDashboard {params} {route} />
<div class="lg:mx-[92px] mx-4 my-8 mt-0 lg:mb-9 lg:mt-0">
	<div class="mb-4 sm:mb-6">
		<Tabs bind:tabs on:handleActiveTab={handleActiveTab} {activeTabText} />
	</div>
	<div class="">
		<svelte:component this={componentToRender.component} {historicalData} {lang} />
	</div>
</div>
