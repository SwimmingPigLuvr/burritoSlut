<script lang="ts">
    import { browser } from "$app/environment";
    import Map from "$lib/components/Map.svelte";
	import Nav from "$lib/components/Nav.svelte";
    import type { BurritoData, MenuItem, Restaurant, ReviewData, UserData } from "$lib/types";
    import { GeoPoint, Timestamp } from "firebase/firestore";

    let inputElement: HTMLElement;

    let steakBurrito: BurritoData;
    let pedrosTacosSanClemente: Restaurant;
    // Declare MenuItems
    let coke: MenuItem = {
        name: 'coke',
        price: 2.99,
    };
    let bepsi: MenuItem = {
        name: 'bepsi',
        price: 2.99,
    };
    let fullMenu: MenuItem[] = [coke, bepsi];

    // Declare UserData
    let bowser: UserData = {
        username: 'Bowser',
        bio: 'Mario ate my Burrito',
        profilePictureURL: '/bowserpfp.png',
        type: 'owner',
        reviews: [], // Temporarily empty, will be filled later
    };
    let tony: UserData = {
        username: 'Tony',
        bio: 'Gerald ate my Burrito',
        profilePictureURL: '/tonypfp.png',
        type: 'user',
        reviews: [], // Temporarily empty, will be filled later
    };


    // Declare ReviewData
    let firstReview: ReviewData = {
        rating: 100,
        burrito: null, // Placeholder, will be assigned steakBurrito later
        imageURLS: ['/steakBurrito.png'],
        timestamp: Timestamp.now(),
        tags: ['steak', 'breakfast'],
        author: tony,
        text: 'wow, simply delicious - Tony',
    };
    
    // Declare Restaurant
    pedrosTacosSanClemente = {
        address: {
            city: "San Clemente",
            coordinates: new GeoPoint(33.41460173853236, -117.60016735581809),
            state: "CA",
            street: "2313 S El Camino Real",
            zip_code: 92672,
        },
        fullMenu: fullMenu,
        menu: [],
        name: "Pedro's Tacos",
        owner: bowser,
        chain: "Pedro's Tacos",
        reviews: [firstReview],
        profilePictureURL: 'pedrosTacosSanClemente.png',
    };

    // Now define steakBurrito
    steakBurrito = {
        imageURLs: ['/steakBurrito.png'],
        ingredients: ['steak', 'eggs', 'hashbrowns'],
        name: 'Steak',
        price: 10.99,
        restaurant: pedrosTacosSanClemente, // This should be a string or a reference to a Restaurant object
        reviews: [firstReview],
        tags: ['breakfast', 'steak'],
    };

    // Update the reviews array for UserData
    bowser.reviews.push(firstReview);
    tony.reviews.push(firstReview);

    // Assign the burrito to the firstReview
    firstReview.burrito = steakBurrito;

    
</script>

<Nav />

<body data-theme="garden" class="bg-stone-200 w-screen h-screen">
   

        <Map 
            address={pedrosTacosSanClemente.address}
            restaurant={pedrosTacosSanClemente}
        />
</body>
