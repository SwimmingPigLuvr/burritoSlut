import type { RestaurantData, BurritoData } from "./types";

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

	export async function initMap(restaurants: RestaurantData[], burritos: BurritoData[]) {
        // request needed libraries
        // @ts-ignore
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        // create map + infoWindow
        map = new Map(document.getElementById('map') as HTMLElement, mapOptions);
        infoWindow = new google.maps.InfoWindow();


        // this should be the button that sets the search center to the user's location
        // 🧩TODO: move this to the nav component in the location input!🧩
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

        // create markers
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
        })

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
        })

        // auto complete config
        // move these into NAV!
        // and also restaurants/add-new

        // left input: names of locations
        const nameOptions = {
            componentRestrictions: { country: 'us'},
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["cafe", "meal-delivery", "meal-takeaway", "restaurant", "supermarket"],
        };

        // right input: location
        const options = {
            componentRestrictions: { country: 'us'},
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["(cities)", "postal_code", "locality", "sublocality"],
        };

        // use these for the input
        // inputElement = document.getElementById('inputElement') as HTMLInputElement;
        // autocomplete = new google.maps.places.Autocomplete(inputElement, options);
    }

    function loadGoogleMapsScript() {
        return new Promise((resolve, reject) => {
            if (typeof google === 'undefined') {
                // Create a new script element
                const script = document.createElement('script');
                // Set the source to the Google Maps API, including your API key and the callback function
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=resolveGoogleMapsPromise`;
                script.async = true;
                script.defer = true;
                // Append the script to the document head
                document.head.appendChild(script);
                // This global function will be called when the script is loaded
                window.resolveGoogleMapsPromise = () => {
                    resolve();
                    // Clean up the global function after it's called
                    window.resolveGoogleMapsPromise = null;
                };
                // Handle any errors that occur while loading the script
                script.onerror = reject;
            } else {
                // If the google object is already defined, resolve immediately
                resolve();
            }
        });
    }