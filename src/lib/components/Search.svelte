<script lang='ts'>
    import type { BurritoData, RestaurantData } from '$lib/types';
	import BurritoResult from "./BurritoResult.svelte";
	import RestaurantResult from "./RestaurantResult.svelte";
    
    export let restaurants: RestaurantData[] = [];
    export let burritos: BurritoData[] = [];

    let i: number = 1;

    // temperary
    // will be based on search type
    let category: string = 'Restaurants';
    let searchItem: string = 'restaurant';
    let location: string = 'Costa Mesa, CA';

</script>
<div class="translate-y-40 lg:translate-y-0 px- font-mono bg-opacity-25 z-10 overflow-y-auto w-full mx-auto md:w-[66%] lg:w-[50%] md:ml-auto md:mr-[33%] h-full lg:h-screen transform transition-all duration-1000 ease-in-out">
<!-- site map? -->
<h4 class="mt-24 mb-8 text-xs">{`y4b > `}{category}{` > `}{location}</h4>
<h3 class="">All results</h3>
<!-- {#if searchItem === 'burrito'}
    {#each data as burrito}
        <BurritoResults burrito={burrito}/>
    {/each}
{/if} -->

{#if restaurants.length > 0}
    {#each restaurants as restaurant}
        <RestaurantResult {restaurant}/>
    {/each}
{:else if burritos.length > 0}
    {#each burritos as burrito}
        <BurritoResult {burrito}/>
    {/each}
{/if}
</div>
