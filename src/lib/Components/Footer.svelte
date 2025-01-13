<script>
	import {_} from "svelte-i18n"
</script>
<div
	class="bg-primary text-white text-sm w-full min-h-20 lg:min-h-44 flex flex-col justify-center items-center gap-2 "
>
	<div>{$_('FooterTitle')}</div>
	<ul class="flex gap-2">
		<li>{$_('Privacy')}</li>
		<li>{$_('Terms')}</li>
		<li>{$_('Help')}</li>
	</ul>
</div>
