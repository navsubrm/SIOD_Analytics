<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import FormStyles from '$lib/components/FormStyles.svelte';
	import Select from 'svelte-select';
	import { options } from './utils/options';
	import { projectionEstimates } from './utils/projectionEstimates';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import { LineChart } from '@carbon/charts-svelte';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
	import { getDaysBetweenDates } from '$lib/Feature_Analytics/utils/getDaysBetweenDates';
	import { onMount } from 'svelte';

	interface SelectItem {
		label: string;
		value: string;
	}

	let items = $state([]) as SelectItem[];
	let displaySet = $state([]) as JIRATicket[];
	let data = $state([]) as graphElement[];

	onMount(() => {
		items = convertJiraListToSelectOptions();
		data = handleDataConversion($activeList);
	});

	function convertJiraListToSelectOptions(): SelectItem[] {
		return $activeList.map((el) => {
			return {
				value: el._id as string,
				label: `${el?.feature?.label} ${el.name}: ${el?.milestones?.label}`
			};
		});
	}

	function selectItemToDisplay(e) {
		console.log('Event detail: ', e.detail);
		displaySet = $activeList.filter((el) => {
			if (e.detail.some((option: JIRATicket) => el._id == option.value)) return el;
		});
		data = handleDataConversion(displaySet);
	}

	interface graphElement {
		group: string;
		key: string;
		value: number;
	}

	function handleDataConversion(displaySet: JIRATicket[]) {
		return displaySet
			.map((ticket) => {
				const totalDays = getDaysBetweenDates(
					ticket?.plannedReleaseDate,
					ticket?.startDate as date
				);
				const ticketArray = handleTicketDataConversion(ticket, totalDays);
				return [...ticketArray];
			})
			.flat();
	}

	function handleTicketDataConversion(ticket: JIRATIcket, totalDays) {
		const ticketData = ticket.releaseStages.map((stage) => {
			const stageDays = !stage.date ? 0 : getDaysBetweenDates(ticket.startDate, stage.date);
			const actualPercentile = stageDays == 0 ? 0 : totalDays / stageDays;
			const projectedPercentile = projectionEstimates.find((el) => el.stage == stage.stage);

			return {
				group: `${ticket.feature.label}: ${ticket.name}`,
				key: stage.stage,
				value: !projectedPercentile ? 0 : projectedPercentile.projectedTime - actualPercentile
			};
		});
		return ticketData;
	}
</script>

{#await items}
	<p>Loading...</p>
{:then items}
	<FormStyles Children={TrackingItemSelect} />
	{#snippet TrackingItemSelect()}
		<div class="select-style">
			<label for="select-tracking-item">Select Tracking Item to View: </label>
			<Select
				{items}
				multiple
				on:change={selectItemToDisplay}
				on:clear={selectItemToDisplay}
				closeListOnChange={false}
			/>
		</div>
	{/snippet}
{/await}
{#key displaySet}
	<div class="horizontal-chart">
		<h3>Displaying Milestone vs. Timeline for:</h3>
		{#if displaySet.length > 0}
			({#each displaySet as item, i}
				{#if i < displaySet.length - 1}
					<small>{item?.name}, </small>
				{:else}
					<small>{item?.name}</small>
				{/if}
			{/each})
		{/if}

		{#key data}
			<LineChart {data} {options} />
		{/key}
		<small>Estimates based on: </small>
		{#each projectionEstimates as stage}
			<small>{stage?.stage}: {stage?.projectedTime * 100}%</small>
		{/each}
	</div>
{/key}

<style>
	@import '../../styles/chart.css';

	small {
		margin-right: 1ch;
	}

	small:last-of-type {
		margin-right: 0ch;
	}
</style>
