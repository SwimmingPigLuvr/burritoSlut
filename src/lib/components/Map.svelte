<script lang="ts">
    
    
    import type { RestaurantData, BurritoData, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import { doc, type GeoPoint } from "firebase/firestore";
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

    export let restaurants: RestaurantData[] = [];
    export let burritos: BurritoData[] = [];

    
    
    // let autocomplete;
    // let inputElement: HTMLInputElement | null;

    let mobileView = false;
    let viewMapMsg = false;
    let closeMapMsg = false;

    // center should be the center of the search that the user determines
    
    let map: google.maps.Map; 
    let infoWindow: google.maps.InfoWindow;

	let defaultCoordinates = {
        lat: 33.60892483696627,
        lng: -117.93045220733654,
    }

    const mapOptions = {
        center: defaultCoordinates,
        zoom: 16,
        mapId: 'c9dc6f1b5dba17d5',
        fullscreenControl: false,
    }

    onMount(async () => {
        if (browser) {
            async function initMap(): Promise<void> {

                // request needed libraries
                // @ts-ignore
                const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

                map = new Map(document.getElementById('map') as HTMLElement, mapOptions);
                infoWindow = new google.maps.InfoWindow();

                // create markers for restaurants and burritos
                restaurants.forEach(restaurant => {
                    if (restaurant.address && restaurant.address.coordinates) {
                        const marker = new AdvancedMarkerElement({
                            position: {
                                lat: restaurant.address.coordinates.latitude,
                                lng: restaurant.address.coordinates.longitude,
                            },
                            map: map,
                            title: restaurant.name,
                        });
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div><strong>${restaurant.name}</strong><br>${restaurant.address.street}, ${restaurant.address.city}</div>`,
                        });
                        marker.addListener("click", () => {
                            infoWindow.open(map, marker);
                        });
                    }
                });

                burritos.forEach(burrito => {
                    if (burrito.restaurant.address && burrito.restaurant.address.coordinates) {
                        const marker = new AdvancedMarkerElement({
                            position: {
                                lat: burrito.restaurant.address.coordinates.latitude,
                                lng: burrito.restaurant.address.coordinates.latitude,
                            },
                            map: map,
                            title: burrito.restaurant.name,
                        });
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div><strong>${burrito.restaurant.name}</strong><br>${burrito.restaurant.address.street}, ${burrito.restaurant.address.city}`,
                        });
                        marker.addListener("click", () => {
                            infoWindow.open(map, marker);
                        });
                    }
                });
	
            }

            initMap();
        
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