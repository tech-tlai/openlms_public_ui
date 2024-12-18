<script>
	import { onMount, onDestroy } from 'svelte';
	import { videoInfo } from '$lib/data.js';
	import { getLocalStoreData } from '$lib/utils/helper.js';
	import Videos from '$lib/courses/Videos.svelte';
	import VideoDetails from '$lib/videoViewing/VideoDetails.svelte';
	import BreadCrumbs from '$lib/breadCrumbs/BreadCrumbs.svelte';
	import ErrorMessage from '$lib/courses/ErrorMessage.svelte';
	import VideoDetailsSkeleton from '$lib/videoViewing/VideoDetailsSkeleton.svelte';
	import VideoPodSkeleton from '$lib/VideoPodSkeleton.svelte';
	import SelectInput from '$lib/Components/SelectInput.svelte';
	import { format } from 'svelte-i18n';
	import VideoPlayer from '$lib/Components/VideoPlayer.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let route;
	export let params;
	export let searchParams = '';
	export let languageCode = 'en';
	export let courseDetails = [];
	export let videoUuid = '';
	export let lang = '';
	export let testimonials = [];

	let token;
	let videoDetails = {};
	let errorInVideoDetails = null;
	let errorInPlayList = null;
	let videoDetailsLoading = true;
	let playListLoading = true;
	let dummyVideoPodDetails = new Array(4);
	let playListId;
	let error = null;

	let player;
	let videoLoaded = false;
	let courseUuid = $page.url.searchParams.get('courseUuid');
	let languageCodeFromParams = $page.url.searchParams.get('languageCode');
	let courseDetailsLoading = false;
	$: courseTitle = courseDetails?.translations.find(
		(translation) => translation.languageCode === lang
	)?.title;

	$: fetchTokenAndVideoDetails(videoUuid);
	async function fetchTokenAndVideoDetails() {
		if (videoUuid === null) return;
		if (browser) {
			await fetchVideoDetails(videoUuid);
		}
	}

	async function fetchVideoDetails(videoUuid) {
		errorInVideoDetails = null;
		if (videoUuid === null) return;
		try {
			videoDetailsLoading = true;
			const res = await fetch(`/apis/courses/details/${courseUuid}/videos/${videoUuid}`);
			if (!res.ok || res.status !== 200) {
				throw new Error('Failed to fetch video details');
			}

			const data = await res.json();
			if (data?.length === 0 || Object.keys(data)?.length === 0) {
				throw new Error('No Data Found');
			}

			videoDetails = data;
		} catch (err) {
			errorInVideoDetails = err.message;
		} finally {
			videoDetailsLoading = false;
		}
	}

	function handlePlayerLoaded(event) {
		videoLoaded = event.detail;
	}
</script>

<div class="lg:flex gap-4 mb-4">
	<div class="lg:w-3/4">
		<div class="bg-blue-10 rounded-lg h-fit">
			<div class="px-4 py-3">
				<BreadCrumbs {route} {params} {searchParams} />
			</div>
			<div class="aspect-auto p-4 pt-0 relative h-fit">
				<VideoPlayer videoId={videoDetails.extId} on:playerLoaded={handlePlayerLoaded} />
			</div>
		</div>
		<div class="lg:hidden">
			{#if videoDetailsLoading}
				<div class="mb-4 bg-white p-4 rounded-lg">
					<VideoDetailsSkeleton />
				</div>
			{/if}
			{#if errorInVideoDetails === null}
				<div class="mb-4 bg-blue-10 p-4 rounded-lg">
					<VideoDetails
						key={params.id}
						{videoDetails}
						{videoInfo}
						{params}
						{courseTitle}
						{testimonials}
					/>
				</div>
			{:else}
				<div class="mb-4 bg-blue-10 p-4 rounded-lg">
					<ErrorMessage error={errorInVideoDetails} />
				</div>
			{/if}
		</div>

		<div class="w-full">
			<p class=" text-base mb-4 mt-4 font-semibold leading-6 flex gap-2 text-primary">
				<!-- <Book stroke="#FF6A1F" />
				{$format('CourseContent')} -->
				&nbsp;
			</p>
			<Videos
				showSearchBar={false}
				isLoading={playListLoading}
				selectedLang={languageCodeFromParams}
				chapters={courseDetails?.chapters}
				showAvailableLanguages={false}
				showLanguageSelectionButtons={false}
				courseUuid={courseDetails?.uuid}
				{videoUuid}
				{courseTitle}
			/>
		</div>
	</div>
	<div class="hidden lg:block lg:w-1/4">
		{#if videoDetailsLoading}
			<div class="mb-4 bg-white p-4 rounded-lg">
				<VideoDetailsSkeleton />
			</div>
		{/if}

		{#if !videoDetailsLoading}
			{#if errorInVideoDetails === null}
				<div class="mb-4 bg-blue-10 p-4 rounded-lg">
					<VideoDetails
						key={params.id}
						{videoDetails}
						{videoInfo}
						{params}
						{courseTitle}
						{testimonials}
					/>
				</div>
			{:else}
				<div class="mb-4 bg-blue-10 p-4 rounded-lg">
					<ErrorMessage error={errorInVideoDetails} />
				</div>
			{/if}
		{/if}
	</div>
</div>
