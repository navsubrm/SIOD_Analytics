<script lang="ts">
	import DescriptionButton from './DescriptionButton.svelte';
	import AddEditButton from './AddButton.svelte';
	import DeleteButton from './DeleteButton.svelte';
	import { activeList, updateList } from '$lib/Feature_Features/utils/stores/activeList';
	import { onMount } from 'svelte';
	import type { ReleaseStage } from '$lib/Feature_Releases/types';
	import DisplayReleaseStages from '../../Feature_Releases/ui/DisplayReleaseStages.svelte';

	async function updateFeature() {
		const response = await fetch('/api/features/get-feature-list');
		const data = await response.json();
		$activeList = data;
		$updateList = false;
	}

	function getCurrentRelease(item) {
		const released = item?.releaseStages.filter((el: ReleaseStage) => el.date !== null);
		return released[released.length - 1].stage;
	}

	$effect(() => {
		$updateList;
		setTimeout(async () => await updateFeature(), 200);
	});

	onMount(async () => await updateFeature());
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Core Capability</th>
			<th class="center" colspan="2">Release Stage</th>
			<th class="center">Details</th>
			<th class="center">Edit</th>
			<th class="center">Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each $activeList as item}
			<tr>
				<td>{item?.name}</td>
				<td>{item?.coreCapability}</td>
				<td>{getCurrentRelease(item)}</td>
				<td class="center"><DisplayReleaseStages {item} collection={'features'} /></td>
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
