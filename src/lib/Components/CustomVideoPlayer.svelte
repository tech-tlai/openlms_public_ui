<script>
	import { onMount, onDestroy } from 'svelte';

	export let src = '';
	export let poster = '';

	let video;
	$: console.log('video', video);
	let progress = 0;
	let currentTime = '0:00';
	let duration = '0:00';
	let isPlaying = false;
	let volume = 1;
	let showControls = false;

	onMount(() => {
		if (video) {
			video.addEventListener('timeupdate', handleTimeUpdate);
			video.addEventListener('loadedmetadata', handleLoadedMetadata);
		}
	});

	onDestroy(() => {
		if (video) {
			video.removeEventListener('timeupdate', handleTimeUpdate);
			video.removeEventListener('loadedmetadata', handleLoadedMetadata);
		}
	});

	function togglePlay() {
		if (video.paused) {
			video.play();
			isPlaying = true;
		} else {
			video.pause();
			isPlaying = false;
		}
	}

	function handleTimeUpdate() {
		progress = (video.currentTime / video.duration) * 100;
		currentTime = formatTime(video.currentTime);
	}

	function handleLoadedMetadata() {
		duration = formatTime(video.duration);
	}

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function handleProgressClick(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const clickedValue = (x / rect.width) * video.duration;
		video.currentTime = clickedValue;
	}

	function handleVolumeChange(event) {
		volume = event.target.value;
		video.volume = volume;
	}
</script>

<div class="w-full aspect-video min-h-80">
	<iframe
		src="https://www.youtube.com/embed/NPQUVaiEajA"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		class="w-full h-full"
	>
	</iframe>
</div>
