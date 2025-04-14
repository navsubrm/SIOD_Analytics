<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Information from '$lib/components/IconComponents/Information.svelte';
	import type { SvelteComponent } from 'svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="View Stats"><Information /></button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<p>{item.details}</p>
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

	p {
		margin-top: 1.5em;
	}
</style>
