<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Information from '$lib/components/IconComponents/Information.svelte';
	import type { SvelteComponent } from 'svelte';
	import EditButton from './EditButton.svelte';
	import DeleteButton from './DeleteButton.svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item, collection } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="View Related Tickets">
	<div class="button-style">
		<Information />
	</div>
</button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div>
		<h3>Release Stages:</h3>
		<table>
			<thead>
				<tr>
					<th>Stage</th>
					<th>Date Achieved</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{#each item?.releaseStages as stage}
					<tr>
						<td>{stage.stage}</td>
						<td class="red" class:green={stage?.date !== null}
							>{!stage?.date ? 'Future' : new Date(stage.date).toLocaleDateString()}</td
						>
						<td><EditButton {item} {stage} {collection} /></td>
						<td><DeleteButton {item} {stage} {collection} /></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

<style>
	button {
		--_fill: var(--orange);
		--_hover-stroke: var(--gold);
		--_height: 20px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		fill: var(--gold);
		stroke: var(--gold);
	}

	div {
		text-align: left;
		height: 100%;
	}

	table {
		border: solid 1px var(--blue);
		width: max-content;
		border-collapse: collapse;
		border-radius: 0.5em;
		overflow-y: auto;
	}

	thead {
		background-color: var(--blue);
		color: var(--white);
	}

	th,
	td {
		text-align: left;
		border: solid 1px var(--white);
		padding: 0.5em;
	}

	tbody tr:hover {
		background: color-mix(in lab, var(--blue), var(--white) 20%);
	}

	.red {
		color: var(--red);
	}

	.green {
		color: green;
	}
</style>
