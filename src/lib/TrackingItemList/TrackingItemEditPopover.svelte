<script lang="ts">
	import CreateTrackingItemForm from '$lib/components/forms/CreateForms/CreateTrackingItemForm.svelte';

	let { item } = $props();

	let popoverForm: HTMLElement | undefined = $state();

	function closePopover() {
		popoverForm?.hidePopover();
		//Remove the edit and id search params and close the popover
	}
</script>

<div id="edit-task-item-{item._id}" popover bind:this={popoverForm}>
	<CreateTrackingItemForm actionUrl="?/edit-task-item" editItem={item} Action={CloseButton} />
</div>

{#snippet CloseButton()}
	<input type="button" onclick={closePopover} value="Close" />
{/snippet}

<style>
	[popover] {
		position: absolute;
		inset: 0;
		margin: auto;
		background: none;
		width: 100%;
		max-width: 500px;
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}
</style>
