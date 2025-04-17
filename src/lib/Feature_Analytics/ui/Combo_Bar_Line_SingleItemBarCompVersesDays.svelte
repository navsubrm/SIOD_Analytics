<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { activeList as jiraTicketActiveList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import { ComboChart } from '@carbon/charts-svelte';
	import { getDaysBetweenDates } from '$lib/ChartsAndGraphs/utils/getDaysBetweenDates';
	import { truncateToDecimalPlaces } from '$lib/ChartsAndGraphs/utils/truncateNumber';

	/** 
	 * I need to layout how the chart should look:

		- Group items by Feature on left
		- Bottom scale will hold stages

		Ideas for calculations: 

			- stacked horizontal graph with feature day release. bottom bar is day each OA occurred.
			- Combo bar graph for ticket with linear line and stage line by date of stage.
			- Completion pie graph that compares IL6 date against planned end for on-time completion.

	*/

	let { item } = $props();

	//Get item start and current end date.
	const startDate = item?.startDate;
	const endDate = item?.projectedEndDates[0].date;
	const dayTotal = getDaysBetweenDates(startDate, endDate);
	const origDayTotal = getDaysBetweenDates(
		startDate,
		item?.projectedEndDates[item?.projectedEndDates?.length - 1]?.date
	);

	interface BarGraphDataSet {
		group: string;
		key: string;
		value: number;
	}

	//Get total days from start for each estimate.

	const data: BarGraphDataSet[] = [];

	if (item?.estimates?.length > 0) {
		item?.estimates?.forEach((el: TrackingItemEstimate) => {
			const originalDaysUsed = truncateToDecimalPlaces(
				(getDaysBetweenDates(startDate, el?.createdAt) / origDayTotal) * 100
			);
			const daysUsed = truncateToDecimalPlaces(
				(getDaysBetweenDates(startDate, el?.createdAt) / dayTotal) * 100
			);
			const complete = truncateToDecimalPlaces(el?.completionPercentile);
			const delta = truncateToDecimalPlaces(complete - daysUsed);

			data.push({
				group: '% of Time Past',
				key: new Date(el?.createdAt).toLocaleDateString(),
				value: daysUsed
			});
			data.push({
				group: '% of Task Completed',
				key: new Date(el?.createdAt).toLocaleDateString(),
				value: complete
			});
			data.push({
				group: 'Original % of Time Past',
				key: new Date(el?.createdAt).toLocaleDateString(),
				value: originalDaysUsed
			});
			data.push({
				group: 'Time/Comp Delta %',
				key: new Date(el.createdAt).toLocaleDateString(),
				delta: delta
			});
		});
	}

	data.reverse();

	const options = {
		title: 'Completion vs. Timeline',
		toolbar: { enabled: false },
		axes: {
			left: {
				mapsTo: 'value',
				scaleType: 'linear',
				title: 'Percentile Estimate (%)',
				label: {
					color: 'yellow'
				}
			},
			bottom: {
				scaleType: 'labels',
				mapsTo: 'key'
			},
			right: {
				mapsTo: 'delta',
				title: 'Time/Completion Delta',
				scaleType: 'linear',
				correspondingDatasets: ['Time/Comp Delta %']
			}
		},
		curve: 'curveMonotoneX',
		color: {
			scale: {
				// Confidence: '#118dff',
				// Completion: '#e66c37',
				'Original % of Time Past': '#ffffff'
			}
		},
		comboChartTypes: [
			{
				type: 'simple-bar',
				correspondingDatasets: ['% of Task Completed']
			},
			{
				type: 'line',
				correspondingDatasets: ['Original % of Time Past'],
				options: {
					points: {
						radius: 5
					}
				}
			},
			{
				type: 'line',
				correspondingDatasets: ['Time/Comp Delta %'],
				options: {
					points: {
						radius: 5
					}
				}
			},
			{
				type: 'line',
				correspondingDatasets: ['% of Time Past'],
				options: {
					points: {
						radius: 5
					}
				}
			}
		],
		height: '400px'
	};
</script>

<div>
	{#if data.length == 0}
		<p>No Estimate Data Available For This Item.</p>
	{:else}
		<ComboChart {data} {options} />
	{/if}
</div>

<style>
	div :global(.cds--chart-holder .chart-grid-backdrop) {
		background: none;
		fill: none;
	}

	div :global(*) {
		--cds-text-primary: var(--white);
		--cds-text-secondary: var(--white);
		--cds-layer-02: var(--white);
	}

	div :global(.cds--cc--tooltip) {
		--cds-layer-02: var(--blue);
		border: solid 1px var(--white);
		border-radius: 0.5em;
	}

	div :global(.cds--cc--tooltip .content-box),
	div :global(.datapoint-tooltip) {
		--cds-text-primary: var(--white);
		--cds-text-secondary: var(--white);
		color: var(--white);
		padding: 0.5em;
	}
</style>
