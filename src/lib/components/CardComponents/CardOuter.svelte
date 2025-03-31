<script lang="ts">
	import gsap from 'gsap';

	let { Card, item } = $props();
	let card: HTMLElement | undefined = $state();

	function rotateCard() {
		const tl = gsap.timeline();
		tl.to(card as HTMLElement, {
			rotateY: '+=180',
			zIndex: 1000,
			duration: 0.75
		});
	}
</script>

<div class="card-outer" bind:this={card}>
	<Card rotate={rotateCard} {item} />
</div>

<style>
	/* Perspective is set on CardGridContainer */
	.card-outer {
		position: relative;
		transform-style: preserve-3d;
		transform-origin: center center;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-row: auto / span 6;
		height: max-content;
	}
</style>
