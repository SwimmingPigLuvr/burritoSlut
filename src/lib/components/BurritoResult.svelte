<script lang="ts">
    import type { BurritoData, ReviewData } from "$lib/types";

    export let burrito: BurritoData;

    // add hours to restaurant data
    // if restaurant is open then
    let isOpen: boolean = true;

    let reviews: ReviewData[] = burrito.reviews;
    let reviewOne: ReviewData = reviews[0];
    let reviewText: string = reviewOne.text;

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

    let mondayClose: string = '';

    // mondayClose = parseTime(burrito.hours.monday.close);


</script>


<div class="relative mt-2 flex space-x-6 items-start border-b-2 border-slate-100 p-6 hover:cursor-pointer hover:shadow-lg font-mono">
    <!-- images from reviews -->
    <div>
        <!-- slideshow -->
        <!-- <img class="search-result-image h-[175px] w-[175px] rounded-[0.23rem]" src={restaurant.profilePicture.url} alt={restaurant.profilePicture.altText}> -->
    </div>


    <!-- restaurant info -->
    <div class="flex flex-col space-y- items-start">

        <!-- title -->
        <h2 class="font-avenir-bold -tracking-wider"><span class="hover:text-primary">{burrito.name}</span></h2>

        <!-- rating -->
        <div class="flex space-x-2 items-baseline">

            <!-- stars -->
            <p>⭐⭐⭐⭐</p>

            <!-- number -->
            <p class="text-xs">4.2</p>

            <!-- reviews -->
            <p class="text-xs text-sky-400">(<span class="hover:underline">46 reviews</span>)</p>
        </div>
        
        <!-- tags / price -->
        <div class="flex space-x-1 items-center">

            <!-- tags -->
            <button class="text-[0.6rem] -tracking-wide h-[1rem] px-[0.3rem] rounded-md first-letter:uppercase lowercase hover:bg-primary bg-secondary text-primary-content">Mexican</button>
            <button class="text-[0.6rem] -tracking-wide h-[1rem] px-[0.3rem] rounded-md first-letter:uppercase lowercase bg-secondary hover:bg-primary text-primary-content">Breakfast</button>

            <!-- price -->
            <p>💰💰</p>
        </div>

        <!-- hours -->
        <h3 class="text-sm py-1"><span class="{isOpen? 'text-success' : 'text-warning'}">{isOpen? 'Open' : 'Closed'}</span> until {mondayClose}</h3>

        <!-- review preview -->
        <div class="text-xs pr-8 group py-2">
            <p> <span class="text-[1rem]">🗣️</span> <span class="opacity-50 group-hover:opacity-100"> "{reviewText}"</span></p>
        </div>

        <!-- amenities -->
        <div class="flex space-x-3 md:space-x-8 text-[0.6rem] translate-y-[0.6rem]">
            <p>✅ Outdoor seating</p>
            <p>❌ Delivery</p>
            <p>✅ Takeout</p>
        </div>

        <!-- start order -->
        <button class="hover:scale-110 lowercase absolute left-2 bottom-2 btn btn-lg btn-circle btn-primary outline-primary-content outline-4 outline-double bg-opacity-100 -tracking-widest ">Start Order</button>
    </div>
</div>

<style>
    /* .search-result-image {
        object-fit: cover;
    } */
</style>