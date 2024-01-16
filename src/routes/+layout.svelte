<script lang="ts">
	import { theme } from '../stores/stores';
	import { invalidateAll } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData

	function signOut() {
		// DELETE /session endpoint to clear session cookie
		invalidateAll()
	}

	function signIn() {
		// POST /session endpoint to set session cookie
		invalidateAll()
	}

	// subscribe to theme store
	let themeValue: string;
	theme.subscribe((value) => {
		themeValue = value;
	});
	
</script>

<body data-theme={themeValue}>

{#if data.session.user}
	Welcome {data.session.user.name}
	<button on:click={signOut}>sign out</button>
{:else}
	Welcome Visitor
	<button on:click={signIn}>Sign in</button>
{/if}

<slot />
	
</body>
