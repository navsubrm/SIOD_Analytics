<script lang="ts">
	import '../../styles/form.css';
	import { enhance } from '$app/forms';
	import type { Milestone, MileStoneValidations } from '../types';
	import { formatDateInputValue } from '$lib/utils/formatDateInputValue';
	import { onMount } from 'svelte';
	import { fetchMilestone } from '../utils/fetchMilestone';
	import { updateList } from '$lib/Feature_Milestones/utils/stores/milestoneActiveList';

	let { id = undefined } = $props();

	let action = $state('/?/post-new-milestone');
	let processing = $state(false);
	let alerts: MileStoneValidations = $state({});
	let formData: Milestone = $state({});
	let success: boolean = $state(false);

	onMount(async () => {
		if (id) {
			action = '/?/edit-milestone';
			formData = await fetchMilestone(id);
		}
	});

	$effect(() => {
		if (!id) formData = {};
	});

	$effect(() => {
		if (success && action == '/?/post-new-milestone') formData = {};
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
					alerts = result?.data?.result as MileStoneValidations;
					formData = result?.data?.data as Milestone;
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

		<label for="startDate"
			>StartDate:
			<small class="error" class:active-alert={alerts?.invalidStartDate}
				>Start Date is required.</small
			>
		</label>
		<input type="date" name="startDate" value={formatDateInputValue(formData?.startDate) || null} />

		<label for="endDate"
			>End Date: <small class="error" class:active-alert={alerts?.invalidEndDate}
				>End Date is invalid.</small
			></label
		>
		<input type="date" name="endDate" value={formatDateInputValue(formData?.endDate) || null} />

		<label for="details"
			>Details: <small class="error" class:active-alert={alerts?.missingDetails}
				>Include short description of the Milestone.</small
			></label
		>
		<textarea name="details" value={formData?.details || null}></textarea>

		<small class="error" class:active-alert={alerts?.dbFail}
			>Something went wrong with the update.</small
		>
		<small class="success" class:active-alert={success}>Item saved successfully.</small>
		<input class:processing type="submit" value={processing ? 'Processing...' : 'Submit'} />
	</form>
</span>

<style>
	.basic-form {
		--_form-min-width: 300px;
		--_form-max-width: 600px;
		width: 100%;
		text-align: left;
	}
</style>
