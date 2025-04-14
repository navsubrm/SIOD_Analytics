import { writable } from 'svelte/store';

export const projectedTimeForStage = writable([
	{
		stage: 'Customer_Requirements',
		projectedTime: 0.25
	},
	{
		stage: 'Story Boarding',
		projectedTime: 0.2
	},
	{
		stage: 'In Dev',
		projectedTime: 0.3
	},
	{
		stage: 'In Testing',
		projectedTime: 0.15
	},
	{
		stage: 'User Accepted',
		projectedTime: 0.05
	}
]);
