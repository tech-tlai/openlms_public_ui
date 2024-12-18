<script>
	import { format } from 'svelte-i18n';

	export let stats;
</script>

<div
	class="flex flex-col p-1 sm:py-1 sm:px-1 md:py-1 md:px-1 lg:py-2 lg:px-2 items-center justify-center flex-grow w-fit flex-nowrap"
>
	<div class="display-inline uppercase-body-text">
		{stats?.statValue ?? '-'}
	</div>
	<div class="text-xs font-normal leading-normal w-fit">{$format(stats?.statName)}</div>
</div>
