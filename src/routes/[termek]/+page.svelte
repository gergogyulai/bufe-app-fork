<script>
	import { fly } from 'svelte/transition';
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";
	import { cart, total } from "$lib/stores/Cart.js";
	import Topbar from '$lib/components/Topbar.svelte';

	export let data;

	const termek = data.termekek.termek;
	const darab = data.termekek.darab
	const description = data.termekek.leiras
 
	let tempcart = {[termek] : { 'ar': 0, 'darab': 0, 'feltet': [] }};
	$: amount = 1;
	$: price = data.termekek.ar * amount;
 
	if (localStorage.getItem('CartContent') != null) {
	   $cart = JSON.parse(localStorage.getItem('CartContent'));
	   tempcart = $cart;
	   if (tempcart[termek] == undefined) {
		  tempcart[termek] = { 'ar': 0, 'darab': 0, 'feltet': [] }
	   }
	}
 
	function addItem() {
	   if (amount < darab - tempcart[termek].darab) {
		  amount++
	   }
	};
	
	function subtractItem() {
	   if (amount > 1) {
		  amount--
	   }
	};
 
	function buy() {
	   if (tempcart[termek].darab < darab) {
			 $cart[termek] = {'ar': tempcart[termek].ar + price, 'darab': tempcart[termek].darab + amount, 'feltet': tempcart[termek].feltet}
 
			 $total = { 'ar': 0, 'darab': 0, 'feltet': [] }
			 Object.keys($cart).forEach(termek => {
				 $total.ar += $cart[termek].ar
				 $total.darab += $cart[termek].darab
			 });
 
		  localStorage.setItem('CartContent',JSON.stringify($cart));
		  localStorage.setItem('Total',JSON.stringify($total));
 
		  goto("/list?Category=".concat($page.url.searchParams.get('Category')))
	   } else {
		  alert(`Túl sok ${termek} van már a kosárban!`)
	   }
	};
	
	function feltetChange(feltet,feltetAr,feltetDarab) {
		 if (tempcart[termek].feltet.includes(feltet)) {
			 tempcart[termek].feltet = tempcart[termek].feltet.filter(item => item != feltet)
			 price -= Number(feltetAr)
		 } else {
			 tempcart[termek].feltet = [ ...tempcart[termek].feltet, feltet] 
			 price += Number(feltetAr)
		 }
	 }
</script>
 
<main class=" h-screen w-screen overflow-x-hidden overflow-auto bg-white dark:text-white dark:bg-slate-900 pb-32" in:fade={{duration: 180}}>
	<Topbar 
		target={'Vissza'} 
		targeturl={$page.url.searchParams.get('referrer')} 
		text={''} background={'none'} 
		hideProfile={0} 
		flyin={0}
	></Topbar>
	<div>
		<div class="p-8">
			<div class=" bg-gray-200 dark:bg-slate-800 rounded-xl text-center mb-4 p-2">
				<img class=" m-auto mb-6" src="favicon.png" alt="">
				<h1 class=" text-2xl text-center">{termek}</h1>

				{#if data.termekek.badges}
					<div class="m-1 text-xs font-medium">
						{#each Object.keys(data.termekek.badges) as badge}
							<span class="
							bg-{data.termekek.badges[badge].color}-200 
							text-{data.termekek.badges[badge].color}-800 
							dark:bg-{data.termekek.badges[badge].color}-900 
							dark:text-{data.termekek.badges[badge].color}-300 
							mr-2 px-2.5 py-0.5 rounded-full">{badge}</span>
						{/each}
					</div>
				{/if}

				{#if darab !=0}
					<h2>Elérhető: {darab} db</h2>
				{:else}
					<h2 class=" text-red-500">Elérhető: {darab} db</h2>
				{/if}
				
				<span>{description}</span>
			</div>

			{#if data.termekek.feltetek}
			<div class="feltetek bg-gray-200 dark:bg-slate-800 rounded-xl p-4">
				<p id="feltetek">Feltétek:</p>
				<div class="">
					{#each Object.keys(data.termekek.feltetek) as feltet}
						<!-- <div class="flex items-center m-3">
							<input id="{feltet}" on:change={() => {feltetChange(feltet,data.termekek.feltetek[feltet].ar,data.termekek.feltetek[feltet].darab)}} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600">
							<label for="{feltet}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{feltet} +{data.termekek.feltetek[feltet].ar} Ft</label>
						</div> -->
						<label class="relative inline-flex items-center cursor-pointer m-2">
							<input on:change={() => {feltetChange(feltet,data.termekek.feltetek[feltet].ar,data.termekek.feltetek[feltet].darab)}} type="checkbox" value="" class="sr-only peer">
							<div class="
							w-11 h-6 bg-gray-300 focus:outline-none peer-focus:outline-none rounded-full peer
							  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
							  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
							  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600
							  peer-checked:bg-cyan-600 drop-shadow-xl">
							</div>
							<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{feltet} +{data.termekek.feltetek[feltet].ar} Ft</span>
						</label><br> 
					{/each}
				</div>
			</div>
			{/if}	

			{#if darab != 0}
				<div in:fly={{y: 100}} class="fixed -bottom-0.5 left-0 h-32 w-full p-2 bg-slate-100 dark:bg-slate-800">
					<div class="flex items-center justify-evenly drop-shadow-2xl">
						{#key price}
							<h2 class="text-xl mb-2 p-2 rounded-full mt-2" in:fade="{{duration: 50}}">Ár: {price} Ft</h2>
						{/key}
						<div class="inline-flex bg-gray-300 dark:bg-slate-700 p-1 rounded-3xl">
							<!-- minus button -->
							<div class="mx-2 rounded-full">
								<button on:click="{subtractItem}" class=" p-1 rounded-full dark:text-white text-cyan-500"><i class="fa-solid fa-minus"></i></button>
							</div>
							{#key amount}
								<div in:fade="{{duration: 50}}" class="mx-1 text-center p-1 rounded-full">{amount}</div>
							{/key}
							<!-- plus button -->
							<div class="mx-2 rounded-full">
								<button on:click="{addItem}" class=" p-1 rounded-full dark:text-white text-cyan-500"><i class="fa-solid fa-plus"></i></button>
							</div>
						</div>
					</div>
					<div class=" flex w-full mt-2 justify-center">
						<button on:click={buy} class=" bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-slate-500 text-white dark:bg-slate-600 p-2 w-9/12 rounded-full text-center mr-2"><i class="fa-regular fa-cart-shopping"></i> Kosárhoz adás</button>
						<button on:click={buy} class=" bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-slate-500 text-white dark:bg-slate-600 p-2 w-12 rounded-full text-center"><i class="fa-solid fa-star"></i></button>
					</div>
				</div>
			{:else}
				<div in:fly={{y: 100}} class="fixed bottom-0 left-0 h-32 w-full p-2 bg-slate-100 dark:bg-slate-800 opacity-90">
					<div class="flex items-center justify-evenly drop-shadow-2xl opacity-50">
						{#key price}
							<h2 class="text-xl mb-2 p-2 rounded-full mt-2" in:fade="{{duration: 50}}">Ár: {price} Ft</h2>
						{/key}
						<div class="inline-flex bg-gray-300 dark:bg-slate-700 p-1 rounded-3xl">
							<!-- plus button -->
							<div class="mx-2 rounded-full">
								<button on:click="{subtractItem}" class=" p-1 rounded-full dark:text-white text-cyan-500" disabled><i class="fa-solid fa-minus"></i></button>
							</div>
							{#key amount}
								<div in:fade="{{duration: 50}}" class="mx-1 text-center p-1 rounded-full">{amount}</div>
							{/key}
							<!-- minus button -->
							<div class="mx-2 rounded-full">
								<button on:click="{addItem}" class=" p-1 rounded-full dark:text-white text-cyan-500" disabled><i class="fa-solid fa-plus"></i></button>
							</div>
						</div>
					</div>
					<div class=" flex w-full mt-2 justify-center">
						<button on:click={buy} class=" bg-cyan-600 text-white dark:bg-slate-600 p-2 w-11/12 rounded-2xl text-center disabled:opacity-50" disabled><i class="fa-regular fa-cart-shopping"></i> Kosárhoz adás</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>