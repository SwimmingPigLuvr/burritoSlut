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
    { name: 'cheese', score: 5 },
    { name: 'tortilla', score: 5 },
    { name: 'meat', score: 5 },
    { name: 'ratio', score: 5 },
    { name: 'temp', score: 5 },
    { name: 'grease', score: 5 },
    { name: 'ingredients', score: 5 },
    { name: 'volume', score: 5 },
]);
