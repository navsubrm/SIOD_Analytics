<script>
	import gsap from 'gsap';
	import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
	import { onMount } from 'svelte';

	let { animate = false, delay = 3 } = $props();
	let shield = $state();

	function animateDrawShield() {
		gsap.registerPlugin(DrawSVGPlugin);
		const tl = gsap.timeline({ duration: 3, repeat: -1, repeatDelay: delay });
		tl.set(shield, { drawSVG: '0 0' });
		tl.to(shield, { drawSVG: true, delay: 0.5 });
	}

	if (animate) {
		onMount(() => {
			animateDrawShield();
		});
	}
</script>

<svg
	width="800px"
	height="800px"
	viewBox="4 3.5 17 17"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		bind:this={shield}
		d="M5.5 7C7.5 7 12 4 12 4C12 4 16.5 7 18.5 7V11.5C18.5 18 12 20 12 20C12 20 5.5 18 5.5 11.5V7Z"
		fill="none"
		stroke-linejoin="round"
	/>
</svg>

<style>
	svg {
		height: var(--_height, 25px);
		width: var(--_height, 25px);
		fill: var(--_fill, red);
		stroke: var(--_stroke, red);
	}
</style>
