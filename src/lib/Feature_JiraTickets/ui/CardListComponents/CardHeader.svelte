<script>
	import { truncateText } from '$lib/utils/truncateText';
	import AnalyticsPopoverButton from '$lib/JiraTickets/ui/AnalyticsPopoverButton.svelte';
	import TrackingItemEditPopover from '$lib/JiraTickets/ui/TrackingItemEditPopover.svelte';
	import ParentFilterLinkButton from '$lib/JiraTickets/ui/ParentFilterLinkButton.svelte';

	let { item = undefined, IconComponent, title, length, buttons = true } = $props();
</script>

<div class="header flex-row flex-space-between">
	<h6 class="flex-row"><IconComponent />{truncateText(title, length)}</h6>

	<div class="flex-row flex-end btn-icons">
		{#if buttons}
			<AnalyticsPopoverButton {item} />
			<TrackingItemEditPopover {item} />
			<ParentFilterLinkButton {item} />
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
		--_stroke: var(--orange);
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
</style>
