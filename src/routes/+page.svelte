<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import Slider from "$lib/components/Slider.svelte";
	import ThemeLobster from "$lib/components/ThemeLobster.svelte";
    

    import { theme } from '../stores/stores';
	
	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});

	const withSearchBar: string = 'nav with search bard'

</script>

<Nav simple={false} />



<body data-theme={themeValue} class="bg-white w-screen h-screen">
    <Slider />
    
	<ThemeLobster />
</body>


