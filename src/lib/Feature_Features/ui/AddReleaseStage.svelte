<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Add from '$lib/components/IconComponents/Add.svelte';
	import type { SvelteComponent } from 'svelte';
	import AddReleaseStageForm from './AddReleaseStageForm.svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item = {} } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="Add Item"
	><Add --_height="25px" --_fill="var(--orange)" /></button
>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div>
		<h3>Add New Release:</h3>
		<AddReleaseStageForm --_form-min-width="100%" id={item._id} />
	</div>
{/snippet}

<style>
	button {
		--_stroke: var(--orange);
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
	}
</style>
