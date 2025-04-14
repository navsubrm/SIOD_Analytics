import { writable } from 'svelte/store';

export const releaseStage = writable([
	'In Dev',
	'Released to Dev',
	'Released to IL4',
	'Released to IL6',
	'User Accepted',
	'OA approved'
]);
