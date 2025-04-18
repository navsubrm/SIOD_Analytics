<script lang="ts">
	import { calcAverage } from '../../PieTicketsByStage/utils/calcAverage';
	import BlankPieChart from './BlankChart.svelte';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

	let totalItems = $activeList.length;

	let title = $state(`% missed Projected Release of ${totalItems}`);

	let open = $activeList.filter((el: JIRATicket) => {
		if (
			new Date(el?.releaseStages[el?.releaseStages.length - 1]?.date) >
			new Date(el?.plannedReleaseDate)
		)
			return el;
	}).length;

	let complete = totalItems - open;

	let data = [
		{
			group: 'Overdue',
			value: calcAverage(totalItems, open)
		},
		{
			group: 'On Time',
			value: calcAverage(totalItems, complete)
		}
	];
</script>

<BlankPieChart {data} {title} />
