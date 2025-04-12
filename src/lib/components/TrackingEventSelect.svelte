<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from './FormStyles.svelte';
	import { onMount } from 'svelte';

	let { editItem } = $props();

	let items = $state();

	async function getList() {
		const res = await fetch('/api/event-select-list');
		if (!res.ok) return (items = []);
		const data = await res.json();
		items = data;
	}

	onMount(async () => await getList());
</script>

<FormStyles Children={selectInput} />

{#snippet selectInput()}
	<label for="initial-reason">Associated Start Event: </label>

	<div class="select-style">
		{#if items}
			<Select
				showChevron
				{items}
				name="initial-reason"
				value={editItem?.initialReason || null}
				required
				--list-z-index="100000"
			/>
		{/if}
	</div>
{/snippet}
