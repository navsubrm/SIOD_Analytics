<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let { animate = false, delay = 5 } = $props();
	let folder = $state();

	export function animateFolder() {
		const tl = gsap.timeline({ repeat: -1, repeatDelay: delay });
		tl.to(folder, { scale: 0.9 });
		tl.to(folder, { scale: 1 });
	}

	if (animate) {
		onMount(() => {
			animateFolder();
		});
	}
</script>

<svg
	bind:this={folder}
	width="800px"
	height="800px"
	viewBox="1 0 22 22"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect width="24" height="24" fill="none" stroke="none" />
	<path
		d="M4 9V6.47214C4 6.16165 4.07229 5.85542 4.21115 5.57771L5 4H10L11 6H21C21.5523 6 22 6.44772 22 7V9V18C22 19.1046 21.1046 20 20 20H18"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
	<path
		d="M17.2362 9H2.30925C1.64988 9 1.17099 9.62698 1.34449 10.2631L3.59806 18.5262C3.83537 19.3964 4.62569 20 5.52759 20H19.6908C20.3501 20 20.829 19.373 20.6555 18.7369L18.201 9.73688C18.0823 9.30182 17.6872 9 17.2362 9Z"
		fill="none"
	/>
</svg>

<style>
	svg {
		height: var(--_height, 25px);
		width: var(--_height, 25px);
		fill: var(--_fill, currentColor);
		stroke: var(--_stroke, currentColor);
	}
</style>
