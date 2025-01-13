<script>
	export let singleFAQObj;
	let expanded = false;
	let faqID;

	function handleClick(e) {
		faqID = singleFAQObj?.uuid;
		expanded = !expanded;
	}
</script>

<div
	class=" space-y-6 divide-y divide-gray-900/10"
	on:click={(e) => handleClick(e)}
	on:keydown={() => handleClick()}
	role="button"
	tabindex="0"
>
	<div class="pt-4 transition-all duration-300 ease-in-out">
		<dt
			class="border-gray100 border-2 p-3 rounded-lg hover:bg-primary group"
			class:bg-primary={expanded}
			class:bg-white={!expanded}
		>
			<!-- Expand/collapse question button -->

			<button
				type="button"
				class="flex w-full items-start justify-between text-left text-gray-900 group-hover:text-white"
				class:text-white={expanded}
				aria-controls="faq-0"
				aria-expanded="false"
			>
				<span
					class="text-sm sm:text-base leading-7 text-darkGray group-hover:text-white"
					class:text-white={expanded}
					class:font-medium={expanded}>{singleFAQObj?.question}</span
				>
				<span class="ml-6 flex h-7 items-center">
					{#if expanded}
						<!--
                    Item expanded.
                  -->

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4 lg:size-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
						</svg>
					{:else}
						<!--
                    Icon when question is collapsed
                  -->

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4 lg:size-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					{/if}
				</span>
			</button>
		</dt>
		{#if expanded}
			<dd class="mt-2" id="faq-0">
				<p class="text-xs sm:text-sm leading-7 text-darkgray font-normal px-2">
					{singleFAQObj?.answer}
				</p>
			</dd>
		{/if}
	</div>
</div>
