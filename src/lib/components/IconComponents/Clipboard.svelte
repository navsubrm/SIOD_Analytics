<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let { animate = false, delay = 5 } = $props();
	let firstTask = $state();
	let secondTask = $state();

	export function addTasks() {
		const tl = gsap.timeline({ repeat: -1, repeatDelay: delay });
		tl.set([firstTask, secondTask], { opacity: 0 });
		tl.to(firstTask, { opacity: 1, duration: 0.75 });
		tl.to(secondTask, { opacity: 1, duration: 0.75 }, '>');
		tl.to([firstTask, secondTask], { scale: 0.95, duration: 0.5 });
		tl.to([firstTask, secondTask], { scale: 1, duration: 0.5 });
	}

	if (animate) {
		onMount(() => {
			addTasks();
		});
	}
</script>

<svg
	stroke-width="0"
	width="800px"
	height="800px"
	viewBox="0 0 32 32"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M11 8.749h10c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-2.019c0.477-0.616 0.766-1.398 0.769-2.248v-0.001c0-2.071-1.679-3.75-3.75-3.75s-3.75 1.679-3.75 3.75v0c0.003 0.851 0.292 1.633 0.775 2.258l-0.006-0.009h-2.019c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM13.75 5c0-0 0-0.001 0-0.001 0-1.243 1.007-2.25 2.25-2.25s2.25 1.007 2.25 2.25c0 1.243-1.007 2.25-2.25 2.25v0c-1.242-0.002-2.248-1.008-2.25-2.249v-0z"
	/>
	<path
		d="M26 5.25h-2c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h1.25v22.5h-18.5v-22.5h1.25c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-2c-0.414 0-0.75 0.336-0.75 0.75v0 24c0 0.414 0.336 0.75 0.75 0.75h20c0.414-0 0.75-0.336 0.75-0.75v0-24c-0-0.414-0.336-0.75-0.75-0.75v0z"
	/>
	<g bind:this={firstTask}>
		<path
			class="dot"
			d="M10.377 18.143c1.156 0 2.094-0.937 2.094-2.094s-0.937-2.094-2.094-2.094c-1.156 0-2.094 0.937-2.094 2.094 0 0 0 0.001 0 0.001v-0c0.002 1.155 0.938 2.092 2.094 2.093h0z"
		/>
		<path
			class="line"
			d="M23.1 15.3h-7.133c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75h7.133c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"
		/>
	</g>
	<g bind:this={secondTask}>
		<path
			class="dot"
			d="M10.377 20.801c-1.156 0.001-2.093 0.938-2.093 2.094s0.937 2.094 2.094 2.094 2.094-0.937 2.094-2.094v0c-0.002-1.156-0.939-2.093-2.095-2.094h-0"
		/>
		<path
			class="line"
			d="M16.033 22.145c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h7.133c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"
		/>
	</g>
</svg>

<style>
	svg {
		height: var(--_height, 25px);
		width: var(--_height, 25px);
		fill: var(--_stroke, --gold);
		stroke: var(--_fill, --gold);
	}

	.dot {
		fill: var(--_stroke, none);
		stroke: var(--_dot-fill, --_fill);
		stroke-width: var(--_dot-stroke, 0);
	}

	.line {
		fill: var(--_line-fill, --_stroke);
	}
</style>
