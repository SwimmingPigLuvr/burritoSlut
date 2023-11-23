import { fetchRestaurantData } from '$lib/fetchData';

export const load = async () => {
    const tags: string[] = [];
    const maxLimit = 10;
    const restaurant = await fetchRestaurantData('CWuhGEoz9BX5bhnUpgwv');
    return { restaurant };
};