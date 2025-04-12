<script lang="ts">
	import Select from 'svelte-select';
	import { page } from '$app/state';
	import FormStyles from '$lib/components/FormStyles.svelte';

	let reasonParent = $state(null);

	const items = page?.data?.reasonForUpdate.map((el: TrackingEvent) => {
		return { label: el.name, value: el._id };
	});
</script>

<FormStyles Children={ReasonForUpdateForm} />

{#snippet ReasonForUpdateForm()}
	<form method="POST" action="?/reason-for-update">
		<h3>Reason For Update Entries:</h3>
		<label for="name">Name: </label>
		<input type="text" name="name" />

		<label for="event-start">Event Start: </label>
		<input type="date" name="event-start" />

		<label for="event-end">Event End: </label>
		<input type="date" name="event-end" />

		<div>
			<input type="checkbox" name="parent" bind:checked={reasonParent} />
			<label for="parent">Is this a sub-Event (e.g. a sprint within a planning increment)?</label>
		</div>

		{#if reasonParent}
			<div class="select-style">
				<Select showChevron {items} name="associated-event-id" />
			</div>
		{/if}

		<input type="submit" />
	</form>
{/snippet}
