// See https://svelte.dev/docs/kit/types#app.d.ts

// for information about these interfaces
declare global {
	import '$lib/Estimates/types.d.ts';
	import '$lib/Features/types.d.ts';
	import '$lib/JiraTickets/types.d.ts';
	import '$lib/Milestones/types.d.ts';
	import '$lib/Releases/types.d.ts';

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
