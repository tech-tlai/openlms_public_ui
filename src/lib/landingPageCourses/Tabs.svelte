<script>
	import { text } from '@sveltejs/kit';
	import { createEventDispatcher, onMount } from 'svelte';
	export let tabs;
	const despatch = createEventDispatcher();
	let activeTab = tabs?.[0]?.category ?? '';

	function handleTab(tabContent) {
		activeTab = tabContent.category;

		despatch('handleActiveTab', tabContent);
	}
</script>

<div class="w-full">
	<nav class="sm:flex sm:flex-row sm:flex-wrap grid grid-cols-2">
		{#each tabs as tab, index (index)}
			<button
				on:click={() => handleTab(tab)}
				class=" whitespace-nowrap cursor-pointer border-b-2 px-4 py-3 text-sm text-primary capitalize hover:border-blue-100 {tab.category ===
				activeTab
					? 'border-secondary font-bold'
					: 'border-transparent font-medium'}">{tab.name}</button
			>
		{/each}
	</nav>
</div>
