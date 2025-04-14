<script lang="ts">
	import MilestoneDescriptionButton from './MilestoneDescriptionButton.svelte';
	import MilestoneAddEditButton from './MilestoneAddEditButton.svelte';
	import MilestoneDeleteButton from './MilestoneDeleteButton.svelte';
	import { activeList, updateList } from '$lib/Feature_Milestones/utils/stores/milestoneActiveList';
	import { onMount } from 'svelte';

	async function updateMilestones() {
		const response = await fetch('/api/milestone/get-milestone-list');
		const data = await response.json();
		console.log('Active List updated.', data);
		$activeList = data;
		$updateList = false;
	}

	$effect(() => {
		$updateList;
		setTimeout(async () => await updateMilestones(), 200);
	});

	onMount(async () => await updateMilestones());
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Start Date</th>
			<th>End Date</th>
			<th class="center">Details</th>
			<th class="center">Edit</th>
			<th class="center">Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each $activeList as item}
			<tr>
				<td>{item?.name}</td>
				<td>{new Date(item?.startDate).toLocaleDateString()}</td>
				<td>{new Date(item?.endDate).toLocaleDateString()}</td>
				<td class="center"><MilestoneDescriptionButton {item} /></td>
				<td class="center"><MilestoneAddEditButton {item} edit={true} /></td>
				<td class="center"><MilestoneDeleteButton {item} /></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border: solid 1px var(--blue);
		width: max-content;
		border-collapse: collapse;
		border-radius: 0.5em;
		overflow-y: auto;
	}

	thead {
		background-color: var(--blue);
		color: var(--white);
	}

	th,
	td {
		text-align: left;
		border: solid 1px var(--white);
		padding: 0.5em;
	}

	tbody tr:hover {
		background: color-mix(in lab, var(--blue), var(--white) 20%);
	}

	.center {
		text-align: center;
	}
</style>
