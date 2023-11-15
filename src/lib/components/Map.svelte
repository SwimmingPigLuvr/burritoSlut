<script lang="ts">
    import type { Restaurant, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import type { GeoPoint } from "firebase/firestore";
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
    
    export let address: Address;
    export let restaurant: Restaurant;

    let mobileView = false;
    let viewMapMsg = false;
    let closeMapMsg = false;

    let center = {lat: address.coordinates.latitude, lng: address.coordinates.longitude};

    
    if (browser) {


        let map: google.maps.Map;
        (window as any).initMap = async (): Promise<void> => {  console.log('initing the mapp');

        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        // The map, centered at Uluru
        map = new Map(
            document.getElementById('map') as HTMLElement,
            {
            zoom: 18,
            center: center,
            mapId: 'DEMO_MAP_ID',
            }
        );

        const pinScaled = new PinElement({
            scale: 1.5,
        });
        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerElement({
            map: map,
            position: center,
            title: `${restaurant?.name}`,
            content: pinScaled.element,
        });
    }

        // Function to load the Google Maps script
        async function loadGoogleMapsScript() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDG4Pb3-0S8cRFv4WfZuoariZXwTkq6pvY&callback=initMap`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
                script.onload = resolve;
                script.onerror = reject;
            });
        }

        // Load the Google Maps script
        loadGoogleMapsScript().then(() => {
            console.log('Google Maps script loaded');
        }).catch(error => {
            console.error('Error loading Google Maps:', error);
        });

    };




</script>

<style>
    /* #map {
        width: 100%;
        max-height: 2000px;
        background-color: #07FF00;
        border: solid 10px
    } */
</style>

<body>
    <!-- map -->
    <div 
        
        class="fixed sm:block top-36 md:top-24 right-[0%] h-[100%] bg-white md:w-[33%] transform transition-all duration-1000 ease-in-out {mobileView? 'w-full block' : ''}">
        <div id="map" class="w-full h-[100vh]"></div>
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