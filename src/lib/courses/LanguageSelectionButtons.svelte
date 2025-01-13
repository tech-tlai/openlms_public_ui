<script>
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let languageAvailableForVideos;
	export let selectedLanguage = 'en';

	let dispatch = createEventDispatcher();

	function handleSelectedLanguage(e) {
		languageAvailableForVideos.forEach((item) => {
			if (item.languageName === e.target.textContent) {
				selectedLanguage = item.languageCode;
				dispatch('handleSelectedLanguage', item);
			}
		});
	}
</script>

<div>
	<!-- <p class="text-sm mb-2">{$_('Languages')}:</p> -->
	<div
		class="flex gap-4 mb-4 md:flex-wrap flex-nowrap items-center snap-x snap-mandatory overflow-x-scroll"
	>
		{#each languageAvailableForVideos as language}
			<button
				class="px-1 sm:px-2 py-1 border rounded text-sm sm:min-w-[120px] min-w-20"
				on:click={handleSelectedLanguage}
				class:bg-primary={selectedLanguage === language.languageCode}
				class:text-white={selectedLanguage === language.languageCode}
				class:bg-white={selectedLanguage !== language.languageCode}>{language.languageName}</button
			>
		{/each}
	</div>
</div>

<style>
	.overflow-x-scroll::-webkit-scrollbar {
		display: none;
	}
</style>
