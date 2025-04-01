<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { GaugeChart } from '@carbon/charts-svelte';
	import { getAverageEstimates } from '$lib/HelperFunctions/getAverageOfEstimatesByItem';
	import { getPriorAverageEstimates } from '$lib/HelperFunctions/getPriorAverageOfEstimatesByItem';

	let { item, estimates } = $props();

	//console.log(`${item?.name}`, estimates);

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
		toolbar: { enabled: false },
		gauge: {
			type: 'semi',
			status: 'danger'
		}
	};

	const confOptions = { ...options, color: { scale: { value: '#118dff' } }, title: `Confidence` };
	const compOptions = { ...options, color: { scale: { value: `#1a2433` } }, title: `Completion` };
</script>

<div>
	{#if estimates.length == 0}
		<p>Insufficient Data to Calculate</p>
	{:else}
		<div class="flex-row">
			<GaugeChart data={confData} options={confOptions} />
			<GaugeChart data={compData} options={compOptions} />
		</div>
	{/if}
</div>

<style>
	.flex-row {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>
