import { writable } from 'svelte/store';

export const theme = writable('garden');
export const filters = writable<string[]>([]);
export const mode = writable<string>('restaurants');
export const searchQuery = writable('breakfast burritos');
export const searchLocation = writable('Costa Mesa, CA');
export const safeMode = writable<boolean>(true);
