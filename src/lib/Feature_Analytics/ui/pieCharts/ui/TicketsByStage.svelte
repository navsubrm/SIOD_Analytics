<script lang="ts">
	import '../../../styles/chart.css';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import BlankPieChart from './BlankChart.svelte';
	import { formatTicketByStageData } from '../utils/formatTicketData';

	let title = $state('% by Stage');
	let data: { group: string; value: number }[] = $state([]);

	$effect(() => {
		data = formatTicketByStageData($activeList);
	});
</script>

{#key data}
	<div>
		<BlankPieChart {data} {title} />
	</div>
{/key}
