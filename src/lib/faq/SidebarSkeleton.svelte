<script>
    export let border=false;
	let dummySidebarData = new Array(4);
</script>

<div class="tracking-sm text-md h-full">
	<ul class="flex flex-col gap-y-2 justify-start text-darkGray">
		{#each dummySidebarData as sideBarItem}
			<div class="bg-white p-2"
            class:border border-2 border-gray-100={border}>
				<div href="" class=" w-3/4 bg-gray-10 animate-pulse rounded">&nbsp;</div>
			</div>
		{/each}
	</ul>
</div>
