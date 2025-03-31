<script lang="ts">
	import { page } from '$app/state';
	import gsap from 'gsap';
	import CreateReasonForUpdateForm from '$lib/components/forms/CreateForms/CreateReasonForUpdateForm.svelte';
	import CreateTrackingItemForm from '$lib/components/forms/CreateForms/CreateTrackingItemForm.svelte';
	import Close from '$lib/IconComponents/Close.svelte';
	import Add from '$lib/IconComponents/Add.svelte';
	import TrackingItemList from '$lib/TrackingItemList/TrackingItemList.svelte';

	//**
	// Look at the chart package below for doing analysis:
	//
	// https://www.npmjs.com/package/@carbon/charts-svelte
	// */

	let menu: HTMLElement | undefined = $state();

	function toggleMenuOpen() {
		gsap.to(menu as HTMLElement, { x: 0, duration: 0.5 });
	}

	function toggleMenuClosed() {
		gsap.to(menu as HTMLElement, { x: '-100%', duration: 0.5 });
	}
</script>

<svelte:head>
	{#key page?.url}
		<title>SIOD Analytics</title>
	{/key}
</svelte:head>

<section>
	<div class="form-container" bind:this={menu}>
		<div class="close-icon">
			<button onclick={toggleMenuClosed}>
				<Close --_height="30px" />
			</button>
		</div>
		<h3>Data Entry:</h3>
		<CreateReasonForUpdateForm />
		<CreateTrackingItemForm />
	</div>

	<div class="data-container">
		<h3>
			Active Tracking Items: <button class="add-new-item-button" onclick={toggleMenuOpen}
				><Add --_height="30px" /></button
			>
		</h3>
		<TrackingItemList />
	</div>
</section>

<style>
	section {
		background: var(--white);
		width: 100%;
	}

	.data-container {
		padding: 1em;
		border: solid 1px var(--blue);
	}

	.data-container h3 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.25em;
	}

	.form-container {
		position: fixed;
		left: 0;
		top: 0;
		right: auto;
		bottom: 0;
		width: 100%;
		max-width: 500px;
		background: var(--white);
		padding: 1em;
		border-right: solid 3px var(--blue);
		transform: translateX(-100%);
		overflow-x: hidden;
		overflow-y: auto;
		z-index: 10000;
	}

	.close-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
	}

	.close-icon button,
	.add-new-item-button {
		background: none;
		border: none;
	}

	.form-container :global(form) {
		margin-block: 0.5em;
	}
</style>
