<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import CourseCard from '$lib/courseListing/CourseCard.svelte';
	import ErrorMessage from '$lib/courses/ErrorMessage.svelte';
	import CourseCardSkeleton from '$lib/courseListing/CourseCardSkeleton.svelte';
	import { format } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';

	export let sideBarCategory;
	export let searchValue;
	export let coursesCopy = [];
	export let error = null;
	export let loading = true;
	export let filteredCourses = [];
	export let selectedSortOption = '';
	export let defaultSortItem = '';
	export let showPlannedDate = false;

	let dummyCourseCardDetails = new Array(5);

	$: handleFilter(sideBarCategory, searchValue, coursesCopy, selectedSortOption);
	function handleFilter() {
		if (coursesCopy?.length > 0) {
			error = null;
			let localFilteredCopy = coursesCopy;
			// First filter out based on category from the main list
			if (sideBarCategory) {
				localFilteredCopy = localFilteredCopy?.filter(
					(course) => course?.category == sideBarCategory
				);
			}
			// Then filter further for search term in this category
			if (searchValue) {
				error = null;
				localFilteredCopy = localFilteredCopy?.filter((course) =>
					course?.title?.toLowerCase().trim().includes(searchValue?.toLowerCase().trim())
				);
				if (localFilteredCopy?.length === 0) {
					error = 'No Data Found';
				}
			}
			// Now once the the filtering is done sort them
			if (selectedSortOption) {
				localFilteredCopy = sortCourses(localFilteredCopy, selectedSortOption);
				if (localFilteredCopy?.length === 0) {
					error = 'No Data Found';
				}
			}
			filteredCourses = localFilteredCopy;
		}
	}

	function sortCourses(courses, sortCriteria) {
		let arrayToSort = Array.from(courses);
		switch (sortCriteria) {
			case $_('ChapterCountLowToHigh'):
				return arrayToSort?.sort((a, b) => {
					return a?.numberOfChapters - b?.numberOfChapters;
				});
			case $_('ChapterCountHighToLow'):
				return arrayToSort?.sort((a, b) => {
					return b?.numberOfChapters - a?.numberOfChapters;
				});
			case $_('DurationLowtoHigh'):
				return arrayToSort?.sort((a, b) => {
					return a?.duration - b?.duration;
				});
			case $_('DurationHighToLow'):
				return arrayToSort?.sort((a, b) => {
					return b?.duration - a?.duration;
				});

			case $_('Title ( A to Z )'):
				return arrayToSort?.sort((a, b) => {
					return a?.title?.localeCompare(b?.title);
				});

			case $_('TitleZtoA'):
				return arrayToSort?.sort((a, b) => {
					return b?.title?.localeCompare(a?.title);
				});

			case $_('PlannedDateLowToHigh'):
				return arrayToSort?.sort((a, b) => {
					const dateA = a?.startDate;
					const dateB = b?.startDate;
					return dateA - dateB;
				});

			case $_('PlannedDateHighToLow'):
				return arrayToSort?.sort((a, b) => {
					const dateA = a?.startDate;
					const dateB = b?.startDate;
					return dateB - dateA;
				});
		}
	}

	onMount(() => {
		if (defaultSortItem) {
			selectedSortOption = defaultSortItem;
		}
	});
</script>

{#if loading}
	<div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each dummyCourseCardDetails as array, index (index)}
			<CourseCardSkeleton />
		{/each}
	</div>
{/if}

{#if !loading}
	{#if error == null}
		<div
			class=" grid grid-cols-[repeat(auto-fit,minmax(min(255px,100%),255px))] justify-center bp-900px:justify-start xl:justify-start gap-4"
		>
			{#each filteredCourses as course, index (index)}
				<CourseCard {course} {showPlannedDate} />
			{/each}
		</div>
	{:else}
		<ErrorMessage />
	{/if}
{/if}
