<script lang="ts">
	import { page } from '$app/state';
	import GaugeChart from '$lib/components/Analytics/GaugeChart.svelte';
</script>

<section style="display: flex;">
	{#each page?.data?.trackingItems as item}
		<GaugeChart {item} estimates={item.estimates} />
	{/each}
</section>
