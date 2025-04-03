<script lang="ts">
	import Select from 'svelte-select';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import SingleItemBarCompVersesDays from '$lib/components/Analytics/SingleItemBarCompVersesDays.svelte';
	import FormStyles from '$lib/components/forms/FormStyles.svelte';
	import PercentageOfItemsWAdjustedEnd from '$lib/components/Analytics/PercentageOfItemsWAdjustedEnd.svelte';
	import PercentageOfItemsOpen from '$lib/components/Analytics/PercentageOfItemsOpen.svelte';
	import OnTimeAheadBehind from '$lib/components/Analytics/OnTimeAheadBehind.svelte';
	import TrackingItemBarGraph from '$lib/components/Analytics/TrackingItemBarGraph.svelte';

	let item = $state(page?.data?.trackingItems[0]);

	let items = page?.data?.trackingItems.map((el: TrackingItem) => {
		return { value: el._id, label: el.name };
	});

	interface SelectEvent {
		detail: { value: any };
	}

	function selectItemToDisplay(e: SelectEvent) {
		item = page?.data?.trackingItems.find((el: TrackingItem) => el?._id == e?.detail?.value);
	}

	function returnHome() {
		goto('/');
	}
</script>

<section>
	<header class="flex-row">
		<div>
			<h3>EM&C Dashboard</h3>
		</div>
		<div class="flex-row">
			<div class="details milestone">
				<h4>Next Milestone:</h4>
				<p>123 Days</p>
			</div>
			<div class="details delta-calc">
				<h4>Average Delta:</h4>
				<p>-2.5%</p>
			</div>
			<button class="btn" onclick={returnHome}>Return Home</button>
		</div>
	</header>

	<div class="grid-container">
		<div class="time-completion-comparison">
			<FormStyles Children={TrackingItemSelect} />
			{#snippet TrackingItemSelect()}
				<div class="select-style">
					<label for="select-tracking-item">Select Tracking Item to View: </label>
					<Select {items} on:change={selectItemToDisplay} />
				</div>
			{/snippet}
			<div class="horizontal-chart">
				<h3>Displaying Completion vs. Timeline for: {item.name}</h3>
				{#key item}
					<SingleItemBarCompVersesDays {item} />
				{/key}
			</div>
		</div>

		<div class="item-completion-byPriority">
			<TrackingItemBarGraph />
		</div>

		<div class="percent-revised-end">
			<PercentageOfItemsWAdjustedEnd trackingItems={page?.data?.trackingItems} />
		</div>

		<div class="percent-items-open">
			<PercentageOfItemsOpen trackingItems={page?.data?.trackingItems} />
		</div>

		<div class="percent-behind-on-ahead">
			<OnTimeAheadBehind trackingItems={page?.data?.trackingItems} />
		</div>
	</div>
</section>

<style>
	section {
		background-color: var(--blue);
		min-height: 100vh;
	}

	.flex-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
	}

	header {
		padding: 0.5em;
	}

	.details {
		color: var(--white);
		border-bottom: solid 1px var(--white);
		padding-inline: 0.5em;
		padding-top: 0.5em;
		margin-block: 0.5em;
	}

	.details h4 {
		color: var(--white);
	}

	.milestone,
	.delta-calc {
		text-align: right;
	}

	.milestone {
		border-left: solid 3px var(--orange);
	}

	.delta-calc {
		border-left: solid 3px var(--gold);
	}

	.grid-container {
		padding-top: 10vh;
		display: grid;
		grid-template-areas:
			'itemCalc itemCalc percentRevisedEnd'
			'itemCalc itemCalc percentRevisedEnd'
			'itemCalc itemCalc openItemPercentage'
			'itemCompPri itemCompPri openItemPercentage'
			'itemCompPri itemCompPri percentBehindOnAhead'
			'itemCompPri itemCompPri percentBehindOnAhead';
		gap: 1em;
		padding: 1em;
		max-width: 100vw;
	}

	.percent-revised-end,
	.percent-items-open,
	.percent-behind-on-ahead,
	.time-completion-comparison,
	.item-completion-byPriority {
		color: var(--white);
		border: solid 1px var(--gold);
		padding: 1em;
		border-radius: 0.5em;
		box-shadow: 3px 3px 7px var(--white);
	}

	.time-completion-comparison,
	.item-completion-byPriority {
		max-width: calc(100vw - 350px);
	}

	.time-completion-comparison {
		grid-area: itemCalc;
		overflow-x: auto;
	}

	.item-completion-byPriority {
		grid-area: itemCompPri;
		overflow-y: auto;
	}

	.time-completion-comparison h3 {
		text-align: center;
	}

	.percent-revised-end,
	.percent-items-open,
	.percent-behind-on-ahead {
		height: min-content;
		width: min-content;
		max-width: 300px;
	}

	.percent-revised-end {
		grid-area: percentRevisedEnd;
	}

	.percent-items-open {
		grid-area: openItemPercentage;
	}

	.percent-behind-on-ahead {
		grid-area: percentBehindOnAhead;
	}

	label,
	button {
		color: var(--white);
	}

	.grid-container {
		position: relative;
	}

	button {
		padding-block: 1em;
		padding-inline: 1.5em;
		background: color-mix(in lab, var(--white), transparent 30%);
		border-radius: 0.5em;
		border: solid 2px color-mix(in lab, var(--blue), transparent 90%);
		box-shadow: 5px 5px 3px color-mix(in lab, var(--blue), transparent 95%);
	}

	.select-style {
		color: var(--white);
	}
</style>
