<script>
	import LogIn from "./LogIn.svelte";

</script>
<div class="p-[1.25rem] flex fixed top-0 w-full h-36 md:h-24 bg-white justify-end items-end md:items-start transform transition-all duration-1000 ease-in-out">
    <!-- logo -->
    <div class="font-black fixed top-[1.75rem] left-[2rem]">
        BURRITOSLUT
    </div>
    <!-- searchbar -->
    <div class=" items-center join mx-auto shadow-lg h-10 rounded-none font-light tracking-widest w-full md:w-1/2">
        <input placeholder="breakfast burritos" type="text" class="focus:outline-none tracking-wide text-xs px-4 h-full w-[365px]">
        <p class="scale-y-[2] -translate-y-1 text-slate-50">|</p>
        <input placeholder="address, neighborhood, city, state, or zip" type="text" class="focus:outline-none tracking-wide text-xs p-4 w-[365px] h-full">
        <p class="scale-y-[2] -translate-y-1 text-slate-50">|</p>
        <button class="px-4 w-14 h-full items-center text-2xl hover:rotate-[30deg] transform transition-all duration-500 ease-in-out">🔍</button>
    </div>
    <LogIn />
    
</div>
