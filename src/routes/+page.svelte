<script>
	import { fade } from 'svelte/transition';
	export let data;
	import Topbar from '$lib/components/Topbar.svelte';
</script>
 
<main class="overflow-auto w-screen h-screen bg-white dark:bg-slate-900 p-8" in:fade={{duration: 180}}>

	<div class="flex flex-col w-full h-full justify-center items-center">
		<div class="flex flex-col items-start">
			<div class=" dark:text-white text-black mb-4 text-2xl font-bold text-left">Szia, <br> <span class=" text-cyan-500">{data.name}</span>!</div>
		</div>
		<div class=" flex flex-col md:flex-row items-center text-white">
			<div class="flex">
				<a href="/list">
					<div class="rounded-xl border border-slate-200 dark:border-slate-600 w-32 h-32 mb-4 mr-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
						<span class="text-lg">Termékek</span>
					</div>
				</a>
				<a href="/rendelesek">
					<div class="rounded-xl border border-slate-200 dark:border-slate-600 w-32 h-32 mb-4 md:mr-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
						<span class="text-lg">Rendeléseim</span>
					</div>
				</a>
			</div>
			<div class="flex">
				<a href="/kosar">
					<div class="rounded-xl border border-slate-200 dark:border-slate-600 w-32 h-32 mb-4 mr-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
						<span class="text-lg">Kosár</span>
					</div>
				</a>
				<a href="/profil">
					<div class="rounded-xl border border-slate-200 dark:border-slate-600 w-32 h-32 mb-4 md:mr-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
						<span class="text-lg">Profilom</span>
					</div>
				</a>
			</div>
			<a href="/kedvencek">
				<div class="rounded-xl border border-slate-200 dark:border-slate-600 w-32 h-32 mb-4 dark:bg-slate-800 bg-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-500 flex justify-center items-center">
					<span class="text-lg">Kedvencek</span>
				</div>
			</a>
		</div>
	</div>

	 <!-- <div class="text-black dark:text-white text-center">{data.splash}</div> -->

</main>