<script lang="ts">
	import '../../styles/chart.css';
	import { BarChartStacked } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import type { Feature } from '$lib/Feature_Features/types';
	import { activeList } from '$lib/Feature_Milestones/utils/stores/milestoneActiveList';
	import { getDaysBetweenDates } from '$lib/Feature_Analytics/utils/getDaysBetweenDates';
	import options from './options';
	import { onMount } from 'svelte';
	import { getFeatures } from './utils/getFeatures';

	let features: Feature[] = $state([]);
	let data: { key: string; group: string; value: number }[] = $state([]);

	onMount(async () => {
		features = await getFeatures();

		features.forEach((el) => {
			let key = el.name;

			el?.releaseStages.forEach((cur) => {
				if (cur.date !== null) {
					data = [
						...data,
						{
							key,
							group: cur.stage,
							value: getDaysBetweenDates(
								new Date($activeList[0].startDate as Date),
								new Date(cur.date)
							)
						}
					];
				}
			});
		});
		options.height = `${features.length * 60}px`;
	});
</script>

<div>
	<BarChartStacked {data} {options} style="padding:2rem;" />
</div>

<style>
	@import '../../styles/chart.css';
</style>
