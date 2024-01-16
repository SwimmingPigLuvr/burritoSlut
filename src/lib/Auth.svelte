<script lang="ts">
    import { auth } from './auth'
    import { session } from './session'
</script>

{#if $session.user}
    <button on:click={() => auth.signOut()}>SIGN OUT</button>
    {$session.user.name} ($session.user.email)
{:else}
    <button on:click={() => auth.signInWith('google')}>sign in with google</button>
{/if}