import { fetchRestaurantData } from '$lib/fetchData';

export const ssr = false;

export const load = async () => {
    const tags: string[] = [];
    const maxLimit = 10;
    const restaurants = await fetchRestaurantData(null, tags, maxLimit);
    return restaurants;
};