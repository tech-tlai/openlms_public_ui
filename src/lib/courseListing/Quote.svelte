<script>
	import QuoteSvg from '$lib/svgComponents/QuoteSVG.svelte';
	import { _ } from 'svelte-i18n';
</script>

<div>
	<blockquote
		class="border-[1.5px] border-secondary bg-white p-4 lg:p-6 rounded-md flex flex-col gap-2"
	>
		<QuoteSvg fillColor={'#2E5ED4'} />
		<p class="uppercase-headers">
			{$_('Quote')}
		</p>
		<cite class="text-primary text-sm font-semibold text-end">-{$_('MahathmaGandhi')}</cite>
	</blockquote>
</div>
