import { fetchRestaurantData, fetchSearchResults } from '$lib/fetchData';
import type { RestaurantData } from '$lib/types';


export const load = async () => {
    const tags: string[] = [];
    const maxLimit = 10;
    const mode: string = 'restaurants';
    const lastVisible = '';
    const res = await fetchSearchResults(mode, maxLimit);
    return { res };
};