<script lang="ts">
	import CategoryReviewAndPhotos from './CategoryReviewAndPhotos.svelte';

	import { slide } from 'svelte/transition';
	import { dimensions, reviewPhotos } from '../../stores/stores';

	let showPhotos: boolean[] = [];
	let showCaption: boolean[] = [];

	function toggleCaptionPhotos(index: number) {
		showPhotos[index] = !showPhotos[index];
		showCaption[index] = !showCaption[index];
	}

	function getRatingMessage(score: number): string {
		if (score === 0) return 'Garbage!';
		else if (score > 0 && score <= 2) return 'Terrible';
		else if (score > 2 && score <= 4) return 'Bad';
		else if (score > 4 && score <= 6) return 'Alright';
		else if (score > 6 && score <= 8) return 'Good';
		else if (score > 8 && score < 9) return 'Very Good!';
		else if (score > 9 && score < 10) return 'Excellent';
		else if (score === 10) return 'PERFECT!';
		else return 'Invalid score'; // Fallback message
	}

	function calculateAverage(scores: number[]) {
		// Check if the array is empty
		if (scores.length === 0) {
			return 0; // Return 0 or any other value that makes sense in your context
		}

		// Sum all the numbers in the array
		const sum = scores.reduce((accumulator, current) => accumulator + current, 0);

		// Calculate the average
		const average = Math.round((sum * 10) / scores.length);

		// Return the average
		return average;
	}

	let openSlideShow: boolean = false;
	let currentCategory: string | null = null;

	function handleOpenSlideShow(category: string) {
		return function () {
			currentCategory = category;
			openSlideShow = true;
		};
	}

	// Reactive statement to calculate the average score whenever dimensions change
	$: scoresArray = $dimensions.map((dimension) => dimension.score);
	$: averageScore = calculateAverage(scoresArray);
	$: ratingMessage = getRatingMessage(averageScore / 10);
</script>

<div class="w-full font-avenir-bold mx-auto">
	<div class="w-full flex max-w-[750px] mx-auto text-center">
		<div class="flex flex-col pt-8 pb-10">
			<h3 class="text-5xl text-center">{averageScore}</h3>
			<p class="">{ratingMessage}</p>
		</div>
	</div>
	<div
		class="flex flex-col space-y-8 sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 w-full md:max-w-[1200px] mx-auto"
	>
		{#each $dimensions as dimension, index}
			<div class="flex flex-col space-y-4">
				<div
					class="h-10 font-avenir-bold relative text-5xl items-center px-3 flex w-full justify-between"
				>
					<h3 class="absolute left-0 text-primary mx-auto capitalize">{dimension.name}</h3>
					<span class="text-secondary absolute right-3">
						{#if dimension.score}
							{dimension.score}
						{/if}
					</span>
				</div>
				<input
					class="
						{dimension.score === null ? 'range-info' : ''}
                        {dimension.score && dimension.score <= 2 ? 'range-error' : ''}
                        {dimension.score && dimension.score > 2 && dimension.score <= 5 ? 'range-warning' : ''}
                        {dimension.score && dimension.score > 5 && dimension.score <= 7 ? 'range-secondary' : ''}
                        {dimension.score && dimension.score > 7 && dimension.score < 10 ? 'range-accent' : ''}
                        {dimension.score && dimension.score === 10 ? 'range-success' : ''}
                        range range-lg"
					bind:value={dimension.score}
					type="range"
					min="0"
					max="10.0"
					step="0.1"
				/>

				<CategoryReviewAndPhotos {dimension} {index} />
			</div>
			<hr class="border-2 border-black" />
		{/each}
	</div>
</div>
