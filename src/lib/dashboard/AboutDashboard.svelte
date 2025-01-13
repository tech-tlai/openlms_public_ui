<script>
	import BreadCrumbs from '$lib/breadCrumbs/BreadCrumbs.svelte';
	import { _ } from 'svelte-i18n';
	export let route = '';
	export let params = [];
</script>

<div
	class="bg-blue-10 px-8 pt-4 pb-8 mb-8 mt-0 lg:mb-9 lg:mt-0 lg:pb-9 lg:pt-6 lg:min-h-40 lg:px-[92px]"
>
	<p class="text-darkGray text-xs pb-4 lg:pb-6"><BreadCrumbs {route} {params} /></p>

	<div class="flex flex-col sm:w-3/4 gap-3">
		<h1 class="uppercase-headers mb-2">
			{$_('Dashboard')}
		</h1>
		<p class="text-xs sm:text-sm text-darkGray leading-loose sm:leading-relaxed">
			{$_('DashboardIntro')}
		</p>
	</div>
</div>
