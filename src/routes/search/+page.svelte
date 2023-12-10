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

    export let data;

    let searchResults: SearchResults = {
        restaurants: [],
        burritos: [],
        lastVisible: null
    };

    $: if (data.res) {
        searchResults = {
            restaurants: data.res.restaurants,
            burritos: data.res.burritos,
            lastVisible: data.res.lastVisible
        };
    }

</script>

<Nav />

<body data-theme={themeValue} class="bg-white w-screen h-screen">
   
    <Filters />
    <Search restaurants={searchResults.restaurants} burritos={searchResults.burritos}/>
    <Map restaurants={searchResults.restaurants} burritos={searchResults.burritos} />
</body>
