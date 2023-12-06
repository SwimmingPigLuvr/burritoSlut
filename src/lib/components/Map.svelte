<script lang="ts">
    
    
    import type { RestaurantData, BurritoData, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import { doc, type GeoPoint } from "firebase/firestore";
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	import { initMap, loadGoogleMapsScript } from "$lib/map";

    export let restaurants: RestaurantData[];
    export let burritos: BurritoData[];

    
    
    // let autocomplete;
    // let inputElement: HTMLInputElement | null;

    let mobileView = false;
    let viewMapMsg = false;
    let closeMapMsg = false;

    // center should be the center of the search that the user determines
    

    


    onMount(async () => {
        if (typeof google !== 'undefined') {
            await initMap(restaurants, burritos); // Call initMap after the script is loaded
        } else {
            try {
                await loadGoogleMapsScript();
                if (typeof google !== 'undefined') {
                    await initMap(restaurants, burritos);
                }
            } catch (error) {
                console.error('that does not work i guess');
            }
        }
    });

    

</script>

<style>
    /* #map {
        width: 100%;
        max-height: 2000px;
        background-color: #07FF00;
        border: solid 10px
    } */
    .custom-height {
        height: calc(100vh - 144px);
    }

    @media (min-width: 768px) {
        .custom-height {
            height: calc(100vh - 6.125rem); /* adjust the value as needed */
        }
    }


</style>

<body>
    <!-- map -->
    <div 
        
        class="fixed sm:block top-36 md:top-24 right-[0%] h-[100%] bg-white md:w-[33%] transform transition-all duration-1000 ease-in-out {mobileView? 'w-full block' : ''}">
        <div id="map" class="w-full custom-height"></div>
    </div>
    <!-- map button for mobileView -->
    {#if !mobileView}
    
    <div 
        data-tip="View Map" class="fixed top-[11.5rem] right-[4.5rem] tooltip tooltip-left">
        <button 
            on:click={() => mobileView = true}
            on:mouseenter={() => viewMapMsg = true}
            on:mouseleave={() => viewMapMsg = false}
            class="fixed top-40 right-6 text-2xl md:hidden bg-primary bg-opacity-20 btn btn-circle btn-outline">
                📍
        </button>
    </div>
    {:else}
    <div 
        data-tip="Close Map" class="fixed top-[11.5rem] right-[4.5rem] tooltip tooltip-left">
        <button 
            on:click={() => mobileView = false}
            on:mouseenter={() => closeMapMsg = true}
            on:mouseleave={() => closeMapMsg = false}
            class="fixed top-40 right-6 text-xl bg-warning bg-opacity-50 btn-outline md:hidden btn btn-circle">❌</button>
    </div>
    {/if}
</body>