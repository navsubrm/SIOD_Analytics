<script lang="ts">
	import BlankPieChart from './BlankPieChart.svelte';

	let { trackingItems } = $props();
	let title = $state('Ahead, On Time, Behind');

	//This will need a re-write to find the item delta on newest estimate and then populate.

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
			group: 'Ahead',
			value: calcAverage(totalItems, onTime)
		},
		{
			group: 'On Time',
			value: calcAverage(totalItems, oneNew)
		},
		{
			group: 'Behind',
			value: calcAverage(totalItems, moreThanOne)
		}
	];
</script>

<BlankPieChart {data} {title} />
