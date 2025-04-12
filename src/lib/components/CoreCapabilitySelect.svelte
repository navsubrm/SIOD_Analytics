<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from './FormStyles.svelte';
	import { coreCapability } from '$lib/stores/coreCapability';

	let { editItem } = $props();

	let items = $state();
</script>

<FormStyles Children={selectInput} />

{#snippet selectInput()}
	<label for="core-capability">Associated Core Capability: </label>

	<div class="select-style">
		<Select
			showChevron
			items={$coreCapability}
			name="core-capability"
			value={editItem?.coreCapability || null}
			required
			--list-z-index="100000"
		/>
	</div>
{/snippet}
