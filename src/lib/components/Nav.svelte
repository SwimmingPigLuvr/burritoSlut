<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import LogIn from './LogIn.svelte';
	import { page } from '$app/stores';
	import { theme, safeMode } from '../../stores/stores';
	import { backIn, backOut, cubicInOut } from 'svelte/easing';
	import { blur, fly } from 'svelte/transition';

	export let simple: boolean = false;

	function toggleSafeMode() {
		safeMode.set(!localSafeMode);
	}

	interface CustomAutocomplete extends google.maps.places.Autocomplete {
		inputId?: string;
	}

	// get current url as var
	$: currentPath = $page.url.pathname;

	// homepage navbar will be transparent
	let isHomePage: boolean = false;
	$: if (currentPath === '/') {
		isHomePage = true;
	}

	let selectedTheme = 'garden'; // Local component state
	let localSafeMode: boolean;

	$: localSafeMode = $safeMode;

	// Watch the local selectedTheme for changes and update the store
	$: theme.set(selectedTheme);

	onMount(() => {
		if (browser) {
			const center = { lat: 50.064192, lng: -130.605469 };
			const defaultBounds = {
				north: center.lat + 0.1,
				south: center.lat - 0.1,
				east: center.lng + 0.1,
				west: center.lng - 0.1
			};

			let nameAutocomplete;
			let locationAutocomplete;

			// init input elements
			let nameInput = document.getElementById('nameInputElement');
			let locationInput = document.getElementById('locationInputElement');

			const nameOptions = {
				componentRestrictions: { country: 'us' },
				fields: ['address_components', 'geometry', 'icon', 'name'],
				strictBounds: false,
				types: ['cafe', 'meal-delivery', 'meal-takeaway', 'restaurant', 'supermarket']
			};

			const locationOptions = {
				componentRestrictions: { country: 'us' },
				fields: ['address_components', 'geometry', 'icon', 'name'],
				strictBounds: false,
				bounds: defaultBounds,
				types: ['(cities)', 'postal_code', 'locality', 'sublocality']
			};

			if (nameInput) {
				nameAutocomplete = new google.maps.places.Autocomplete(
					nameInput as HTMLInputElement,
					nameOptions
				) as CustomAutocomplete;
				nameAutocomplete.inputId = 'nameInputElement';
				nameAutocomplete.addListener('place_changed', fillIn);
			}
			if (locationInput) {
				locationAutocomplete = new google.maps.places.Autocomplete(
					locationInput as HTMLInputElement,
					locationOptions
				) as CustomAutocomplete;
				locationAutocomplete.inputId = 'locationInputElement';
				locationAutocomplete.addListener('place_changed', fillIn);
			}

			function fillIn(this: google.maps.places.Autocomplete) {
				// console.log(this.inputId);
				var place = this.getPlace();
			}
		}
	});
</script>

<div
	class="{isHomePage
		? `bg-none border-b-0 border-b-transparent`
		: `bg-white border-b-black border-b-2`}  z-20 p-[1.25rem] flex fixed top-0 w-full {!simple
		? 'h-36'
		: 'h-24'} justify-end items-end md:items-start transform transition-all duration-1000 ease-in-out"
>
	<!-- logo -->
	<a
		href="/"
		class="{!isHomePage
			? `text-black`
			: `text-primary-content`} font-avenir-bold text-xl fixed top-[1.75rem] left-[2rem]"
	>
		BURRITO
		{#if !$safeMode}
			<span in:blur={{ amount: 100, duration: 500, easing: cubicInOut }}> SLUT</span>
		{:else}
			<span in:blur={{ amount: 100, duration: 500, easing: cubicInOut }}>FINDER</span>
		{/if}
	</a>

	{#if !simple}
		<!-- searchbar -->
		<div
			class="bg-white border-2 border-black rounded-none md:-translate-x-[10%] items-center join mx-auto shadow-lg h-10 font-light tracking-widest w-full md:w-[55%]"
		>
			<!-- left search box -->
			<input
				id="nameInputElement"
				placeholder="breakfast burritos"
				type="text"
				class="bg-white rounded focus:outline-none tracking-wide text-xs px-4 h-full w-[365px]"
			/>

			<p class="scale-y-[2] -translate-y-1 text-black">|</p>

			<!-- right search box -->
			<input
				id="locationInputElement"
				placeholder="address, neighborhood, city, state, or zip"
				type="text"
				class="bg-white focus:outline-none tracking-wide text-xs p-4 w-[365px] h-full"
			/>

			<p class="scale-y-[2] -translate-y-1 text-black">|</p>
			<button
				class="px-4 w-14 h-full items-center text-2xl hover:rotate-[30deg] transform transition-all duration-500 ease-in-out"
				>🔍</button
			>
		</div>
	{/if}

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

<div class="fixed bottom-4 left-4 z-50">
	<input type="checkbox" on:change={toggleSafeMode} checked={$safeMode} />
</div>

<style>
	input::placeholder {
		color: black;
	}
</style>
