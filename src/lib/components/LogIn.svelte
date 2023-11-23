<script lang='ts'>
	import { theme } from "../../stores/stores";
	
	let themeValue: string;

	theme.subscribe((value) => {
		themeValue = value;
	});

</script>

<div data-theme={themeValue} class="font-mono fixed top-[1.25rem] right-[1rem] flex space-x-3 bg-opacity-0">
    <a href="/login" class="btn btn-sm btn-outline bg-accent bg-opacity-75 backdrop:blur-3xl text-accent-content rounded-none text-xs h-10 ">Log In</a>
    <a href="/signup" class="btn btn-sm h-10 btn-primary text-primary-content text-xs rounded-none">Sign Up</a>
</div>