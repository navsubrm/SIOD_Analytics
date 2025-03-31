<script>
	import { truncateText } from '$lib/HelperFunctions/truncateText';
	import AnalyticsBoard from '$lib/IconComponents/AnalyticsBoard.svelte';
	import Edit from '$lib/IconComponents/Edit.svelte';

	let { IconComponent, title, length, editId = '', analyticsUrl = '' } = $props();

	function openEditForm(e) {
		e.preventDefault();
		const editForm = document.querySelector(`#edit-task-item-${editId}`);
		editForm?.showPopover();
	}
</script>

<div class="header flex-row flex-space-between">
	<h6 class="flex-row"><IconComponent />{truncateText(title, length)}</h6>

	<div class="flex-row flex-end btn-icons">
		{#if analyticsUrl !== ''}
			<div class="edit">
				<a href={analyticsUrl} title="View Stats"><AnalyticsBoard /></a>
			</div>
		{/if}

		{#if editId !== ''}
			<div class="edit">
				<a onclick={openEditForm} href="/edit-task?id={editId}" title="Edit Details"><Edit /></a>
			</div>
		{/if}
	</div>
</div>

<style>
	.header {
		--_height: 20px;
		--_stroke: var(--white);
		padding: 1em;
		gap: 1em;
		background: color-mix(in lab, var(--blue), transparent 5%);
		border-radius: 0.5em 0.5em 0 0;
		color: var(--white);
		height: fit-content;
	}

	.btn-icons {
		--_stroke: orange;
	}

	.btn-icons {
		gap: 5px;
	}

	.header h6 {
		color: var(--white);
		gap: 10px;
	}

	.flex-row {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flex-end {
		justify-content: flex-end;
	}

	.flex-space-between {
		justify-content: space-between;
	}

	.header .edit :global(svg) {
		cursor: pointer;
	}

	.header .edit:hover :global(svg),
	.header .edit:hover :global(svg path) {
		fill: var(--white);
		stroke: var(--white);
	}
</style>
