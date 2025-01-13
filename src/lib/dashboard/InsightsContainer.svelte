<script>
	import { onMount } from 'svelte';
	import InsightsIndividiualStats from '$lib/dashboard/InsightsIndividiualStats.svelte';
	import ErrorMessage from '$lib/courses/ErrorMessage.svelte';

	export let alignment;
	export let insightStats = [];
	export let error=null;

</script>

<div
	class="grid grid-cols-2 bp-420px:grid-cols-4 lg:grid-cols-4 rounded-lg justify-items-center gap-2 lg:gap-5 xl:gap-9"
>
	{#if error == null}
		{#each insightStats as stats, index (index)}
			<InsightsIndividiualStats {stats} {alignment} />
		{/each}
	{:else}
		<ErrorMessage {error} />
	{/if}
</div>
