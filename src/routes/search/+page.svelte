<script lang="ts">
    import { browser } from "$app/environment";
	import Filters from "$lib/components/Filters.svelte";
    import Map from "$lib/components/Map.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import Search from "$lib/components/Search.svelte";
	import { theme } from "../../stores/stores.js";
    import type { SearchResults } from "$lib/fetchData";
	import { page } from "$app/stores";

    let mode;
    let tags;

    $: {
        const urlParams = $page.url.searchParams;
        mode = urlParams.get('mode') || 'restaurants';
        tags = urlParams.get('tags') ? urlParams.get('tags')?.split(',') : [];
    }

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
   
    <div class="main-content">
        <Filters />
        <Search restaurants={searchResults.restaurants} burritos={searchResults.burritos}/>
    </div>
    <Map restaurants={searchResults.restaurants} burritos={searchResults.burritos} />
</body>

<style>
    body {
        height: 100vh;
        overflow-y: auto;
        display: flex;
    }

    .main-content {
        flex-grow: 1;
        overflow-y: hidden;
    }

    
</style>