<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import RatingSystem from '$lib/components/RatingSystem.svelte';
	import { reviewPhotos } from '../../stores/stores';
	import { onMount } from 'svelte'

    const simple: boolean = true

	let burrito = 'Breakfast Burrito'
	let restaurant = 'Greasy Grove'

	let currentY = 0
	let lastY = 0
	let showNav: boolean = true

	function updateShowNav() {
		const direction = currentY - lastY 
		showNav = direction < 0 || currentY <= 0
		lastY = currentY
	}

	$: currentY, updateShowNav()

</script>

<svelte:window bind:scrollY={currentY} />

{#if showNav}
	<Nav simple={true} />
{/if}

<div class="min-h-[200vh] h-screen w-screen overflow-x-hidden overflow-y-auto flex flex-col space-y-4 bg-white p-8">
	<div class="max-w-xl w-full mx-auto">

		<!-- text area -->
		<div class="mt-20" />
			<div class="mx-auto w-full text-3xl font-avenir-bold max-w-[750px]">
				<h1 class="text-left">
					Rate the <a href="/restaurants/{burrito}" class="text-primary hover:underline">{burrito}</a> from
					<a href="/restaurants/{restaurant}" class="text-secondary hover:underline">{restaurant}</a>.
				</h1>
			</div>
		<div class="w-full sm:max-w-[750px] mx-auto">
			<textarea
				name="review"
				id="review"
				cols="30"
				rows="10"
				class="w-full mx-auto p-4 border-2 border-black font-avenir-bold text-lg"
				placeholder="Share some thoughts about your experience with this burrito."
			/>
		</div>
		<RatingSystem />

			<h2 class="font-avenir-bold text-lg mx-auto w-full text-left">

				{#if $reviewPhotos.length === 0}
					Attach photos
				{:else}
					All photos
				{/if}
			</h2>
		<ImageUpload />
		<div class="flex justify-end w-full max-w-[750px] mx-auto">
			<button class="btn btn-primary rounded-none font-avenir-bold">Submit Rating</button>
		</div>
	</div>
</div>

<style>
</style>
