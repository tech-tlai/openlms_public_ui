<script>
	import VideoPodSkeleton from '$lib/VideoPodSkeleton.svelte';
	import { formatDurationHHMM } from '$lib/utils/helper.js';
	import { format } from 'svelte-i18n';

	export let video;
	export let courseUuid;
	export let selectedLanguage = 'en';
	export let highlight;

	let isLoading = false;
</script>

{#if isLoading}
	<VideoPodSkeleton />
{:else}
	<a
		class="w-full"
		href="/courses/details/{courseUuid}/videos?videoUuid={video?.uuid}&&courseUuid={courseUuid}&&languageCode={video?.languageCode}"
	>
		<div
			class="overflow-hidden shadow-md rounded-lg h-40 hover:cursor-pointer text-darkGray leading-5"
			style={highlight
				? `border: 2px solid #143164; background-color: #EAF4FF;`
				: `background-color: white;`}
		>
			<div class=" flex h-full w-full">
				<!-- <img
					src={video?.thumbnail}
					alt="thumbnail of the course"
					class=" w-1/3 rounded-md rounded-r-none object-cover"
				/> -->
				<img
					src={video?.thumbnail ? video?.thumbnail : '/image-preview-icon.jpg'}
					alt="thumbnail of the course"
					class="w-1/3 rounded-md rounded-r-none object-cover"
					on:error={(event) => (event.target.src = '/image-preview-icon.jpg')}
				/>
				<div class="flex flex-col gap-2 sm:gap-3 p-2 sm:p-4 justify-between w-2/3">
					<!-- <div class="flex flex-col max-h-24 gap-1 sm:gap-0.5">
						<h3
							class="font-bold text-sm sm:text-base break-all text-wrap line-clamp-1"
							title={video.name}>{video.name ?? ''}</h3
						>
						<span class="text-xs sm:text-sm line-clamp-1" title={video.topic}
							>{video.topic ?? ''}</span
						>
						<div class="flex-1 overflow-hidden inline-block">
							<p
							class="text-xs text-gray-90 text-ellipsis overflow-hidden"
							title={video.description}>{video.description ?? ''}</p
							>
						</div>	
							<span class="text-xs text-gray-90 line-clamp-1"
							>{video.chapterNumber ? $format('Chapter') + ' ' + video.chapterNumber : ''}</span
						>
					</div> -->
					<div class="h-4/5 overflow-hidden">
						<h3
							class="font-bold text-sm sm:text-base break-all text-wrap line-clamp-2"
							title={video.name}
						>
							{video.name ?? ''}
						</h3>

						<p
							class=" overflow-hidden text-sm text-ellipsis line-clamp-2"
							title={video.description}
						>
							{video.description}
						</p>
					</div>
					<div
						class=" text-xs flex gap-2 sm:gap-0 flex-row justify-between items-start sm:items-center flex-1"
					>
						<span
							class="text-xs rounded-full h-6 border-gray-90 border px-2 py-2 flex flex-nowrap items-center"
							>{formatDurationHHMM(video.duration) ?? ''}</span
						>
						<span class="text-xs text-gray-90 line-clamp-1"
							>{video.chapterNumber ? $format('Chapter') + ' ' + video.chapterNumber : ''}</span
						>
						{#if video?.watched}
							<div class="flex items-center gap-1">
								<img src="/watched.svg" alt="icon for watched videos" />
								<span class=" text-xs sm:text-sm">Watched</span>
							</div>
						{/if}
						{#if video?.inProgress}
							<div class="flex items-center gap-1">
								<img src="/inProgress.svg" alt="icon for in progress videos " />
								<span class=" text-xs sm:text-sm">In Progress</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</a>
{/if}
