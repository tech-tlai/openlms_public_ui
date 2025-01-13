<script>
	import { format } from "svelte-i18n";

    export let lifeCycle;
</script>



<div class="flex flex-col items-center flex-grow w-fit text-darkGray ">
        <img src={lifeCycle?.img}   alt="life cycle images" class="h-24 sm:h-48 mb-2 sm:mb-4 object-contain">
    <div class="text-xs sm:text-sm font-normal leading-snug sm:leading-normal w-fit text-center">{$format(lifeCycle?.description)}</div>
</div>

