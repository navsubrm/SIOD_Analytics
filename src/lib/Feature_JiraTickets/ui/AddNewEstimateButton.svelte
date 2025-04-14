<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Clipboard from '$lib/components/IconComponents/Clipboard.svelte';
	import CreateEstimateForm from '$lib/JiraTickets/ui/FormComponents/CreateEstimateForm.svelte';
	import type { SvelteComponent } from 'svelte';

	let { item } = $props();

	let popoverContainer: SvelteComponent | undefined = $state();

	function showEstPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button class="add-new-btn big-icon" title="Add New" onclick={showEstPopover}><Clipboard /></button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<CreateEstimateForm {item} />
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
