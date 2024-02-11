<script lang="ts">
	import { dimensions } from '../../stores/stores';
</script>

<div class="w-full sm:max-w-[750px] font-avenir-bold mx-auto p-8">
	<div class="grid gap-4 grid-cols-2 w-full sm:max-w-[500px] mx-auto">
		{#each $dimensions as dimension}
			<div>
				<div class="font-avenir-bold text-5xl flex flex-col space-2 text-left">
					<h3 class="text-primary">{dimension.name}</h3>
					<span class="text-secondary">{dimension.score}</span>
				</div>
				<input
					class="range range-accent"
					bind:value={dimension.score}
					type="range"
					min="0"
					max="10.0"
					step="0.1"
				/>
			</div>
		{/each}
	</div>
</div>
