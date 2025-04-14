import { writable } from 'svelte/store';
import type { Milestone } from '$lib/Feature_Milestones/types';

export const activeList = writable<Array<Milestone>>([]);
export const updateList = writable(false);
