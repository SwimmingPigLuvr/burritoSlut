<script lang='ts'>

// https://developers.google.com/maps/documentation /javascript/examples/places-autocomplete-addressform

	import { enhance } from "$app/forms";
    import type { RestaurantData } from "$lib/types";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { writable } from "svelte/store";

    // form store
    // let initialFormState = {
    //     name: '',
    //     chain: '',
    //     address: {
    //         street: '',
    //         city: '',
    //         state: '',
    //         zip: '',
    //     }
    // };

    // const form = writable(initialFormState);

    let autocomplete: google.maps.places.Autocomplete;
    let streetField: HTMLInputElement;
    let streetLine2Field: HTMLInputElement;
    let cityField: HTMLInputElement;
    let stateField: HTMLInputElement;
    let zipField: HTMLInputElement;

    function initAutocomplete() {
        streetField = document.querySelector("#street_address") as HTMLInputElement;
        streetLine2Field = document.querySelector("address_line_2") as HTMLInputElement;
        cityField = document.querySelector("#city") as HTMLInputElement;
        stateField = document.querySelector("#state") as HTMLInputElement;
        zipField = document.querySelector("#zip") as HTMLInputElement;

        autocomplete = new google.maps.places.Autocomplete(streetField, {
            componentRestrictions: { country: 'us'},
            fields: ["address_components", "geometry"],
            types: ["address"],
        });
        streetField.focus();
        autocomplete.addListener("place_changed", fillInAddress);
    }

    function fillInAddress() {
        const place = autocomplete.getPlace();
        let street = '';
        let streetLine2 = '';
        let city = '';
        let state = '';
        let zip = '';

        for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
            // @ts-ignore remove once typings fixed
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    street = `${component.long_name} ${street}`;
                    break;
                }

                case "route": {
                    street += component.short_name;
                    break;
                }

                case "postal_code": {
                    zip = `${component.long_name}${zip}`;
                    break;
                }

                case "postal_code_suffix": {
                    zip = `${zip}-${component.long_name}`;
                    break;
                }

                case "locality":
                    (document.querySelector("#locality") as HTMLInputElement).value =
                        component.long_name;
                        break;

                case "administrative_area_level_1": {
                    (document.querySelector("#state") as HTMLInputElement).value =
                    component.short_name;
                    break;
                }

                case "country":
                    (document.querySelector("#country") as HTMLInputElement).value =
                    component.long_name;
                    break;
            }
        }

        streetField.value = street;
        cityField.value = city;
        stateField.value = state;
        zipField.value = zip;

        streetLine2Field.focus();
    }

    onMount(() => {
        if (browser) {
            window.initAutocomplete = initAutocomplete;
        }
    })

    export let data: PageData;
    const { form } = superForm(data.form, {
        dataType: 'json'
    });
    

    let newRestaurant: RestaurantData;


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
                <label  for="street_address">Street Adress</label>
                <input bind:value={$form.address.street} class="new-restaurant-form-input" type="text" id="street_address" name="street_address" placeholder="Street Address" required>
            </div>

            <div class="flex flex-col">
                <label  for="address_line_2">Address Line 2</label>
                <input bind:value={$form.address.streetLine2} class="new-restaurant-form-input" type="text" id="address_line_2" name="address_line_2" placeholder="Apartment, Suite, etc..." required>
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
        padding: 5px 2px 0px 10px;
        font-family: monospace;
        border-radius: 5px;
    }
</style>