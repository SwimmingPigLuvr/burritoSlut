<script lang="ts">
    import { browser } from "$app/environment";
	import Filters from "$lib/components/Filters.svelte";
    import Map from "$lib/components/Map.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import Search from "$lib/components/Search.svelte";
    import type { BurritoData, MenuItem, RestaurantData, Address, ReviewData, UserData } from "$lib/types";
	import { theme } from "../../stores/stores.js";
    import type { SearchResults } from "$lib/fetchData";

	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});

    // export let data;
    export let data: SearchResults;
    
    // Initialize searchResults with default values
    let searchResults: SearchResults = {
        restaurants: data?.restaurants ?? [],
        burritos: data?.burritos ?? [],
        lastVisible: data?.lastVisible
    };

    $: if (data) {
        searchResults = {
            restaurants: data.restaurants ?? [],
            burritos: data.burritos ?? [],
            lastVisible: data.lastVisible,
        };
    }

    // Reactively log the first restaurant, if available
    $: if (searchResults && searchResults.restaurants && searchResults.restaurants.length > 0) {
        console.log('from page.svelte: ', searchResults.restaurants[0]);
    } else {
        console.log('No restaurants found');
    }
    
</script>

<Nav />

<body data-theme={themeValue} class="bg-white w-screen h-screen">
   
    <Filters />
    <Search restaurants={searchResults.restaurants} burritos={searchResults.burritos}/>
    <Map restaurants={searchResults.restaurants} burritos={searchResults.burritos} />
</body>
