<script>
	import { fly } from 'svelte/transition';
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";
	import { cart, total } from "$lib/stores/Cart.js";
	import Topbar from '$lib/components/Topbar.svelte';
	import { enhance } from '$app/forms'

	export let data;

	const termek = data.termekek.termek;
	const maxAmount = data.termekek.darab;
	const description = data.termekek.leiras;
	const termekid = data.termekek.id;
	const termekObject = {
		[termek]:{
			"id": termekid
		}
	};

	let totalDarab = 0; // eddigi hozzaadott termekek + darab
   	let darab = 1;
   	$: price = data.termekek.ar * darab;
   	let feltetek = [];

	if (localStorage.getItem('CartContent')) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		if ($cart[termek]) 
			$cart[termek].forEach(x => {
				totalDarab += x.darab;
			});
	}

	function subtractAmount() {
		if (darab > 1) {
			darab--;
			totalDarab--;
		}
	}

	function addAmount() {
		if (totalDarab+1 < maxAmount) {
			darab++;
			totalDarab++;
		}
	}

	function feltetChange(feltet) {
		if (feltetek.includes(feltet)) {
			feltetek = feltetek.filter(item => item !== feltet);
			price -= parseInt(data.termekek.feltetek[feltet].ar);
		} else {
			feltetek = [ ...feltetek, feltet ];
			price += parseInt(data.termekek.feltetek[feltet].ar);
		}
		feltetek.sort();
	}

	function buy() {
		if (totalDarab < maxAmount) {
			let alreadyInCart = false;
			if ($cart[termek]) {
				$cart[termek].forEach((x, i) => {	// Ha már van egy ugyanilyen termék ugyanilyen feltétekkel akkor összevonja a kettő rendelést és növeli a darabszámát, árát
					if (JSON.stringify(x.feltet) === JSON.stringify(feltetek)) {
						$cart[termek][i].darab += darab;
						$cart[termek][i].ar += price;
						$cart[termek][i].id += termekid
						alreadyInCart = true;
					}
				});
			}
			if (!alreadyInCart)	// Hozzáadja a terméket a kosárhoz ha nincs benne ugyanilyen feltétekkel rendelkező termék.
				$cart[termek] = $cart[termek] ? [ ...$cart[termek], { 'ar': price, darab, 'feltet': feltetek, 'id': termekid } ] : [ { 'ar': price, darab, 'feltet': feltetek, 'id': termekid } ];

			$total = { 'ar': 0, 'darab': 0 };	// Kosár total újraszámolása
			Object.keys($cart).forEach(termek => {
				$cart[termek].forEach(x => {
					$total.ar += x.ar;
					$total.darab += x.darab;
				});
			});

			localStorage.setItem('CartContent',JSON.stringify($cart));
			localStorage.setItem('Total',JSON.stringify($total));

			goto('/list?Category='.concat($page.url.searchParams.get('Category')));
		} else {
			alert(`Túl sok ${termek} van már a kosárban!`);
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
		kosar={true}
	></Topbar>
	<div>
		<div class="p-8">
			<div class=" bg-gray-200 dark:bg-slate-800 rounded-xl text-center mb-4 p-3">
				<img class=" m-auto mb-4 max-h-72 rounded-lg object-cover" src="/api/termekfoto/?termek={data.termekek.id}" alt="">
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
					<h2 class=" text-red-500">Elérhető: {maxAmount} db</h2>
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
							<input on:change={() => {feltetChange(feltet);}} type="checkbox" value="" class="sr-only peer">
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
							<div class="mx-2 rounded-full"><button on:click="{subtractAmount}" class=" p-1 rounded-full dark:text-white text-cyan-500"><i class="fa-solid fa-minus"></i></button></div>
							{#key darab}
								<div in:fade="{{duration: 50}}" class="mx-1 text-center p-1 rounded-full">{darab}</div>
							{/key}
							<div class="mx-2 rounded-full"><button on:click="{addAmount}" class=" p-1 rounded-full dark:text-white text-cyan-500"><i class="fa-solid fa-plus"></i></button></div>
						</div>
					</div>
					<div class=" flex w-full mt-2 justify-center">
						<button on:click={buy} class=" bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-slate-500 text-white dark:bg-slate-600 p-2 w-9/12 rounded-full text-center mr-2"><i class="fa-regular fa-cart-shopping"></i> Kosárhoz adás</button>
						<form use:enhance action="?/addFav" method="post">
							<input hidden value="{JSON.stringify(termekObject)}" name="newFav" type="text">
							<button class=" bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-slate-500 text-white dark:bg-slate-600 p-2 w-12 rounded-full text-center"><i class="fa-solid fa-star"></i></button>
						</form>
					</div>
				</div>
			{:else}
				<div in:fly={{y: 100}} class="fixed bottom-0 left-0 h-32 w-full p-2 bg-slate-100 dark:bg-slate-800 opacity-90">
					<div class="flex items-center justify-evenly drop-shadow-2xl opacity-50">
						{#key price}
							<h2 class="text-xl mb-2 p-2 rounded-full mt-2" in:fade="{{duration: 50}}">Ár: {price} Ft</h2>
						{/key}
						<div class="inline-flex bg-gray-300 dark:bg-slate-700 p-1 rounded-3xl">
							<div class="mx-2 rounded-full"><button class=" p-1 rounded-full dark:text-white text-cyan-500" disabled><i class="fa-solid fa-minus"></i></button></div>
							<div in:fade="{{duration: 50}}" class="mx-1 text-center p-1 rounded-full">0</div>
							<div class="mx-2 rounded-full"><button class=" p-1 rounded-full dark:text-white text-cyan-500" disabled><i class="fa-solid fa-plus"></i></button></div>
						</div>
					</div>
					<div class=" flex w-full mt-2 justify-center">
						<button class=" bg-cyan-600 text-white dark:bg-slate-600 p-2 w-11/12 rounded-2xl text-center disabled:opacity-50"><i class="fa-regular fa-cart-shopping"></i> Kosárhoz adás</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>