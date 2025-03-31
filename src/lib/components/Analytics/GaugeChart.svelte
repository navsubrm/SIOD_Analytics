<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { GaugeChart } from '@carbon/charts-svelte';
	import { getAverageEstimates } from '$lib/HelperFunctions/getAverageOfEstimatesByItem';
	import { getPriorAverageEstimates } from '$lib/HelperFunctions/getPriorAverageOfEstimatesByItem';

	let { item, estimates } = $props();

	console.log(`${item.name}`, estimates);

	function calculateGaugeData(estimates: TrackingItemEstimate[]) {
		const [confidenceAvg, completionAvg] = getAverageEstimates(estimates);
		const [priorConfAvg, priorCompAvg] = getPriorAverageEstimates(estimates);
		const confDelta = Number(confidenceAvg) - Number(priorConfAvg);
		const compDelta = Number(completionAvg) - Number(priorCompAvg);

		return {
			confidenceAvg,
			completionAvg,
			confDelta,
			compDelta
		};
	}

	const { confidenceAvg, completionAvg, confDelta, compDelta } = calculateGaugeData(estimates);

	const confData = [
		{ group: 'value', value: confidenceAvg },
		{ group: 'delta', value: confDelta }
	];

	const compData = [
		{ group: 'value', value: completionAvg },
		{ group: 'delta', value: compDelta }
	];

	const options = {
		resizable: true,
		height: '150px',
		gauge: {
			type: 'semi',
			status: 'danger'
		}
	};

	const confOptions = { ...options, title: `Confidence` };
	const compOptions = { ...options, title: `Completion` };
</script>

<div>
	<h4>{item.name}</h4>
	{#if estimates.length == 0}
		<p>Insufficient Data to Calculate</p>
	{:else}
		<GaugeChart data={confData} options={confOptions} />
		<GaugeChart data={compData} options={compOptions} />
	{/if}
</div>
