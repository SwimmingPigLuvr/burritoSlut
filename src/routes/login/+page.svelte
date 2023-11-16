<script>
</script>

<body class="bg-white fixed h-screen w-full">
        
    <nav class="border-b-[1px] border-b-slate-200 bg-white w-full h-24">
        <a href="/" class="logo-link font-black fixed top-[1.75rem] left-[2rem]">
            <!-- BURRITOSLUT -->
            ⚡︎⚡️⚡︎
        </a>
    </nav>
    <div 
        class="w-[16rem] flex flex-col my-8 mx-[20%]">
        <!-- title/tagline/terms -->
        <div class="flex flex-col space-y-2 justify-center mx-auto font-black items-center mb-6 text-center">
            <h1 class="text-lime-400 text-lg leading-6">Login to<br>BURRITOSLUT</h1>
            <p class="text-sm font-bold text-center text-black my-1">New to BurritoSlut? <a href="/signup">Sign up</a></p>
            <p class="text-[0.595rem] font-thin text-center tracking">By continuing, you agree to BurritoSlut's <a href="/tos">Terms of Service</a> and acknowledge BurritoSlut's <a href="privacy">Privacy Policy</a>.</p>
        </div>

        <!-- continue with google / apple -->
        <div class="mx-auto flex flex-col space-y-2">
            <button class="rounded-sm text-xs hover:bg-opacity-20 font-mono text-black btn btn-sm h-[2.5rem] btn-wide btn-outline">🦞 Continue with Google</button>
            <button class="rounded-sm text-xs hover:bg-opacity-80 font-mono text-white btn btn-sm h-[2.5rem] btn-wide">🍎 Continue with Apple</button>
        </div>

        <!-- or -->
        <p class="my-4 mx-auto">Or</p>

        <!-- form -->
        <div class="flex flex-col space-y-1 w-[16rem] mx-auto">
            <input placeholder="Email" type="text">
            <input placeholder="Password" type="text">
            <p class="text-[0.6rem] font-thin text-right text-black my-1"><a href="/login">Forgot password?</a></p>

            

        </div>
            <button class="my-2 rounded-sm text-xs hover:bg-opacity-80 font-mono text-black btn btn-sm h-[2.5rem] btn-wide bg-lime-400">Login</button>
            <p class="text-[0.6rem] font-thin text-right text-black my-1">New to BurritoSlut? <a href="/signup">Sign up</a></p>


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
    .logo-link:hover {
        text-decoration: none; /* Removes the underline on hover for elements with class 'logo-link' */
    }
    
</style>