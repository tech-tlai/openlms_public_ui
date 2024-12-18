<script>
	export let img;
	export let btnText;
	export let btnTextMobile;
	export let courseCategory;
	export let altText;
	export let screenSize900pxAbove;

	$: hrefValue = screenSize900pxAbove ? `/courses?filter=${courseCategory}` : null;
</script>

<div
	class="relative group overflow-hidden transition-all duration-[800ms] shadow-sm flex-1 flex-shrink lg:basis-[25%] lg:hover:basis-[35%]"
>
	<a href={hrefValue}>
		<picture>
			<source media="(max-width:640px)" srcset={img.mob} />
			<source media="(min-width:641px)" srcset={img.primary} />
			<img
				class="object-cover h-full lg:w-[200%] grayscale lg:hover:w-full lg:hover:h-full group-hover:grayscale-0 overflow-hidden"
				src={img.fallback}
				alt={altText}
			/>
		</picture>

		<div
			class=" absolute flex flex-col justify-center items-center text-red-100 inset-0 group gap-5 lg:gap-10"
		>
			<!-- SVG is passed in as a slot from parent component -->
			<div>
				<slot></slot>
			</div>

			<a
				href="/courses?filter={courseCategory}"
				class="hidden bp-900px:inline-block text-center text-sm xl:text-base font-semibold bg-primary shadow-sm text-white py-3 px-6 xl:px-8 rounded-md"
				>{btnText}</a
			>
			<a
				href="/courses?filter={courseCategory}"
				class="bp-900px:hidden text-center text-[11px] font-semibold bg-primary shadow-sm text-white py-2 px-2 rounded-md"
				>{btnTextMobile}</a
			>
		</div>
	</a>
</div>
