<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from './FormStyles.svelte';
	import { onMount } from 'svelte';

	let { editItem } = $props();
	let items = $state();

	async function getList() {
		const res = await fetch('/api/jira-tickets/get-jira-ticket-select-list');
		if (!res.ok) return (items = []);
		const data = await res.json();
		items = data;
	}

	onMount(async () => await getList());
</script>

<FormStyles Children={selectInput} />

{#snippet selectInput()}
	<label for="coreCapability">Associated JIRA Tickets: </label>

	<div class="select-style">
		{#if items}
			<Select
				multiple
				{items}
				showChevron
				name="associatedJiraTickets"
				value={editItem?.associatedJiraTickets || null}
				required
				--list-z-index="10000"
			/>
		{/if}
	</div>
{/snippet}
