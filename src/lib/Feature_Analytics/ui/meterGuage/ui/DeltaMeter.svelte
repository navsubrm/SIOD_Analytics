<script lang="ts">
	import '../../../styles/chart.css';
	import { GaugeChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import options from '../utils/options';
	import { activeList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import { getPlannedVsCompleteDelta } from '../../valueCalculations/utils/getPlannedVsCompleteDelta';

	let data = $state([{ group: 'delta', value: 0 }]);

	function formatData(value: number) {
		return [{ group: 'delta', value }];
	}

	$effect(() => {
		let delta = getPlannedVsCompleteDelta($activeList);
		data = formatData(delta);
	});
</script>

<GaugeChart {data} {options} style="padding:2rem; background: white;" />
