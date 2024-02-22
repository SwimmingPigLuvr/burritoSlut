<script lang="ts">
	import {
		reviewPhotos,
		dropZoneFocused,
		isModalOpen,
		filesToUpload,
		dimensions,
		photoCategory
	} from '../../stores/stores';
	import type { ReviewPhoto } from '$lib/types';

	export let photo: ReviewPhoto;

	let caption: string;

	function deletePhoto(photoId: number) {
		let indexToDelete = -1;

		reviewPhotos.update((photos) => {
			const filteredPhotos = photos.filter((photo, index) => {
				if (photo.id !== photoId) return true;
				indexToDelete = index; // Capture the index to delete
				return false;
			});
			return filteredPhotos;
		});

		if (indexToDelete !== -1) {
			filesToUpload.update((files) => {
				return files.filter((_, index) => index !== indexToDelete);
			});
		}

		if ($reviewPhotos.length === 0) {
			dropZoneFocused.set(false);
			$isModalOpen = false;
			$reviewPhotos = [];
			$filesToUpload = [];
		}
	}

	function updateCaption(photoId: number, caption: string) {
		reviewPhotos.update((photos: ReviewPhoto[]) => {
			return photos.map((photo) => {
				if (photo.id === photoId) {
					return { ...photo, caption: caption };
				}
				return photo;
			});
		});
	}

	function handleCaptionChange() {
		updateCaption(photo.id, caption);
	}
</script>

<div class="relative flex flex-col space-y-2 w-full">
	<div class="w-full h-[169px] overflow-hidden">
		<img src={photo.url} alt={photo.alt} class="w-full h-full object-cover" />
	</div>

	<button
		on:click={() => deletePhoto(photo.id)}
		class="absolute -top-0 text-white right-2 btn btn-sm btn-square text-xl text-center btn-error bg-opacity-50 rounded-none"
	>
		X
	</button>
	<!-- controls -->
	<div class="flex flex-col">
		<!-- caption input -->
		<div class="w-full flex flex-col text-left space-y-2">
			<label for="caption"><strong>Caption</strong> (optional)</label>
			<textarea
				class="font-avenir-regular p-2 border-2 border-black"
				on:change={handleCaptionChange}
				name="caption"
				id="caption"
				rows="2"
				bind:value={caption}
			/>
		</div>
	</div>

	<!-- category input -->
	<div class="w-full flex flex-col text-left space-y-2">
		<label for="category"><strong>Category</strong> (optional)</label>
		<select class="" name="category" id="category" bind:value={photo.category}>
				<option value='none'>none</option>
			{#each $dimensions as dimension}
				<option value={dimension.name}>{dimension.name}</option>
			{/each}
		</select>
	</div>
	<br />
</div>

<style>
</style>
