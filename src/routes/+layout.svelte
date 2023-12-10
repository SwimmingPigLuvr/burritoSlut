<script lang="ts">
  import ThemeLobster from '../lib/components/ThemeLobster.svelte';

	import { blur, fly } from 'svelte/transition';
	import '../app.css';
	import { backIn, backInOut, backOut } from 'svelte/easing';
	import { theme } from '../stores/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { RestaurantData, BurritoData } from '$lib/types';

	let themeValue: string;
	theme.subscribe((value) => {
		themeValue = value;
	});

	

	
</script>

<slot />

<body data-theme={themeValue}>

	
</body>
