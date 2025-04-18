<script lang="ts">
	import { calcAverage } from '../../PieTicketsByStage/utils/calcAverage';
	import BlankPieChart from './BlankChart.svelte';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

	let totalItems = $activeList.length;

	let title = $state(`% Open of ${totalItems}`);

	let open = $activeList.filter((el: JIRATicket) => {
		if (!el?.releaseStages[el?.releaseStages.length - 1]?.date) return el;
	}).length;

	let complete = totalItems - open;

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
