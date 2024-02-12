<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import RatingSystem from '$lib/components/RatingSystem.svelte';
	import { dimensions } from '../../stores/stores';

	let burrito = 'Breakfast Burrito';
	let restaurant = 'Greasy Grove';
</script>

<Nav />
<div
	class="h-screen w-screen overflow-x-hidden overflow-y-auto flex flex-col space-y-4 bg-primary-content p-8"
>
	<!-- text area -->
	<div class="mt-32 md:mt-20" />
	<div class="mx-auto w-full text-3xl font-avenir-bold max-w-[750px]">
		<h1 class="text-left">
			Rate the <span class="text-primary">{burrito}</span> from
			<span class="text-secondary">{restaurant}</span>.
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
	<ImageUpload />
	<div class="flex justify-end w-full max-w-[750px] mx-auto">
		<button class="btn btn-primary rounded-none font-avenir-bold">Submit Rating</button>
	</div>
</div>

<style></style>
