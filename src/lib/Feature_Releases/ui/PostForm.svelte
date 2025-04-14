<script lang="ts">
	import { enhance } from '$app/forms';
	import FormStyles from '$lib/components/FormStyles.svelte';
	import { formatDateInputValue } from '$lib/utils/formatDateInputValue';
	import { updateList } from '$lib/Feature_Features/utils/stores/activeList';
	import { updateList as JiraTicketList } from '$lib/Feature_JiraTickets/utils/stores/activeList';
	import type { ReleaseStage } from '../types';
	import type { ReleaseStageValidations } from '../types';

	let { item, stage, collection } = $props();

	let processing = $state(false);
	let alerts: ReleaseStageValidations = $state({}) as ReleaseStageValidations;
	let formData: ReleaseStage = $state({}) as ReleaseStage;
	let success: boolean = $state(false);
</script>

<FormStyles Children={formInput} />

{#snippet formInput()}
	<span class="basic-form">
		<form
			method="POST"
			action="/?/edit-release&collection={collection}"
			use:enhance={({}) => {
				processing = true;

				return async ({ result }) => {
					processing = false;
					console.log(result);
					if (result.type == 'failure') {
						alerts = result?.data?.result as ReleaseStageValidations;
						formData = result?.data?.data as ReleaseStage;
					}
					if (result.type == 'success') {
						success = true;
						if (collection == 'features') updateList.set(true);
						if (collection == 'jira-tickets') JiraTicketList.set(true);
					}
				};
			}}
		>
			<input type="hidden" name="id" value={item?._id || null} />
			<input type="hidden" name="stageId" value={stage?._id || null} />
			<small class="error" class:active-alert={alerts?.invalidFeatureId || alerts?.invalidStageId}
				>Something went wrong.</small
			>

			<label for="date">Date of Release: </label>
			<input type="date" name="date" value={formatDateInputValue(stage?.date) || null} />
			<small class="error" class:active-alert={alerts?.missingDate}>Date is required.</small>

			<small class="error" class:active-alert={alerts?.dbFail}
				>Something went wrong with the update.</small
			>
			<small class="success" class:active-alert={success}>Item saved successfully.</small>
			<input class:processing type="submit" value={processing ? 'Processing...' : 'Submit'} />
		</form>
	</span>
{/snippet}
