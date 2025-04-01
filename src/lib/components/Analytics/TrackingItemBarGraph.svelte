<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { BarChartSimple, ComboChart } from '@carbon/charts-svelte';
	import { page } from '$app/state';

	const barData: any[] = [];
	const comboData: any[] = [];

	const dataInputs = page?.data?.trackingItems.forEach((el: TrackingItem) => {
		barData.push({ group: el.name, value: el.estimates[0].confidencePercentile });
		comboData.push({
			group: 'Confidence',
			key: el.name,
			value: el.estimates[0].confidencePercentile
		});
		comboData.push({
			group: 'Completion',
			key: el.name,
			value: el.estimates[0].completionPercentile
		});
	});

	const data = [
		...barData
		// { group: 'Qty', value: 65000 },
		// { group: 'More', value: 29123 },
		// { group: 'Sold', value: 35213 },
		// { group: 'Restocking', value: 51213 },
		// { group: 'Misc', value: 16932 }
	];

	const options = {
		theme: 'g90',
		title: 'Confidence By Tracking Item',
		height: '400px',
		toolbar: { enabled: false },
		axes: {
			left: { mapsTo: 'group', scaleType: 'labels', title: 'Tracking Item Name' },
			bottom: { mapsTo: 'value', title: 'Confidence (%)' }
		}
	};

	const comboChartOptions = {
		title: 'Confidence/Completion (Line + Scatter + Bar)',
		toolbar: { enabled: false },
		axes: {
			left: {
				mapsTo: 'value',
				title: 'Percentile Estimate (%)',
				label: {
					color: 'yellow'
				}
			},
			bottom: {
				scaleType: 'labels',
				mapsTo: 'key'
			}
			// right: {
			// 	title: 'Completion (%)',
			// 	mapsTo: 'value',
			// 	scaleType: 'linear',
			// 	correspondingDatasets: ['Confidence', 'Completion']
			// }
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
				correspondingDatasets: ['Completion']
			},
			// {
			// 	type: 'scatter',
			// 	correspondingDatasets: ['Confidence', 'Completion']
			// },
			{
				type: 'line',
				correspondingDatasets: ['Confidence']
			}
		],
		height: '400px'
	};
</script>

<div>
	<BarChartSimple {data} {options} />
	<ComboChart data={comboData} options={comboChartOptions} />
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
