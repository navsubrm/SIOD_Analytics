<script lang="ts">
	//Code
	import Close from '$lib/IconComponents/Close.svelte';
	import Clipboard from '$lib/IconComponents/Clipboard.svelte';
	import CreateTrackingItemForm from '$lib/components/forms/CreateForms/CreateTrackingItemForm.svelte';

	let popover: HTMLElement | undefined = $state();

	function showPopover() {
		popover?.showPopover();
	}

	function closePopover() {
		popover?.hidePopover();
		//Remove the edit and id search params and close the popover
	}
</script>

<button class="add-new-btn big-icon" title="Add New" onclick={showPopover}><Clipboard /></button>

<div class="popover" popover bind:this={popover}>
	<div class="close-icon">
		<button onclick={closePopover}>
			<Close --_height="30px" />
		</button>
	</div>
	<CreateTrackingItemForm />
</div>

<style>
	button {
		--_fill: var(--orange);
		--_height: 60px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		stroke: var(--white);
	}

	.popover {
		position: absolute;
		inset: 0;
		margin: auto;
		border: none;
		width: 100%;
		max-width: 500px;
		padding: 1em;
		background: var(--white);
	}

	.popover:popover-open {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}

	.close-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
	}

	.close-icon button {
		background: none;
		border: none;
	}
</style>
