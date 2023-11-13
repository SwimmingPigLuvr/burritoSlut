<script lang="ts">
    import type { Restaurant, Address } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
    import { browser } from '$app/environment';
	import type { GeoPoint } from "firebase/firestore";

    export let address: Address;
    export let restaurant: Restaurant;

    // change the GeoPoint type into one that satisfies {lat: number, lng: number}
    let center = {lat: address.coordinates.latitude, lng: address.coordinates.longitude};

    
    if (browser) {

        // Define `initMap` inside onMount to ensure it's client-side
        (window as any).initMap = async () => {
            const mapElement = document.getElementById('map');
            try {
                //@ts-ignore
                const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

                if (mapElement) {
                    let map = new google.maps.Map(mapElement, { zoom: 18, center: center });
                    const marker = new AdvancedMarkerElement({
                        map: map,
                        position: center,
                        title: 'Uluru'
                    });
                } else {
                    console.error('Map element not found');
                }
            } catch (error) {
                console.error('Error initializing Google Maps:', error);
            }
        };

        // Load the Google Maps script
        loadGoogleMapsScript().then(() => {
            console.log('Google Maps script loaded');
        }).catch(error => {
            console.error('Error loading Google Maps:', error);
        });
    };


    // Function to load the Google Maps script
    function loadGoogleMapsScript() {
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


</script>

<style>
    #map {
        width: 100%;
        height: 337px;
        background-color: #07FF00;
        border: solid 10px
    }
</style>

<body>
    <h3>Google Maps Demo</h3>
    <p>{restaurant?.name}</p>
    <!-- map -->
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDG4Pb3-0S8cRFv4WfZuoariZXwTkq6pvY&callback=initMap" async defer></script>

    <div>
        <p>{address?.street}</p>
        <p>{address?.city}</p>
        <p>{address?.state}</p>
        <p>{address?.zip_code}</p>
    </div>

</body>