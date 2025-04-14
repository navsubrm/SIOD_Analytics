<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Edit from '$lib/components/IconComponents/Edit.svelte';
	import Add from '$lib/components/IconComponents/Add.svelte';
	import type { SvelteComponent } from 'svelte';
	import PostForm from './PostForm.svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item = {}, edit = true } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

{#if edit}
	<button onclick={showPopover} title="Edit Item"><Edit /></button>
{:else}
	<button onclick={showPopover} title="Add Item"
		><Add --_height="25px" --_fill="var(--orange)" /></button
	>
{/if}

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div>
		<h3>{edit ? 'Edit' : 'Add'} JIRA Ticket:</h3>
		<PostForm --_form-min-width="100%" id={item._id} />
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
