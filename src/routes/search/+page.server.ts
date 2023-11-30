import { fetchRestaurantData, fetchSearchResults } from '$lib/fetchData';
import type { RestaurantData } from '$lib/types';


export const load = async () => {
    const mode: string = 'restaurants';
    const tags: string[] = ['mexican', 'breakfast'];
    const maxLimit = 10;
    const lastVisible = '';

    // argument order:
    // mode, maxLimit, tags, lastVisible
    const res = await fetchSearchResults(mode, maxLimit, tags);
    return { res };
};