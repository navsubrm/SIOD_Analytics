<script lang="ts">
	import '../../styles/form.css';
	import { enhance } from '$app/forms';
	import type { JIRAForm, JIRATicketValidations } from '../types';
	import { formatDateInputValue } from '$lib/utils/formatDateInputValue';
	import { onMount } from 'svelte';
	import { fetchJiraById } from '../utils/fetchJiraById';
	import { updateList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import MilestoneSelect from './MilestoneSelect.svelte';
	import FeatureSelect from '$lib/components/FeatureSelect.svelte';

	let { id = undefined } = $props();

	let action = $state('/?/post-new-jira-ticket');
	let processing = $state(false);
	let alerts: JIRATicketValidations = $state({});
	let formData: JIRAForm = $state({}) as JIRAForm;
	let success: boolean = $state(false);

	onMount(async () => {
		if (id) {
			action = '/?/edit-jira-ticket';
			formData = await fetchJiraById(id);
		}
	});

	$effect(() => {
		if (!id) formData = {} as JIRAForm;
	});

	$effect(() => {
		if (success && action == '/?/post-new-jira-ticket') formData = {} as JIRAForm;
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

				if (result.type == 'failure') {
					alerts = result?.data?.result as JIRATicketValidations;
					formData = result?.data?.data as JIRAForm;

					console.log('Form Data response: ', formData);
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

		<FeatureSelect editItem={formData || null} />

		<small class="error" class:active-alert={alerts?.invalidFeature}
			>Feature is Required is required.</small
		>

		<label for="details"
			>Details: <small class="error" class:active-alert={alerts?.missingDetails}
				>Include short description of the JIRA Ticket.</small
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

		<label for="opr"
			>OPR:
			<small class="error" class:active-alert={alerts?.invalidOPR}>OPR is required.</small>
		</label>
		<input type="text" name="opr" value={formData?.opr || null} />

		<MilestoneSelect editItem={formData?.milestones || null} />
		<small class="error" class:active-alert={alerts?.invalidMilestones}
			>Something is wrong with your milestone list.</small
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
