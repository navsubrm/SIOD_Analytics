<script lang="ts">
	import Clipboard from '$lib/components/IconComponents/Clipboard.svelte';
	import CreateTrackingItemForm from '$lib/TrackingItem/ui/FormComponents/CreateTrackingItemForm.svelte';
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import type { SvelteComponent } from 'svelte';

	let { actionUrl = '?/add-tracking-item' } = $props();

	let popoverContainer: SvelteComponent | undefined = $state(undefined);

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button class="add-new-btn big-icon" title="Add New" onclick={showPopover}
	><Clipboard --_fill="var(--orange)" --_stroke="var(--orange)" --_height="25px" /></button
>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<CreateTrackingItemForm {actionUrl} />
{/snippet}

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
</style>
