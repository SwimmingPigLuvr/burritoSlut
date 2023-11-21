<script lang='ts'>
    import type { BurritoData, RestaurantData } from '$lib/types';
	import BurritoResults from "./BurritoResults.svelte";
	import RestaurantResults from "./RestaurantResults.svelte";
    
    export const ssr = false;
    export let data: RestaurantData[];
    let i: number = 1;
    let category: string = 'Restaurants';
    let searchItem: string = 'restaurant';

</script>
<div class="translate-y-40 lg:translate-y-0 px-6 font-mono bg-opacity-25 z-10 overflow-y-auto w-full mx-auto md:w-[66%] lg:w-[50%] md:ml-auto md:mr-[33%] h-full lg:h-screen transform transition-all duration-1000 ease-in-out">
<!-- site map? -->
<h4 class="mt-28 mb-8 text-xs">{`y4b > `}{category}</h4>
<h3 class="">All results</h3>
<!-- {#if searchItem === 'burrito'}
    {#each data as burrito}
        <BurritoResults burrito={burrito}/>
    {/each}
{/if} -->
{#if searchItem === 'restaurant'}
    {#each data as restaurant}
        <RestaurantResults restaurant={restaurant}/>
    {/each}
{/if}
</div>
