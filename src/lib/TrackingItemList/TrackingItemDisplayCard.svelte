<script lang="ts">
	import { page } from '$app/state';
	import CreateEstimateForm from '$lib/components/forms/CreateForms/CreateEstimateForm.svelte';
	import CardHeader from '../components/CardComponents/CardHeader.svelte';
	import CardFooter from '../components/CardComponents/CardFooter.svelte';
	import CardSmallIconItem from '../components/CardComponents/CardSmallIconItem.svelte';
	import { getAverageEstimates } from '$lib/HelperFunctions/getAverageOfEstimatesByItem';
	import { getAveragePriority } from '$lib/HelperFunctions/getAveragePriority';

	//Icons:
	import MaintenanceCrossedItems from '$lib/IconComponents/MaintenanceCrossedItems.svelte';
	import Clipboard from '$lib/IconComponents/Clipboard.svelte';
	import Priority from '$lib/IconComponents/Priority.svelte';
	import Shield from '$lib/IconComponents/Shield.svelte';
	import { goto } from '$app/navigation';
	import TrackingItemEditPopover from './TrackingItemEditPopover.svelte';

	let { item, rotate } = $props();

	const priorityAverage = $state(getAveragePriority(item?.priorityAssignments));
	const [confidenceAverage, completionAverage, daysBetween, eventCount] = $state(
		getAverageEstimates(item?.estimates)
	);

	function filterByParent() {
		page?.url?.searchParams.set('item-id', item._id);
		goto(page.url);
	}

	function clearFilterByParent() {
		page?.url?.searchParams.delete('item-id');
		goto(page.url);
	}
</script>

{#key item}
	<TrackingItemEditPopover {item} />
	<div class="card-inner card-front" id={item._id}>
		<div class="card-header">
			<CardHeader
				title={item.name}
				IconComponent={Clipboard}
				length={15}
				analyticsUrl="/analytics?id={item._id}"
				editId={item._id}
			/>
		</div>
		<div class="card-category">
			<h5>{item.coreCapability}</h5>
		</div>

		<div class="card-stats card-stats-1">
			<CardSmallIconItem
				data={item?.priorityAssignments[0]?.priority}
				Icon={Priority}
				label={'Priority'}
			/>
			{#if item?.estimates[0]}
				<CardSmallIconItem
					data={`${item?.estimates[0]?.confidencePercentile}%`}
					Icon={Shield}
					label={'Confidence'}
				/>
				<CardSmallIconItem
					data={`${item?.estimates[0]?.completionPercentile}%`}
					Icon={MaintenanceCrossedItems}
					label={'Completion'}
				/>
				<p>Since {item?.estimates[0]?.trackingEventName}.</p>
			{:else}
				<p>No estimates entered yet.</p>
			{/if}
		</div>

		<hr />

		<div class="card-stats card-stats-2">
			<CardSmallIconItem data={priorityAverage} Icon={Priority} label={'Priority'} />
			{#if item?.estimates[0]}
				<CardSmallIconItem data={`${confidenceAverage}%`} Icon={Shield} label={'Confidence'} />
				<CardSmallIconItem
					data={`${completionAverage}%`}
					Icon={MaintenanceCrossedItems}
					label={'Completion'}
				/>
				<p>
					Avg. Over {daysBetween} day{(daysBetween as number) > 1 ? 's' : ''}, and {eventCount} event{(eventCount as number) >
					1
						? 's'
						: ''}.
				</p>
			{:else}
				<p>No estimates entered yet.</p>
			{/if}
		</div>
		<div class="card-footer">
			<CardFooter Item={FooterParentTitle} {rotate} buttonLabel={'Add New Est.'} />
		</div>
	</div>
	<div class="card-inner card-back">
		<div class="card-header">
			<CardHeader title={'Add New Est.'} IconComponent={Clipboard} length={20} />
		</div>
		<div class="card-form">
			<CreateEstimateForm {item} {rotate} />
		</div>
	</div>
{/key}

{#snippet FooterParentTitle()}
	{#if !item?.parentName && page.url.searchParams.get('item-id')}
		<div>
			<button onclick={clearFilterByParent}>Clear Filter</button>
		</div>
	{:else if !item?.parentName}
		<div>
			<button onclick={filterByParent}>Filter Related Items</button>
		</div>
	{:else}
		<div>
			<div>
				<small>Parent Item:</small>
			</div>
			<div>
				<small>{item.parentName}</small>
			</div>
		</div>
	{/if}
{/snippet}

<style>
	.card-inner {
		position: relative;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-row: auto / span 6;
		border: solid 1px var(--blue);
		border-radius: 0.5em;
		border: solid 2px color-mix(in lab, var(--blue), transparent 90%);
		box-shadow: 5px 5px 3px color-mix(in lab, var(--blue), transparent 95%);
	}

	.card-front,
	.card-back {
		backface-visibility: hidden;
	}

	.card-back {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		transform: rotateY(180deg);
	}

	.card-header {
		grid-row: 1 / span 1;
	}

	.card-category {
		grid-row: 2 / span 1;
	}

	.card-category,
	.card-stats {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
	}

	.card-category {
		flex-direction: column;
	}

	.card-category h5 {
		color: var(--gold);
		font-size: 1em;
	}

	.card-stats {
		flex-wrap: wrap;
		justify-content: space-evenly;
		padding-inline: 2.5em;
		font-weight: bold;
		font-size: 0.9em;
		gap: 0.5em;
		color: var(--black);
	}

	.card-stats-1 {
		grid-row: 3 / span 1;
	}

	.card-stats-2 {
		grid-row: 5 / span 1;
	}

	.card-form {
		grid-row: 2 / span 5;
	}

	hr,
	.card-footer {
		margin-top: auto;
	}

	hr {
		grid-row: 4 / span 1;
		width: 80%;
		margin-inline: auto;
		height: 1px;
	}

	.card-footer {
		grid-row: 6 / span 1;
	}
</style>
