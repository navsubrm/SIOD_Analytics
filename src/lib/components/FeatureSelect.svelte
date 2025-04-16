<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from './FormStyles.svelte';
	import { onMount } from 'svelte';

	let { editItem } = $props();
	let items = $state();

	if (editItem == '') editItem = null;

	//$inspect('Edit Item from Feature Select: ', editItem);

	async function getList() {
		const res = await fetch('/api/features/get-feature-select-list');
		if (!res.ok) return (items = []);
		const data = await res.json();
		items = data;
	}

	onMount(async () => await getList());
</script>

<FormStyles Children={selectInput} />

{#snippet selectInput()}
	<label for="feature">Associated Feature: </label>

	<div class="select-style">
		{#if items}
			<Select {items} showChevron name="feature" required value={editItem?.feature || null} />
		{/if}
	</div>
{/snippet}
