<script lang="ts">
	import Map from "$lib/components/Map.svelte";
    import type { Restaurant, Coordinates, Address } from "$lib/types";
    // get data from burrito db
    // pass data into Map component
    // magic


    // sample data
    // in the actual code we will call the data from the database
    let pedrosTacos: Restaurant = {
        address: {
            city: "San Clemente",
            state: "CA",
            street: "2313 S El Camino Real",
            zip_code: 92672,
        },
        name: "Pedro's Tacos",
        coordinates: {
            lat: 33.41468461627176,
            lng: -117.6002212864634
        }
    };
</script>


<body data-theme="garden" class="bg-primary w-screen h-screen">
    
    <div class="mx-auto max-w-xl text-center p-4 flex flex-col">
        <h1 class="">Welcome to</h1>
        <h2 class="text-4xl">BurritoSlut</h2>
        <p class="mx-auto max-w-lg text-center">Find HOT BURRITOS near you!</p>
    </div>

    <div class="mx-auto max-w-xl my-8">
        <Map 
            address={pedrosTacos.address}
            coordinates={pedrosTacos.coordinates}
            restaurant={pedrosTacos}
        />

    </div>
</body>
