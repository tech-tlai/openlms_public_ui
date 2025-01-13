<script>
    import { createEventDispatcher } from 'svelte';
	// Constants for value of select all filter option
	import { String_Constants } from '/src/config/constants.js';
	import Filter from '$lib/Components/Filter.svelte';

    // set default filter values to select all value of that filter
	export let coursesFilterValue 
	export let yearsFilterValue 

    // gets option lists from +page.svelte
	export let coursesFilterOptionList = [];
	export let yearsFilterOptionList = [];

	const dispatch = createEventDispatcher();

    // configures options for filter component
	const coursesFilterConfig = {
		optionNameKey: 'title',
		optionIdKey: 'uuid'
	};

	const yearsFilterConfig = {
		optionNameKey: 'name',
		optionIdKey: 'uuid'
	};

        // dipatches event when filters are applied or cleared
	function handleApplyFilter() {
		dispatch('handleFilters', { coursesFilter: coursesFilterValue, yearsFilter: yearsFilterValue });
	}

	function handleClearFilter() {
		coursesFilterValue = String_Constants.ALL_COURSES;
		yearsFilterValue = String_Constants.ALL_YEARS;
		dispatch('handleFilters', { coursesFilter: coursesFilterValue, yearsFilter: yearsFilterValue });
	}

</script>

<div class="relative flex justify-end gap-8">
	<div class=" w-full flex sm:flex-row flex-col sm:gap-5 gap-2 justify-end flex-wrap">
		<Filter
			bind:itemSelected={coursesFilterValue}
			optionList={coursesFilterOptionList}
			optionListConfigObject={coursesFilterConfig}
			addClass="sm:min-w-40 lg:min-w-60 "
		/>
		<Filter
			bind:itemSelected={yearsFilterValue}
			optionList={yearsFilterOptionList}
			optionListConfigObject={yearsFilterConfig}
			addClass="sm:min-w-40 lg:min-w-60"
		/>
		<div class="flex justify-between gap-5">
			<button on:click={handleClearFilter} class="text-sm font-semibold text-secondary"
			>Clear</button
		>
		<button
			on:click={handleApplyFilter}
			class="text-sm rounded-[4px] font-semibold  text-white  bg-primary px-6 py-2"
			>Apply</button
		>
		</div>
		
	</div>
</div>

