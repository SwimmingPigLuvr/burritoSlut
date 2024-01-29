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

    function onDragOver(event: DragEvent) {
        event.preventDefault()
    }

    function onDrop(event: DragEvent) {
        event.preventDefault()
        if (event.dataTransfer?.files) {
            const files = Array.from(event.dataTransfer.files)
            handleFiles(files)
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
            on:click={() => isModalOpen = !isModalOpen}
            class="fixed top-0 left-0 bg-accent w-screen h-screen bg-opacity-100 flex items-center p-4">

            <!-- modal -->
            <button 
                on:click|stopPropagation
                class="hover:cursor-default my-auto bg-white w-full h-[500px] flex items-center p-8">

                {#if reviewPhotos.length === 0}
                <!-- inner div (dashed border) -->
                <div class="relative m-auto h-full w-full border-dashed border-secondary border-4">
                    <button 
                        on:click={() => isModalOpen = !isModalOpen}
                        class="btn btn-circle absolute -top-4 -right-4"
                    >
                            X
                    </button>
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
                
                {#if reviewPhotos.length > 0}
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