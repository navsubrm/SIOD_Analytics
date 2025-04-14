import { writable } from 'svelte/store';
import type { Feature } from '$lib/Feature_Features/types';

export const activeList = writable<Array<Feature>>([]);
export const updateList = writable(false);
