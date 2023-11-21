<script lang="ts">
    
    
    import type { RestaurantData, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import { doc, type GeoPoint } from "firebase/firestore";
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

   
    export const ssr = false;
    
    export let address: Address;
    export let restaurant: RestaurantData;

    let map: google.maps.Map, infoWindow: google.maps.InfoWindow;
    
    let autocomplete;
    let inputElement: HTMLInputElement;
    let autocompleteName;
    let inputElementName: HTMLInputElement;

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
                infoWindow = new google.maps.InfoWindow();

                const locationButton = document.createElement("button");
                locationButton.className = 'current-location-btn';

                locationButton.textContent = "Jump to Current Location";
                locationButton.classList.add("custom-map-control-button");

                map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

                locationButton.addEventListener("click", () => {
                    // try html5 geolocation
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position: GeolocationPosition) => {
                                const pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                };

                                infoWindow.setPosition(pos);
                                infoWindow.setContent("location found.");
                                infoWindow.open(map);
                                map.setCenter(pos);
                            },
                            () => {
                                handleLocationError(true, infoWindow, map.getCenter()!);
                            }
                        );
                    } else {
                        // browser does not support geolocation
                        handleLocationError(false, infoWindow, map.getCenter()!);
                    }
                });

                function handleLocationError(
                    browserHasGeolocation: boolean,
                    infoWindow: google.maps.InfoWindow,
                    pos: google.maps.LatLng,
                ) {
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(
                        browserHasGeolocation
                            ? "error: the geolocation service failed."
                            : "error: your browser does not support geolocation."
                    );
                    infoWindow.open(map);
                }

                



                // create marker
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: center,
                    title: `${restaurant?.name}`,
                });

                // auto complete
                
                // name input
                const nameOptions = {
                    componentRestrictions: { country: 'us'},
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    types: ["cafe", "meal-delivery", "meal-takeaway", "restaurant", "supermarket"],
                };
                
                inputElementName = document.getElementById('inputElementName') as HTMLInputElement;
                autocompleteName = new google.maps.places.Autocomplete(inputElementName, nameOptions);

                // input
                const options = {
                    componentRestrictions: { country: 'us'},
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    types: ["(cities)", "postal_code", "locality", "sublocality"],
                };

                inputElement = document.getElementById('inputElement') as HTMLInputElement;
                autocomplete = new google.maps.places.Autocomplete(inputElement, options);


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