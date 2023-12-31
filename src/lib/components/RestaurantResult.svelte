<script lang="ts">
	import { goto } from "$app/navigation";
    import type { BurritoData, RestaurantData, ReviewData } from "$lib/types";
	import { backIn, backInOut, backOut, cubicInOut } from "svelte/easing";
	import { blur, fade, fly, slide } from "svelte/transition";
    import { filters } from "../../stores/stores";
    
    export let restaurant: RestaurantData;
    export let index: number;
    console.log('photo: ', restaurant?.profilePicture?.url);
    console.log('alt: ', restaurant?.profilePicture?.alt);

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
    
    const dayz: { [key: string]: string } = {
        'monday': 'Mon',
        'tuesday': 'Tue',
        'wednesday': 'Wed',
        'thursday': 'Thu',
        'friday': 'Fri',
        'saturday': 'Sat',
        'sunday': 'Sun'
    };

    let days = [
        'monday', 
        'tuesday', 
        'wednesday', 
        'thursday', 
        'friday', 
        'saturday', 
        'sunday'
    ];

    const today = days[new Date().getDay()];

    let openingTime: string;
    let closingTime: string;

    let pfp: string;
    let alt: string | null;
    let restaurantName: string;

    interface DayHours {
        open: string | null;
        close: string | null;
    }

    type Hours = {
        [key: string]: DayHours;
    };

    let hours: Hours;

    // add hours to restaurant data
    // if restaurant is open then
    let isOpen: boolean = true;
    let reviewText = 'i love pancakes.';

    let showHoursMsg = false;
    let showHours = false;
    let tags: string[] = [];
    let dot: {
        delivery: boolean,
        outdoorSeating: boolean,
        takeout: boolean,
    };

    async function searchByTag(tag: string) {
        await goto(`/search?tags=${encodeURIComponent(tag)}`);
    }

    console.log('restaurant', restaurant);
    $: if (restaurant) {
        
        if (restaurant.profilePicture) {
            if (restaurant.profilePicture.url) {
                pfp = restaurant.profilePicture.url;
            }
            if (restaurant.profilePicture.alt) {
                alt = restaurant.profilePicture.alt;
            }
        }

        if (restaurant.name) {
            restaurantName = restaurant.name
        }

        if (restaurant.hours) {
            hours = restaurant.hours;
            const todayHours = restaurant.hours[today];

            openingTime = todayHours.open !== null ? todayHours.open : 'Not available';
            closingTime = todayHours.close !== null ? todayHours.close : 'Not available';

            // loop goes here
            // logic:
            // for day in days
            // open = parseTime(restaurant.hours[day].open)
            // close = parseTime(restaurant.hours[day].close)
        }

        if (restaurant.tags) {
            tags = restaurant.tags;
        }

        if (restaurant.dot) {
            dot = restaurant.dot
        } else {
            dot = {
                delivery: true,
                outdoorSeating: true,
                takeout: true,
            }
        }
    }

    


    function parseTime(militaryTime: string): string {
        const time = militaryTime.replace(':', '');

        if (!/^[0-2]\d[0-5]\d$/.test(time)) {
            return "invalid time format";
        }

        const hours = parseInt(time.substring(0, 2), 10);
        const minutes = time.substring(2);

        const hoursIn12 = hours % 12 || 12;

        const suffix = hours < 12 ? "AM" : "PM";

        return `${hoursIn12}:${minutes} ${suffix}`;
    }



</script>


<div class=" border-black relative flex space-x-2 sm:space-x-4 items-start p-2 sm:p-4 hover:cursor-pointer hover:bg-primary hover:bg-opacity-20 transform transition-all duration-300 ease-in-out bg-white border-8 border-transparent hover:border-8 hover:border-da hover:border-spacing-4 hover:border-primary font-avenir-demi">
    <!-- images from reviews -->

    <div class="overflow-auto carousel w-[175px] h-[175px] rounded relative">

        <!-- handles -->
        <div class="absolute z-30 flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
            <button class="btn btn-circle bg-opacity-0 backdrop-blur-sm btn-accent btn-xs text-white">❮</button> 
            <button class="btn btn-circle bg-opacity-0 backdrop-blur-sm btn-accent btn-xs text-white">❯</button>
        </div>

        <div id="slide1" class="carousel-item relative w-full">
            <img src={pfp ?? '/images/alob.jpeg'} alt="haha" class="search-result-image">
            <div class="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
        </div>
        <div id="slide2" class="carousel-item relative w-full">
            <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" alt="haha" class="search-result-image" />
        </div> 
              <div id="slide3" class="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" alt="haha" class="search-result-image" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                </div>
              </div> 
              <div id="slide4" class="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" alt="haha" class="search-result-image" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                </div>
              </div>
        </div>

    </div>




    <!-- restaurant info -->
    <div class="flex flex-col items-start">

        <!-- title -->
        <h2 class="font-avenir-bold px-2">{index + 1}. <span class="hover:text-primary">{restaurantName}</span></h2>

        <!-- rating -->
        <div class="flex space-x-2 items-baseline pl-2">

            <!-- stars -->
            <p>⭐⭐⭐⭐</p>

            <!-- number -->
            <p class="text-xs">4.2</p>

            <!-- reviews -->
            <p class="text-xs text-sky-400">(<span class="hover:underline">46 reviews</span>)</p>
        </div>
        
        <!-- tags / price -->
        <div class="flex space-x-1 items-center px-2">

            <!-- tags -->
            <div class="flex space-x-1">
                {#if tags.length > 0}
                    {#each tags as tag}
                        <button 
                            on:click={() => {searchByTag(tag); toggleFilter(tag)}}
                            class="text-[0.6rem] font-avenir-demi h-[1rem] px-[0.3rem] rounded-md capitalize hover:bg-primary bg-accent text-accent-content hover:text-primary-content">{tag}</button>
                    {/each}
                {/if}
            </div>

            <!-- price -->
            <p>💰💰</p>
        </div>

        <!-- hours -->
        <button 
            on:mouseenter={() => showHours = true}
            on:mouseleave={() => showHours = false}
            on:mousedown={() => showHours = true}
            class="rounded px-2 text-sm py-1 hover:bg-primary hover:bg-opacity-10"><span class="{isOpen? 'text-success' : 'text-warning'}">{isOpen? 'Open' : 'Closed'}</span> until {closingTime ?? '??'}
            {#if showHours}
                <div 
                    in:fade={{duration: 500, easing: cubicInOut}} 
                    out:fade={{duration: 500, easing: cubicInOut}} 
                    class="z-30 flex flex-col space-y-1 text-white absolute top-0 left-0 rounded-none px-6 py-2 bg-primary bg-opacity-100 backdrop-blur font-avenir-bold">
                    <h3 class=" text-center text-lg">Full Hours</h3>
                    {#each days as day}
                        <div class="flex gap-4 items-center justify-end">
                            <p class="text-left">{dayz[day]}</p>
                            <p class="text-right -tracking-widest">
                                {restaurant.hours?.[day].open ?? '??'} - 
                                {restaurant.hours?.[day].close ?? '??'}
                            </p>
                        </div>
                    {/each}
                </div>
            {/if}

        </button>

        <!-- review preview -->
        <div class="text-xs pr-8 group p-2">
            <p> <span class="text-[1rem]">🗣️</span> <span class="opacity-50 group-hover:opacity-100">"{reviewText}"</span></p>
        </div>

        <!-- amenities -->
        <div class="space-x-6 flex text-[0.55rem] sm:translate-x-2 translate-y-[0.4rem] sm:translate-y-[0.6rem]">
            <div class="flex w-1/3 space-x-1">
                {#if dot.delivery}
                    <p class="">✅</p>
                {:else}
                    <p class="">❌</p>
                {/if}
                <p class="">Delivery</p>
            </div>
            <div class="flex w-2/3 space-x-1">
                {#if dot.outdoorSeating}
                    <p class="">✅</p>
                {:else}
                    <p class="">❌</p>
                {/if}
                <p class="">Outdoor Seating</p>
            </div>
            <div class="flex w-1/3 space-x-1">
                {#if dot.takeout}
                    <p class="">✅</p>
                {:else}
                    <p class="">❌</p>
                {/if}
                <p class="">Takeout</p>
            </div>
        </div>

        <!-- order now -->
        <button class="btn-sm btn-outline btn-primary hover:scale-105 active:outline-none absolute right-8 bottom-8 transform transition-all duration-300 ease-out outline-primary bg-white border-2 hover:border-white bg-opacity-100 -tracking-wider text-white uppercase">Order Now</button>
    </div>
</div>

<style>
    .search-result-image {
        object-fit: cover;
        object-position: center;
        width: 175px;
        width: 175px;
    }
</style>