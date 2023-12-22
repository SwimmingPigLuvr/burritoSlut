import { writable } from 'svelte/store';

export const theme = writable('garden');
export const filters = writable<string[]>([]);
