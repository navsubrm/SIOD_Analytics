<script lang="ts">
	import { page } from '$app/state';
	import FormStyles from '../FormStyles.svelte';
	import Select from 'svelte-select';

	let { item, rotate } = $props();

	const items = page?.data?.reasonForUpdate.map((el: TrackingEvent) => {
		return { value: el._id, label: el.name };
	});
</script>

<FormStyles Children={CreateEstimateForm} />
{#snippet CreateEstimateForm()}
	<form method="POST" action="?/add-estimate-data" class="form-main">
		<input type="hidden" name="tracking-item-id" value={item._id} />
		<label for="event-id">Associated Start Event: </label>
		<span class="select-style">
			<Select {items} showChevron name="event-id" />
		</span>

		<label for="comp-percentile">Completion Percent Value: </label>
		<input type="number" name="comp-percentile" min="0" max="100" />

		<input type="submit" value="Add Est." />
		<input type="button" onclick={rotate} value="Return" />
	</form>
{/snippet}

<style>
	.form-main {
		border-radius: 0 0 0.5em 0.5em;
		height: 100%;
	}

	.form-main input {
		font-size: 1em;
	}

	.form-main {
		--chevron-color: var(--blue);
		--chevron-background: var(--blue);
		--chevron-height: 15px;
	}
</style>
