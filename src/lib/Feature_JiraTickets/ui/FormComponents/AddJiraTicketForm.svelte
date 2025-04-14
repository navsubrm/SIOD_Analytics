<script lang="ts">
	import FormStyles from '$lib/components/FormStyles.svelte';
	import { formatDateInputValue } from '$lib/utils/formatDateInputValue';
	import MilestoneSelect from '$lib/Feature_Milestones/ui/MilestoneSelect.svelte';
	import JIRATicketSelect from '$lib/components/JIRATicketSelect.svelte';
	import CoreCapabilitySelect from '$lib/components/CoreCapabilitySelect.svelte';

	let { actionUrl = '?/add-tracking-item', editItem = {}, Action = undefined } = $props();

	let itemParent = $state(editItem?.parentId || null);
</script>

<FormStyles Children={CreateTrackingItemForm} />

{#snippet CreateTrackingItemForm()}
	<form method="POST" action={actionUrl}>
		<h3>Tracking Items:</h3>
		<label for="name">Name: </label>
		<input name="name" type="text" value={editItem?.name || null} required />

		{#if editItem?._id}
			<input type="hidden" name="id" value={editItem?._id} />
		{/if}

		<CoreCapabilitySelect {editItem} />

		<label for="details">Details: </label>
		<textarea
			name="details"
			value={editItem?.details || null}
			placeholder={'Enter necessary details.'}
		></textarea>

		{#if !editItem?._id}
			<label for="priority"
				>Priority:
				{#if editItem?.priorityAssignments?.length > 0}
					<span class="error">Priority isn't edited. Assign a new priority with edit.</span>
				{/if}
			</label>
			<input type="number" name="priority" min="1" max="1000" required />
		{/if}

		<label for="start-date">Start Date: </label>
		<input
			type="date"
			name="start-date"
			value={formatDateInputValue(editItem.startDate)}
			required
		/>

		{#if !Object.hasOwn(editItem, 'projectedEndDates')}
			<label for="projected-end-date">Projected End Date: </label>
			<input type="date" name="projected-end-date" required />
		{/if}

		{#if !editItem?._id}
			<MilestoneSelect {editItem} />
		{/if}

		<div>
			<input type="checkbox" name="parent" bind:checked={itemParent} />
			<label for="parent">Is this a sub-item to another item? </label>
		</div>

		{#if itemParent || editItem.parentId}
			<JIRATicketSelect {editItem} />
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
