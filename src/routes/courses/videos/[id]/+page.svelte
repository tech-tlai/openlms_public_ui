<script>
	import { page } from '$app/stores';
	import VideoViewingPage from '$lib/videoViewing/VideoViewingPage.svelte';

	export let data;

	let route = $page.route.id;
	let languageCode = $page.url.searchParams.get('languageCode');
	const url = $page.url;
	let searchParams = url.search;
	
	$: params = $page.params;
</script>

<div class="mt-0 mb-8 lg:mb-9 mx-4 lg:mt-0 2xl:my-12 2xl:mt-0 ">
	<VideoViewingPage
		{route}
		{params}
		token={data.token}
		{languageCode}
		{searchParams}
	/>
</div>
