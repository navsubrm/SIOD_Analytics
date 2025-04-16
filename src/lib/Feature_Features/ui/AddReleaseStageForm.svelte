<script lang="ts">
	import '../../styles/form.css';
	import { enhance } from '$app/forms';
	import type { FeatureRelease, FeatureValidations } from '../types';
	import { formatDateInputValue } from '$lib/utils/formatDateInputValue';
	import { updateList } from '$lib/Feature_Features/utils/stores/activeList';

	let { id = undefined } = $props();

	let action = $state('/?/post-new-feature-release');
	let processing = $state(false);
	let alerts: FeatureValidations = $state({});
	let formData: FeatureRelease = $state({}) as FeatureRelease;
	let success: boolean = $state(false);

	$effect(() => {
		if (success) formData = {} as FeatureRelease;
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
					alerts = result?.data?.result as FeatureValidations;
					formData = result?.data?.data as FeatureRelease;
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
		{#if !id}
			<small>Failed to load record ID. Item will not update.</small>
		{/if}
		<label for="stage"
			>Day:
			<small class="error" class:active-alert={alerts?.missingStage}>Day is required.</small>
		</label>
		<input type="number" name="stage" value={formData?.stage || null} />

		<label for="date"
			>Date of OA:
			<small class="error" class:active-alert={alerts?.invalidDate}>OA Date is required.</small>
		</label>
		<input type="date" name="date" value={formatDateInputValue(formData?.date) || null} />

		<small class="error" class:active-alert={alerts?.dbFail}
			>Something went wrong with the update.</small
		>
		<small class="success" class:active-alert={success}>Item saved successfully.</small>
		<input class:processing type="submit" value={processing ? 'Processing...' : 'Submit'} />
	</form>
</span>

<style>
	.basic-form {
		--_form-max-width: 600px;
		width: 100%;
		text-align: left;
	}
</style>
