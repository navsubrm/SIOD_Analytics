<script lang="ts">
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import BlankPieChart from '../Pie_BlankChart.svelte';
	import { formatTicketByStageData } from './utils/formatTicketData';

	let title = $state('% by Stage');
	let data: { group: string; value: number }[] = $state([]);

	$effect(() => {
		data = formatTicketByStageData($activeList);
	});
</script>

<div>
	<BlankPieChart {data} {title} />
</div>

<style>
	@import '../../styles/chart.css';
</style>
