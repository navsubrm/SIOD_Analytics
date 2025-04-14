<script lang="ts">
	import '$lib/styles/form.css';
	import { page } from '$app/state';
	//import PostMilestoneForm from '$lib/Feature_Milestones/ui/PostMilestoneForm.svelte';
	import DisplayFeatureTableButton from '$lib/Feature_Features/ui/DisplayTableButton.svelte';
	import MilestoneSelect from '$lib/Feature_Milestones/ui/MilestoneSelect.svelte';
	import DisplayMilestoneTableButton from '$lib/Feature_Milestones/ui/DisplayMilestoneTableButton.svelte';
	import PostForm from '$lib/Feature_Releases/ui/PostForm.svelte';
	//import FeatureTable from '$lib/Feature_Features/ui/Table.svelte';

	let value: string | undefined = $state();
</script>

<svelte:head>
	{#key page?.url}
		<title>SIOD Tracking Items</title>
	{/key}
</svelte:head>

<section>
	<h3>Actions:</h3>
	<span>
		<DisplayMilestoneTableButton />
	</span>
	<div>
		<DisplayFeatureTableButton />
	</div>
</section>

<style>
	section {
		padding: 3em;
		background: var(--white);
		width: 100%;
	}

	.data-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 2em;
		padding: 1em;
		border: solid 1px var(--blue);
	}

	.data-container h3 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.25em;
	}

	.data-container button {
		border: none;
		background: none;
	}

	.data-container button :global(svg) {
		stroke: var(--gold);
	}

	.data-container button:hover :global(svg) {
		stroke: var(--orange);
		cursor: pointer;
		scale: 1.02;
	}
</style>
