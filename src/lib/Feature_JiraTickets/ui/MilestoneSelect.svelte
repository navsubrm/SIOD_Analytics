<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from '../../components/FormStyles.svelte';
	import { onMount } from 'svelte';

	let { editItem } = $props();
	let items = $state();

	async function getList() {
		const res = await fetch('/api/milestone/get-milestone-select-list');
		if (!res.ok) return (items = []);
		const data = await res.json();
		items = data;
	}

	onMount(async () => await getList());
</script>

<FormStyles Children={selectInput} />

{#snippet selectInput()}
	<label for="milestones">Associated Milestones: </label>

	<div class="select-style">
		{#if items}
			<Select
				{items}
				showChevron
				name="milestones"
				value={editItem || null}
				closeListOnChange={false}
			/>
		{/if}
	</div>
{/snippet}
