<script>
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	export let id = `dropdown-${Math.random().toString(36).slice(2, 9)}`;
	export let items = []; // List of items to display in the dropdown
	export let placeholder = 'Select an item'; // Button placeholder text
	export let selectedItem = null; // Currently selected item (if any)

	const dispatch = createEventDispatcher();

	// Handle item selection
	function handleSelect(event) {
		const selectedId = event.target.options[event.target.selectedIndex].id;
		const selectedValue = event.target.value;
		selectedItem = { id: selectedId, name: selectedValue };
		dispatch('select', selectedItem);
	}
</script>

<ul class=" bg-white border border-gray-300 rounded-md shadow-sm z-10">
	<select
		{id}
		class="w-full py-1 px-2 md:p-2 border overflow-hidden text-ellipsis border-gray-300 rounded-md bg-white text-gray-700 appearance-none text-sm"
		value={selectedItem ? selectedItem.name : placeholder}
		title={selectedItem ? selectedItem.name : placeholder}
		on:change={handleSelect}
	>
		{#each items as item}
			<option value={item.name} id={item.id}>{item.name}</option>
		{/each}
	</select>
</ul>
