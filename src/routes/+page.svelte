<script lang="ts">
	import '$lib/styles/form.css';
	import { activeList as jiraTicketActiveList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import { activeList as milestoneActiveList } from '$lib/Feature_Milestones/utils/stores/milestoneActiveList';
	import { activeList as featuresActiveList } from '$lib/Feature_Features/utils/stores/activeList';
	import type { Feature } from '$lib/Feature_Features/types.js';
	import type { JIRATicket } from '$lib/Feature_JiraTickets/types.js';

	//Section One
	import DisplayFeatureTableButton from '$lib/Feature_Features/ui/DisplayTableButton.svelte';
	import DisplayMilestoneTableButton from '$lib/Feature_Milestones/ui/DisplayMilestoneTableButton.svelte';
	import DisplayJIRATableButton from '$lib/Feature_JiraTickets/ui/DisplayTableButton.svelte';

	//Section two
	import AverageDelta from '$lib/Feature_Analytics/ui/valueCalculations/ui/AverageDelta.svelte';
	import DaysToNextMilestone from '$lib/Feature_Analytics/ui/valueCalculations/ui/DaysToNextMilestone.svelte';
	import TicketsByStage from '$lib/Feature_Analytics/ui/pieCharts/ui/TicketsByStage.svelte';
	import HorizontalStackedBarChart from '$lib/Feature_Analytics/ui/horizontalStackedBarChart/HorizontalStackedBarChart.svelte';
	import ComboBarMilestoneVsTime from '$lib/Feature_Analytics/ui/ComboBarMilestoneVsTime/ComboBarMilestoneVsTime.svelte';
	import PercentageOfItemsOpen from '$lib/Feature_Analytics/ui/pieCharts/ui/PercentageOfItemsOpen.svelte';
	import PercentageOverdue from '$lib/Feature_Analytics/ui/pieCharts/ui/PercentageOverdue.svelte';
	import DeltaMeter from '$lib/Feature_Analytics/ui/meterGuage/ui/DeltaMeter.svelte';

	let { data } = $props();

	$effect(() => {
		if (data?.jiraTickets) jiraTicketActiveList.set(data.jiraTickets as JIRATicket[]);
		if (data?.milestones) milestoneActiveList.set(data?.milestones);
		if (data?.features) featuresActiveList.set(data?.features as Feature[]);
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
			<!-- <DeltaMeter /> -->
			<div class="details milestone">
				<h4>Next Milestone:</h4>
				<DaysToNextMilestone />
			</div>
			<div class="details milestone-count">
				<h4># of Milestones:</h4>
				<p>{$milestoneActiveList.length}</p>
			</div>
			<div class="details feature-count">
				<h4># of Features:</h4>
				<p>{$featuresActiveList.length}</p>
			</div>
			<div class="details ticket-count">
				<h4># of Tickets:</h4>
				<p>{$jiraTicketActiveList.length}</p>
			</div>
			<div class="details delta-calc">
				<h4>Average Delta:</h4>
				<p><AverageDelta /></p>
			</div>
			<!-- <button class="btn" onclick={returnHome}>Return Home</button> -->
		</div>
	</header>

	<div class="grid-container">
		<div class="time-completion-comparison">
			<ComboBarMilestoneVsTime />
		</div>

		<div class="item-completion-byPriority">
			<HorizontalStackedBarChart />
			<!-- <CompletionByItemPriority trackingItemList={page?.data?.trackingItems} /> -->
		</div>
		{#key $jiraTicketActiveList}
			<div class="percent-revised-end">
				<PercentageOverdue />
			</div>

			<div class="percent-items-open">
				<PercentageOfItemsOpen />
			</div>

			<div class="percent-behind-on-ahead">
				<TicketsByStage />
			</div>
		{/key}
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

	.milestone-count {
		border-left: solid 3px var(--gold);
	}

	.feature-count {
		border-left: solid 3px var(--white);
	}

	.ticket-count {
		border-left: solid 3px #6929c4;
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

	/* .time-completion-comparison h3 {
		text-align: center;
	} */

	.percent-revised-end,
	.percent-items-open,
	.percent-behind-on-ahead {
		/* height: min-content;
		width: min-content; */
		width: 300px;
		height: 350px;
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

	/* label,
	button {
		color: var(--white);
	} */

	.grid-container {
		position: relative;
	}

	/* button {
		padding-block: 1em;
		padding-inline: 1.5em;
		background: color-mix(in lab, var(--white), transparent 30%);
		border-radius: 0.5em;
		border: solid 2px color-mix(in lab, var(--blue), transparent 90%);
		box-shadow: 5px 5px 3px color-mix(in lab, var(--blue), transparent 95%);
	}

	.select-style {
		color: var(--white);
	} */
</style>
