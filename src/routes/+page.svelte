<script>
	import { fade } from 'svelte/transition';
	export let data;
	import Topbar from '$lib/components/Topbar.svelte';
</script>
 
<main class="flex flex-col items-center justify-center checked: w-screen h-screen bg-white dark:bg-slate-900" in:fade={{duration: 180}}>

	<div class=" dark:text-white text-black mb-4 text-xl text-center">Szia, <span class="text-xl text-orange-500">{data.name}</span></div>

	<div class="text-white">
		<a href="/list">
			<div class="rounded-xl w-52 h-16 mb-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
				<span class="text-lg">Termékek</span>
			</div>
		</a>
		<a href="/rendelesek">
			<div class="rounded-xl w-52 h-16 mb-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
				<span class="text-lg">Rendeléseim</span>
			</div>
		</a>
		<a href="/kosar">
			<div class="rounded-xl w-52 h-16 mb-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
				<span class="text-lg">Kosár</span>
			</div>
		</a>
		<a href="/profil">
			<div class="rounded-xl w-52 h-16 mb-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
				<span class="text-lg">Profilom</span>
			</div>
		</a>
	</div>

	 <div class="text-black dark:text-white text-center">{data.splash}</div>

</main>