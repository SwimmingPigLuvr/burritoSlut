<script lang="ts">
    import type { BurritoData, RestaurantData, ReviewData } from "$lib/types";
	import { cubicInOut } from "svelte/easing";
	import { blur, fade, slide } from "svelte/transition";
    export let restaurant: RestaurantData;
    console.log('photo: ', restaurant?.profilePicture?.url);
    console.log('alt: ', restaurant?.profilePicture?.alt);

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

    console.log('restaurant', restaurant);
    if (restaurant) {
        
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


<div class="bg-white relative mt-2 flex space-x-2 sm:space-x-6 items-start border-b-2 border-slate-100 p-2 sm:p-6 hover:cursor-pointer hover:shadow-lg font-mono">
    <!-- images from reviews -->

    <div class="overflow-auto carousel w-[175px] h-[175px] rounded relative">

        <!-- handles -->
        <div class="absolute z-30 flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
            <button class="btn bg-opacity-70 btn-accent btn-xs">❮</button> 
            <button class="btn bg-opacity-70 btn-accent btn-xs">❯</button>
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
    <div class="flex flex-col space-y- items-start">

        <!-- title -->
        <h2 class="font-mono font-bold -tracking-wider px-2"><span class="hover:text-primary">{restaurantName}</span></h2>

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
                        <button class="text-[0.6rem] -tracking-wide h-[1rem] font-bold px-[0.3rem] rounded-md first-letter:uppercase lowercase hover:bg-primary bg-secondary text-secondary-content hover:text-primary-content">{tag}</button>
                    {/each}
                {/if}
            </div>

            <!-- price -->
            <p>💰💰</p>
        </div>

        <!-- hours -->
        <button 
            on:mouseenter={() => showHoursMsg = true}
            on:mouseleave={() => {showHoursMsg = false; showHours = false}}
            on:mousedown={() => showHours = true}
            class="rounded px-2 text-sm py-1 hover:bg-primary hover:bg-opacity-10"><span class="{isOpen? 'text-success' : 'text-warning'}">{isOpen? 'Open' : 'Closed'}</span> until {closingTime ?? '??'}
            {#if showHoursMsg}
                <button 
                    in:slide out:slide
                    class="absolute top-1/2 right-1/2 rounded z-30 bg-black p-4 font-mono text-primary">See Full Hours</button>
            {/if}
            <p></p>
            {#if showHours}
                <div in:fade={{duration: 100, easing: cubicInOut,}} out:fade class=" z-30 flex flex-col space-y-2 text-white absolute top-0 sm:top-20 right-0 sm:right-1/2 rounded p-4 px-6 sm:p-6 bg-black font-mono">
                    {#each days as day}
                        <div class="flex gap-10 items-center justify-end">
                            <p class="text-left">{dayz[day]}</p>
                            <p class="text-right">
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
        <div class="-tracking-widest sm:tracking-normal space-x-2 sm:space-x-4 flex text-[0.6rem] sm:text-sm sm:translate-x-2 translate-y-[0.4rem] sm:translate-y-[0.6rem]">
            <div class="flex w-1/3 space-x-1">
                <p class="">❌</p>
                <p class="">Delivery</p>
            </div>
            <div class="flex w-1/3 space-x-1">
                <p class="">✅</p>
                <p class="">Takeout</p>
            </div>
            <div class="flex w-full space-x-1">
                <p class="">✅</p>
                <p class="">Outdoor seating</p>
            </div>
        </div>

        <!-- start order -->
        <button class="btn btn-circle btn-primary hover:scale-105 active:outline-none lowercase absolute right-4 bottom-4  transform transition-all duration-300 ease-out outline-primary-content outline-4 outline-double bg-opacity-100 -tracking-widest ">Start Order</button>
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