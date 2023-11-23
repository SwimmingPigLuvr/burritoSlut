<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import Slider from "$lib/components/Slider.svelte";
    

    import { theme } from '../stores/stores';
	
	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});

</script>

<Nav />



<body data-theme={themeValue} class="bg-white w-screen h-screen">
    <Slider />
    
   
</body>


