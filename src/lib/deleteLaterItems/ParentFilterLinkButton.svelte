<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import LinkChain from '$lib/components/IconComponents/LinkChain.svelte';
	let { item } = $props();

	function filterByParent() {
		page?.url?.searchParams.set('item-id', item._id);
		goto(page.url);
	}

	function clearFilterByParent() {
		page?.url?.searchParams.delete('item-id');
		goto(page.url);
	}
</script>

{#if item?._id}
	{#if page?.url?.searchParams.get('item-id')}
		<button onclick={clearFilterByParent} class="active" title="Filter Related Tasks"
			><LinkChain /></button
		>
	{:else}
		<button onclick={filterByParent} title="Filter Related Tasks"><LinkChain /></button>
	{/if}
{/if}

<style>
	button {
		border: none;
		background: none;
	}

	.active {
		fill: var(--_fill, var(--orange));
	}

	.active :global(.chain) {
		stroke: var(--_fill, var(--orange));
	}

	.active :global(.circle) {
		fill: var(--white);
	}
</style>
