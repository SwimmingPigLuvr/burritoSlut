<!-- what does the review need -->
<!-- userID -->
<!-- burritoID -->
<!-- restaurantID -->

<!-- uplaoding multiple photos -->

<!-- previewurl: {
    url: url,
    caption: caption
} -->

<script lang='ts'>
	import { db, storage, user, userData } from "$lib/firebase";
	import { doc, writeBatch } from "firebase/firestore";
	import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
	import { backIn, backInOut, backOut, cubicInOut } from "svelte/easing";
	import { blur, fade, fly, slide } from "svelte/transition";
	import ImageControls from "./ImageControls.svelte";


    let confirmClose: boolean = false

    let dropZoneFocused: boolean = false
    let fileInput: HTMLInputElement | null

    function triggerFileInput(event: MouseEvent) {
        event.stopPropagation()
        if (fileInput) {
            fileInput.click()
        }
    }

    function handleButtonKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.stopPropagation()
            if (fileInput) {
                fileInput.click()
            }
        }
    }

    function handleModalClose(event: Event) {
        if (reviewPhotos.length > 0) {
            confirmClose = true
        } else {
            isModalOpen = false
        }
    }

    function handleModalReset(event: Event) {
        isModalOpen = false
        confirmClose = false
        reviewPhotos = []
    }

    function onDragOver(event: DragEvent) {
        event.preventDefault()
        dropZoneFocused = true
    }

    function onDragLeave(event: DragEvent) {
        event.preventDefault()
        dropZoneFocused = false
    }

    function onDrop(event: DragEvent) {
        event.preventDefault()
        if (event.dataTransfer?.files) {
            const files = Array.from(event.dataTransfer.files)
            handleFiles(files)
        }
    }

    function handleKeyboardDrop(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            fileInput?.click()
        }
    }

    function handleFiles(files: File[]) {
        for (let file of files) {
            const previewURL = URL.createObjectURL(file)
            reviewPhotos.push({ url: previewURL, caption: `Photo ${reviewPhotos.length + 1}` })
            filesToUpload.push(file)
        }
        reviewPhotos = [...reviewPhotos]
    }

    let isModalOpen: boolean = false

    // photourl needed, caption / category optional
    interface ReviewPhoto {
        url: string
        caption?: string
        category?: string
    }
    

    let reviewID: string
    let caption: string

    let saving: boolean = false
    let saveSuccess: boolean = false
    let uploading: boolean = false
    let uploadSuccess: boolean = false

    let currentImageIndex = 0

    function selectImage(index: number) {
        currentImageIndex = index
    }

    let reviewPhotos: ReviewPhoto[] = []
    let filesToUpload: File[] = []

    async function handleFileSelect(e: Event) {
        const input = e.target as HTMLInputElement
        if (input.files) {
            const files = Array.from(input.files)
            handleFiles(files)
        }
    }

    function updateCaption(index: number, caption: string) {
        reviewPhotos[index].caption = caption
    }

    async function submitReview() {
        console.log('submitting review')
        
        uploading = true;
        uploadSuccess = false

        const batch = writeBatch(db)
        const reviewRef = doc(db, `reviews/${reviewID}`)
        let photoURLs = []

        for (let i = 0; i < filesToUpload.length; i++) {
            const imageFile = filesToUpload[i]
            const storageRef = ref(storage, `reviews/${reviewID}/photos/image${i+1}`)

            const uploadResult = await uploadBytes(storageRef, imageFile)
            const url = await getDownloadURL(uploadResult.ref)
            photoURLs.push(url)
        }

        // 🤓TODO! other review datum
        batch.set(reviewRef, {
            // 🤓 review datum
            photos: photoURLs
        })

        try {
            await batch.commit()
            uploadSuccess = true
        } catch (error) {
            console.error('error submitting review: ', error)
            uploadSuccess = false
        } finally {
            uploading = false
        }


    }

</script>

<div class="p-8">
    <div class="flex flex-col w-full space-y-4">
        <h2 class="font-avenir-bold text-lg">Attach Photos</h2>
        <button 
            on:click={() => isModalOpen = !isModalOpen}
            class="mx-auto bg-white hover:border-4 filter grayscale hover:grayscale-0 w-[90%] h-[100px] border-black border-2"
        >
            <p class="text-5xl">+📸🌯</p>
        </button>

    </div>
    {#if isModalOpen}

        <!-- bg -->
        <button 
            in:fade out:fade
            on:click={handleModalClose}
            class="fixed top-0 left-0 bg-accent w-screen h-screen bg-opacity-100 flex items-center p-4">

            <!-- modal container -->
            <button 
                on:click|stopPropagation
                class="relative hover:cursor-default my-auto bg-white w-full h-[500px] flex items-center p-8">

                    <!-- x button -->
                    {#if !confirmClose}
                        <button 
                            on:click={handleModalClose}
                            class="z-20 btn btn-circle absolute top-4 right-4"
                        >
                                X
                        </button>
                    {/if}

                {#if reviewPhotos.length === 0}
                <!-- inner div (dashed border) -->
                <div 
                    on:dragover={onDragOver}
                    on:dragleave={onDragLeave}
                    on:drop={onDrop}
                    class="{dropZoneFocused ? 'border-primary bg-primary-content bg-opacity-50' : 'border-secondary'} transform transition-all duration-200 ease-in-out relative m-auto h-full w-full border-dashed border-4"
                    role="button"
                    tabindex="0"
                    aria-label="Drag and drop or click to upload photos"
                    on:keydown={handleKeyboardDrop}
                    >
                    <!-- <img src="/images/mountFuji.jpeg" alt="mt. fuji" class="opacity-30 h-full w-full m-auto object-cover"> -->
                    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6">
                        <h3 class="text-center text-3xl font-avenir-demi">Share the perfect photos of your burrito.</h3>

                        <button 
                            class="btn btn-secondary"
                            on:click|stopPropagation={triggerFileInput}
                            on:keydown|stopPropagation={handleButtonKeydown}>
                            Browse Files
                        </button>

                        <input 
                            bind:this={fileInput}
                            on:change|stopPropagation={handleFileSelect}
                            id="file-input"
                            type="file"
                            multiple
                            class="btn hidden"
                            accept="image/png, image/jpeg, image/gif, image/webp"
                        />
                    </div>
                </div>
                {/if}
                
                <!-- pending photos -->
                {#if reviewPhotos.length > 0}

                    {#if confirmClose}
                        <div class="flex flex-col space-y-2">
                            <h2 class="text-lg font-avenir-bold">Your burrito pics aren't uploaded yet</h2>
                            <p class="text-sm font-avenir-regular">Are you sure you want to leave now and lose your progress?</p>
                            <div class="flex space-x-1 w-full">
                                <button 
                                    on:click={handleModalReset}
                                    class="btn">Yes, discard</button>
                                <button 
                                    on:click={() => confirmClose = false}
                                    class="btn btn-primary">No, continue upload</button>
                            </div>
                        </div>
                    {/if}
                    <div class="p-4 overflow-auto w-[800px] h-[484px] flex flex-col space-y-2">
                        {#each reviewPhotos as photo}
                            <div class="w-full h-1/2">
                                <img src={photo.url} alt={photo.caption}>
                            </div>
                        {/each}

                        <div class="absolute bottom-0 items-center space-y-6">
                            <h3 class="text-center text-3xl font-avenir-demi">Attach more photos</h3>

                            <button 
                                class="btn btn-secondary"
                                on:click|stopPropagation={triggerFileInput}
                                on:keydown|stopPropagation={handleButtonKeydown}>
                                Browse Files
                            </button>

                            <input 
                                bind:this={fileInput}
                                on:change|stopPropagation={handleFileSelect}
                                id="file-input"
                                type="file"
                                multiple
                                class="btn hidden"
                                accept="image/png, image/jpeg, image/gif, image/webp"
                            />
                        </div>
                    </div>
                {/if}
            </button>

        </button>

        
        
        
    {/if}

        
</div>