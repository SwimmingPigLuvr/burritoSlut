import { page } from '$app/stores';
import { fetchRestaurantData, fetchSearchResults } from '$lib/fetchData';
import type { RestaurantData } from '$lib/types';

let mode: string = 'restaurants';
let tags: string[] = ['Mexican', 'Breakfast'];
let maxLimit = 30;
let lastVisible = '';


export const load = async ({ url }) => {
    const urlParams = new URLSearchParams(url.search);
    tags = urlParams.getAll(`tags`); // get tags from urlsearch params
   

    // argument order:
    // mode, maxLimit, tags, lastVisible
    const res = await fetchSearchResults(mode, maxLimit, tags, lastVisible);
    return { props: { res } };
};