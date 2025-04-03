<script lang="ts">
	import BlankPieChart from './BlankPieChart.svelte';

	let { trackingItems } = $props();
	let title = $state('On Time Failure Rate');

	let onTime = 0;
	let oneNew = 0;
	let moreThanOne = 0;
	let totalItems = trackingItems.length;

	trackingItems.forEach((el: TrackingItem) => {
		if (el.projectedEndDates.length == 1) onTime++;
		if (el.projectedEndDates.length == 2) oneNew++;
		if (el.projectedEndDates.length > 2) moreThanOne++;
	});

	function calcAverage(total: number, item: number): number {
		if (item == 0) return 0;
		return (total / item) * 100;
	}

	let data = [
		{
			group: 'On Time',
			value: calcAverage(totalItems, onTime)
		},
		{
			group: 'One Adjustment',
			value: calcAverage(totalItems, oneNew)
		},
		{
			group: '> than One',
			value: calcAverage(totalItems, moreThanOne)
		}
	];
</script>

<BlankPieChart {data} {title} />
