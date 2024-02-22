<script lang="ts">
	import { blur, fade, fly, slide } from 'svelte/transition';
	import { dimensions, reviewPhotos, isModalOpen } from '../../stores/stores';
	import type { Dimension } from '$lib/types';
	import ImageUpload from './ImageUpload.svelte';
	import AttachedPhotos from './AttachedPhotos.svelte';
	import { backIn, backOut } from 'svelte/easing';

	export let index: number;
	export let dimension: Dimension;

	let shareAndTellOpen: boolean = false;

	let showPhotos: boolean[] = [];
	let showCaption: boolean[] = [];

	function toggleCaptionPhotos(index: number) {
		showPhotos[index] = !showPhotos[index];
		showCaption[index] = !showCaption[index];
	}

	function handleShowCaption(index: number) {
		showCaption[index] = true
		showPhotos[index] = false
	}

	function handleShowPhotos(index: number) {
		showPhotos[index] = true
		showCaption[index] = false
	}


	let openSlideShow: boolean = false;
	let currentCategory: string | null = null;

	function handleOpenSlideShow(category: string) {
		return function () {
			currentCategory = category;
			openSlideShow = true;
		};
	}

	function phocus(oscar: { focus: () => void }) {
		oscar.focus();
	}

	function openShareAndTell() {
		shareAndTellOpen = true;
	}

	function closeShareAndTell() {
		shareAndTellOpen = false;
	}

	$: categoryPhotosAmount = $reviewPhotos.filter((photo) => photo.category === dimension.name).length
</script>

<div class="p-1">
	<div class="flex justify-between items-center">
		<p>Share your experience</p>
		<!-- caption + photo tabs -->
		<div class="transform transition-all duration-500 ease-in-out">
			<div class="join">
				<!-- caption -->
				<button
					on:click={() => {
						handleShowCaption(index);
						openShareAndTell();
					}}
					class:grayscale-0={showCaption[index]}
					class="hover:grayscale-0 text-3xl filter grayscale"
				>
					📝
				</button>
				<!-- photos -->
				<button
					on:click={() => {
						handleShowPhotos(index);
						openShareAndTell();
					}}
					class="transform transition-all duration-300 ease-in-out"
				>
					<span class:grayscale-0={showPhotos[index]} class="filter grayscale text-3xl hover:grayscale-0"> 📸 </span>

					<!-- if category has any photos -->
					{#if $reviewPhotos.filter((photo) => photo.category === dimension.name).length > 0}

						<div class="rounded-none absolute px-2 p-1 text-white bg-red-500 -top-2 -right-2 text-xs">
						 
							<!-- show number of photos in a category -->
							{categoryPhotosAmount}

						</div>

					{/if}

				</button>
			</div>
		</div>
	</div>

	{#if shareAndTellOpen}
		<!-- caption + photo inputs -->
		<div
			in:fade={{ duration: 500, easing: backOut }}
			out:slide={{ duration: 500, easing: backIn }}
			class="relative w-full border-2 border-black bg-white h-28"
		>
			{#if showCaption[index]}
				<textarea
					in:fade
					use:phocus
					name=""
					id=""
					rows="3"
					class="w-full p-4 h-[100%]"
					placeholder="share your thoughts on the {dimension.name}"
				/>
			{/if}
			<button
				class="absolute hover:bg-opacity-100 z-20 top-1 right-1 btn btn-xs btn-primary bg-opacity-50 rounded-none"
				on:click={() => closeShareAndTell()}>X</button
			>
			{#if showPhotos[index]}
				<AttachedPhotos category={dimension.name} />
			{/if}
		</div>
	{/if}
</div>

<style>
	textarea {
		border: none;
		overflow: auto;
		outline: none;
		resize: none;
	}
</style>
