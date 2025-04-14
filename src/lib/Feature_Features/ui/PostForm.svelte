<script lang="ts">
	import '../../styles/form.css';
	import { enhance } from '$app/forms';
	import type { Feature, FeatureValidations } from '../types';
	import { formatDateInputValue } from '$lib/utils/formatDateInputValue';
	import { onMount } from 'svelte';
	import { fetchFeature } from '../utils/fetchFeature';
	import { updateList } from '$lib/Feature_Features/utils/stores/activeList';
	import CoreCapabilitySelect from '$lib/components/CoreCapabilitySelect.svelte';
	import JiraTicketSelect from '$lib/components/JIRATicketSelect.svelte';

	let { id = undefined } = $props();

	let action = $state('/?/post-new-feature');
	let processing = $state(false);
	let alerts: FeatureValidations = $state({});
	let formData: Feature = $state({});
	let success: boolean = $state(false);

	onMount(async () => {
		if (id) {
			action = '/?/edit-feature';
			formData = await fetchFeature(id);
		}
	});

	$effect(() => {
		if (!id) formData = {};
	});

	$effect(() => {
		if (success && action == '/?/post-new-feature') formData = {};
	});
</script>

<span class="basic-form">
	<form
		method="POST"
		{action}
		use:enhance={({}) => {
			processing = true;

			return async ({ result }) => {
				processing = false;
				console.log(result);
				if (result.type == 'failure') {
					alerts = result?.data?.result as FeatureValidations;
					formData = result?.data?.data as Feature;
				}
				if (result.type == 'success') {
					success = true;
					updateList.set(true);
				}
			};
		}}
	>
		{#if id}
			<input type="hidden" name="id" value={id || null} />
		{/if}
		<label for="name"
			>Name:
			<small class="error" class:active-alert={alerts?.missingName}>Name is required.</small>
		</label>
		<input type="text" name="name" value={formData?.name || null} />

		<label for="details"
			>Details: <small class="error" class:active-alert={alerts?.missingDetails}
				>Include short description of the Milestone.</small
			></label
		>
		<textarea name="details" value={formData?.details || null}></textarea>

		<label for="startDate"
			>StartDate:
			<small class="error" class:active-alert={alerts?.invalidStartDate}
				>Start Date is required.</small
			>
		</label>
		<input type="date" name="startDate" value={formatDateInputValue(formData?.startDate) || null} />

		<label for="priority"
			>Priority: <small class="error" class:active-alert={alerts?.missingPriority}
				>Priority is required.</small
			></label
		>
		<input type="number" name="priority" value={formData?.priority || null} />

		<label for="plannedReleaseDate"
			>Planned Release Date:
			<small class="error" class:active-alert={alerts?.invalidPlannedReleaseDate}
				>Planned release date is required.</small
			>
		</label>
		<input
			type="date"
			name="plannedReleaseDate"
			value={formatDateInputValue(formData?.plannedReleaseDate) || null}
		/>

		<CoreCapabilitySelect editItem={formData || null} />
		<small class="error" class:active-alert={alerts?.invalidCoreCapability}
			>Core capability is required.</small
		>

		<JiraTicketSelect editItem={formData || null} />
		<small class="error" class:active-alert={alerts?.invalidAssociatedJiraTickets}
			>Something was wrong with your JIRA Ticket Selections.</small
		>

		<small class="error" class:active-alert={alerts?.dbFail}
			>Something went wrong with the update.</small
		>
		<small class="success" class:active-alert={success}>Item saved successfully.</small>
		<input class:processing type="submit" value={processing ? 'Processing...' : 'Submit'} />
	</form>
</span>

<style>
	.basic-form {
		--_form-min-width: 600px;
		--_form-max-width: 600px;
		width: 100%;
		text-align: left;
	}
</style>
