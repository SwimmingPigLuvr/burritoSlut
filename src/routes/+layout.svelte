<script>
	import { blur, fly } from 'svelte/transition';
	import '../app.css';
	import { backIn, backInOut, backOut } from 'svelte/easing';
	let theme = 'coffee';
	let showThemes = true;
	export const ssr = false;
</script>

<slot />
<body data-theme={theme}>
	
	<!-- theme select -->
	<div class="{showThemes? 'w-48 h-48' : 'w-20 h-20'} rounded-tl-full fixed bottom-0 right-0 bg-primary bg-opacity-30 transform transition-all duration-500 ease-in-out">
		<button
			class="z-20 "
			on:mouseenter={() => showThemes = true}
			on:click={() => showThemes = false}
			>
			<button 
				class="fixed bottom-4 right-4 z-20 text-2xl">🦞
			</button>
			{#if showThemes}
				<button 
					in:fly={{x:10, y: 10, duration: 500, easing: backOut}}
					out:fly={{x:10, y: 10, duration: 500, easing: backIn, delay: 400}}
					data-theme='coffee'
					on:mouseenter={() => theme = 'coffee'}
					class="bg-opacity-0 hover:animate-bounce text-5xl border-none fixed bottom-[4.5rem] right-[4.5rem] z-20">☕️</button>
				<button 
					in:fly={{x:10, y: 10, duration: 500, easing: backOut, delay: 200}}
					out:fly={{x:10, y: 10, duration: 500, easing: backIn, delay: 200}}
					data-theme='business'
					on:mouseenter={() => theme = 'business'}
					class="bg-opacity-0 hover:animate-bounce text-5xl fixed bottom-4 right-[6.5rem] z-20">👔</button>
				<button 
					in:fly={{x:10, y: 10, duration: 500, easing: backOut, delay: 400}}
					out:fly={{x:10, y: 10, duration: 500, easing: backIn, delay: 0}}
					data-theme='winter'
					on:mouseenter={() => theme = 'winter'}
					class="bg-opacity-0 text-5xl hover:animate-bounce fixed right-4 bottom-[6.5rem] z-20">🥶</button>
			{/if}
		</button>
	</div>
</body>
