<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import Datatable from '$lib/Components/datatable.svelte';
	import ErrorMessage from '$lib/courses/ErrorMessage.svelte';
	// import DatatableSkeleton from '$lib/Components/DatatableSkeleton.svelte';

	export let error;
	export let tableData = [];
	export let searchValue = '';
	export let loading = false;
	export let dataToHighlight = { uniqueProperty: 'id', value: '', enabled: true };

	let dispatch = createEventDispatcher();
	// this object needs to be in accordance with the datatable sortAccordingTo object
	// Can be used to set to a predefined sortingOrder for a predefined header
	let sortAccordingTo = {
		header: null,
		entityType: null,
		sortingOrder: null
	};

	// define header names for the desired headers to be displayed
	export let tableHeaderDisplay = [
		{
			key: 'rank',
			name: 'Rank'
		},
		{
			key: 'state',
			name: 'State',
			width: '50%'
		},
		{
			key: 'traineeCount',
			name: 'Trainee Count',
			width: '30%'
		}
	];

	// to configure the action tab (see comments of datatable.svelte)
	let actionConfigObject = [
		{
			actionName: 'Details',
			actionIconName: 'visibility'
		}
	];

	function handleTableAction(event) {
		const actionName = event.detail.actionName;
		const actionData = event.detail.actionData;
		dispatch('tableActionClick', event.detail);
	}
</script>

{#if tableData?.length !== 0 && !error}
	<Datatable
		on:tableActionClick={handleTableAction}
		{tableData}
		{searchValue}
		tableHeadersDisplay={tableHeaderDisplay}
		{actionConfigObject}
		size={'short'}
		rowHeight={'compact'}
		bind:dataToHighlight
		bind:sortAccordingTo
		highlightColor="#D9DFE4"
		{...$$restProps}
		searchParameter={'state'}
	/>
{:else}
	<ErrorMessage />
{/if}
