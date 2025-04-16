<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from '../../components/FormStyles.svelte';
	import { onMount } from 'svelte';

	let { value = $bindable() } = $props();

	let items = $state();

	async function getList() {
		const res = await fetch('/api/milestone/get-milestone-select-list');
		if (!res.ok) return (items = []);
		const data = await res.json();
		items = data;
	}

	function handleValueUpdate(e) {
		value = e.detail.value;
	}

	function handleClearValue() {
		value = null;
	}

	onMount(async () => await getList());
</script>

<FormStyles Children={select} />

{#snippet select()}
	<span class="select-styles">
		<label for="milestone">Associated Start Event: </label>

		<div class="select-style">
			{#if items}
				<Select
					on:change={handleValueUpdate}
					on:clear={handleClearValue}
					showChevron
					{items}
					name="milestone"
					value={value || null}
					required
					closeListOnChange={false}
				/>
			{/if}
		</div>
	</span>
{/snippet}
