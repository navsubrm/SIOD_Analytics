<script lang="ts">
	import CreateEstimateForm from '$lib/JiraTickets/ui/FormComponents/CreateEstimateForm.svelte';
	import CardHeader from './CardHeader.svelte';
	import CardFooter from './CardFooter.svelte';
	import CardSmallIconItem from './CardSmallIconItem.svelte';
	import MaintenanceCrossedItems from '$lib/components/IconComponents/MaintenanceCrossedItems.svelte';
	import Clipboard from '$lib/components/IconComponents/Clipboard.svelte';
	import Priority from '$lib/components/IconComponents/Priority.svelte';
	import TruncatedText from '$lib/components/TruncatedText.svelte';
	import { checkConfidenceOfTrackingItem } from '$lib/ChartsAndGraphs/utils/checkConfidenceOfTrackingItem';
	import Calendar from '$lib/components/IconComponents/Calendar.svelte';

	let { item, rotate } = $props();
</script>

{#key item}
	<div class="card-inner card-front" id={item._id}>
		<div class="card-header">
			<CardHeader {item} title={item.coreCapability} IconComponent={Clipboard} length={15} />
		</div>
		<div class="card-category">
			<h5><TruncatedText text={item.name} length={35} /></h5>
			<div><TruncatedText text={item.details} length={20} /></div>
		</div>

		<div class="card-stats-1">
			<div class="card-stats">
				<CardSmallIconItem
					data={item?.priorityAssignments[0]?.priority}
					Icon={Priority}
					label={'Priority'}
				/>
				{#if item?.estimates[0]}
					<CardSmallIconItem
						data={`${checkConfidenceOfTrackingItem(item)[0]}%`}
						Icon={MaintenanceCrossedItems}
						label={'Complete'}
					/>
					<CardSmallIconItem
						data={`${checkConfidenceOfTrackingItem(item)[1]}%`}
						Icon={Calendar}
						label={'Time Used'}
					/>
				{/if}
			</div>
			{#if item?.estimates[0]}
				<div class="card-stats">
					<p>Since {item?.estimates[0]?.trackingEventName}.</p>
				</div>
			{/if}
			{#if !item?.estimates[0]}
				<div class="card-stats">
					<p>No estimates entered yet.</p>
				</div>
			{/if}
		</div>

		<hr />

		<div class="card-stats-2">
			<div class="card-stats">
				{#if item?.estimates[0]}
					<div>
						<h4>
							We are <span class:behind={checkConfidenceOfTrackingItem(item)[2] < 0}
								>{checkConfidenceOfTrackingItem(item)[2]}%</span
							>
							{checkConfidenceOfTrackingItem(item)[2] < 0 ? 'behind' : 'ahead'} of schedule
						</h4>
					</div>
				{/if}
			</div>
			{#if !item?.estimates[0]}
				<div class="card-stats">
					<p>No estimates entered yet.</p>
				</div>
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
	{#if item?.parentName}
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
	.behind {
		color: var(--red);
	}

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

	.card-stats p {
		text-align: center;
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
