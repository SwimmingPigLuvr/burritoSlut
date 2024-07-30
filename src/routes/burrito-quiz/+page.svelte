<script>

	import { dimensions } from "../../stores/stores";
	import Nav from '$lib/components/Nav.svelte';

    let categories = dimensions;

</script>

<Nav />
<body class="flex flex-col sm:flex-row overflow-y-auto overflow-x-hidden pt-[300px]">


    <!-- content left -->
    <div class="bg-red-500 max-w-[300px] sm:max-w-[600px] h-screen p-8 m-auto mt-[1000px]">

        {#each $dimensions as dimension}
            <div class="bg-white p-8 w-32 h-[200px] m-auto">
                <h2>How was the {dimension.name}?</h2>
                <div class="flex space-x-2">
                    <button class="btn">Terrible</button>
                    <button class="btn">Not Good</button>
                    <button class="btn">Good</button>
                    <button class="btn">Amazing</button>
                </div>
            </div>
        {/each}
    </div>

    <!-- links / suggestions right -->

    <div>

    </div>
</body>