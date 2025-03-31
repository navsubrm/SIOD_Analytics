<script lang="ts">
	import { page } from '$app/state';
	import CardHeader from './CardHeader.svelte';
	import { goto } from '$app/navigation';
	import Select from 'svelte-select';
	import FormStyles from '$lib/components/forms/FormStyles.svelte';
	import { coreCapability } from '$lib/stores/coreCapability';

	let itemList = $state([...$coreCapability]);

	let { data, header, addNewButton, categoryFilter, firstFilterButton, secondFilterButton } =
		$props();

	function setCategoryFilter(e) {
		page.url.searchParams.set('filter-category', `${e.detail.value}`);
		goto(page.url);
	}

	function clearCategoryFilter() {
		page.url.searchParams.delete('filter-category');
		goto(page.url);
	}

	function setFirstFilter() {
		page.url.searchParams.set(firstFilterButton.urlFilterString, 'true');
		goto(page.url);
	}

	function clearFirstFilter() {
		page.url.searchParams.delete(firstFilterButton.urlFilterString);
		goto(page.url);
	}

	function addNew() {
		goto(addNewButton.url);
	}

	function setSecondFilter() {
		page.url.searchParams.set(secondFilterButton.urlFilterString, 'true');
		goto(page.url);
	}

	function clearSecondFilter() {
		page.url.searchParams.delete(secondFilterButton.urlFilterString);
		goto(page.url);
	}
</script>

<div class="card-inner">
	<div class="card-header">
		<CardHeader title={header.title} IconComponent={header.Icon} length={header.length} />
	</div>

	<div class="card-content">
		{#if data}
			<FormStyles Children={FormSelect} />
			{#snippet FormSelect()}
				<div class="select-style">
					<Select
						showChevron
						on:change={(e) => setCategoryFilter(e)}
						on:clear={clearCategoryFilter}
						placeholder={categoryFilter.placeholder}
						items={itemList}
						--width="90%"
						--margin="0 auto"
						--placeholder-color="var(--blue)"
						--border-radius=".5em"
						--clear-icon-color="var(--red)"
						--value-container-padding="0 10px"
						--font-size="1.1em"
						--selected-item-color="var(--gold)"
					/>
				</div>
			{/snippet}
		{/if}

		<div class="first-filter">
			{#if page?.url?.searchParams?.get(firstFilterButton.urlFilterString) !== 'true'}
				<button class="first-filter-btn" title={firstFilterButton.title} onclick={setFirstFilter}
					><firstFilterButton.Icon /></button
				>
				<p>Filter by {firstFilterButton.label}</p>
			{:else}
				<button
					class="first-filter-btn filter-active"
					title={firstFilterButton.title}
					onclick={clearFirstFilter}><firstFilterButton.Icon /></button
				>
				<p>Clear Filter</p>
			{/if}
		</div>

		<div class="new">
			<p class="btn-text">Add</p>
			<button class="add-new-btn big-icon" title="Add New" onclick={addNew}
				><addNewButton.Icon /></button
			>
			<p class="'btn-text">New</p>
		</div>

		<div class="second-filter">
			{#if page?.url?.searchParams?.get(secondFilterButton.urlFilterString) !== 'true'}
				<button
					class="second-filter-btn"
					title={secondFilterButton.title}
					onclick={setSecondFilter}
				>
					<secondFilterButton.Icon />
				</button>
				<p>Filter By {secondFilterButton.title}</p>
			{:else}
				<button
					class="second-filter-btn filter-active"
					title={secondFilterButton.title}
					onclick={clearSecondFilter}
				>
					<secondFilterButton.Icon />
				</button>
				<p>Clear Filter</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.card-inner {
		--_fill: var(--gold);
		--_stroke: var(--gold);
		--_height: 30px;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-row: auto / span 6;
		border: solid 1px var(--blue);
		border-radius: 0.5em;
		border: solid 2px color-mix(in lab, var(--blue), transparent 90%);
		box-shadow: 5px 5px 3px color-mix(in lab, var(--blue), transparent 95%);
	}

	.big-icon {
		--_height: 60px;
	}

	.card-header {
		grid-row: 1 / span 1;
	}

	.card-content {
		grid-row: 2 / auto;
	}

	.card-content,
	.card-content button,
	.card-content .first-filter,
	.card-content .new,
	.card-content .second-filter {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card-content,
	.card-content button {
		flex-direction: column;
	}

	.card-content .first-filter {
		margin-left: 1.75em;
		align-self: flex-start;
	}

	.card-content .second-filter {
		align-self: flex-end;
		flex-direction: row-reverse;
		margin-right: 1.75em;
	}

	.card-content {
		padding-top: 0;
		margin-top: 0;
		margin-bottom: 20px;
		gap: 1em;
		grid-row: auto / span 5;
		color: var(--blue);
	}

	button {
		height: calc(var(--_height) * 2);
		width: calc(var(--_height) * 2);
		border-radius: 50%;
		background: none;
		border: none;
		padding: 1em;
	}

	.first-filter button {
		box-shadow: -1px 0px 1px var(--gold);
	}

	.first-filter button:hover {
		box-shadow: -2px -0px 2px var(--blue);
	}

	.new button {
		margin: 5px;
	}

	.new button:hover {
		--_fill: var(--blue);
	}

	button:hover {
		cursor: pointer;
		scale: 1.025;
		--_fill: var(--blue);
		--_stroke: var(--blue);
	}

	.second-filter button {
		box-shadow: 1px 0px 1px var(--gold);
	}

	.second-filter button:hover {
		box-shadow: 2px 0px 2px var(--blue);
	}

	button:hover + p,
	.btn-text:has(+ .add-new-btn:hover) {
		color: var(--gold);
	}

	.select-style:hover {
		cursor: pointer;
	}

	.filter-active + p {
		color: var(--red);
	}
</style>
