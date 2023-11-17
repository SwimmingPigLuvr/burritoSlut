<script lang='ts'>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import LogIn from "./LogIn.svelte";
    let inputElement: HTMLInputElement;
    let autocomplete;

    onMount(() => {
        if (browser) {
            // check if google maps script is loaded
            if (window.google && window.google.maps) {
                // init autocomplete
                inputElement = document.getElementById('inputElement') as HTMLInputElement;
                console.log('inputElement: ', inputElement);
                autocomplete = new google.maps.places.Autocomplete(inputElement, { /* options */});
                // add listener for place_changed event
            } else {
                // handle google maps script not being loaded
                console.log('google maps script not loaded');
                // load the script of listen to see if it's loaded
            }
        }
    });

</script>
<div class="p-[1.25rem] flex fixed top-0 w-full h-36 md:h-24 bg-white justify-end items-end md:items-start transform transition-all duration-1000 ease-in-out">
    <!-- logo -->
    <div class="font-black fixed top-[1.75rem] left-[2rem]">
        BURRITOSLUT
        ⚡︎⚡️⚡︎
    </div>
    <!-- searchbar -->
    <div class=" items-center join mx-auto shadow-lg h-10 rounded-none font-light tracking-widest w-full md:w-1/2">
        <input placeholder="breakfast burritos" type="text" class="focus:outline-none tracking-wide text-xs px-4 h-full w-[365px]">
        <p class="scale-y-[2] -translate-y-1 text-slate-50">|</p>
        <input bind:this={inputElement} id="inputElement" placeholder="address, neighborhood, city, state, or zip" type="text" class="focus:outline-none tracking-wide text-xs p-4 w-[365px] h-full">
        <p class="scale-y-[2] -translate-y-1 text-slate-50">|</p>
        <button class="px-4 w-14 h-full items-center text-2xl hover:rotate-[30deg] transform transition-all duration-500 ease-in-out">🔍</button>
    </div>
    <!-- write a review / restaurant login -->
    <div class="absolute md:relative top-[1.5rem] md:top-[4.5rem] right-1/3 flex space-x-2">
        <button class="rounded-md  p-2 px-4  text-xs bg-transparent hover:bg-primary hover:bg-opacity-30">
            Write a Review
        </button>
        <button class="rounded-md  p-2 px-4  text-xs bg-transparent hover:bg-primary hover:bg-opacity-30">
            Restaurant Login
        </button>

    </div>

    <LogIn />

    


    
</div>
