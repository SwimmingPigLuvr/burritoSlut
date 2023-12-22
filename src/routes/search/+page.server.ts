import { page } from '$app/stores';
import { fetchRestaurantData, fetchSearchResults } from '$lib/fetchData';
import type { RestaurantData } from '$lib/types';
import type { PageServerLoad } from './$types';

let mode: string = 'restaurants';
// let tags: string[] = [];
let tags: string[] = ['Mexican', 'Breakfast'];
let maxLimit = 30;
let lastVisible = '';

export const load: PageServerLoad = async ({ url }) => {
    // Extract query parameters from the URL
    const tags = url.searchParams.getAll('tags');
    const mode = url.searchParams.get('mode') || 'restaurants'; // Provide a default value
    const maxLimit = url.searchParams.get('maxLimit') || '10'; // Adjust as needed
    // 'lastVisible' might be more complex to handle, depends on how it's used
    const lastVisible = '';

    const res = await fetchSearchResults(mode, parseInt(maxLimit), tags, lastVisible);
    console.log('Search Results:', res);

    return { res };
};