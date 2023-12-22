<script lang='ts'>
	import { fade } from "svelte/transition";
    import { filters } from "../../stores/stores";

    let currentFilters: string[];
    $: currentFilters = $filters;
    let mode = 'restaurants';
    let tags = ['Mexican', 'Breakfast',];
    let price: string = '';

    let categories = {
        price: ['$', '$$', '$$$', '$$$$'],
        mode: ['burritos', 'restaurants'],
        tags: ['Breakfast', 'Mexican'],
        amenities: ['takeout', 'delivery', 'wifi', 'outdoor seating',  ]
    }
    
    type CategoryName = keyof typeof categories;

    const categoryOrder = ['price', 'mode', 'tags', 'amenities'];

    function toggleFilter(filter: string) {
        filters.update((current: string[]) => {
            let updatedFilters;

            if (current.indexOf(filter) === -1) {
                // Add the filter and then sort
                updatedFilters = [...current, filter];
            } else {
                // Remove the filter
                updatedFilters = current.filter(f => f !== filter);
            }

            // Sort the filters - especially useful for price categories
            return updatedFilters.sort((a, b) => {
                // If both filters are price filters, sort by length
                if (['$', '$$', '$$$', '$$$$'].includes(a) && ['$', '$$', '$$$', '$$$$'].includes(b)) {
                    return a.length - b.length;
                }
                // Otherwise, maintain existing order
                return current.indexOf(a) - current.indexOf(b);
            });
        });
    }

    function clearAll() {
        filters.set([]);
    }

</script>
<div class=" border-r-2 border-r-black  w-full h-40 lg:w-[17%] lg:h-screen fixed top-[13%] transform transition-all duration-1000 ease-in-out">

    <!-- filters -->
    <div class="font-avenir-bold p-4 bg-white">

        <!-- top section -->
        <div class="">
            {#if $filters.length < 1}
                <h2 class="text-sm">Filters</h2>
            {:else if $filters.length === 1}
                <h2 class="text-sm">{$filters.length} Filter</h2>
            {:else}
                <h2 class="text-sm">{$filters.length} Filters</h2>
            {/if}
            {#if $filters.length > 0}
                <div class="flex space-x-1 text-xs">
                    {#each $filters as filter, index}
                        <span in:fade out:fade>
                            {filter}{index < $filters.length - 1 ? ' - ' : ''}
                        </span>
                    {/each}
                </div>
                <button on:click={() => clearAll()} class="text-xs text-info font-avenir-regular">clear all</button>
            {/if}
            <div class="">
                <div class="join rounded-full mt-2 h-6 mx-auto font-avenir-medium">
                    <button 
                        on:click={() => toggleFilter('$')} 
                        class:active-price-filter={$filters.includes('$')}
                        class="join-item px-4 py-1 btn btn-xs btn-outline border-2 border-black hover:text-black hover:bg-primary hover:bg-opacity-25 text-[0.6rem]">$</button>
                    <button 
                        on:click={() => toggleFilter('$$')} 
                        class:active-price-filter={$filters.includes('$$')}
                        class="join-item px-4 py-1 btn btn-xs btn-outline hover:text-black border-2 border-black hover:bg-primary hover:bg-opacity-25 text-[0.6rem]">$$</button>
                    <button 
                        on:click={() => toggleFilter('$$$')} 
                        class:active-price-filter={$filters.includes('$$$')}
                        class="join-item px-4 py-1 btn btn-xs btn-outline hover:text-black hover:bg-primary border-2 border-black hover:bg-opacity-25 text-[0.6rem]">$$$</button>
                    <button 
                        on:click={() => toggleFilter('$$$$')} 
                        class:active-price-filter={$filters.includes('$$$$')}
                        class="join-item px-4 py-1 btn btn-xs btn-outline hover:text-black hover:bg-primary hover:bg-opacity-25 border-2 border-black text-[0.6rem]">$$$$</button>
                </div>
            </div>    
        </div>
        

        <hr class="h-[0.15rem] border-0 bg-black my-4">


        <!-- search for -->
        <div class=" ">
            <h2 class="font-avenir-bold text-sm">Search For</h2>
            <div class="flex -translate-x-1">
                <div class="">
                    <label class="label cursor pointer" for="burritos">
                        <button 
                            on:click={() => mode = 'burritos'}
                            class="btn rounded-none btn-xs hover:btn-primary {mode === 'burritos' ? `btn-primary` : 'btn-outline'}">
                            <span class="label-text font-avenir-bold text-xs {mode === 'burritos' ? ``: ''} ">Burritos</span>
                        </button>
                    </label>
                </div>
                <p class="text-xs pt-[0.75rem]">or</p>
                <div class="">
                    <label class="label cursor pointer" for="restaurants">
                        <button 
                            on:click={() => mode = 'restaurants'}
                            class="btn rounded-none btn-xs hover:btn-primary {mode === 'restaurants' ? `btn-primary` : 'btn-outline'}">
                            <span class="label-text font-avenir-bold text-xs {mode === 'restaurants' ? ``: ''} ">Restaurants</span>
                        </button>
                    </label>
                </div>
            </div>
        </div>
        
        <hr class="h-[0.15rem] border-0 bg-black my-4">

        <!-- tags -->
        <div class="">
            <h2 class="font-avenir-bold text-sm">Tags</h2>
            <div class="space-x-1 my-2">
                {#each tags as tag}
                    <button class="text-[0.6rem] font-avenir-demi h-[1rem] px-[0.3rem] rounded-md capitalize hover:bg-primary bg-accent text-accent-content hover:text-primary-content">{tag}</button>
                {/each}
            </div>
        </div>
        <hr class="h-[0.15rem] border-0 bg-black my-4">
    </div>
</div>

<style>
    .active-price-filter {
        background-color: hsl(var(--p) / 0.15);
        color: hsl(var(--p));
        stroke: hsl(var(--p));
    }

</style>