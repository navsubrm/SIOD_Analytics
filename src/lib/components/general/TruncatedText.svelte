<script lang="ts">
	import { truncateText } from '$lib/helperFunctions/truncateText';
	import Close from '$lib/IconComponents/Close.svelte';
	import Information from '$lib/IconComponents/Information.svelte';

	let {
		text,
		length = 40,
		iconColor = 'var(--blue)',
		iconSize = '15px',
		action = undefined
	} = $props();
	let fullView = $state(false);

	function toggleFullView() {
		fullView = !fullView;
	}
</script>

{truncateText(text, length)}

<div class="hidden" class:full-view={fullView}>
	<p>{text}</p>
	<button class="close-button" title="Close" onclick={!action ? toggleFullView : action}>
		<Close --_fill="var(--gold)" />Close
	</button>
</div>

<button onclick={!action ? toggleFullView : action}>
	<Information --_height={iconSize} --_fill={iconColor} />
</button>

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
	}

	.hidden {
		position: absolute;
		inset: 0;
		display: flex;
		opacity: 0;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		border: solid 1px var(--gold);
		border-radius: 0.5em;
		padding: 1.5em;
		overflow-y: scroll;
		background: color-mix(in lab, var(--blue), transparent 10%);
		color: var(--white);
		pointer-events: none;
		z-index: 1000;
		transition:
			opacity 0.75s,
			display 0.75s 0.75s allow-discrete;
	}

	.full-view {
		opacity: 1;
		pointer-events: all;
	}

	button:hover :global(svg) {
		fill: var(--gold);
		stroke: var(--gold);
	}

	.close-button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;
		font-size: 1em;
		color: var(--white);
		margin-block: auto;
	}
</style>
