<script lang="ts">
	import Close from '$lib/components/IconComponents/Close.svelte';
	import gsap from 'gsap';

	let { Child, popover = $bindable(undefined), iconColor = 'var(--orange)' } = $props();

	let popoverOpen = $state(false);
	// let top = $state(0);
	// let left = $state(0);
	// let move = $state(false);

	export function showPopover() {
		popoverOpen = true;
		popover?.showPopover();
	}

	function closePopover() {
		popoverOpen = false;
		popover?.hidePopover();
		popover.removeEventListener('mousemove', handleMove);
	}

	$effect(() => {
		popoverOpen;
		gsap.fromTo(
			popover,
			{ '--_cone-width': '0deg' },
			{
				'--_cone-width': '360deg',
				ease: 'ease-in-out',
				duration: 0.5,
				delay: 0.5
			}
		);
	});

	// function onMouseMove(e) {
	// 	if (move) {
	// 		left += e.movementX * 2;
	// 		top += e.movementY * 2;
	// 	}
	// }

	// function toggleMove() {
	// 	move = !move;
	// }

	// onmousedown={toggleMove}
	// onmousemove={onMouseMove}
	//style="top: {top}px; left: {left}px;"
</script>

<div class="popover" popover bind:this={popover}>
	<div class="popover-inner">
		<div class="close-icon">
			<button onclick={closePopover}>
				Close <Close --_height="25px" --_fill={iconColor} />
			</button>
		</div>
		<div class="content">
			{#key popoverOpen}
				{@render Child()}
			{/key}
		</div>
	</div>
</div>

<style>
	.popover {
		--_line-padding: 2px;
		position: absolute;
		padding: var(--_line-padding);
		opacity: 0;
		border: none;
		border-radius: 0.5em;
	}

	.popover:popover-open {
		position: absolute;
		inset: 0;
		/* top right bottom left */
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 1;
		width: var(--_popover-width, max-content);
		height: var(--_popover-width, max-content);
		max-width: 100%;
		transform: translateY(0);
		background: conic-gradient(var(--orange) var(--_cone-width), transparent var(--_cone-width));
		transition:
			opacity 0.5s 0.25s,
			transform 0.5s allow-discrete;

		@starting-style {
			transform: translateY(20%);
			opacity: 0;
		}
	}

	.popover-inner {
		position: relative;
		background: var(--blue);
		padding: 1.5em;
		color: var(--white);
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		/* height: max-content; */
		/* width: 100%; */
		min-width: 300px;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: max-content;
		max-width: 100%;
		opacity: 1;
		transition: opacity 0.5s 0.75s ease-in;
		margin-top: 1.5em;

		@starting-style {
			opacity: 0;
		}
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}

	.close-icon {
		position: relative;
		background: none;
		width: 100%;
		z-index: 10000;
	}

	.close-icon button {
		position: absolute;
		top: 3px;
		right: 3px;
		background: none;
		border: none;
		pointer-events: all;
		color: var(--white);
	}

	.close-icon button:hover {
		--_fill: var(--gold);
	}
</style>
