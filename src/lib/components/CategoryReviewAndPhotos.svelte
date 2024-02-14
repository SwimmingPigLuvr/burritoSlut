<script lang="ts">
	import { blur, fade, fly, slide } from 'svelte/transition';
	import { dimensions, reviewPhotos, isModalOpen } from '../../stores/stores';
	import type { Dimension } from '$lib/types';
	import ImageUpload from './ImageUpload.svelte';

	export let index: number;
	export let dimension: Dimension;

	let showPhotos: boolean[] = [];
	let showCaption: boolean[] = [];

	function toggleCaptionPhotos(index: number) {
		showPhotos[index] = !showPhotos[index];
		showCaption[index] = !showCaption[index];
	}

	let openSlideShow: boolean = false;
	let currentCategory: string | null = null;

	function handleOpenSlideShow(category: string) {
		return function () {
			currentCategory = category;
			openSlideShow = true;
		};
	}

	function phocus(oscar: { focus: () => void; }) {
		oscar.focus()
	}
</script>

<div class="">
	<!-- caption + photo tabs -->
	<div class="join rounded-none flex items-center justify-start text-2xl">
		<!-- caption -->
		<button
			on:click={() => toggleCaptionPhotos(index)}
			class:w-[77px]={!showCaption[index]}
			class:grayscale-0={!showCaption[index]}
			class="px-2 bg-white filter grayscale join-item border-2 border-b-0 border-black">📝</button
		>
		<!-- photos -->
		<button
			on:click={() => toggleCaptionPhotos(index)}
			class:w-[77px]={showPhotos[index]}
			class=" px-2 bg-white relative join-item border-2 border-b-0 border-black"
		>
			<span class:grayscale-0={showPhotos[index]} class="filter grayscale"> 📸 </span>
			{#if $reviewPhotos.filter((photo) => photo.category === dimension.name).length > 0}
				<div class="rounded-none absolute px-2 p-1 text-white bg-red-500 -top-2 -right-2 text-xs">
					{$reviewPhotos.filter((photo) => photo.category === dimension.name).length}
				</div>
			{/if}
		</button>
	</div>

	<!-- caption + photo inputs -->
	<div class="w-full border-2 border-black bg-white h-28">
		{#if !showCaption[index]}
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
		{#if showPhotos[index]}
			<div in:fade class="flex space-x- overflow-x-auto overflow-y-hidden h-full bg-white">
				{#if $reviewPhotos.filter((photo) => photo.category === dimension.name).length === 0}
				  	<div class="flex flex-col w-full m-auto">
						<button 
							on:click={() => $isModalOpen = true}
							class="w-full hover:bg-primary h-28 group"
							>Share photos of the <span class="text-primary uppercase group-hover:text-base-100">{dimension.name}</span></button
						>
					</div>
				{/if}
				{#each $reviewPhotos.filter((photo) => photo.category === dimension.name) as photo}
					<button on:click={handleOpenSlideShow(dimension.name)} class="h-full">
						<img src={photo.url} alt="" class="h-full max-w-[10rem]" />
					</button>
					{#if openSlideShow && currentCategory}
						<button
							on:click={() => (openSlideShow = false)}
							class="flex items-center justify-center inset-0 p-4 z-20 fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0"
						>
							<!-- modal -->
							<div class="w-full overflow-x-auto overflow-y-hidden flex space-x-2">
								{#each $reviewPhotos.filter((photo) => photo.category === currentCategory) as photo}
									<div class="p-2 bg-red-500 w-[100px]">
										<img src={photo.url} alt={photo.alt} class="" />
										<p class="p-2 bg-white bg-opacity-50">{photo.caption}</p>
									</div>
								{/each}
							</div>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	textarea {
		border: none;
		overflow: auto;
		outline: none;
		resize: none;
	}
</style>
