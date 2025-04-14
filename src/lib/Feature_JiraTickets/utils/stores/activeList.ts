import { writable } from 'svelte/store';
import type { JIRATicket } from '$lib/Feature_JiraTickets/types';

export const activeList = writable<Array<JIRATicket>>([]);
export const updateList = writable(false);
