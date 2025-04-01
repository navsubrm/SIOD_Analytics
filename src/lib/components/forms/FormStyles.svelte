<script>
	let { Children } = $props();
</script>

<span class="basic-form">
	{@render Children()}
</span>

{#key Children}
	<style>
		.basic-form {
			width: 100%;
			max-width: 650px;
		}

		.basic-form form {
			display: flex;
			flex-direction: column;
			background: var(--blue);
			padding-block: 0.75em;
			padding-inline: 1.25em;
			border-radius: 0.5em;
			color: var(--white);
		}

		.basic-form .form-container h3 {
			margin-bottom: 0.5em;
			font-size: 1.5em;
			text-align: center;
		}

		.basic-form label {
			font-size: 1.2em;
			margin-bottom: 0.25em;
		}

		.basic-form input,
		.basic-form textarea {
			margin-bottom: 0.75em;
			padding: 0.25em;
			font-size: 1em;
			background: none;
			border: none;
			color: var(--white);
			border-bottom: solid 1px var(--gold);
		}

		.basic-form textarea {
			height: max-content;
			width: 100%;
		}

		.basic-form input[type='text']:hover,
		.basic-form input[type='text']:focus,
		.basic-form input[type='text']:focus-within,
		.basic-form input[type='password']:hover,
		.basic-form input[type='password']:focus,
		.basic-form input [type='password']:focus-within {
			outline: none;
			color: var(--white);
			border: solid 1px color-mix(in lab, var(--gold), transparent 30%);
			background: color-mix(in lab, var(--white), transparent 90%);
		}

		.basic-form input[type='submit'] {
			background: var(--gold);
			margin-top: 0.75em;
			padding-block: 0.25em;
			font-size: 1.25em;
			color: var(--white);
			border: solid 1px var(--white);
		}

		.basic-form input[type='submit']:hover {
			background: var(--blue);
			color: var(--gold);
			border: solid 1px var(--gold);
		}

		.basic-form .error,
		.basic-form .success {
			font-size: 0.8em;
		}

		.basic-form .error {
			color: var(--red);
		}

		.basic-form .success {
			color: var(--green);
		}

		.basic-form .processing {
			opacity: 0.5;
			pointer-events: none;
		}

		.select-style {
			--background: transparent;
			--border: none;
			--border-focused: solid 1px var(--gold);
			--border-hover: solid 1px var(--gold);
			--padding: 0;
			--border-radius: 0;
			--box-sizing: border-box;
			--chevron-color: var(--gold);
			--chevron-width: 30px;
			--clear-icon-color: var(--gold);
			--font-size: inherit;
			--item-padding: 5px;
			--internal-padding: 5px;
			--input-margin: 0;
			--input-color: var(--blue);
			--item-color: var(--blue);
			--item-hover-bg: var(--gold);
			--item-hover-color: var(--white);
			--item-is-active-bg: var(--gold);
			--item-active-background: var(--blue);
			--list-background: color-mix(in lab, var(--white), transparent 10%);
			--placeholder-color: color-mix(in lab, var(--white), transparent 10%);
		}

		.select-style :global(.svelte-select-list) {
			font-family: Arial, Helvetica, sans-serif;
		}
	</style>
{/key}
