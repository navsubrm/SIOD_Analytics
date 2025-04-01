<script lang="ts">
	import Select from 'svelte-select';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import SingleItemBarCompVersesDays from '$lib/components/Analytics/SingleItemBarCompVersesDays.svelte';
	import FormStyles from '$lib/components/forms/FormStyles.svelte';

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

<section style="display: flex;">
	<button class="btn" onclick={returnHome}>Return Home</button>
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
	.time-completion-comparison {
		width: 100%;
		max-width: 600px;
	}

	.time-completion-comparison h3 {
		text-align: center;
	}

	label,
	button {
		color: var(--white);
	}

	button {
		position: fixed;
		top: 10px;
		right: 10px;
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
