import { writable } from 'svelte/store';
import type { ReviewPhoto } from '$lib/types';

export const theme = writable('garden');
export const filters = writable<string[]>([]);
export const mode = writable<string>('restaurants');
export const searchQuery = writable('breakfast burritos');
export const searchLocation = writable('Costa Mesa, CA');
export const safeMode = writable<boolean>(true);

export const reviewPhotos = writable<ReviewPhoto[]>([]);
export const filesToUpload = writable<File[]>([]);
export const dropZoneFocused = writable<boolean>(false);
export const isModalOpen = writable<boolean>(false);

export const dimensions = writable<string[]>([
    cheese,
]);
