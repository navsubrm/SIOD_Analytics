<script lang="ts">
	import Close from '$lib/components/IconComponents/Close.svelte';
	import gsap from 'gsap';

	let { Child, popover = $bindable(undefined), iconColor = 'var(--orange)' } = $props();

	let popoverOpen = $state(false);

	export function showPopover() {
		popoverOpen = true;
		popover?.showPopover();
	}

	function closePopover() {
		popoverOpen = false;
		popover?.hidePopover();
	}

	$effect(() => {
		popoverOpen;
		gsap.fromTo(
			popover,
			{ '--_cone-width': '0deg' },
			{
				'--_cone-width': '360deg',
				ease: 'ease-in-out',
				duration: 0.75,
				delay: 1.5
			}
		);
	});
</script>

<div class="popover" popover bind:this={popover}>
	<div class="popover-inner">
		<div class="close-icon">
			<button onclick={closePopover}>
				<Close --_height="30px" --_fill={iconColor} />
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
		position: fixed;
		padding: 2px;
		opacity: 0;
		border: none;
		border-radius: 0.5em;
	}

	.popover:popover-open {
		position: fixed;
		inset: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 1;
		transform: translateY(0);
		background: conic-gradient(var(--orange) var(--_cone-width), transparent var(--_cone-width));
		transition:
			opacity 0.5s,
			transform 0.5s allow-discrete;

		@starting-style {
			transform: translateY(20%);
			opacity: 0;
		}
	}

	.popover-inner {
		position: relative;
		background: var(--blue);
		padding: 1em;
		color: var(--white);
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		min-height: 400px;
		min-width: 300px;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		opacity: 1;
		transition: opacity 0.5s 1.5s ease-in;
		margin-top: 1em;

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
		top: 5px;
		right: 5px;
		background: none;
		border: none;
		pointer-events: all;
	}
</style>
