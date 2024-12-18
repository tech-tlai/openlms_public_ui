<script>
	export let carouselData = [];
	export let lang;

	let carouselIndex = 0;
	let filteredCarouselData = [];
	let error = carouselData?.error ? carouselData?.error : '';

	$: if (!error) {
		filteredCarouselData = carouselData?.map((data) => {
			const translation = data?.translations?.find((t) => t.languageCode === lang);
			return {
				img: data?.image || '/image-preview-icon.jpg',
				name: translation ? translation?.name : '',
				designation: translation ? translation?.designation : '',
				testimonialText: translation ? translation?.testimonialText : ''
			};
		});
	}

	function handleNextCarousel() {
		if (carouselIndex === carouselData?.length - 1) {
			carouselIndex = 0;
			return;
		}
		carouselIndex = carouselIndex + 1;
	}

	function handlePreviousCarousel() {
		if (carouselIndex === 0) {
			carouselIndex = carouselData?.length - 1;
			return;
		}
		carouselIndex = carouselIndex - 1;
	}
</script>

<div class="w-full sm:px-16 bg-white80">
	{#if !error}
		<div class="flex flex-col max-w-4xl mx-auto sm:px-18 sm:pb-24 md:pb-32 px-4 pb-16">
			<div class="flex overflow-hidden w-full">
				{#each filteredCarouselData as data, index (index)}
					<div
						class="flex flex-col sm:flex-row items-center sm:justify-between sm:gap-16 w-full flex-grow-0 flex-shrink-0"
						style:translate="{-100 * carouselIndex}%"
						style:transition="translate 300ms ease-in-out"
					>
						<div>
							<div class="bg-blue-10 p-3 rounded-md">
								<img
									src={data?.img}
									alt={data?.name}
									class="sm:w-52 sm:h-52 w-40 h-40 flex-shrink-0 flex-grow-0 object-fill"
								/>
							</div>
						</div>

						<div class=" flex flex-col justify-center sm:w-1/2 relative">
							<img src="DoubleQuote.svg" alt="message quotes" class="sm:w-20 sm:mb-4 w-9 my-3" />
							<p class="text-xs sm:text-sm leading-loose sm:leading-relaxed mb-6">
								{@html data?.testimonialText}
							</p>
							<div class="flex flex-col items-end">
								<div class="sm:w-1/2 w-3/4">
									<p class=" text-sm font-bold text-darkGray">
										{data?.name}
									</p>
									<p class=" text-[12px]">
										{data?.designation}
									</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="flex gap-2 mt-6">
				<button
					class="px-2 border flex border-primary rounded-md"
					on:click={handlePreviousCarousel}
					class:bg-primary={carouselIndex === carouselData?.length - 1}
					class:text-white={carouselIndex === carouselData?.length - 1}
					><span class="material-icons-outlined text-center">west</span></button
				>
				<button
					class="px-2 border flex border-primary rounded-md"
					on:click={handleNextCarousel}
					class:bg-primary={carouselIndex === 0}
					class:text-white={carouselIndex === 0}
					><span class="material-icons-outlined text-center">east</span></button
				>
			</div>
		</div>
	{/if}
</div>
