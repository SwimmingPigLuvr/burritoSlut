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

    let searchCoordinates = {
        lat: 39.41452055927911,
        lng: -117.60016706097267,
    }

    const lat = restaurants[0].location.coordinates.lat;
    const lng = restaurants[0].location.coordinates.lng;

    if (restaurants[0]) {
        searchCoordinates = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
        }
    }

	

    onMount(async () => {
        if (browser) {
            async function initMap(): Promise<void> {

                let mapOptions = {
                    center: searchCoordinates,
                    zoom: 13.5,
                    mapId: 'c9dc6f1b5dba17d5',
                    fullscreenControl: false,
                }

                // request needed libraries
                // @ts-ignore
                const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

                map = new Map(document.getElementById('map') as HTMLElement, mapOptions);
                infoWindow = new google.maps.InfoWindow();

                // create markers for restaurants and burritos
                restaurants.forEach(restaurant => {
                    if (restaurant.location && restaurant.location.coordinates) {
                        const lat = restaurant.location.coordinates.lat;
                        const lng = restaurant.location.coordinates.lng;
                        // const image = {
                        //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                        //     size: new google.maps.Size(20,32),
                        //     origin: new google.maps.Point(0, 0),
                        //     anchor: new google.maps.Point(0, 32),
                        // };

                        const image = document.createElement('img');
                        image.src = 'https://images.blur.io/_blur-prod/0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab/7339-d13bfbe906080f7a?w=1024';
                        image.width = 30;
                        image.height = 30;

                        const shape = {
                            coords: [1, 1, 1, 20, 18, 20, 18, 1],
                            type: "poly",
                        };

                        const marker = new AdvancedMarkerElement({
                            position: {
                                lat: parseFloat(lat),
                                lng: parseFloat(lng),
                            },
                            title: restaurant.name,
                            map,
                            content: image,
                            zIndex: 1,
                        });
                        console.log('fortnite', parseFloat(lng), parseFloat(lat));
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div><strong>${restaurant.name}</strong><br>${restaurant.address.street}, ${restaurant.address.city}</div>`,
                        });
                        marker.addListener("click", () => {
                            infoWindow.open(map, marker);
                        });
                    }
                });

                burritos.forEach(burrito => {
                    if (burrito.restaurant.location && burrito.restaurant.location.coordinates) {
                        const marker = new AdvancedMarkerElement({
                            position: {
                                lat: parseFloat(burrito.restaurant.location.coordinates.lat),
                                lng: parseFloat(burrito.restaurant.location.coordinates.lng),
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

            function setMarkers(map: google.maps.Map) {
                // add markers to the map

                

                for (let i = 0; i < restaurants.length; i++) {
                    const restaurant = restaurants[i];

                    new google.maps.Marker({
                        position: { lat: restaurant.location.coordinates.lat, lng: lng},
                        
                    });
                }
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