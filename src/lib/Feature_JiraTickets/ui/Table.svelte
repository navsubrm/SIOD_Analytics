<script lang="ts">
	import { onMount } from 'svelte';

	//JIRA List Store
	import { activeList, updateList } from '$lib/Feature_JiraTickets/utils/stores/activeList';

	//JIRA Imports:
	import DisplayAssocMilestonesButton from './DisplayAssocMIlestonesButton.svelte';
	import DescriptionButton from './DescriptionButton.svelte';
	import AddEditButton from './AddEditButton.svelte';
	import DeleteButton from './DeleteButton.svelte';

	//Use Release stage imports:
	import type { ReleaseStage } from '$lib/Feature_Releases/types';
	import DisplayReleaseStages from '../../Feature_Releases/ui/DisplayReleaseStages.svelte';

	async function updateFeature() {
		const response = await fetch('/api/jira-tickets/get-jira-ticket-list');
		const data = await response.json();
		$activeList = data;
		$updateList = false;
	}

	function getCurrentRelease(item) {
		const released = item?.releaseStages.filter((el: ReleaseStage) => el.date !== null);
		//const sorted = released.sort((a: ReleaseStage, b: ReleaseStage) => a.date < b.date);
		return released[released.length - 1];
	}

	//Update List from other features with update list store.
	$effect(() => {
		$updateList;
		setTimeout(async () => await updateFeature(), 200);
	});

	onMount(async () => await updateFeature());
</script>

<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>Name</th>
			<th>Start Date</th>
			<th>Planned Release</th>
			<th>OPR</th>
			<th>Milestone</th>
			<th colspan="2">Current Release</th>
			<th class="center">Details</th>
			<th class="center">Edit</th>
			<th class="center">Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each $activeList as item}
			<tr>
				<td>{item?.feature?.label}</td>
				<td>{item?.name}</td>
				<td>{new Date(item?.startDate).toLocaleDateString()}</td>
				<td class="center">{new Date(item?.plannedReleaseDate).toLocaleDateString()}</td>
				<td>{item?.opr}</td>
				<td class="center">
					{#if item?.milestones.length > 0}
						<DisplayAssocMilestonesButton {item} />
					{:else}
						{item?.milestones.label}
					{/if}
				</td>
				<td class="center">{getCurrentRelease(item).stage}</td>
				<td class="center"><DisplayReleaseStages {item} collection={'jira-tickets'} /></td>
				<td class="center"><DescriptionButton {item} /></td>
				<td class="center"><AddEditButton {item} edit={true} /></td>
				<td class="center"><DeleteButton {item} /></td>
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
