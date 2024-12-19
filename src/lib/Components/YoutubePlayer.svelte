<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	export let videoId;
	let player;
	let mounted = false;
	let videoLoaded = false;
	let scriptLoaded = false;
	let divId = 'player_' + parseInt(Math.random() * 109999);
	const dispatch = createEventDispatcher();

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const existingScript = document?.querySelector(`script[src="${src}"]`);

			if (existingScript) {
				resolve();
				return;
			}
			const script = document?.createElement('script');
			if (script) {
				script.type = 'text/javascript';
				script.src = src;
				script.onload = () => {
					resolve();
				};
				script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
				document.head.appendChild(script);
			}
		});
	}

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		if (player) {
			player.destroy();
			player = null;
			console.log('Player instance destroyed');
		}
	});

	function playerIsReady() {
		dispatch('Ready');
		// console.log()
		setInterval(() => {
			// dispatch('currentPlayTime', player?.getCurrentTime());
		}, 1000);
	}

	export function play() {
		if (player) {
			player.playVideo();
			setInterval(() => {
				// dispatch('currentPlayTime', player?.getCurrentTime());
			}, 1000);
		}
	}

	$: createPlayer(videoId, mounted);
	async function createPlayer() {
		if (browser && mounted) {
			dispatch('playerLoaded', false);
			videoLoaded = false;
			if (!videoId) return;

			await loadScript('https://www.youtube.com/iframe_api');
			scriptLoaded = true;

			try {
				// const interval = setInterval(async () => {
				// 	if (typeof YT != 'undefined') {
				// 		clearInterval(interval);
				// 		// if (player) {
				// 		// 	player.destroy();
				// 		// 	player = null;
				// 		// 	await tick();
				// 		// }
				// 		player = new YT.Player(divId, {
				// 			height: '390',
				// 			width: '640',
				// 			videoId,
				// 			events: {
				// 				onReady: playerIsReady,
				// 				onStateChange: playerStateChange
				// 			}
				// 		});
				// 		console.log('loading player');
				// 	}
				// }, 150);
				if (typeof YT === 'undefined') {
					await new Promise((resolve) => {
						window.onYouTubeIframeAPIReady = resolve;
					});
				}
				player = new YT.Player(divId, {
					height: '390',
					width: '640',
					videoId,
					events: {
						onReady: playerIsReady,
						onStateChange: playerStateChange
					}
				});
			} catch (err) {
				console.log('error is', err);
			} finally {
				dispatch('playerLoaded', true);
				// videoLoaded = true;
			}
		}
	}

	$: console.log('player', player);
	function playerStateChange({ data }) {
		dispatch('PlayerStateChange', data);
		console.log('Player state changed');

		let strReturn = '';
		if (data === -1) strReturn = '(unstarted)';
		if (data === 0) strReturn = '(ended)';
		if (data === 1) strReturn = '(playing)';
		if (data === 2) strReturn = '(paused)';
		if (data === 3) strReturn = '(buffering)';
		if (data === 5) strReturn = '(video cued)';

		dispatch('PlayerStateChangeString', strReturn);
	}
</script>

<div id={divId} />
