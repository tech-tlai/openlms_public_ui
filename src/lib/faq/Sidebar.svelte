<script>
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';
	export let sideBarList;
	export let bgColor = '';
	export let hoverColor = '';
	export let category;

	const dispatch = createEventDispatcher();
	let sideBarCategory;

	$: sideBarCategory = category ? category : null;
	// Dispatch the selected category by `extId`
	function handleDespatchSidebar(sideBarItem) {
		sideBarCategory = sideBarItem?.id;
		dispatch('handleSideBarCategory', sideBarItem);
	}

	function handleDispatchClearFilter() {
		sideBarCategory = null;
		dispatch('handleDispatchClearFilter', sideBarCategory);
	}
</script>

<div class="tracking-sm text-md h-full bg-blue-10">
	<ul class="flex flex-col gap-y-2.5 justify-start text-darkGray">
		{#each sideBarList as sideBarItem, index (index)}
			<div
				class="hover:rounded-md hover:{hoverColor} {sideBarCategory == sideBarItem?.id
					? `${bgColor} rounded-md text-white bg-secondary font-medium`
					: ''}"
			>
				<div
					href=""
					class="cursor-pointer block p-2 capitalize"
					id="most-popular"
					on:click={() => handleDespatchSidebar(sideBarItem)}
					on:keypress={() => handleDespatchSidebar(sideBarItem)}
				>
					{sideBarItem?.name}
				</div>
			</div>
		{/each}
		{#if sideBarCategory}
			<button
				class="rounded-md {bgColor} text-white bg-secondary font-medium p-2"
				on:click={handleDispatchClearFilter}>{$_('ClearFilter')}</button
			>
		{/if}
	</ul>
</div>
