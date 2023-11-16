<script lang="ts">
    import type { Restaurant, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import { doc, type GeoPoint } from "firebase/firestore";
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
    
    export let address: Address;
    export let restaurant: Restaurant;

    let map: google.maps.Map;
    let autocomplete;
    let inputElement: HTMLInputElement;

    let mobileView = false;
    let viewMapMsg = false;
    let closeMapMsg = false;

    onMount(() => {
        if (browser /*&& typeof window !== 'undefined'*/) {

            // initMap functionerino
            (window as any).initMap = async(): Promise<void> => {
                const center = {
                    lat: address.coordinates.latitude,
                    lng: address.coordinates.longitude,
                };

                // request needed libraries
                // @ts-ignore
                const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

                // create map
                map = new Map(
                    document.getElementById('map') as HTMLElement,
                    {
                        zoom: 16,
                        center: center,
                        mapId: 'c9dc6f1b5dba17d5',
                        fullscreenControl: false,
                    }
                );

                // create marker
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: center,
                    title: `${restaurant?.name}`,
                });
                inputElement = document.getElementById('inputElement') as HTMLInputElement;
                autocomplete = new google.maps.places.Autocomplete(inputElement, { /* options */});
            }

            // load the google maps script
            loadGoogleMapsScript().then(() => {
                console.log('google maps script loaded');

                // then call initMap
                (window as any).initMap();

            }).catch(error => {
                console.error('error loading google maps: ', error);
            });
        }
    });

    

    async function loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDG4Pb3-0S8cRFv4WfZuoariZXwTkq6pvY&callback=initMap&libraries=places`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = resolve;
            script.onerror = reject;
        });
    }




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