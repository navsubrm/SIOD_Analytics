<script lang="ts">
	import { goto } from '$app/navigation';
	import TrackingItemBarGraph from '$lib/components/Analytics/TrackingItemBarGraph.svelte';

	function returnHome() {
		goto('/');
	}
</script>

<section style="display: flex;">
	<button onclick={returnHome}>Return</button>
	<div class="horizontal-chart">
		<h3>Tracking by Item:</h3>
		<TrackingItemBarGraph />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		background: var(--blue);
	}
	.horizontal-chart {
		width: 100%;
		max-width: 800px;
	}
</style>
