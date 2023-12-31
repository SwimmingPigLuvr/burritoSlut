<script lang="ts">
	import { fly } from 'svelte/transition';
	import { backIn, backOut } from 'svelte/easing';
	import { theme } from '../../stores/stores';
	
	let themeLobser: boolean = true;
	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});
	let showThemes = false;
</script>

{#if themeLobser}
	<!-- theme select -->
	<div class="{showThemes? 'w-56 h-56' : 'w-20 h-20'} rounded-tl-full fixed bottom-0 right-0 bg-primary bg-opacity-30 transform transition-all duration-500 ease-[backOut]">
		<button
			class="z-20 "
			on:mouseenter={() => showThemes = true}
			on:click={() => showThemes = false}
			>
			<button 
				class="fixed bottom-4 right-4 z-20 text-4xl">🦞
			</button>
			{#if showThemes}
				<!-- closest to lobster -->
				<!-- top to bottom -->
				<button 
					in:fly={{x:10, y: 10, duration: 500, easing: backOut, delay: 400}}
					out:fly={{x:10, y: 10, duration: 500, easing: backIn, delay: 0}}
					data-theme='woosh'
					on:mouseenter={() => theme.update(n => 'woosh')}
					class="bg-opacity-0 text-4xl hover:scale-125 fixed right-3 bottom-20 z-20">🥶</button>
				<button 
					in:fly={{x:15, y: 15, duration: 500, easing: backOut}}
					out:fly={{x:15, y: 15, duration: 500, easing: backIn, delay: 400}}
					data-theme='coffee'
					on:mouseenter={() => theme.update(n => 'coffee')}
					class="bg-opacity-0 hover:scale-125 transform transition-all duration-200 ease-in-out text-4xl border-none fixed bottom-[4rem] right-[4rem] z-20">☕️</button>
				<button 
					in:fly={{x:10, y: 10, duration: 500, easing: backOut, delay: 200}}
					out:fly={{x:10, y: 10, duration: 500, easing: backIn, delay: 200}}
					data-theme='business'
					on:mouseenter={() => theme.update(n => 'business')}
					class="bg-opacity-0 hover:scale-125 text-4xl fixed bottom-3 right-20 z-20">👔</button>
				
				<!-- 2nd row -->
				<button 
					in:fly={{x:5, y: 100, duration: 500, easing: backOut, delay: 400}}
					out:fly={{x:5, y: 100, duration: 500, easing: backIn, delay: 0}}
					data-theme='retro'
					on:mouseenter={() => theme.update(n => 'retro')}
					class="bg-opacity-0 text-4xl hover:scale-125 fixed right-2 bottom-36 z-20">🕹️</button>
				<button 
					in:fly={{x:10, y: 100, duration: 500, easing: backOut}}
					out:fly={{x:10, y: 100, duration: 500, easing: backIn, delay: 400}}
					data-theme='acid'
					on:mouseenter={() => theme.update(n => 'acid')}
					class="bg-opacity-0 hover:scale-125 transform transition-all duration-200 ease-in-out text-4xl border-none fixed bottom-[8rem] right-[3.75rem] z-20">🧬</button>
				<button 
					in:fly={{x:100, y: 100, duration: 500, easing: backOut}}
					out:fly={{x:100, y: 100, duration: 500, easing: backIn, delay: 400}}
					data-theme='luxury'
					on:mouseenter={() => theme.update(n => 'luxury')}
					class="bg-opacity-0 hover:scale-125 transform transition-all duration-200 ease-in-out text-4xl border-none fixed bottom-[6.5rem] right-[6.5rem] z-20">💰</button>
				<button 
					in:fly={{x:100, y: 50, duration: 500, easing: backOut}}
					out:fly={{x:100, y: 50, duration: 500, easing: backIn, delay: 400}}
					data-theme='autumn'
					on:mouseenter={() => theme.update(n => 'autumn')}
					class="bg-opacity-0 hover:scale-125 transform transition-all duration-200 ease-in-out text-4xl border-none fixed right-[8rem] bottom-[3.75rem] z-20">🍁</button>
				<button 
					in:fly={{x:100, y: 5, duration: 500, easing: backOut, delay: 200}}
					out:fly={{x:100, y: 5, duration: 500, easing: backIn, delay: 200}}
					data-theme='emerald'
					on:mouseenter={() => theme.update(n => 'emerald')}
					class="bg-opacity-0 hover:scale-125 text-4xl fixed bottom-2 right-36 z-20">🧩</button>

			{/if}
		</button>
	</div>
{/if}


