<script lang="ts">
	import { getNextMilestoneStart } from '$lib/Feature_Analytics/utils/getNextMilestoneStart.js';
	import { onMount } from 'svelte';

	let name: string | undefined = $state(undefined);
	let days: number | undefined = $state(undefined);

	onMount(async () => {
		const response = await fetch('/api/milestone/get-next-milestone');
		const data = await response.json();
		if (!response.ok) return;
		const values = getNextMilestoneStart(data);
		name = values?.name;
		days = values?.days;
	});
</script>

{#if !name || !days}
	"Date Not Found."
{:else}
	<p>{name}: {days} Days</p>
{/if}
