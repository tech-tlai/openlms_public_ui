<script>
	import { collaboratingInstitutes } from '$lib/data.js';
	import SingleCollaborationItem from '$lib/landingPage/SingleCollaborationItem.svelte';
	import { _ } from 'svelte-i18n';
	export let endorsedBy = $_('LandingPageCollaborationSectionTitle');
</script>

<div class="bg-white50">
	<div class=" px-4 lg:w-1/2 md:w-2/3 sm:mx-auto py-16 max-w-4xl">
		<div class=" text-sm md:text-base text-center pb-2">
			{endorsedBy}
		</div>
		<div class=" grid grid-cols-5 rounded-lg py-2.5 justify-items-center items-center">
			{#each collaboratingInstitutes as institute, index (index)}
				<SingleCollaborationItem {institute} />
			{/each}
		</div>
	</div>
</div>
