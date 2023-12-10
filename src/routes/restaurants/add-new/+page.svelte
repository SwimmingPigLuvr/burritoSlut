<script lang='ts'>
	import { enhance } from "$app/forms";
    import type { RestaurantData } from "$lib/types";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { loadGoogleMapsScript } from "$lib/map";

    export let data: PageData;
    const { form } = superForm(data.form, {
        dataType: 'json'
    });
    

    let newRestaurant: RestaurantData;

    onMount(async () => {
        if (browser && typeof google === 'undefined') {
            try {
                // await loadGoogleMapsScript();
                console.log('restys/add-new: browser and google undefined');
            } catch (error) {
                console.error('Error loading Google Maps:', error);
            }
        }
    });

</script>


<div class="p-3">
    <div class="text-primary font-mono font-extrabold -tracking-widest fixed top-[1.75rem] left-4 sm:left-[2rem]">
        <!-- BURRITOSLUT -->
        yelp 4 burritos
    </div>
    
    <div class="flex flex-col mx-auto sm:ml-[1rem] md:ml-[5rem] max-w-[500px] w-full sm:w-[600px] md:w-[500px] mt-20 transform transition-all duration-1000 ease-in-out">
        <form 
            use:enhance
            class="flex flex-col font-mono space-y-4" 
            action="add-new" 
            method="POST">
            <div class="flex flex-col space-y-2">
                <label  for="restaurant-name">Restaurant Name</label>
                <input bind:value={$form.name} class="new-restaurant-form-input" type="text" id="restaurant-name" name="name" placeholder="Restaurant Name" required>
            </div>
            <div class="flex flex-col space-y-2">
                <label  for="chain-name">Name of Chain (optional)</label>
                <input bind:value={$form.chain} class="new-restaurant-form-input" type="text" id="chain-name" name="chain-name" placeholder="Chain Name">
            </div>
            
            
            <h3 class="text-xl pt-6">Address</h3>
            <div class="flex flex-col">
                <label  for="street">Street</label>
                <input bind:value={$form.address.street} class="new-restaurant-form-input" type="text" id="street" name="street" placeholder="Street Address" required>
            </div>

            <div class="flex flex-col">
                <label  for="city">City</label>
                <input bind:value={$form.address.city} class="new-restaurant-form-input" type="text" id="city" name="city" placeholder="City" required>
            </div>

            <div class="flex flex-col">
                <label  for="state">State</label>
                <input bind:value={$form.address.state} class="new-restaurant-form-input" type="text" id="state" name="state" placeholder="State" required>
            </div>

            <div class="flex flex-col">
                <label  for="zip">Zip Code</label>
                <input bind:value={$form.address.zip} class="new-restaurant-form-input" type="text" id="zip" name="zip" placeholder="Zip Code" required>
            </div>


            <button class="btn" type="submit">Add Restaurant</button>
        </form>

    </div>

</div>



<style>
    .new-restaurant-form-input {
        height: 37px;
        padding: 4px 8px;
        font-family: monospace;
    }
</style>