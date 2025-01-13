<script>
	import GoogleMatrialIcon from '$lib/Components/GoogleMatrialIcon.svelte';
	import { goto } from '$app/navigation';
	import BrokenLamp from '$lib/svgComponents/BrokenLamp.svelte';
	export let errorData = {};
	export let params = {};
	export let route = [];

	let newRoute = route && route.slice('1');
	let backPaths = [{ crumb: 'Home', path: '/' }];
	let href = '';
	newRoute = newRoute && newRoute.split('/');
	newRoute &&
		newRoute.forEach((element, index) => {
			if (element.startsWith('[')) {
				let [paramValue] = Object.values(params);
				href = href + '/' + paramValue;
				backPaths[index].path = href;
			} else {
				href = href + '/' + element;
				let formattedElement = element.replace(/([A-Z])/g, ' $1').trim();
				backPaths.push({
					crumb: formattedElement,
					path: href
				});
			}
		});
</script>

<div class="px-4 max-w-7xl mx-auto flex justify-around">
	<div>
		<BrokenLamp addClass="w-44" />
	</div>
	<div class="flex flex-col justify-center w-1/2">
		<h1 class="md:text-[10rem] text-8xl font-bold text-primary">
			{errorData?.status ?? 500}
		</h1>
		<h2 class="font-bold text-3xl text-primary mt-3">{errorData.message}</h2>
		<div class="mt-20">
			<button
				class="text-base rounded-[4px] font-semibold text-white bg-secondary px-6 py-2"
				on:click={() => {
					// check if the there is some path in second last position
					if (backPaths?.length >= 2) {
						goto(backPaths[backPaths.length - 2].path);
					}
					// if not then the last path is root path
					else {
						goto('/');
					}
				}}
			>
				<div class="flex items-center gap-2">
					<GoogleMatrialIcon iconName="west" /> Go Back
				</div>
			</button>
		</div>
	</div>
</div>
