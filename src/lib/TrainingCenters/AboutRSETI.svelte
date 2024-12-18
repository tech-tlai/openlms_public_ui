<script>
	import BreadCrumbs from '$lib/breadCrumbs/BreadCrumbs.svelte';
	export let route = '';
	export let params = [];
	import { _ } from 'svelte-i18n';
	// import RSETI-info-graphic from '/'
</script>

<div
	class="bg-blue-10 px-8 pt-4 pb-8 mb-8 mt-0 lg:mb-9 lg:mt-0 lg:pb-9 lg:pt-6 lg:min-h-40 lg:px-[92px]"
>
	<p class="text-darkGray text-xs mb-6"><BreadCrumbs {route} {params} /></p>
	<div class="  flex flex-col rounded-lg text-darkGray sm:flex-row sm:justify-between gap-8">
		<div class="flex flex-col sm:w-3/4 gap-3">
			<h1 class="uppercase-headers">
				{$_('AboutRSETI')}
				<!-- <img src="/RSETI-text-decoration.svg" alt="RSETI-text-decoration" class="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"> -->
			</h1>
			<p class="text-sm mb-3 leading-loose">{$_('RsetiIntro')}</p>
		</div>
		<div class="flex justify-center flex-shrink-0">
			<img src="/rsetis.svg" alt="RSETI-info-graphic" class="w-56" />
		</div>
	</div>
</div>
<!-- <div class="max-w-7xl lg:mx-auto mb-8 mt-4 border-t border-"></div> -->
