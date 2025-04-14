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

<button onclick={showPopover} title="View Stats"><Information --_hover-fill="var(--gold)" /></button
>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div>
		<h3>Description:</h3>
		<p>{item.details}</p>
	</div>
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
		stroke: var(--gold);
	}

	div {
		text-align: left;
		height: 100%;
	}

	p {
		margin-top: 1.5em;
		max-width: 50ch;
	}
</style>
