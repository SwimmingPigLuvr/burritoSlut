<script lang="ts">
    
    
    import type { RestaurantData, BurritoData, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import { doc, type GeoPoint } from "firebase/firestore";
	import { backInOut, cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

    export let restaurants: RestaurantData[] = [];
    export let burritos: BurritoData[] = [];

    let showInfoCard: boolean = false; 
    
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
                restaurants.forEach((restaurant, index) => {
                    if (restaurant.location && restaurant.location.coordinates) {
                        const lat = restaurant.location.coordinates.lat;
                        const lng = restaurant.location.coordinates.lng;
                        // const image = {
                        //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                        //     size: new google.maps.Size(20,32),
                        //     origin: new google.maps.Point(0, 0),
                        //     anchor: new google.maps.Point(0, 32),
                        // };

                        const infoCard = document.createElement('div');
                        infoCard.className = 'absolute -right-1 -top-48 info-card-animation';
                        infoCard.innerHTML = `
                            <div class="w-56 left-0 flex flex-col space-y-1 bg-white text-black rounded p-4">
                                <div>
                                    <img class="w-full h-20 rounded" src="${restaurant.profilePicture?.url}" alt="${restaurant.profilePicture?.alt}">
                                </div>
                                    <h2 class="text-lg translate-y-1 font-avenir-bold capitalize text-left">${restaurant.name}</h2>
                                    <div class="flex space-x-2 items-baseline">
                                        <p>⭐⭐⭐⭐</p>
                                        <p class="text-xs">4.2</p>
                                        <p class="text-xs text-info">(<span class="hover:underline">46 reviews</span>)</p>
                                    </div>
                            </div>
                            <div class="triangle"></div>
                        `;

                        const markerIcon = document.createElement('button');
                        markerIcon.className = 'z-50 relative btn btn-circle btn-xs btn-info border-2 border-white shadow-lg shadow hover:border-primary hover:bg-secondary';

                        const textSpan = document.createElement('span');
                        textSpan.style.color = "white";
                        textSpan.textContent = (index + 1).toString();
                        markerIcon.appendChild(textSpan);

                        if (showInfoCard) {
                            markerIcon.appendChild(infoCard);
                        }

                        const marker = new AdvancedMarkerElement({
                            position: {
                                lat: parseFloat(lat),
                                lng: parseFloat(lng),
                            },
                            title: restaurant.name,
                            map,
                            content: markerIcon,
                            zIndex: index,
                        });

                        google.maps.event.addListener(marker, 'click', function(event: google.maps.MapMouseEvent) {
                            // Toggle the showInfoCard state
                            showInfoCard = !showInfoCard;

                            if (showInfoCard) {
                                markerIcon.appendChild(infoCard);
                            } else {
                                if (markerIcon.contains(infoCard)) {
                                    markerIcon.removeChild(infoCard);
                                }
                            }

                            // If needed, stop the event from further propagation
                            // event.stopPropagation();
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
    <div class="border-l-0 sm:border-l-2 sm:border-l-black fixed sm:block top-36 md:top-24 right-[0%] h-[100%] bg-white md:w-[33%] transform transition-all duration-1000 ease-in-out {mobileView? 'w-full block' : ''}">
        <!-- <div class="bg-accent bg-opacity-50 mix-blend-color-burn absolute inset-0 w-full custom-height z-50"></div> -->
        <div id="map" class="relative w-full custom-height">
        </div>
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