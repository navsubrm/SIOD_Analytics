<script lang="ts">
	let { Item = undefined, rotate, buttonLabel } = $props();
</script>

<div class="footer">
	<button onclick={rotate}>{buttonLabel}</button>
	{#if Item}
		{@render Item()}
	{/if}
</div>

{#key Item}
	<style>
		.footer {
			margin-top: 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1em;
			height: fit-content;
			text-align: right;
		}

		.footer button {
			padding-block: 1em;
			padding-inline: 1.5em;
			color: var(--blue);
			background: color-mix(in lab, var(--gold), transparent 90%);
			border-radius: 0.5em;
			border: solid 2px color-mix(in lab, var(--gold), transparent 90%);
			box-shadow: 5px 5px 3px color-mix(in lab, var(--gold), transparent 95%);
		}
	</style>
{/key}
