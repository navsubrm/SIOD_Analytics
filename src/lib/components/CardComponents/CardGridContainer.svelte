<script lang="ts">
	import { fade } from 'svelte/transition';
	import CardOuter from '$lib/components/CardComponents/CardOuter.svelte';
	import CardActionShell from '$lib/components/CardComponents/CardActionShell.svelte';

	let { data, Card, actionCardProps } = $props();
</script>

<section out:fade={{ duration: 500 }} in:fade={{ delay: 700, duration: 500 }}>
	<div class="grid-container">
		<CardActionShell {data} {...actionCardProps} />
		{#each data as item}
			<CardOuter {Card} {item} />
		{/each}
	</div>
</section>

<style>
	section {
		padding-block: 0.5em;
		overscroll-behavior: contain;
	}

	.grid-container {
		padding: 1em;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, auto));
		grid-template-rows: auto;
		width: 100%;
		gap: 1.5em;
		perspective: 10000px;
	}
</style>
