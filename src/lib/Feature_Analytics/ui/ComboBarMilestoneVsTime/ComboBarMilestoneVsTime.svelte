<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import FormStyles from '$lib/components/FormStyles.svelte';
	import Select from 'svelte-select';
	import { options } from './utils/options';
	import { projectionEstimates } from './utils/projectionEstimates';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import { LineChart } from '@carbon/charts-svelte';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types';
	import { handleDataConversion } from './utils/handleDataConversion';
	import { convertJiraListToSelectOptions } from './utils/convertJiraListToSelectOptions';

	interface SelectItem {
		label: string;
		value: string;
	}

	interface graphElement {
		group: string;
		key: string;
		value: number;
	}

	let items = $state(convertJiraListToSelectOptions($activeList)) as SelectItem[];
	let displaySet = $state([]) as JIRATicket[];
	let data = $state(handleDataConversion($activeList)) as graphElement[];
	let open = $state(false);

	$effect(() => {
		items = convertJiraListToSelectOptions($activeList);
		data = handleDataConversion(displaySet);
		// if(displaySet.length == 0) {
		// 	options.data.loading = true;
		// } else {
		// 	options.data.loading = false;
		// }
	});

	function selectItemToDisplay(e) {
		displaySet = $activeList.filter((el) => {
			if (e.detail.some((option: SelectItem) => el._id == option.value)) return el;
		});
		data = handleDataConversion(displaySet);
	}

	function clearSelect() {
		displaySet = [];
	}
</script>

<FormStyles Children={TrackingItemSelect} />
{#snippet TrackingItemSelect()}
	<div class="select-style">
		<label for="select-tracking-item">Select Tracking Item to View: </label>
		<Select
			{items}
			multiple
			on:change={selectItemToDisplay}
			on:clear={clearSelect}
			closeListOnChange={false}
			--list-z-index="100000"
			bind:listOpen={open}
		/>
	</div>
{/snippet}

{#key displaySet}
	<div class="horizontal-chart">
		<h3>Displaying Actual Vs. Projection Completion By Milestone:</h3>
		<small>Milestone Projections: </small>
		{#each projectionEstimates as stage}
			<small>{stage?.stage}: {stage?.projectedTime * 100}%</small>
		{/each}
		<!-- {#if displaySet.length > 0}
			({#each displaySet as item, i}
				{#if i < displaySet.length - 1}
					<small>{item?.name}, </small>
				{:else}
					<small>{item?.name}</small>
				{/if}
			{/each})
		{/if} -->

		<div class="chart-box" class:select-open={open}>
			{#key data}
				<LineChart {data} {options} />
			{/key}
		</div>
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

	.chart-box {
		margin-top: 15px;
	}

	.select-open {
		pointer-events: none;
		visibility: hidden;
	}

	.select-style {
		z-index: 1000;
	}
</style>
