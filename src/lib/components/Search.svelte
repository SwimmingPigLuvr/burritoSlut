<script lang='ts'>
    import type { BurritoData, RestaurantData } from '$lib/types';
	import BurritoResult from "./BurritoResult.svelte";
	import RestaurantResult from "./RestaurantResult.svelte";
	import { page } from '$app/stores';
    
    export let restaurants: RestaurantData[] = [];
    export let burritos: BurritoData[] = [];

    let i: number = 1;



    // temperary
    // will be based on search type
    let category: string = 'Restaurants';
    let searchItem: string = 'restaurant';
    let location: string = 'Costa Mesa, CA';

    let mode;
    let tags: string | null;
    $: {
        const urlParams = $page.url.searchParams;
        mode = urlParams.get('mode') || 'restaurants';
        tags = urlParams.get('tags') ? urlParams.get('tags') : '';
    }

</script>
<div class="translate-y-40 lg:translate-y-0 px- font-avenir-bold bg-opacity-25 z-10 overflow-y-auto w-full mx-auto md:w-[66%] lg:w-[50%] md:ml-auto md:mr-[33%] h-full lg:h-screen transform transition-all duration-1000 ease-in-out">
<!-- site map? -->
<h4 class="mt-24 mb-8 text-xs p-2">{`y4b > `}{category}{` > `}{location}</h4>
<h3 class="p-2">All {tags? tags.toLowerCase() : ''} results</h3>
<!-- {#if searchItem === 'burrito'}
    {#each data as burrito}
        <BurritoResults burrito={burrito}/>
    {/each}
{/if} -->

{#if restaurants.length > 0}
    {#each restaurants as restaurant, index}
        <RestaurantResult {restaurant} {index}/>
    {/each}
{:else if burritos.length > 0}
    {#each burritos as burrito}
        <BurritoResult {burrito}/>
    {/each}
{/if}
</div>
