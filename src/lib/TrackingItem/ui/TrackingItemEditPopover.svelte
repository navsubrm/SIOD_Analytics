<script lang="ts">
	import CreateTrackingItemForm from '$lib/TrackingItem/ui/FormComponents/CreateTrackingItemForm.svelte';
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Edit from '$lib/components/IconComponents/Edit.svelte';
	import type { SvelteComponent } from 'svelte';

	let { item, trackingItemList } = $props();

	let popoverContainer: SvelteComponent | undefined = $state();

	function openEditForm() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={openEditForm} title="Edit Details"><Edit --_height="20px" /></button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<CreateTrackingItemForm actionUrl="?/edit-tracking-item" editItem={item} {trackingItemList} />
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
</style>
