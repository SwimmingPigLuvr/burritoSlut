<script lang="ts">
	import CategoryReviewAndPhotos from './CategoryReviewAndPhotos.svelte';

	import { slide } from 'svelte/transition';
	import { dimensions, reviewPhotos } from '../../stores/stores';
	import { set } from 'zod';

	let showPhotos: boolean[] = [];
	let showCaption: boolean[] = [];

	let rangeSlider: boolean = false;
	let blockSlider: boolean = true;
	let stars: number[] = [
		0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10
	];

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

	let hoverScore: number;
	let score: number;

	function ratingHover(index: number) {}

	function toggleSlider() {
		rangeSlider = !rangeSlider;
		blockSlider = !blockSlider;
	}

	// update scores
	function setScore(index: number, score: number) {
		$dimensions[index].score = score;
	}

	let currentHoverIndex = -1;
	let currentHoverScore = 0;

	// update hover states
	function updateHover(index: number, score: number) {
		currentHoverIndex = index;
		currentHoverScore = score;
	}
</script>

<div class="w-full font-avenir-bold mx-auto">
	<!-- <div class="w-full flex max-w-[750px] mx-auto text-center">
		<div class="flex flex-col pt-8 pb-10">
			<h3 class="text-5xl text-center">{averageScore}</h3>
			<p class="">{ratingMessage}</p>
		</div>
	</div> -->
	<div class="flex flex-col space-y-8 w-full md:max-w-[1200px] mx-auto py-8">
		<!-- input type -->
		<div>
			<button class="btn rounded-none" on:click={() => toggleSlider()}>Slider</button>
			<button class="btn rounded-none" on:click={() => toggleSlider()}>Blocks</button>
		</div>

		{#each $dimensions as dimension, index}
			<div class="flex flex-col space-y-4">
				<div class="text-secondary flex space-x-8 h-10 font-avenir-bold relative text-5xl px-3">
					<h3 class="capitalize">{dimension.name}</h3>
					<span class="">
						{#if dimension.score}
							{dimension.score}
						{/if}
					</span>
				</div>

				{#if rangeSlider}
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
				{/if}
				{#if blockSlider}
					<div class="flex space-x- w-full sm:w-fit border-4 border-black relative">
						{#each stars as star}
							<button
								on:mouseenter={() => updateHover(index, star)}
								on:mouseleave={() => updateHover(-1, $dimensions[index].score || 0)}
								on:click={() => setScore(index, star)}
								class="
									{(currentHoverIndex === index && currentHoverScore >= star) || ($dimensions[index].score !== null && $dimensions[index].score || 0 >= star)
									? 'bg-primary'
									: 'bg-primary-content'}
									{star % 1 === 0 && star !== 10 ? 'border-r-2 border-black' : 'border-none'}
									bg-opacity-[${currentHoverScore * 10}]
									h-5 w-5 sm:h-10 transform transition-all duration-500 ease-in-out p-1"
							/>
						{/each}
					</div>
				{/if}
			</div>
			<hr class="border-2 border-black" />
		{/each}
	</div>
</div>
