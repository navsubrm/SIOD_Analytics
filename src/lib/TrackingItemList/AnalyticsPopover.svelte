<script lang="ts">
	import AnalyticsBoard from '$lib/IconComponents/AnalyticsBoard.svelte';
	//import ConfCompGaugePair from '$lib/components/Analytics/ConfCompGaugePair.svelte';
	import Close from '$lib/IconComponents/Close.svelte';
	import { getDaysBetweenDates } from '$lib/HelperFunctions/getDaysBetweenDates';
	import SingleItemBarCompVersesDays from '$lib/components/Analytics/SingleItemBarCompVersesDays.svelte';

	let analyticsPopover: HTMLElement | undefined = $state();
	let { item } = $props();

	function showPopover() {
		analyticsPopover?.showPopover();
	}

	function closePopover() {
		analyticsPopover?.hidePopover();
		//Remove the edit and id search params and close the popover
	}
</script>

<div class="edit">
	<button onclick={showPopover} title="View Stats"><AnalyticsBoard /></button>
</div>

<div class="analytics" popover bind:this={analyticsPopover}>
	<div class="close-icon">
		<button onclick={closePopover}>
			<Close --_height="30px" />
		</button>
	</div>
	{#if item?.name}
		<h3>{item?.name}</h3>
		<p>
			Days Tracked: {getDaysBetweenDates(new Date(item?.startDate), new Date())} day{getDaysBetweenDates(
				new Date(item.startDate),
				new Date()
			) > 1
				? 's'
				: ''}.
		</p>
		<SingleItemBarCompVersesDays {item} />
		<!-- <p>Number of tracked entries: {item.estimates.length}</p> -->
		<!-- <ConfCompGaugePair {item} estimates={item?.estimates || []} /> -->
	{/if}
</div>

<style>
	h3 {
		text-align: center;
		padding-bottom: 0.5em;
	}

	button {
		--_fill: var(--orange);
		--_height: 20px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		stroke: var(--white);
	}

	.analytics {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 100%;
		max-width: 500px;
		padding: 1em;
		background: var(--blue);
		color: var(--white);
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
	}

	.analytics:popover-open {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}

	.close-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
	}

	.close-icon button {
		background: none;
		border: none;
	}
</style>
