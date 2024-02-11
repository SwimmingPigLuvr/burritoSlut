<script lang="ts">
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import RatingSystem from '$lib/components/RatingSystem.svelte';
	import { dimensions } from '../../stores/stores';
</script>

<div class="w-screen h-screen flex flex-col bg-primary-content">
	<RatingSystem />
	<ImageUpload />
</div>

<style></style>
