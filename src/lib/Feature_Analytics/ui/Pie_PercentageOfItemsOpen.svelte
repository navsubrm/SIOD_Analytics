<script lang="ts">
	import BlankPieChart from './Pie_BlankChart.svelte';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';

	let title = $state('Tickets by Feature/Milestone');

	let totalItems = activeList.length;

	let open = activeList.filter((el: TrackingItem) => {
		if (!el?.estimates[0] || el?.estimates[0]?.completionPercentile < 100) return el;
	}).length;

	let complete = totalItems - open;

	function calcAverage(total: number, item: number): number {
		if (item == 0) return 0;
		return (total / item) * 100;
	}

	let data = [
		{
			group: 'Open',
			value: calcAverage(totalItems, open)
		},
		{
			group: 'Complete',
			value: calcAverage(totalItems, complete)
		}
	];
</script>

<BlankPieChart {data} {title} />
