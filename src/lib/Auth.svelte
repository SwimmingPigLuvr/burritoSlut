<script lang="ts">
    import { auth2 } from './auth'
    import { session } from './session'
</script>

{#if $session.user}
    <button on:click={() => auth2.signOut()}>SIGN OUT</button>
    {$session.user.name} ($session.user.email)
{:else}
    <button on:click={() => auth2.signInWith('google')}>sign in with google</button>
{/if}