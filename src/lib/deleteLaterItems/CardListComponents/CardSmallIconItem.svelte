<script lang="ts">
	let { data, test = undefined, Icon, label } = $props();
	let failedTest = $state(false);
	if (test !== undefined && test()) failedTest = true;
</script>

<div class="item">
	<div class="header">
		<Icon />
		{#if !test}
			<p>{data}</p>
		{:else}
			<p class:failedTest>{data}</p>
		{/if}
	</div>
	<p class="label">{label}</p>
</div>

<style>
	.item {
		--_fill: var(--gold);
		--_stroke: var(--gold);
		--_height: 20px;
		flex-direction: column;
		color: var(--blue);
	}

	.item,
	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}

	.label {
		font-size: 0.9em;
	}

	.failedTest {
		color: var(--red);
	}
</style>
