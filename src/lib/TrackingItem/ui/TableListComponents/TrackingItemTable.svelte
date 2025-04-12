<script lang="ts">
	import { fade } from 'svelte/transition';
	import { checkConfidenceOfTrackingItem } from '$lib/ChartsAndGraphs/utils/checkConfidenceOfTrackingItem';
	import TrackingItemEditPopover from '$lib/TrackingItem/ui/TrackingItemEditPopover.svelte';
	import AnalyticsPopoverButton from '$lib/TrackingItem/ui/AnalyticsPopoverButton.svelte';
	import ParentFilterLinkButton from '$lib/TrackingItem/ui/ParentFilterLinkButton.svelte';
	import AddNewEstimateButton from '$lib/TrackingItem/ui/AddNewEstimateButton.svelte';
	import ViewDetailsButton from '$lib/TrackingItem/ui/ViewDetailsButton.svelte';
	import SearchInput from '$lib/components/SearchInput.svelte';

	let { trackingItemList = [] } = $props();

	let query: string | undefined = $state();

	let list = $state(trackingItemList);

	function setListFilter(query: string | undefined) {
		if (!query || query == '') return trackingItemList;
		return trackingItemList.filter((el: TrackingItem) => {
			if (
				Object.entries(el).some((key, value) => {
					console.log(key[1], query);
					if (!Array.isArray(key[1])) {
						if (key[1].toString().toLowerCase().includes(query.toLowerCase())) return true;
					}
				})
			)
				return el;
		});
	}

	$effect(() => {
		list = setListFilter(query);
	});
</script>

<div class="table-container" out:fade={{ duration: 250 }} in:fade={{ delay: 500, duration: 250 }}>
	<div class="flex-end">
		<SearchInput bind:query placeholder={'Filter List'} />
	</div>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Core Capability</th>
				<th>Priority</th>
				<th>Last Est.</th>
				<th>Comp. %</th>
				<th>Time %</th>
				<th><span class="positive">+</span> / <span class="negative">-</span></th>
				<th colspan="5">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each list as item}
				<tr id={item._id}>
					<td>{item.name}</td>
					<td>{item.coreCapability}</td>
					<td>{item.priorityAssignments[0].priority}</td>
					<td
						>{#if item?.estimates.length == 0}
							<span class="negative">N/A</span>
						{:else}
							{item?.estimates[0]?.trackingEventName}
						{/if}
					</td>
					<td>{checkConfidenceOfTrackingItem(item)[0]}%</td>
					<td>{checkConfidenceOfTrackingItem(item)[1]}%</td>
					<td
						class:negative={checkConfidenceOfTrackingItem(item)[2] < 0}
						class:positive={checkConfidenceOfTrackingItem(item)[2] > 0}
						>{checkConfidenceOfTrackingItem(item)[2]}%</td
					>
					<td><ViewDetailsButton {item} /></td>
					<td><AnalyticsPopoverButton {item} /></td>
					<td><TrackingItemEditPopover {item} /></td>
					<td><AddNewEstimateButton {item} /></td>
					<td>
						{#if !item.parentName}
							<ParentFilterLinkButton {item} />
						{/if}
						{item.parentName}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
		padding: 1em;
	}

	.flex-end {
		align-self: flex-end;
	}
	table {
		width: calc(100% - 1em);
		margin-block: 1em;
		margin-inline: 0.5em;
		border: solid 3px var(--blue);
	}

	table :global(svg) {
		--_height: 20px;
		--_fill: var(--orange);
		--_stroke: var(--orange);
	}

	table td :global(svg:hover) {
		--_height: 20px;
		--_fill: var(--gold);
		--_stroke: var(--gold);
	}

	table td :global(svg:hover > path),
	table td :global(svg:hover > rect) {
		stroke: var(--_stroke, var(--gold));
	}

	table,
	th,
	td {
		border: solid 1px var(--blue);
		border-collapse: collapse;
		text-align: center;
		vertical-align: middle;
		padding: 0.5em;
	}

	.negative {
		color: var(--red);
		font-weight: bold;
	}

	.positive {
		color: var(--green);
		font-weight: bold;
	}
</style>
