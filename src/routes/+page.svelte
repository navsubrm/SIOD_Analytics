<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import TrackingItemCardList from '$lib/TrackingItem/ui/CardListComponents/TrackingItemCardList.svelte';
	import AnalyticsBoard from '$lib/components/IconComponents/AnalyticsBoard.svelte';
	import TrackingItemTable from '$lib/TrackingItem/ui/TableListComponents/TrackingItemTable.svelte';
	import Toggle from '$lib/components/IconComponents/Toggle.svelte';
	import AddNewTrackingItemButton from '$lib/TrackingItem/ui/AddNewTrackingItemButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let trackingItemList = data.trackingItemList;

	let viewTable: boolean = $state(true);

	function goToAnalytics() {
		goto('/analytics');
	}
</script>

<svelte:head>
	{#key page?.url}
		<title>SIOD Tracking Items</title>
	{/key}
</svelte:head>

<section>
	<div class="data-container">
		<h3>Active Tracking Items:</h3>
		<div>
			<AddNewTrackingItemButton actionUrl={'?/add-new-trackingItem'} />
			<button onclick={goToAnalytics}><AnalyticsBoard /></button>
			<button onclick={() => (viewTable = !viewTable)}>
				<Toggle bind:active={viewTable} />
			</button>
		</div>
	</div>
	{#key viewTable}
		{#if viewTable}
			<TrackingItemTable {trackingItemList} />
		{:else}
			<TrackingItemCardList {trackingItemList} />
		{/if}
	{/key}
</section>

<style>
	section {
		background: var(--white);
		width: 100%;
	}

	.data-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 2em;
		padding: 1em;
		border: solid 1px var(--blue);
	}

	.data-container h3 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.25em;
	}

	.data-container button {
		border: none;
		background: none;
	}

	.data-container button :global(svg) {
		stroke: var(--gold);
	}

	.data-container button:hover :global(svg) {
		stroke: var(--orange);
		cursor: pointer;
		scale: 1.02;
	}
</style>
