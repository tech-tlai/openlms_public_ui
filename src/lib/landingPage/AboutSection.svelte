<script>
	import GeneralStats from '$lib/landingPage/GeneralStats.svelte';
	import CommonLayoutPattern from '$lib/Components/CommonLayoutPattern.svelte';
	import { _ } from 'svelte-i18n';
	import VideoPlayer from '$lib/Components/VideoPlayer.svelte';

	export let generalStats = [];
	export let token;

	let error = generalStats?.error ? generalStats?.error : null;
</script>

<div>
	<div class="px-4 sm:pb-8 md:px-16 md:pb-16 h-auto">
		<!-- 65.5px is the height of Pattern Orange/2  -->
		<div class="  p-4 sm:p-8 md:p-12 mx-auto rounded-lg 2xl:max-w-7xl">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-fit mb-8">
				<div class="flex flex-col">
					<h2 class="uppercase-headers">
						{$_('LandingPageAboutTitle')}
					</h2>
					<p
						class="pb-4 sm:pb-6 text-sm sm:text-base text-darkGray leading-loose sm:leading-relaxed"
					>
						{$_('LandingPageAboutContent')}
					</p>
				</div>

				<div
					class="aspect-auto shadow-lg rounded-lg overflow-hidden items-center flex bg-secondary"
				>
					<VideoPlayer {token} videoId={'gcc-912540da-026f-4283-93d7-ec13dc4f911f'} />
				</div>
			</div>
			<div class="">
				<GeneralStats {generalStats} {error} />
			</div>
		</div>
	</div>
</div>
