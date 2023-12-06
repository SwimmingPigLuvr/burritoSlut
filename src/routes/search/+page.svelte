<script lang="ts">
    import { browser } from "$app/environment";
	import Filters from "$lib/components/Filters.svelte";
    import Map from "$lib/components/Map.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import Search from "$lib/components/Search.svelte";
    import type { BurritoData, MenuItem, RestaurantData, Address, ReviewData, UserData } from "$lib/types";
    import { GeoPoint, Timestamp } from "firebase/firestore";
	import { theme } from "../../stores/stores.js";
	import RestaurantResult from "$lib/components/RestaurantResult.svelte";
    import type { SearchResults } from "$lib/fetchData";

	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});

    // export let data;
    export let data: SearchResults;
    
    let searchResults: {
        restaurants: RestaurantData[],
        burritos: BurritoData[],
        lastVisible: null
    };

    $: {
        if (data) {
            console.log('data: ', data);
            searchResults = {
                restaurants: data.restaurants ?? [],
                burritos: data.burritos ?? [],
                lastVisible: data.lastVisible,
            };
        }
    }

    

    console.log('hello from the browser ', {browser});
    console.log('hello from the data ', {data});


    

    
</script>

<Nav />

<body data-theme={themeValue} class="bg-white w-screen h-screen">
   
    <Filters />
    <Search restaurants={searchResults.restaurants} burritos={searchResults.burritos}/>
    <Map restaurants={searchResults.restaurants} burritos={searchResults.burritos} />
</body>
