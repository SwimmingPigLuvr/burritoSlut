<script lang='ts'>
	import { reviewPhotos, isModalOpen } from '../../stores/stores';

    function deletePhoto(photoId: number) {
        reviewPhotos
            .update(photos => photos
                .filter(photo => photo.id !== photoId));
    }
</script>

<div class="flex space-x-2 h-[140px] bg-lime-300 w-full overflow-auto">
	<button
        on:click={() => $isModalOpen = !$isModalOpen}
		class="bg-white rounded-none h-[125px] w-[125px] border-2 border-black text-avenir-bold text-3xl hover:border-4 filter grayscale hover:grayscale-0"
		>+📸🌯</button
	>
	{#each $reviewPhotos as attachedPhoto}
		<div class="relative max-h-[125px]">
			<button
                on:click={() => deletePhoto(attachedPhoto.id)}
				class="btn btn-square btn-xs btn-error bg-opacity-50 rounded-none absolute top-0 right-0 font-avenir-bold text-white"
				>X</button
			>
			<img
				src={attachedPhoto.url}
				alt={attachedPhoto.alt}
				class="max-h-[125px] min-w-[125px] w-full max-w-[175px]"
			/>
			<button
				class="bg-black bg-opacity-50 p-1 text-white font-avenir-regular text-xs absolute bottom-0 w-full text-center text-ellipsis hover:text-clip"
				>{attachedPhoto.caption}</button
			>
		</div>
	{/each}
</div>
