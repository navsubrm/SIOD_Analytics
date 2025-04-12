<script>
	import gsap from 'gsap';
	import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
	import { onMount } from 'svelte';

	let { animate = false, delay = 1 } = $props();
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
	viewBox="1 1 45 45"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<title>shield-add</title>
	<desc>Created with Sketch.</desc>
	<g id="shield-add" stroke-width="1" fill="none" fill-rule="evenodd">
		<g>
			<path
				bind:this={shield}
				stroke-width="4"
				fill="none"
				fill-rule="nonzero"
				stroke-linejoin="round"
				d="M6,8.25564385 L24.008642,3 L42,8.25564385 L42,19.0336798 C42,30.3621834 34.7502223,40.4194233 24.0026245,44.0005035 L24.0026245,44.0005035 C13.2520792,40.4194856 6,30.3599802 6,19.0286999 L6,8.25564385 Z"
			/>

			<path
				d="M18.2928932,17.2928932 L29.6066017,28.6066017"
				id="Path-128"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				transform="translate(23.949747, 22.949747) rotate(45.000000) translate(-23.949747, -22.949747) "
			/>

			<path
				d="M29.6066017,17.2928932 L18.2928932,28.6066017"
				id="Path-129"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				transform="translate(23.949747, 22.949747) rotate(-135.000000) translate(-23.949747, -22.949747) "
			/>
		</g>
	</g>
</svg>

<style>
	svg {
		height: var(--_height, 25px);
		width: var(--_height, 25px);
		fill: var(--_fill, --gold);
		stroke: var(--_stroke, --gold);
	}
</style>
