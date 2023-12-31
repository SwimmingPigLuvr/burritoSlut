<script lang="ts">
	import { onMount } from "svelte";
	import { backIn, backInOut, backOut, cubicIn, cubicInOut, cubicOut } from "svelte/easing";
	import { blur, fade, fly, slide } from "svelte/transition";

    let images: string[] = [
        // '/images/mountFuji.jpeg',
        '/images/moon.jpeg',
        '/images/fortniteBurrito.jpeg',
        '/images/actionMovie.jpeg',
        '/images/burritoFortnite.jpeg',
    ];
    let taglines: string[][] = [
        // ["Satisfy your cravings, ", "find the spiciest burritos in town"],
        // ["Find hot local burritos, ", "near you"],
        ["No matter where you are or what you're doing, ", "YOU NEED A BURRITO"],
        ["LIFE'S SHORT, ", "EAT MORE BURRITOS"],
        ["No talkie, until I've had my", "hashbrowns and steak breakfast burrito"],
        ["Daring Journeys deserve", "EPIC BURRITOS"],
    ];


</script>

<!-- carousel -->
<div class=" w-[100%] h-[100%] carousel fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none">
    {#each images as image, index}
        <div id="item{index}" class="relative carousel-item w-full">
        <!-- tint -->
            <div class="overlay"></div>
            <div class="tint"></div>

            <img src={image} alt="slide {index}" class="slider-item w-full h-full">

            <!-- tagline -->
            {#if index === index}
            <div class="transform transition-all duration-1000 ease-in-out pr-4 w-full md:w-[50%] z-20 absolute left-6 sm:left-10 md:left-[20%] top-36 md:top-[7.5rem] flex flex-col space-y-4">
                    <h3 
                        in:fade={{duration: 1000, easing: cubicIn, delay: 500}}
                        class="font-avenir-bold text-white text-xl">{taglines[index][0]}</h3>
                    <h3 
                        in:fade={{duration: 1000, easing: cubicIn, delay: 1000}}
                        class="font-avenir-bold uppercase text-white text-[5rem] leading-[1]">{taglines[index][1]}</h3>
                    <a href="/search" class="btn-primary border-white border-2 rounded-none btn font-avenir-bold btn-lg w-[20rem]">Find One Near You</a>
            </div>
            {/if}
        </div> 
    {/each}
   

    
</div> 
    <!-- slider controls -->
    <div class="fixed z-50 bottom-[20%] left-1/2 -translate-x-1/2 transform transition-all duration-1000 ease-in-out flex space-x-4 justify-center">
        {#each images as image, index}
            <!-- svelte-ignore a11y-missing-content -->
            <a 
                href="#item{index}" class="transform transition-all duration-500 ease-in-out rounded-none bg-white opacity-100 hover:opacity-50 w-10 h-4 text-white"></a> 
        {/each}
    </div>




<style>
    .slider-item {
        object-fit: cover;
        object-position: center;
    }

    .tint {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right, hsl(var(--p)), rgb(0, 0, 0), hsl(var(--s))); /* Tint color */
        opacity: 0.5; /* Tint opacity */
        z-index: 1; /* Ensure it's above the image */
        mix-blend-mode: normal;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, hsl(var(--p)), hsl(var(--s))); /* Tint color */
        opacity: 1; /* Tint opacity */
        z-index: 1; /* Ensure it's above the image */
        mix-blend-mode: overlay;
    }
</style>