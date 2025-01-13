<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let fieldName = 'Select Input';
	export let required = false;
	export let addClass = '';
	export let itemSelected = 'Default Option';
	export let showFieldName = true;
	const dispatch = createEventDispatcher();
	let selectState = false;
	let dropDownRef;
	export let optionList = [
		{ id: 1, name: 'option_1' },
		{ id: 2, name: 'option_2' },
		{ id: 3, name: 'option_3' }
	];

	function toggleSelectState() {
		selectState = !selectState;
	}

	onMount(() => {
		document.addEventListener('click', handleClickOnDocument);
		function handleClickOnDocument(e) {
			if (dropDownRef && dropDownRef.contains(e.target)) selectState = true;
			else selectState = false;
		}
	});
</script>

<div class={addClass} bind:this={dropDownRef}>
	{#if showFieldName}
		<label id="listbox-label" class="block text-cBase font-normal leading-6 text-gray-900"
			>{fieldName}
			{#if required}
				<span class="text-red-dark">*</span>
			{/if}</label
		>
	{/if}
	{#if selectState}
		<!-- <div
        class="fixed bg-transparent z-[5] top-0 h-screen w-screen left-0"
        on:click={toggleSelectState}
      ></div> -->
	{/if}
	<div class="relative" class:m-2={showFieldName}>
		<button
			type="button"
			on:click={toggleSelectState}
			class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
		>
			<span class="block truncate">{itemSelected}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<svg
					class="h-5 w-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>

		<!--
        Select popover, show/hide based on select state.
  
        Entering: ""
          From: ""
          To: ""
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
		<ul
			class="{selectState
				? 'block'
				: 'hidden'} absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-3"
		>
			<!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
  
          Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
        -->

			{#each optionList as option (option.id)}
				<li
					class="relative cursor-default select-none text-gray-900 hover:bg-gray-100"
					id="listbox-option-0"
					role="option"
				>
					<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
					<button
						on:click={() => {
							itemSelected = option.name;
							dispatch('itemSelection', option);
						}}
						class="w-full py-2 pl-3 pr-9 flex justify-start"
					>
						<span class="block truncate font-normal">{option.name}</span>

						<!--
              Checkmark, only display for selected option.
              
              Highlighted: "text-white", Not Highlighted: "text-indigo-600"
              -->
						<span
							class="{itemSelected == option.name
								? 'flex'
								: 'hidden'} absolute inset-y-0 right-0 items-center pr-4 text-indigo-600"
						>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					</button>
				</li>
			{/each}

			<!-- More items... -->
		</ul>
	</div>
</div>
