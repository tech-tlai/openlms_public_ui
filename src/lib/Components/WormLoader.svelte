<script>
	export let position = 'fixed';
	export let addClass = '';
</script>

<div
	class={`border-blue-100 ${position} ${addClass} top-0 left-0 border-t-[3px] z-[1000] loader`}
></div>

<style>
	.loader {
		animation: progress 2s forwards;
	}

	@keyframes progress {
		0% {
			width: 25%;
		}
		20% {
			width: 40%;
		}
		50% {
			width: 75%;
		}
		100% {
			width: 95%;
		}
	}
</style>
