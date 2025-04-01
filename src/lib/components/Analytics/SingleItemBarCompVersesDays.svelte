<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { ComboChart } from '@carbon/charts-svelte';
	import { getDaysBetweenDates } from '$lib/HelperFunctions/getDaysBetweenDates';
	import { truncateToDecimalPlaces } from '$lib/HelperFunctions/truncateNumber';

	let { item } = $props();

	//Get item start and current end date.
	const startDate = item.startDate;
	const endDate = item.projectedEndDates[0].date;
	const dayTotal = getDaysBetweenDates(startDate, endDate);
	const origDayTotal = getDaysBetweenDates(
		startDate,
		item.projectedEndDates[item.projectedEndDates.length - 1].date
	);

	interface BarGraphDataSet {
		group: string;
		key: string;
		value: number;
	}

	//Get total days from start for each estimate.

	const data: BarGraphDataSet[] = [];

	item?.estimates?.forEach((el: TrackingItemEstimate) => {
		const originalDaysUsed = truncateToDecimalPlaces(
			(getDaysBetweenDates(startDate, el.createdAt) / origDayTotal) * 100,
			2
		);
		const daysUsed = truncateToDecimalPlaces(
			(getDaysBetweenDates(startDate, el.createdAt) / dayTotal) * 100,
			2
		);
		const complete = truncateToDecimalPlaces(el.completionPercentile, 2);
		const delta = truncateToDecimalPlaces(complete - daysUsed, 2);

		data.push({
			group: 'Timeline %',
			key: new Date(el.createdAt).toLocaleDateString(),
			value: daysUsed
		});
		data.push({
			group: 'Work %',
			key: new Date(el.createdAt).toLocaleDateString(),
			value: complete
		});
		data.push({
			group: 'Original Timeline %',
			key: new Date(el.createdAt).toLocaleDateString(),
			value: originalDaysUsed
		});
		data.push({
			group: 'Time/Completion Delta %',
			key: new Date(el.createdAt).toLocaleDateString(),
			delta: delta
		});
	});

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
				correspondingDatasets: ['Time/Completion Delta %']
			}
		},
		curve: 'curveMonotoneX',
		color: {
			scale: {
				Confidence: '#118dff',
				Completion: '#e66c37'
			}
		},
		comboChartTypes: [
			{
				type: 'simple-bar',
				correspondingDatasets: ['Work %']
			},
			{
				type: 'line',
				correspondingDatasets: ['Original Timeline %'],
				options: {
					points: {
						radius: 5
					}
				}
			},
			{
				type: 'line',
				correspondingDatasets: ['Time/Completion Delta %'],
				options: {
					points: {
						radius: 5
					}
				}
			},
			{
				type: 'line',
				correspondingDatasets: ['Timeline %'],
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
	<ComboChart {data} {options} />
</div>

<style>
	div :global(.cds--chart-holder .chart-grid-backdrop) {
		background: none;
		fill: none;
	}

	div :global(*) {
		--cds-text-primary: white;
		--cds-text-secondary: white;
		--cds-layer-02: white;
	}
</style>
