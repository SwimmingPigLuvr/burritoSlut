<script lang="ts">
	import { onMount } from "svelte";
	import { backIn, backInOut, backOut, cubicIn, cubicInOut, cubicOut } from "svelte/easing";
	import { blur, fade, fly, slide } from "svelte/transition";

    export const ssr = false;

    let images: string[] = [
        '/images/mountFuji.jpeg',
        '/images/moon.jpeg',
        '/images/actionMovie.jpeg',
    ];
    let taglines: string[][] = [
        ["No matter where you are or what you're doing, ", "YOU NEED A BURRITO"],
        ["LIFE'S SHORT, ", "EAT MORE BURRITOS"],
        ["No talkie, until I've had my", "hashbrowns and steak breakfast burrito"],
        ["Daring Journeys", " deserve EPIC BURRITOS"],
    ];


</script>

<!-- carousel -->
<div class="mx-auto w-[100%] h-[100%] carousel carousel-vertical fixed top-0 ">
    {#each images as image, index}
        <div id="item{index}" class="relative carousel-item h-full">
            <img src={image} alt="slide {index}" class="slider-item w-full h-full">
            <!-- tagline -->
            <div class="z-20 absolute left-10 md:left-[21%] top-36 md:top-[7.5rem] flex flex-col space-y-4">
                    <h3 
                        in:fade={{duration: 1000, easing: cubicIn, delay: 500}}
                        class=" font-mono font-black text-white text-5xl ">{taglines[index][0]}</h3>
                    <h3 
                        in:fade={{duration: 1000, easing: cubicIn, delay: 1000}}
                        class=" font-mono font-black text-white text-[5rem] leading-[1]">{taglines[index][1]}</h3>
            </div>
        </div> 
    {/each}
    <!-- tint -->
    <div class="tint"></div>
    
</div>

<!-- slider controls -->
<div class="flex flex-col justify-center py-2 gap-4 fixed top-36 md:top-28 left-4 md:left-[18%]">
    {#each images as image, index}
        <a 
            href="#item{index}" class="transform transition-all duration-500 ease-in-out rounded-full bg-white opacity-50 hover:opacity-100 w-2 h-20 text-white">.</a> 
    {/each}
</div>



<style>
    .slider-item {
        object-fit: cover;
        object-position: center;
    }

    .tint {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: hsl(var(--p)); /* Tint color */
        opacity: 0.2; /* Tint opacity */
        z-index: 1; /* Ensure it's above the image */
    }
</style>