<script lang='ts'>
    import type { RestaurantData } from "$lib/types";

    let newRestaurant: RestaurantData;

</script>


<div class="p-3">
    
    <div class="flex flex-col mx-auto w-full sm:w-2/3 md:w-1/2 mt-10">
        <form class="flex flex-col font-mono space-y-4" action="/add-new" method="post">
            <div class="flex flex-col space-y-2">
                <label  for="name">Restaurant Name</label>
                <input class="new-restaurant-form-input" type="text" id="restaurant-name" name="name" placeholder="Restaurant Name" required>
            </div>
            <div class="flex flex-col space-y-4 py-4">
                <label class="" for="chain">Is this a chain?</label>
                <div id="chain" class="flex items-start space-x-8 px-2">
                    <div class="flex space-x-2">
                        <label for="yes-option">Yes</label>
                        <input type="radio" id="yes-option" name="yes-no-question" value="yes">
                    </div>
                    <div class="flex space-x-2">
                        <label for="no-option">No</label>
                        <input type="radio" id="no-option" name="yes-no-question" value="no">
                    </div>
                </div>
            </div>
            
            <h3 class="text-xl">Address</h3>
            <div class="flex flex-col">
                <label  for="name">Street</label>
                <input class="new-restaurant-form-input" type="text" id="restaurant-name" name="street" placeholder="Street Address" required>
            </div>

            <div class="flex flex-col">
                <label  for="name">City</label>
                <input class="new-restaurant-form-input" type="text" id="restaurant-name" name="city" placeholder="City" required>
            </div>

            <div class="flex flex-col">
                <label  for="name">State</label>
                <input class="new-restaurant-form-input" type="text" id="restaurant-name" name="state" placeholder="State" required>
            </div>

            <div class="flex flex-col">
                <label  for="name">Zip Code</label>
                <input class="new-restaurant-form-input" type="text" id="restaurant-name" name="zip" placeholder="Zip Code" required>
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