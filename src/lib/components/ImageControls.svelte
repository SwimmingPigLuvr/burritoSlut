<script lang="ts">

    let deleteMsg: boolean
    let captionMsg: boolean
    let categoryMsg: boolean

    function deleteImage() {

    }

    function addCaption() {

    }

    function assignCategory() {

    }
</script>

<div class="flex space-x-2 p-8 bg-orange-500">
    <button 
        class="relative btn btn-sm text-xl text-red-700"
        on:mouseenter={() => deleteMsg = true}
        on:mouseleave={() => deleteMsg = false}
    >
        <p>X</p>
        {#if deleteMsg}
            <p class="absolute -top-6 text-xs w-[20rem]">Delete Image</p>
        {/if}
    </button>
    
</div>