<script lang="ts">
	import CreateTrackingItemForm from '$lib/components/forms/CreateForms/CreateTrackingItemForm.svelte';

	//Icon imports:
	import Edit from '$lib/IconComponents/Edit.svelte';

	let { item } = $props();

	let popoverForm: HTMLElement | undefined = $state();

	function openEditForm() {
		popoverForm?.showPopover();
	}

	function closePopover() {
		popoverForm?.hidePopover();
		//Remove the edit and id search params and close the popover
	}
</script>

<button onclick={openEditForm} title="Edit Details"><Edit --_height="20px" /></button>

<div popover bind:this={popoverForm}>
	<CreateTrackingItemForm actionUrl="?/edit-tracking-item" editItem={item} Action={CloseButton} />
</div>

{#snippet CloseButton()}
	<input type="button" onclick={closePopover} value="Close" />
{/snippet}

<style>
	button {
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		stroke: var(--_fill, var(--white));
	}

	[popover] {
		position: absolute;
		inset: 0;
		margin: auto;
		background: none;
		width: 100%;
		max-width: 500px;
		border: none;
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}
</style>
