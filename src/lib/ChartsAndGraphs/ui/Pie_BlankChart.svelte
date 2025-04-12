<script>
	import '@carbon/charts-svelte/styles.css';
	import { PieChart } from '@carbon/charts-svelte';

	let { data, title } = $props();

	let options = {
		title: title,
		toolbar: { enabled: false },
		height: '300px',
		width: '300px',
		resizable: true,
		legend: { alignment: 'top' }
	};
</script>

<span>
	<PieChart {data} {options} />
</span>

<style>
	span :global(.cds--cc--tooltip .content-box),
	span :global(.datapoint-tooltip) {
		--cds-text-primary: var(--white);
		--cds-text-secondary: var(--white);
		color: var(--white);
		padding: 0.5em;
	}

	span :global(.cds--cc--tooltip) {
		--cds-layer-02: var(--blue);
		border: solid 1px var(--white);
		border-radius: 0.5em;
	}

	span :global(> *) {
		--cds-text-primary: var(--white);
		--cds-text-secondary: var(--white);
	}
</style>
