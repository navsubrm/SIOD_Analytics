<script lang="ts">
	import '$lib/styles/form.css';
	import { activeList as jiraTicketActiveList } from '$lib/Feature_JiraTickets/utils/stores/activeList.js';
	import FormStyles from '$lib/components/FormStyles.svelte';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types.js';

	//Section One
	import DisplayFeatureTableButton from '$lib/Feature_Features/ui/DisplayTableButton.svelte';
	import DisplayMilestoneTableButton from '$lib/Feature_Milestones/ui/DisplayMilestoneTableButton.svelte';
	import DisplayJIRATableButton from '$lib/Feature_JiraTickets/ui/DisplayTableButton.svelte';

	//Section two
	import DaysToNextMilestone from '$lib/Feature_Analytics/ui/Value_DaysToNextMilestone.svelte';
	import PieTicketsByStage from '$lib/Feature_Analytics/ui/PieTicketsByStage/Pie_TicketsByStage.svelte';
	import HorizontalStackedBarChart from '$lib/Feature_Analytics/ui/horizontalStackedBarChart/HorizontalStackedBarChart.svelte';

	let { data } = $props();

	$effect(() => {
		if (data?.jiraTickets) jiraTicketActiveList.set(data.jiraTickets as JIRATicket[]);
	});
</script>

<svelte:head>
	<title>SIOD EM&C Analysis</title>
</svelte:head>

<section class="header-main">
	<span>
		<DisplayMilestoneTableButton />
	</span>
	<div>
		<DisplayFeatureTableButton />
	</div>
	<div>
		<DisplayJIRATableButton />
	</div>
</section>

<section class="analytics-section">
	<header class="flex-row">
		<div>
			<h3>EM&C Dashboard</h3>
		</div>
		<div class="flex-row">
			<div class="details milestone">
				<h4>Next Milestone:</h4>
				<DaysToNextMilestone milestones={data?.milestones} />
			</div>
			<div class="details delta-calc">
				<h4>Average Delta:</h4>
				<!-- <p><AverageDelta trackingItemList={page?.data?.jiraTickets} /></p> -->
			</div>
			<!-- <button class="btn" onclick={returnHome}>Return Home</button> -->
		</div>
	</header>

	<div class="grid-container">
		<div class="time-completion-comparison">
			<FormStyles Children={TrackingItemSelect} />
			{#snippet TrackingItemSelect()}
				<div class="select-style">
					<label for="select-tracking-item">Select Tracking Item to View: </label>
					<!-- <Select {items} on:change={selectItemToDisplay} /> -->
				</div>
			{/snippet}
			<div class="horizontal-chart">
				<HorizontalStackedBarChart />
				<!-- <h3>Displaying Completion vs. Timeline for: {item.name}</h3> -->
				<!-- {#key item}
					<SingleItemBarCompVersesDays {item} />
				{/key} -->
			</div>
		</div>

		<div class="item-completion-byPriority">
			<!-- <CompletionByItemPriority trackingItemList={page?.data?.trackingItems} /> -->
		</div>

		<div class="percent-revised-end">
			<!-- <PercentageOfItemsWAdjustedEnd trackingItemList={page?.data?.trackingItems} /> -->
		</div>

		<div class="percent-items-open">
			<!-- <PercentageOfItemsOpen trackingItemList={page?.data?.trackingItems} /> -->
		</div>

		<div class="percent-behind-on-ahead">
			<PieTicketsByStage />
		</div>
	</div>
</section>

<style>
	.header-main {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 20px;
		padding: 0.5em;
		height: 5vh;
		background: color-mix(in lab, var(--white), var(--blue) 20%);
		width: 100%;
	}

	.header-main :global(button) {
		color: var(--blue);
		font-size: 0.9em;
	}

	.analytics-section {
		background-color: var(--blue);
		min-height: 95vh;
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
		width: max-content;
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
