<script lang="ts">
	import { dimensions } from '../../stores/stores';

	function getRatingMessage(score: number): string {
		if (score === 0) return 'Terrible!';
		else if (score > 0 && score <= 2) return 'Bad';
		else if (score > 2 && score <= 4) return 'Okay';
		else if (score > 4 && score <= 6) return 'Good';
		else if (score > 6 && score <= 8) return 'Very good';
		else if (score > 8 && score < 10) return 'Excellent!';
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

	// Reactive statement to calculate the average score whenever dimensions change
	$: scoresArray = $dimensions.map((dimension) => dimension.score);
	$: averageScore = calculateAverage(scoresArray);
	$: ratingMessage = getRatingMessage(averageScore / 10);
</script>

<div class="w-full font-avenir-bold mx-auto">
	<div class="w-full max-w-[750px] mx-auto text-center">
		<h3 class="text-5xl text-center">{averageScore}</h3>
		<p class="">{ratingMessage}</p>
	</div>
	<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full md:max-w-[750px] mx-auto">
		{#each $dimensions as dimension}
			<div class="">
				<div class="h-10 font-avenir-bold relative text-3xl flex w-full space-x-2 text-left">
					<h3 class="text-primary mx-auto capitalize">{dimension.name}</h3>
				</div>
				<input
					class="
                        {dimension.score <= 2 ? 'range-error' : ''}
                        {dimension.score > 2 && dimension.score <= 5 ? 'range-warning' : ''}
                        {dimension.score > 5 && dimension.score <= 7 ? 'range-secondary' : ''}
                        {dimension.score > 7 && dimension.score < 10 ? 'range-accent' : ''}
                        {dimension.score === 10 ? 'range-success' : ''}
                             range"
					bind:value={dimension.score}
					type="range"
					min="0"
					max="10.0"
					step="0.1"
				/>
				<div class="flex justify-evenly">
					<span class="text-info">{getRatingMessage(dimension.score)}</span>
					<span class="text-secondary">{dimension.score}</span>
				</div>
			</div>
		{/each}
	</div>
</div>
