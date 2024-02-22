import { writable } from 'svelte/store';
import type { ReviewPhoto, Dimension } from '$lib/types';

export const theme = writable('garden');
export const filters = writable<string[]>([]);
export const mode = writable<string>('restaurants');
export const searchQuery = writable('breakfast burritos');
export const searchLocation = writable('Costa Mesa, CA');
export const safeMode = writable<boolean>(true);

export const reviewPhotos = writable<ReviewPhoto[]>([]);
export const shownPhotos = writable<ReviewPhoto[]>([]);
export const filesToUpload = writable<File[]>([]);
export const dropZoneFocused = writable<boolean>(false);
export const isModalOpen = writable<boolean>(false);

export const dimensions = writable<Dimension[]>([
    { name: 'cheese', score: null },
    { name: 'tortilla', score: null },
    { name: 'meat', score: null },
    { name: 'ratio', score: null },
    { name: 'temp', score: null },
    { name: 'grease', score: null },
    { name: 'ingredients', score: null },
    { name: 'volume', score: null },
]);

export const photoCategory = writable('none')
