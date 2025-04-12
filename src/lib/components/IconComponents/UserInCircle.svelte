<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let { animate = false, delay = 1 } = $props();
	let userUpper = $state();
	let userLower = $state();

	function animateDrawShield() {
		const tl = gsap.timeline({ duration: 3, repeat: -1, repeatDelay: delay });
		tl.set([userUpper, userLower], { scale: 1 });
		tl.to([userUpper, userLower], { x: 0.75, y: 0.5, scale: 0.8 });
		tl.to(userLower, { x: 1, y: 0.75, scale: 0.8 }, '<');
		tl.to([userUpper, userLower], { x: 0, y: 0, scale: 1 }, '>');
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
	viewBox="0 1 22 22"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		class="circle-background"
		stroke-width="0"
		d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
	/>

	<path
		bind:this={userUpper}
		class="user-upper"
		d="M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
	/>

	<path
		bind:this={userLower}
		class="user-lower"
		stroke-width="0"
		d="M12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
	/>
</svg>

<style>
	svg {
		stroke-width: var(--_stroke-width, 1);
		height: var(--_height, 25px);
		width: var(--_height, 25px);
	}

	.circle-background {
		fill: var(--_stroke, --gold);
	}

	.user-upper,
	.user-lower {
		fill: var(--_user-fill, --white);
		stroke: var(--_user-fill, --white);
	}
</style>
