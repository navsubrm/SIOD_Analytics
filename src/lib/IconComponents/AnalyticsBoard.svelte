<script>
	import gsap from 'gsap';
	import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
	import { onMount } from 'svelte';

	let { animate = false } = $props();

	let graphLine = $state();

	export function animateGraphLine() {
		gsap.registerPlugin(DrawSVGPlugin);
		gsap.fromTo(graphLine, { drawSVG: '15% 20%' }, { duration: 2, drawSVG: '20% 95%', repeat: -1 });
	}

	if (animate) {
		onMount(() => {
			animateGraphLine();
		});
	}
</script>

<svg
	width="800px"
	height="800px"
	viewBox="0 0 45 45"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- M4 41.0301L16.1756 28.7293L22.7549 35.0301L30.7982 27L35.2787 31.368" -->
	<rect width="48" height="48" fill="none" stroke="none" stroke-linecap="round" />
	<path d="M44 5H4V17H44V5Z" fill="none" stroke-width="4" stroke-linejoin="round" />
	<path
		bind:this={graphLine}
		d="M4 41.0301L16.1756 28.7293L22.7549 35.0301L30.7982 27L35.2787 31.368"
		fill="none"
		stroke-width="4"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path d="M44 16.1719V42.1719" stroke-width="4" stroke-linecap="round" />
	<path d="M4 16.1719V30.1719" stroke-width="4" stroke-linecap="round" />
	<path d="M13.0156 43H44.0001" stroke-width="4" stroke-linecap="round" />
	<path
		id="horizontal-bar-long"
		d="M17 11H38"
		stroke="var(--gold, gold)"
		stroke-width="4"
		stroke-linecap="round"
	/>
	<path
		id="horizontal-bar-short"
		d="M10 10.9966H11"
		stroke="var(--gold, gold)"
		stroke-width="4"
		stroke-linecap="round"
	/>
</svg>

<style>
	svg {
		height: var(--_height, 25px);
		width: var(--_height, 25px);
		fill: var(--_fill, red);
		stroke: var(--_stroke, blue);
	}

	#graph-line {
		stroke: var(--_graph-stroke, green);
	}

	#horizontal-bar-long {
		stroke: var(--_bar-stroke-long, red);
	}

	#horizontal-bar-short {
		stroke: var(--_bar-stroke-short, blue);
	}
</style>
