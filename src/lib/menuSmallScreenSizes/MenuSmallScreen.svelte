<script>
	import SelectInput from '$lib/Components/SelectInput.svelte';
	import { setCookie } from '$lib/utils/helper.js';
	import { createEventDispatcher } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	export let burgerMenuOpen;
	export let menuItemClicked;
	export let loggedIn;
	export let languageSelected = 'English';
	export let languageOptionList;
	export let displayLoginPopUp = false

	const dispatch = createEventDispatcher();

	function handleMenuItemClick(e) {
		menuItemClicked = true;
		if (e.target.closest('li')?.classList?.contains('languagePicker')) {
			burgerMenuOpen = true;
		} else {
			burgerMenuOpen = false;
		}
	}

	function handleLocaleChange(event) {
		dispatch('selectLang', event.detail);
	}

	function handleDisplayLoginPopUp(){
		displayLoginPopUp = !displayLoginPopUp
	}
</script>

<!-- Menu items on smaller screen -->

<!-- top-20 comes from the height of header + its padding -->
<div
	class=" sm:hidden fixed w-full top-20 z-20 mx-0 flow-root h-full bg-white transition-all ease-in-out duration-500"
	class:translate-x-0={burgerMenuOpen}
	class:translate-x-full={!burgerMenuOpen}
>
	<nav class="-my-6 divide-y divide-gray-500/10 bg-white">
		<div class="space-y-2 py-2">
			<ul
				class="flex flex-col items-center gap-2 mt-6 lg:gap-4 text-sm"
				on:click={handleMenuItemClick}
				on:keypress={handleMenuItemClick}
			>
				<li class="w-full p-2 border-b text-center">
					<a href="/courses" id="courses" class="block w-full h-full">{$_('Courses')}</a>
				</li>
				<li class="w-full p-2 border-b text-center" id="trainingCenters">
					<a href="/trainingCenters" class="block w-full h-full">{$_('TrainingCntrs')}</a>
				</li>
				<li class="w-full p-2 border-b text-center" id="faq">
					<a href="/faq" class="block w-full h-full">{$_('FAQ')}</a>
				</li>
				<li class="w-full p-2 border-b text-center" id="public-dashboard">
					<a href="/public-dashboard" class="block w-full h-full">{$_('Dashboard')}</a>
				</li>
				<li class="w-full p-2 text-center" id="login">
					<button href="#" class="block w-full h-full" on:click={handleDisplayLoginPopUp}>{loggedIn ? $_('Logout') : $_('Login')} </button>
				</li>
				<li class="p-1 flex items-center gap-1 languagePicker">
					<img src="/language.svg" alt="language-select-icon" class="languagePicker" />

					<SelectInput
						showFieldName={false}
						bind:itemSelected={languageSelected}
						on:itemSelection={handleLocaleChange}
						optionList={languageOptionList}
						addClass="min-w-24"
					/>
				</li>
			</ul>
		</div>
	</nav>
</div>
