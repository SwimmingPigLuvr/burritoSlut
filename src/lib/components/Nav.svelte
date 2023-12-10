<script lang='ts'>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import LogIn from "./LogIn.svelte";
	import { page } from "$app/stores";

    // get current url as var
    $: currentPath = $page.url.pathname;
    
    // homepage navbar will be transparent
    let isHomePage: boolean = false;
    if (currentPath === '/') {
        isHomePage = true;
    };

    let nameAutocomplete;
    let locationAutocomplete;

    // init input elements
    let nameInput: HTMLInputElement;
    let locationInput: HTMLInputElement ;


    // look into why we had the input element as a store in the first place
    // $: if (inputElement) {
    //     inputElementStore.set(inputElement);
    // }

    onMount(async () => {
        if (browser) {
            const center = { lat: 50.064192, lng: -130.605469};
            const defaultBounds = {
                north: center.lat + 0.1,
                south: center.lat - 0.1,
                east: center.lng + 0.1,
                west: center.lng - 0.1,
            };

            const nameOptions = {
                componentRestrictions: { country: 'us'},
                fields: ["address_components", "geometry", "icon", "name"],
                strictBounds: false,
                types: ["cafe", "meal-delivery", "meal-takeaway", "restaurant", "supermarket"],
            };

            const locationOptions = {
                componentRestrictions: { country: 'us'},
                fields: ["address_components", "geometry", "icon", "name"],
                strictBounds: false,
                bounds: defaultBounds,
                types: ["(cities)", "postal_code", "locality", "sublocality"],
            };

            nameAutocomplete = new google.maps.places.Autocomplete(nameInput, nameOptions);
            locationAutocomplete = new google.maps.places.Autocomplete(locationInput, locationOptions);


        }
    });

    

</script>
<div class="{currentPath === '/' ? `bg-none` : `bg-white`} z-20 p-[1.25rem] flex fixed top-0 w-full h-36 md:h-24  justify-end items-end md:items-start transform transition-all duration-1000 ease-in-out">
    <!-- logo -->
    <a href="/" class="text-primary font-mono font-extrabold -tracking-widest fixed top-[1.75rem] left-[2rem]">
        <!-- BURRITOSLUT -->
        yelp 4 burritos

    </a>
    <!-- searchbar -->
    <div class="bg-white rounded md:-translate-x-[10%] items-center join mx-auto shadow-lg h-10 font-light tracking-widest w-full md:w-[55%]">

        <!-- left search box -->
        <input bind:this={nameInput} id="nameInputElement" placeholder="breakfast burritos" type="text" class="rounded focus:outline-none tracking-wide text-xs px-4 h-full w-[365px]">

        <p class="scale-y-[2] -translate-y-1 text-slate-100">|</p>

        <!-- right search box -->
        <input bind:this={locationInput} id="locationInputElement" placeholder="address, neighborhood, city, state, or zip" type="text" class="focus:outline-none tracking-wide text-xs p-4 w-[365px] h-full">

        <p class="scale-y-[2] -translate-y-1 text-slate-100">|</p>
        <button class="px-4 w-14 h-full items-center text-2xl hover:rotate-[30deg] transform transition-all duration-500 ease-in-out">🔍</button>
    </div>
    <!-- write a review / restaurant login -->
    <!-- <div class="absolute md:relative top-[1.5rem] md:top-[4.5rem] right-1/3 flex space-x-2">
        <button class="rounded-md  p-2 px-4  text-xs bg-transparent hover:bg-primary hover:bg-opacity-30">
            Write a Review
        </button>
        <button class="rounded-md  p-2 px-4  text-xs bg-transparent hover:bg-primary hover:bg-opacity-30">
            Restaurant Login
        </button>

    </div> -->

    <LogIn />

    


    
</div>
