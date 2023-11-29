<script lang="ts">
    import { browser } from "$app/environment";
	import Filters from "$lib/components/Filters.svelte";
    import Map from "$lib/components/Map.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import Search from "$lib/components/Search.svelte";
    import type { BurritoData, MenuItem, RestaurantData, ReviewData, UserData } from "$lib/types";
    import { GeoPoint, Timestamp } from "firebase/firestore";
	import { theme } from "../../stores/stores.js";
	import RestaurantResult from "$lib/components/RestaurantResult.svelte";

	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});

    export let data;
    
    let searchResults: {
        restaurants: RestaurantData[],
        burritos: BurritoData[],
        lastVisible: null
    };

    $: {
        if (data) {
            console.log('data is iffed');
            searchResults = {
                restaurants: data.res.restaurants ?? [],
                burritos: data.res.burritos ?? [],
                lastVisible: data.res.lastVisible,
            };
        }
    }

    

    console.log('hello from the browser ', {browser});
    console.log('hello from the data ', {data});


    let inputElement: HTMLElement;

    let steakBurrito: BurritoData;
    let pedrosTacosSanClemente: RestaurantData;
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
        text: 'wow, simply delicious',
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
        ownerID: null,
        chain: {
            name: "Pedro's Tacos",
            restaurantIDs: null
        },
        reviewIDs: null,
        profilePicture: {
            url: 'https://s3-media0.fl.yelpcdn.com/bphoto/Py7Pfl7vCUpbTeDX9Ennlg/o.jpg',
            alt: 'pedros tacos logo'
        },
        hours: {
            monday: {
                open: '07:00',
                close: '21:00',
            },
            tueday: {
                open: '07:00',
                close: '21:00',
            },
            wednesday: {
                open: '07:00',
                close: '21:00',
            },
            thursday: {
                open: '07:00',
                close: '21:00',
            },
            friday: {
                open: '07:00',
                close: '21:00',
            },
            saturday: {
                open: '07:00',
                close: '21:00',
            },
            sunday: {
                open: '07:00',
                close: '21:00',
            },
        }
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

<body data-theme={themeValue} class="bg-white w-screen h-screen">
   
    <Filters />
    <Search restaurants={searchResults.restaurants} burritos={searchResults.burritos}/>
    <Map 
        address={pedrosTacosSanClemente.address}
        restaurant={pedrosTacosSanClemente}
    />
</body>
