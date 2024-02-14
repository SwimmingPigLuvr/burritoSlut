import { writable } from 'svelte/store';
import type { ReviewPhoto, Dimension } from '$lib/types';

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

export const dimensions = writable<Dimension[]>([
    { name: 'cheese', score: 11 },
    { name: 'tortilla', score: 11 },
    { name: 'meat', score: 11 },
    { name: 'ratio', score: 11 },
    { name: 'temp', score: 11 },
    { name: 'grease', score: 11 },
    { name: 'ingredients', score: 11 },
    { name: 'volume', score: 11 },
]);

export const photoCategory = writable('none')
