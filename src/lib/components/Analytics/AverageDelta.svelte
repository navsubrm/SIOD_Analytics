<script lang="ts">
	import { getDaysBetweenDates } from '$lib/HelperFunctions/getDaysBetweenDates';
	import { truncateToDecimalPlaces } from '$lib/HelperFunctions/truncateNumber';

	let { trackingItems } = $props();

	let listLength = trackingItems.length;

	let deltaSum = $state(0);

	trackingItems.forEach((el: TrackingItem) => {
		if (el.estimates.length !== 0) {
			const startDate = el.startDate;
			const endDate = el.projectedEndDates[0]?.date;
			const dayTotal = getDaysBetweenDates(startDate, endDate);
			const daysUsed = truncateToDecimalPlaces(
				(getDaysBetweenDates(startDate, el?.estimates[0]?.createdAt) / dayTotal) * 100
			);
			const complete = truncateToDecimalPlaces(el?.estimates[0]?.completionPercentile);
			const delta = truncateToDecimalPlaces(complete - daysUsed);
			deltaSum += delta;
		}
	});
</script>

{truncateToDecimalPlaces(listLength / deltaSum)}%
