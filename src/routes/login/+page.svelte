<script lang='ts'>
	import { auth, user, userData } from "$lib/firebase";
	import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
	import { onMount } from "svelte";
	import { safeMode } from "../../stores/stores";
    import { auth2 } from '$lib/auth'

    let email = '';
    let password = '';
    $: isLoginButtonEnabled = email.length > 0 && password.length > 0;

    $: login = false;

    function switchToSignup() {
        login = !login
    };

    let months = [
        { id: 1, name: 'Jan', days: 31 },
        { id: 2, name: 'Feb', days: 29 },
        { id: 3, name: 'Mar', days: 31 },
        { id: 4, name: 'Apr', days: 30 },
        { id: 5, name: 'May', days: 31 },
        { id: 6, name: 'Jun', days: 30 },
        { id: 7, name: 'Jul', days: 31 },
        { id: 8, name: 'Aug', days: 31 },
        { id: 9, name: 'Sep', days: 30 },
        { id: 10, name: 'Oct', days: 31 },
        { id: 11, name: 'Nov', days: 30 },
        { id: 12, name: 'Dec', days: 31 },
    ];

    let selectedMonth: number = 1;
    $: daysInSelectedMonth = months.find(m => m.id === selectedMonth)?.days || 0;

    let years = Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 1900 + i);

    let selectedYear = 2023;

    async function signInWithGoogle() {
        console.log('signInWithGoogle: Hi');
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    }

    async function signInWithApple() {
        console.log('signInWithApple: Hi');
        // go to apple docs for signing in users with apple
    }

    async function signIn() {
        console.log('triggered the sign in function');
        // do something
    }

    onMount(() => {
        getRedirectResult(auth)
            .then(async (result) => {
                if (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;

                    const user = result.user;

                    const res = await fetch("/api/signin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token: token }),
                    });
                }
            }).catch((error) => {
                console.log('uh oh');
            })
    });

    let viewGoogleSignIn: boolean = false;

    


</script>

<body class="bg-primary fixed h-screen w-full">

    <!-- lets use this to see the state at all times -->
    <!-- <div class="left-1/2 top-1/3 fixed text-[10rem] font-avenir-bold">{login}</div> -->
        
    <nav class="border-b-[1px] border-b-slate-200 bg-white w-full h-24">
        <a href="/" class="logo-link fixed top-[1.75rem] left-[2rem]">
            <!-- BURRITOSLUT -->
            ⚡︎⚡️⚡︎
        </a>
    </nav>

    {#if $user}
        <div>
            <div>
                <h2>Welcome, {$userData?.username ?? 'new_user'}</h2>
                <p>you have been successfully logged in</p>
            </div>
            <div>
                <button on:click={() => auth2.signOut} class="btn btn-error">
                    sign out
                </button>
            </div>
        </div>
    {:else}
        <div 
            class="border-2 border-black p-8 bg-white w-[24rem]  flex flex-col my-20 m-auto">
            <!-- title/tagline/terms -->
            <div class="font-avenir-bold flex flex-col space-y-2 justify-center mx-auto items-center mb-6 text-center">
                    <h1 class="text-primary text-2xl leading-8">
                        {#if login}
                            Login to
                        {:else}
                            Signup for
                        {/if}
                        <br>BURRITO
                        {#if safeMode}
                            <span>FINDER</span>
                        {:else}
                            <span>SLUT</span>
                        {/if}
                    </h1>
                <p class="text-lg text-center text-black my-1">New to BurritoSlut? <button class="text-info no-underline hover:underline">Sign up</button></p>
                <p class="text-xs font-thin text-center tracking w-[16rem]">By continuing, you agree to BurritoSlut's <a href="/tos">Terms of Service</a> and acknowledge BurritoSlut's <a href="privacy">Privacy Policy</a>.</p>
            </div>

            <!-- continue with google / apple -->
            <div class="mx-auto flex flex-col space-y-2">
                <button on:click={signInWithGoogle} class="rounded-none font-mono btn btn-wide btn-outline border-2 ">
                    📚
                    Continue with Google
                </button>
                <button on:click={signInWithApple} class="rounded-none font-mono btn btn-wide btn-outline border-2">
                    🍎
                    Continue with Apple
                </button>
            </div>

            <!-- or -->
            <p class="my-4 mx-auto">Or</p>

            <!-- form -->
            <div class="flex flex-col space-y-1 w-[16rem] mx-auto mb-4">
                <label for="email">Email</label>
                <input type="email" bind:value={email} class="">
                <label for="password">Password</label>
                <input type="password" bind:value={password}>
                <a href="/forgot-password" class="text-xs font-avenir-medium text-right px- my-1 text-slate-400 hover:text-info">Forgot password?</a>
            </div>

                <button 
                        class="my-2 m-auto text-xs hover:bg-opacity-80 font-mono text-black btn btn-sm border-2 border-black rounded-none h-[2.5rem] btn-wide hover:bg-primary"
                        class:btn-success={isLoginButtonEnabled}
                        on:click={signIn}
                        disabled={!isLoginButtonEnabled}>
                    Login
                </button>

                <p class="text-xs px-8 font-avenir-medium text-right text-black my-1">Don't have an account? <button on:click={() => switchToSignup()} class="text-info hover:underline">Sign up</button></p>

        </div>
    {/if}
    

    {#if viewGoogleSignIn}
        <!-- google sign in -->
        <!-- <FirebaseLogin /> -->
    {/if}
</body>
<style>
    a {
        color: hsl(var(--in));
    }
    a:hover {
        text-decoration: underline;
    }

    input {
        border-radius: 0px;
        background-color: transparent;
        border-bottom: 2px solid;
        height: 2.5rem;
        line-height: 1.75rem;
        font-size: 1.23rem;
        color: black;
        padding: 0.5rem;
    }

    input:hover {
        background-color: hsl(var(--pc));
    }
    
    input:focus {
        background-color: hsl(var(--pc));
        outline: none;
    }

    input::placeholder {
        font-family: monospace;
        font-size: 0.75rem;
        color: black;
    }
    .logo-link:hover {
        text-decoration: none; /* Removes the underline on hover for elements with class 'logo-link' */
    }
    
</style>