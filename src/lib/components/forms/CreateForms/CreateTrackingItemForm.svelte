<script lang="ts">
	import { page } from '$app/state';
	import { coreCapability } from '$lib/stores/coreCapability';
	import Select from 'svelte-select';
	import FormStyles from '../FormStyles.svelte';

	let { actionUrl = '?/add-tracking-item', editItem = {}, Action = undefined } = $props();

	console.log(editItem);

	let itemParent = $state(editItem?.parentId || null);

	const reasonItems = page?.data?.reasonForUpdate.map((el: TrackingEvent) => {
		return { label: el.name, value: el._id };
	});

	const trackingItemOptions = page?.data?.trackingItems.map((el: TrackingItem) => {
		return { label: el.name, value: el._id };
	});
</script>

<FormStyles Children={CreateTrackingItemForm} />

{#snippet CreateTrackingItemForm()}
	<form method="POST" action={actionUrl}>
		<h3>Tracking Items:</h3>
		<label for="name">Name: </label>
		<input name="name" type="text" value={editItem?.name || null} />

		<label for="initial-reason">Associated Start Event: </label>

		<div class="select-style">
			<Select
				showChevron
				items={reasonItems}
				name="initial-reason"
				value={editItem?.initialReason || null}
			/>
		</div>

		<label for="core-capability">Associated Core Capability: </label>

		<div class="select-style">
			<Select
				showChevron
				items={$coreCapability}
				name="core-capability"
				value={editItem?.coreCapability || null}
			/>
		</div>

		<label for="priority"
			>Priority:
			{#if editItem?.priorityAssignments?.length > 0}
				<span class="error">Priority isn't edited. Assign a new priority with edit.</span>
			{/if}
		</label>
		<input type="number" name="priority" min="1" max="1000" />

		<div>
			<input type="checkbox" name="parent" bind:checked={itemParent} />
			<label for="parent">Is this a sub-item to another item? </label>
		</div>

		{#if itemParent}
			<div class="select-style">
				<Select
					showChevron
					items={trackingItemOptions}
					name="parent-id"
					value={editItem?.parentId || null}
				/>
			</div>
		{/if}

		<input type="submit" />
		{#if Action !== undefined}
			{@render Action()}
		{/if}
	</form>
{/snippet}

<style>
	.error {
		color: red;
	}
</style>
