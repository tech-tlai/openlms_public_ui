<script>
    export let index;
</script>

<div
	class=" space-y-6 divide-y divide-gray-900/10"
	role="button"
	tabindex="0"
>
	<div class="pt-4 transition-all duration-300 ease-in-out">
		<dt class="border-gray100 border-2 p-3 rounded-lg bg-white50 animate-pulse w-full "
	
		>
			<!-- Expand/collapse question button -->

			<button
				type="button"
				class="flex w-full items-start justify-between text-left text-gray-900 group-hover:text-white "
				aria-controls="faq-0"
				aria-expanded="false"
			>
				<span
					class="text-md leading-7 text-darkGray group-hover:text-white bg-gray-10 animate-pulse rounded w-3/4 "
                    >&nbsp;</span
				>
			</button>
		</dt>
        <div>
			<dd class="mt-2 w-full "
            class:block={index==0} 
            class:hidden={index!=0} 
            id="faq-0">
            <div class=" w-4/5 h-20 py-2 bg-white50 animate-pulse">
                <p class="text-sm mx-6 mb-2 leading-7 text-darkgray font-normal px-2  bg-gray-10 animate-pulse rounded w-3/4">&nbsp;</p>
                <p class="text-sm mx-6 mb-2 leading-7 text-darkgray font-normal px-2  bg-gray-10 animate-pulse rounded w-3/4">&nbsp;</p>
            </div> 
			</dd>
        </div>

        
	</div>

    
</div>
