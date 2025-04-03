<script lang="ts">
	import Close from '$lib/IconComponents/Close.svelte';
	import Information from '$lib/IconComponents/Information.svelte';

	let analyticsPopover: HTMLElement | undefined = $state();
	let { item } = $props();

	function showPopover() {
		analyticsPopover?.showPopover();
	}

	function closePopover() {
		analyticsPopover?.hidePopover();
		//Remove the edit and id search params and close the popover
	}
</script>

<div class="edit">
	<button onclick={showPopover} title="View Stats"><Information /></button>
</div>

<div class="analytics" popover bind:this={analyticsPopover}>
	<div class="close-icon">
		<button onclick={closePopover}>
			<Close --_height="30px" />
		</button>
	</div>
	<div class="details">
		{item.details}
	</div>
</div>

<style>
	.details {
		margin-top: 30px;
		padding: 1em;
		min-width: 200px;
		min-height: 200px;
		height: 100%;
		width: 100%;
		max-width: max-content;
		max-height: max-content;
	}

	button {
		--_fill: var(--orange);
		--_height: 20px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		stroke: var(--white);
	}

	.analytics {
		position: fixed;
		padding: 1em;
		background: var(--blue);
		color: var(--white);
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		opacity: 0;
	}

	.analytics:popover-open {
		position: fixed;
		inset: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 1;
		transform: translateY(0);
		transition: all 0.5s allow-discrete;

		@starting-style {
			transform: translateY(20%);
			opacity: 0;
		}
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}

	.close-icon {
		position: relative;
		background: none;
		height: 100%;
		width: 100%;
	}

	.close-icon button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
	}
</style>
