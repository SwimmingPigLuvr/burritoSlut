<script>
    export const ssr = false;
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
            <h1 class="text-lime-400 text-lg leading-6">Sign Up for <br>BURRITOSLUT</h1>
            <p class="text-sm font-mono">Find Hot Burritos Near You</p>
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
            <div class="flex space-x-1">
                <input placeholder="First Name" type="text" class="w-1/2">
                <input placeholder="Last Name" type="text" class="w-1/2">
            </div>
            <input placeholder="Email" type="text">
            <input placeholder="Password" type="text">

            <label for="birthday">
                <h3 class="my-1 text-sm text-black font-bold">Birthday <span class="text-xs font-light">(Optional)</span></h3>
                <div id="birthday" class="flex space-x-1">
                    <select name="month" class="w-1/3 uppercase">
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                    <select name="day" class="w-1/3">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <select name="year" class="w-1/3">
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
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