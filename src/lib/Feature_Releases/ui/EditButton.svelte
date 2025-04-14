<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Edit from '$lib/components/IconComponents/Edit.svelte';
	import type { SvelteComponent } from 'svelte';
	import PostForm from './PostForm.svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item, stage } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="Edit Stage"><Edit /></button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div>
		<h3>Update Release Date:</h3>
		<PostForm --_form-min-width="100%" {item} {stage} />
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
