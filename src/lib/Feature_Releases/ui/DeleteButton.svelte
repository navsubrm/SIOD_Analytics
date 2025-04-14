<script lang="ts">
	//import { enhance } from '$app/forms';
	import Delete from '$lib/components/IconComponents/Delete.svelte';
	import { updateList } from '$lib/Feature_Features/utils/stores/activeList';

	let { item, stage } = $props();
	let deleteForm: HTMLFormElement = $state() as HTMLFormElement;

	async function handleDelete() {
		if (confirm('Are you sure you want to delete this release stage?')) {
			const data = new FormData(deleteForm);
			const response = await fetch('/?/delete-release', {
				method: 'POST',
				body: data
			});

			if (response.ok) updateList.set(true);
		}
	}
</script>

<form style="display: none;" bind:this={deleteForm}>
	<input type="hidden" name="id" value={item._id} />
	<input type="hidden" name="stageId" value={stage._id} />
</form>

<button onclick={handleDelete} title="Delete Release"><Delete /></button>

<style>
	button {
		--_fill: var(--orange);
		--_fill-hover: var(--gold);
		--_height: 20px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		fill: var(--gold);
	}
</style>
