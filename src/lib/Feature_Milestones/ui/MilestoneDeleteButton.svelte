<script lang="ts">
	import Delete from '$lib/components/IconComponents/Delete.svelte';
	import { updateList } from '../utils/stores/milestoneActiveList';

	let { item } = $props();

	async function handleDelete() {
		if (confirm('Are you sure you want to delete this milestone?')) {
			const id = item._id;
			const response = await fetch('/api/milestone/delete-milestone', {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ id })
			});

			const data = await response.json();

			if (data?.error) {
				return alert(data?.error);
			}

			updateList.set(true);
			return alert('Delete successful.');
		}
	}
</script>

<button onclick={handleDelete} title="Delete Milestone"><Delete /></button>

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
