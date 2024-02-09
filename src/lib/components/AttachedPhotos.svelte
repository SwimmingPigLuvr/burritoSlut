<script>
    import { reviewPhotos } from "../../stores/stores";
</script>

<div class="flex space-x-2 h-[140px] bg-lime-300 w-full overflow-x-auto">
    <button class="btn btn-outline rounded-none h-[125px] w-[125px] border-2 border-black text-avenir-bold text-3xl">+📸🌯</button>
    {#each $reviewPhotos as attachedPhoto}
        <div class="relative">
            <button class="btn btn-square btn-xs btn-error bg-opacity-50 rounded-none absolute top-0 right-0 font-avenir-bold text-white">X</button>
            <img src={attachedPhoto.url} alt={attachedPhoto.alt} class="">
            <button class="font-avenir-regular text-xs bottom-0 w-full text-center text-ellipsis">{attachedPhoto.caption}</button>
        </div>
    {/each}
</div>