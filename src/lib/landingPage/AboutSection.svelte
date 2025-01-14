<script>
	import GeneralStats from '$lib/landingPage/GeneralStats.svelte';
	import CommonLayoutPattern from '$lib/Components/CommonLayoutPattern.svelte';
	import { _ } from 'svelte-i18n';
	import YoutubePlayer from '$lib/Components/YoutubePlayer.svelte';

	export let generalStats = [];
	export let token;

	let error = generalStats?.error ? generalStats?.error : null;
</script>

<div>
	<div
		class="lg:py-24 py-12 sm:pb-8 px-4 sm:px-6 lg:px-12 md:pb-16 h-auto 2xl:max-w-7xl w-full mx-auto bg-white50"
	>
		<!-- 65.5px is the height of Pattern Orange/2  -->
		<div class="  w-full">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-fit mb-8">
				<div class="flex flex-col">
					<h2 class="uppercase-headers">
						{$_('LandingPageAboutTitle')}
					</h2>
					<p
						class="pb-4 sm:pb-6 text-sm sm:text-base text-darkGray leading-loose sm:leading-relaxed"
					>
						Discover a world of knowledge and skills at your fingertips. Our e-skilling platform
						offers a diverse range of courses, from coding and data science to business management
						and digital marketing. Learn at your own pace, with flexible learning paths and
						expert-led instruction. 1 Join a global community of learners and unlock your full
						potential.
					</p>
				</div>

				<div
					class="w-full h-auto shadow-lg rounded-lg overflow-hidden items-center flex bg-secondary !aspect-video"
				>
					<YoutubePlayer videoId={'NPQUVaiEajA'} />
				</div>
			</div>
			<div class="">
				<GeneralStats {generalStats} {error} />
			</div>
		</div>
	</div>
</div>
