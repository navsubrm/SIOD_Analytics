<script lang="ts">
	import AnalyticsBoard from '$lib/IconComponents/AnalyticsBoard.svelte';
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

	/* .analytics {
		position: absolute;
		inset: 0;
		display: flex;
		opacity: 0;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		border: solid 1px var(--gold);
		border-radius: 0.5em;
		padding: 1.5em;
		overflow-y: scroll;
		background: color-mix(in lab, var(--blue), transparent 10%);
		color: var(--white);
		pointer-events: none;
		z-index: 10000000;
		transition:
			opacity 0.75s,
			display 0.75s 0.75s allow-discrete;
	}

	.full-view {
		opacity: 1;
		pointer-events: all;
	} */

	.analytics {
		/* display: none; */
		position: fixed;
		/* inset: 0;
		margin: auto; */
		/* width: 100%;
		max-width: 500px; */
		padding: 1em;
		background: var(--blue);
		color: var(--white);
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		opacity: 0;
		/* transition:
			opacity 0.5s,
			display 0 0.5s allow-discrete;

		@starting-style {
			opacity: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		} */
	}

	.analytics:popover-open {
		position: fixed;
		inset: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 1;
		transform: translateY(0);
		transition: all 0.5s allow-discrete;

		@starting-style {
			transform: translateY(20%);
			opacity: 0;
		}
	}

	[popover]::backdrop {
		background: color-mix(in lab, var(--blue), transparent 70%);
	}

	.close-icon {
		position: relative;
		background: none;
		height: 100%;
		width: 100%;
	}

	.close-icon button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
	}
</style>
