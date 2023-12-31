<script lang='ts'>
    import { auth, user, userData } from "$lib/firebase";
	import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
	import { onMount } from "svelte";

    async function signInWithGoogle() {
        console.log('signInWithGoogle: hello')
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    onMount(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;

                    const user = result.user;
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    });

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
    

</script>

<body class="bg-white fixed h-screen w-full">
        
    <nav class="border-b-[1px] border-b-slate-200 bg-white w-full h-24">
        <a href="/" class="logo-link font-avenir-bold fixed top-[1.75rem] left-[2rem]">
            <!-- BURRITOSLUT -->
            ⚡︎⚡️⚡︎
        </a>
    </nav>
    <div 
        class="w-[16rem] flex flex-col my-8 mx-[20%]">
        <!-- title/tagline/terms -->
        <div class="flex flex-col space-y-2 justify-center mx-auto font-avenir-bold items-center mb-6 text-center">
            <h1 class="text-lime-400 text-lg leading-6">Sign Up for <br>BURRITOSLUT</h1>
            <p class="text-sm font-mono">Find Hot Burritos Near You</p>
            <p class="text-[0.595rem] font-thin text-center tracking">By continuing, you agree to BurritoSlut's <a href="/tos">Terms of Service</a> and acknowledge BurritoSlut's <a href="privacy">Privacy Policy</a>.</p>
        </div>

        <!-- continue with google / apple -->
        <div class="mx-auto flex flex-col space-y-2">
            <button on:click={signInWithGoogle} class="rounded-sm text-xs hover:bg-opacity-20 font-mono text-black btn btn-sm h-[2.5rem] btn-wide btn-outline">🦞 Continue with Google</button>
            <button class="rounded-sm text-xs hover:bg-opacity-80 font-mono text-white btn btn-sm h-[2.5rem] btn-wide">🍎 Continue with Apple</button>
        </div>

        <!-- or -->
        <p class="my-4 mx-auto">Or</p>

        <!-- form -->
        <div class="flex flex-col space-y-1 w-[16rem] mx-auto">
            <div class="flex space-x-1">
                <input placeholder="First Name" type="text" class="w-1/2">
                <input placeholder="Last Name" type="text" class="w-1/2">
            </div>
            <input placeholder="Email" type="text">
            <input placeholder="Password" type="text">

            <label for="birthday">
                <h3 class="my-1 text-sm text-black">Birthday <span class="text-xs font-light">(Optional)</span></h3>
                <div id="birthday" class="flex space-x-1">

                    <!-- months -->
                    <select bind:value={selectedMonth} name="month" class="w-1/3 uppercase">
                        {#each months as month}
                            <option value={month.id}>{month.name}</option>
                        {/each}
                    </select>

                    <!-- days -->
                    <select name="day" class="w-1/3">
                        {#each Array(daysInSelectedMonth).fill(0).map((_, i) => i + 1) as day}
                            <option>{day}</option>
                        {/each}
                    </select>


                    <select bind:value={selectedYear} name="year" class="w-1/3">
                        {#each years as year}
                            <option value={year}>{year}</option>
                        {/each}
                    </select>
                </div>
            </label>

        </div>
            <button class="my-2 rounded-sm text-xs hover:bg-opacity-80 font-mono text-black btn btn-sm h-[2.5rem] btn-wide bg-lime-400">Sign Up</button>
            <p class="text-[0.6rem] font-thin text-right text-black my-1">Already on BurritoSlut? <a href="/login">Log in</a></p>


    </div>
</body>
<style>
    a {
        color: aqua;
    }
    a:hover {
        text-decoration: underline;
    }

    input {
        border-radius: 3px;
        background-color: transparent;
        border: 1px solid;
        padding: 0px 9px;
        height: 1.75rem;
        line-height: 1.75rem;
        font-size: 0.75rem;
        color: black;
    }
    input::placeholder {
        font-size: 0.75rem;
    }
    select {
        border-radius: 3px;
        background-color: transparent;
        border: 1px solid;
        padding: 0px 9px;
        height: 1.75rem;
        line-height: 1.75rem;
        font-size: 0.75rem;
        color: black;
    }
    select::placeholder {
        font-size: 0.75rem;
    }

    .logo-link:hover {
        text-decoration: none; /* Removes the underline on hover for elements with class 'logo-link' */
    }
</style>