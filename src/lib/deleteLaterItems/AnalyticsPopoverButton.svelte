<script lang="ts">
	import AnalyticsBoard from '$lib/components/IconComponents/AnalyticsBoard.svelte';
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import SingleItemBarCompVersesDays from '$lib/ChartsAndGraphs/ui/Combo_Bar_Line_SingleItemBarCompVersesDays.svelte';
	import type { SvelteComponent } from 'svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="View Stats"><AnalyticsBoard /></button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<SingleItemBarCompVersesDays {item} />
{/snippet}

<style>
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
</style>
