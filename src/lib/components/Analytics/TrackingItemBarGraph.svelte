<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { BarChartSimple } from '@carbon/charts-svelte';
	import { page } from '$app/state';

	//Look at going back into this chart and adding scatter plot that records days until next due date.

	const sortedArray = page?.data?.trackingItems.sort(
		(a: TrackingItem, b: TrackingItem) =>
			a.priorityAssignments[0].priority < b.priorityAssignments[0].priority
	);

	const dataInputs = sortedArray.map((el: TrackingItem) => {
		return {
			group: `${el.priorityAssignments[0].priority}. ${el.name}`,
			value: el.estimates[0].completionPercentile
		};
	});

	const data = [...dataInputs];

	const options = {
		theme: 'g90',
		title: 'Completion Estimate By Item & Priority',
		resize: true,
		toolbar: { enabled: false },
		axes: {
			left: { mapsTo: 'group', scaleType: 'labels', title: 'Tracking Item Name' },
			bottom: { mapsTo: 'value', title: 'Completion (%)' }
		}
	};
</script>

<div>
	<BarChartSimple {data} {options} />
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
