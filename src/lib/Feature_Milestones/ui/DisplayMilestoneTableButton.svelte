<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import FolderOpen from '$lib/components/IconComponents/FolderOpen.svelte';
	import type { SvelteComponent } from 'svelte';
	import MilestoneTable from './MilestoneTable.svelte';
	import MilestoneAddEditButton from './MilestoneAddEditButton.svelte';

	let popoverContainer: SvelteComponent | undefined = $state();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="View Stats"><FolderOpen /> View Milestones</button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div class="table-container">
		<span class="flex-center popover-head">
			<h3>Milestones:</h3>
			<span class="flex-center">
				<p>Add New</p>
				<MilestoneAddEditButton edit={false} />
			</span>
		</span>
		<MilestoneTable />
	</div>
{/snippet}

<style>
	.table-container {
		height: 80%;
	}

	button {
		--_stroke: var(--orange);
		--_height: 20px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		stroke: var(--blue);
	}

	.flex-center {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
	}

	.popover-head {
		justify-content: space-between;
		margin-block: 10px;
	}
</style>
