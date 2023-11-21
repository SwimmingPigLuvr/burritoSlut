<script lang='ts'>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import LogIn from "./LogIn.svelte";
    
    export const ssr = false;

    let autocomplete;
    let inputElement: HTMLInputElement;
    let autocompleteName;
    let inputElementName: HTMLInputElement;

    onMount(() => {
        if (browser) {
            // check if google maps script is loaded
            if (window.google && window.google.maps) {

                // init autocomplete
                inputElement = document.getElementById('inputElement') as HTMLInputElement;
                inputElementName = document.getElementById('inputElementName') as HTMLInputElement;

                console.log('inputElement: ', inputElement);

                const nameOptions = {
                    componentRestrictions: { country: 'us'},
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    types: ["cafe", "meal-delivery", "meal-takeaway", "restaurant", "supermarket"],
                };

                const options = {
                    componentRestrictions: { country: 'us'},
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    types: ["(cities)", "postal_code", "locality", "sublocality"],
                };
                
                autocomplete = new google.maps.places.Autocomplete(inputElement, options);
                autocompleteName = new google.maps.places.Autocomplete(inputElementName, nameOptions);

                // add listener for place_changed event
            } else {
                // handle google maps script not being loaded
                console.log('google maps script not loaded');
                // load the script of listen to see if it's loaded
            }
        }
    });

</script>
<div class="z-20 p-[1.25rem] flex fixed top-0 w-full h-36 md:h-24  justify-end items-end md:items-start transform transition-all duration-1000 ease-in-out">
    <!-- logo -->
    <div class="text-white font-mono font-extrabold -tracking-widest fixed top-[1.75rem] left-[2rem]">
        <!-- BURRITOSLUT -->
        yelp 4 burritos
    </div>
    <!-- searchbar -->
    <div class="bg-white rounded md:-translate-x-[10%] items-center join mx-auto shadow-lg h-10 font-light tracking-widest w-full md:w-[55%]">
        <input bind:this={inputElementName} id="inputElementName" placeholder="breakfast burritos" type="text" class="rounded focus:outline-none tracking-wide text-xs px-4 h-full w-[365px]">
        <p class="scale-y-[2] -translate-y-1 text-slate-100">|</p>
        <input bind:this={inputElement} id="inputElement" placeholder="address, neighborhood, city, state, or zip" type="text" class="focus:outline-none tracking-wide text-xs p-4 w-[365px] h-full">
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
