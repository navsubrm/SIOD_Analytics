<script>
	let { active = $bindable(false) } = $props();
</script>

<svg viewBox="2 2 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		class="holder"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5 3C2.23858 3 0 5.23858 0 8C0 10.7614 2.23858 13 5 13H11C13.7614 13 16 10.7614 16 8C16 5.23858 13.7614 3 11 3H5ZM5 5Z"
	/>
	<path
		class="button"
		class:active
		fill="white"
		d="M1 8C1 6 2 4 5 4 8 4 9 6 9 8 9 10 8 12 5 12 2 12 1 10 1 8Z"
	/>
</svg>

<style>
	svg {
		--_width: calc(var(--_height) * 2);
		height: var(--_height, 25px);
		width: var(--_width, 50px);
	}

	.holder {
		position: relative;
		fill: none;
		stroke: var(--_fill, var(--gold));
	}

	.button {
		fill: var(--_fill, var(--orange));
		transform: translateX(0);
		transition: transform 0.75s allow-discrete;
	}

	.active {
		transform: translateX(50%);
		fill: green;
	}
</style>
