<script lang="ts">
	import type { ReviewPhoto } from '$lib/types';
	import { reviewPhotos, isModalOpen, filesToUpload, dropZoneFocused, shownPhotos } from '../../stores/stores';

	function deletePhotoDeprecated(photoId: number) {
		reviewPhotos.update((photos) => photos.filter((photo) => photo.id !== photoId));
		$reviewPhotos = [...$reviewPhotos];
	}

	function deletePhoto(photoId: number) {
		$reviewPhotos = $reviewPhotos.filter(photo => photo.id !== photoId)

		if ($reviewPhotos.length === 0) {
			dropZoneFocused.set(false);
			$isModalOpen = false;
			$reviewPhotos = [];
			$filesToUpload = [];
		}
	}

	export let category = 'none';
	
	$: categoryPhotos = $reviewPhotos.filter(
		(photos) => photos.category === category
	);

	let showCategory: boolean = false;

	// if no category assigned
	$: if (category === 'none') {
		$shownPhotos = $reviewPhotos;
		showCategory = true;
	} else {
		$shownPhotos = categoryPhotos;
	}


</script>

<div class="flex h-full bg-white w-full overflow-x-auto overflow-y-hidden">
	
	<!-- if no attached photos -->
	{#if $reviewPhotos.length === 0}
		<button
			on:click={() => ($isModalOpen = !$isModalOpen)}
			class="mx-auto transform transition-all duration-20 ease-in-out filter grayscale hover:grayscale-0 active:border-0 w-full md:w-[750px] h-full"
		>
			<!-- if category exists -->
			{#if category !== 'none'}
				Share photos of the <span
					class="transform transition-all duration-300 ease-in-out uppercase text-primary"
					>{category}</span
				>
			{:else}
				<span class="text-5xl font-avenir-bold">+📸🌯</span>
			{/if}
		</button>
	{:else if $shownPhotos.length === 0}
		<button
			on:click={() => ($isModalOpen = !$isModalOpen)}
			class="mx-auto transform transition-all duration-20 ease-in-out filter grayscale hover:grayscale-0 active:border-0 w-full md:w-[750px] h-full"
		>
			Share photos of the <span
				class="transform transition-all duration-300 ease-in-out uppercase text-primary"
				>{category}</span
			>
		</button>
	{/if}

	<!-- if category has photos -->
	{#if category !== 'none' && $shownPhotos.length > 0}
		<button
			on:click={() => ($isModalOpen = !$isModalOpen)}
			class="bg-white rounded-none h-full min-w-[125px] w-[150px] border-r-black border-r-2 text-avenir-bold text-lg filter grayscale hover:grayscale-0"
		>
			<!-- add more photos -->
			{#if category !== 'none'}
				Add more <span class="uppercase text-primary">{category}</span> photos
			{:else}
				<span>+📸🌯</span>
			{/if}
		</button>
	{/if}

	<!-- if any photos -->
	{#if category === 'none' && $reviewPhotos.length > 0}
		<button
			on:click={() => ($isModalOpen = !$isModalOpen)}
			class="bg-white rounded-none h-full min-w-[125px] w-[150px] border-r-black border-r-2 text-avenir-bold text-lg filter grayscale hover:grayscale-0"
		>
			<!-- add more photos -->
			{#if category !== 'none'}
				Add more <span class="uppercase text-primary">{category}</span> photos
			{:else}
				<span class="text-5xl font-avenir-bold">+📸🌯</span>
			{/if}
		</button>
	{/if}

	<!-- show photos -->
	{#each $shownPhotos as photo}

		<div class="relative max-h-[125px]">

			<!-- display category upperleft -->
			{#if showCategory}
				<button class="absolute bg-white bg-opacity-50 bottom-6 left-0 text-left p-1 text-xs font-avenir-regular uppercase"
					>{photo.category}</button
				>
			{/if}

			<!-- delete button -->
			<button
				on:click={() => deletePhoto(photo.id)}
				class="btn btn-square btn-xs btn-error bg-opacity-50 rounded-none absolute top-0 right-0 font-avenir-bold text-white"
				>X</button
			>

			<img
				src={photo.url}
				alt={photo.alt}
				class="h-full object-cover min-w-[125px] w-full max-w-[175px]"
			/>

			<!-- display / edit caption -->
			<button
				class="bg-black bg-opacity-50 p-1 text-white font-avenir-regular text-xs absolute bottom-0 w-full text-center text-ellipsis hover:text-clip"
				>{photo.caption}</button
			>

		</div>
	{/each}
</div>
