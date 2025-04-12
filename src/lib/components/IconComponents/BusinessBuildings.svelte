<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let { animate = false } = $props();

	export function flickerWindows() {
		const windows = gsap.utils.toArray('.window-square');
		windows.forEach((window) => {
			gsap.to(window, {
				opacity: 0,
				duration: 3.5,
				delay: Math.random() * windows.length,
				repeat: -1,
				yoyo: true
			});
		});
	}

	if (animate) {
		onMount(() => {
			flickerWindows();
		});
	}
</script>

<svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
	<line
		id="door-line"
		x1="176"
		y1="416"
		x2="176"
		y2="480"
		style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
	/>
	<path
		class="outline"
		d="M80,32H272a32,32,0,0,1,32,32V476a4,4,0,0,1-4,4H48a0,0,0,0,1,0,0V64A32,32,0,0,1,80,32Z"
		style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
	/>
	<path
		class="outline"
		d="M320,192H432a32,32,0,0,1,32,32V480a0,0,0,0,1,0,0H304a0,0,0,0,1,0,0V208A16,16,0,0,1,320,192Z"
		style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
	/>
	<path class="window-square" d="M98.08,431.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,431.87Z" />
	<path class="window-square" d="M98.08,351.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,351.87Z" />
	<path class="window-square" d="M98.08,271.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,271.87Z" />
	<path class="window-square" d="M98.08,191.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,191.87Z" />
	<path class="window-square" d="M98.08,111.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,111.87Z" />
	<path
		class="window-square"
		d="M178.08,351.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,351.87Z"
	/>
	<path
		class="window-square"
		d="M178.08,271.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,271.87Z"
	/>
	<path
		class="window-square"
		d="M178.08,191.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,191.87Z"
	/>
	<path
		class="window-square"
		d="M178.08,111.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,111.87Z"
	/>
	<path
		class="window-square"
		d="M258.08,431.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,431.87Z"
	/>
	<path
		class="window-square"
		d="M258.08,351.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,351.87Z"
	/>
	<path
		class="window-square"
		d="M258.08,271.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,271.87Z"
	/>
	<ellipse
		class="window-square"
		cx="256"
		cy="176"
		rx="15.95"
		ry="16.03"
		transform="translate(-49.47 232.56) rotate(-45)"
	/>
	<path
		class="window-square"
		d="M258.08,111.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,111.87Z"
	/>
	<path class="window-square" d="M400,400a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" />
	<path class="window-square" d="M400,320a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" />
	<path class="window-square" d="M400,240a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" />
	<path class="window-square" d="M336,400a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" />
	<path class="window-square" d="M336,320a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" />
	<path class="window-square" d="M336,240a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" />
</svg>

<style>
	svg {
		fill: var(--_fill, black);
		stroke: var(--_stroke, black);
		height: var(--_height, 25px);
		width: var(--_height, 25px);
	}

	#door-line,
	.outline {
		stroke: var(--_stroke, black);
	}

	.window-square {
		fill: var(--_window-color, --blue);
	}
</style>
