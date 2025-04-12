<script lang="ts">
	import { fade } from 'svelte/transition';
	import CardOuter from './CardOuter.svelte';
	import CardActionShell from './CardActionShell.svelte';

	let { data, Card, actionCardProps } = $props();
</script>

<section out:fade={{ duration: 250 }} in:fade={{ delay: 500, duration: 250 }}>
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
