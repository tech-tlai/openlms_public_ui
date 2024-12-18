<script>
	import CourseIndividualStats from '$lib/courses/CourseIndividualStats.svelte';
	export let bgColor;
	export let courseStatsDetails;
</script>

<div
	class="grid grid-cols-1 p-1  justify-items-center bg-{bgColor}  rounded-lg sm:grid-cols-2  xl:grid-cols-4 justify-items-start md:justify-items-center"
>
	{#each courseStatsDetails as stats,index(index)}
		<CourseIndividualStats {stats} />
	{/each}
</div>
