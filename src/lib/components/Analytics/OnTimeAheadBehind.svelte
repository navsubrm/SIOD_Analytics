<script lang="ts">
	import BlankPieChart from './BlankPieChart.svelte';
	import { truncateToDecimalPlaces } from '$lib/HelperFunctions/truncateNumber';
	import { getDaysBetweenDates } from '$lib/HelperFunctions/getDaysBetweenDates';

	let { trackingItems } = $props();
	let title = $state('Ahead, On Time, Behind');

	let ahead = 0;
	let onTime = 0;
	let behind = 0;
	let totalItems = trackingItems.length;

	trackingItems.forEach((el: TrackingItem) => {
		if (el.estimates.length !== 0) {
			if (el.projectedEndDates.length > 1) {
				behind++;
			} else {
				const startDate = el.startDate;
				const endDate = el.projectedEndDates[0]?.date;
				const dayTotal = getDaysBetweenDates(startDate, endDate);
				const daysUsed = truncateToDecimalPlaces(
					(getDaysBetweenDates(startDate, el?.estimates[0]?.createdAt) / dayTotal) * 100
				);
				const complete = truncateToDecimalPlaces(el?.estimates[0]?.completionPercentile);
				const delta = truncateToDecimalPlaces(complete - daysUsed);
				if (delta >= -1 && delta <= 1) onTime++;
				if (delta < -1) behind++;
				if (delta > 1) ahead++;
			}
		} else {
			onTime++;
		}
	});

	function calcAverage(total: number, item: number): number {
		if (item == 0) return 0;
		return (total / item) * 100;
	}

	let data = [
		{
			group: 'Ahead',
			value: calcAverage(totalItems, ahead)
		},
		{
			group: 'On Time',
			value: calcAverage(totalItems, onTime)
		},
		{
			group: 'Behind',
			value: calcAverage(totalItems, behind)
		}
	];
</script>

<BlankPieChart {data} {title} />
