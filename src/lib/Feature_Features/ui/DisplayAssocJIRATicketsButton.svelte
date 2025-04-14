<script lang="ts">
	import PopoverContainer from '$lib/components/PopoverContainer.svelte';
	import Information from '$lib/components/IconComponents/Information.svelte';
	import type { SvelteComponent } from 'svelte';

	let popoverContainer: SvelteComponent | undefined = $state();
	let { item } = $props();

	function showPopover() {
		popoverContainer?.showPopover();
	}
</script>

<button onclick={showPopover} title="View Related Tickets">
	<div class="button-style">{item?.associatedJiraTickets?.length}</div>
</button>

<PopoverContainer Child={popoverChild} bind:this={popoverContainer} />

{#snippet popoverChild()}
	<div>
		<h3>Associated Tickets:</h3>
		<ul>
			{#each item?.associatedJiraTickets as ticket}
				<li>{ticket.label} (Add Edit Button to ticket)</li>
			{/each}
		</ul>
	</div>
{/snippet}

<style>
	button {
		--_fill: var(--orange);
		--_height: 25px;
		background: none;
		border: none;
	}

	button:hover :global(svg) {
		cursor: pointer;
		stroke: var(--gold);
	}

	.button-style {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		font-size: 1em;
		font-weight: bold;
		border: solid 1px var(--orange);
		background: var(--orange);
		color: var(--blue);
		border-radius: 50%;
		height: var(--_height);
		width: var(--_height);
		cursor: pointer;
	}

	.button-style:hover {
		border: solid 1px var(--gold);
		background: var(--gold);
		color: var(--blue);
	}

	div {
		text-align: left;
		height: 100%;
	}

	ul {
		list-style: none;
	}

	li {
		margin-top: 1.5em;
		max-width: 50ch;
		color: var(--white);
	}
</style>
