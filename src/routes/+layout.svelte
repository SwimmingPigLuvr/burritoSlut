<script lang="ts">
  import ThemeLobster from '../lib/components/ThemeLobster.svelte';

	import { blur, fly } from 'svelte/transition';
	import '../app.css';
	import { backIn, backInOut, backOut } from 'svelte/easing';
	import { theme } from '../stores/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { RestaurantData, BurritoData } from '$lib/types';
	import { loadGoogleMapsScript } from '$lib/map';

	let themeValue: string;
	theme.subscribe((value) => {
		themeValue = value;
	});
	let restaurants: RestaurantData[];
	let burritos: BurritoData[];
	
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
		window.initMap = function() {
			// heehee hoohoo
		};
		if (browser && typeof google === 'undefined') {
			try {
				await loadGoogleMapsScript();
			} catch (error) {
				console.error('cant load gmaps script');
			}
		}
	});

	
</script>

<slot />

<body data-theme={themeValue}>

	
</body>
