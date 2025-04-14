<script lang="ts">
	import Select from 'svelte-select';
	import FormStyles from './FormStyles.svelte';
	import { coreCapability } from '$lib/stores/coreCapabilityOptions';

	let { editItem } = $props();
</script>

<FormStyles Children={selectInput} />

{#snippet selectInput()}
	<label for="coreCapability">Associated Core Capability: </label>

	<div class="select-style">
		<Select
			showChevron
			items={[...$coreCapability]}
			name="coreCapability"
			value={editItem?.coreCapability || null}
			required
			--list-z-index="100000"
		/>
	</div>
{/snippet}
