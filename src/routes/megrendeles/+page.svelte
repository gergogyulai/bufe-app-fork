<script>
	import { slide, fade } from "svelte/transition";
	import { page } from '$app/stores';
	import { goto } from "$app/navigation"
	import { deserialize } from '$app/forms';
	import { cart, total } from "$lib/stores/Cart.js";
	import Topbar from '$lib/components/Topbar.svelte';
	import { bufeClosed } from "$lib/stores/BufeClosed.js";
  	import { each } from "svelte/internal";

	let bufeClosedStatus = $bufeClosed;

	export let data;
	let confirmShow = false;
	let paymentMethod = "Készpénz";
 	let atveteliIdo = 'Válassz egy átvételi időt';


	if (localStorage.getItem('CartContent') != null) {
	   $cart = JSON.parse(localStorage.getItem('CartContent'));
	   $total = JSON.parse(localStorage.getItem('Total'));
	}

	function recalculate() {
	   $total = { 'ar': 0, 'darab': 0 };
		 Object.keys($cart).forEach(termek => {
			 $total.ar += $cart[termek].ar
			 $total.darab += $cart[termek].darab
		  localStorage.setItem('CartContent', JSON.stringify($cart));
			 localStorage.setItem('Total', JSON.stringify($total))
		 });
	};
 
	function urites() {
	   localStorage.clear();
	   $cart = {};
	   $total = { 'ar': 0, 'darab': 0, 'feltet': [] };
	};
 
	function subtractAmount(termek) {
	   if ($cart[termek].darab > 1) {
		  let price = $cart[termek].ar / $cart[termek].darab;
 
		  $cart[termek].ar -= price;
		  $cart[termek].darab--;
		  recalculate();
	   } else {
		  delete $cart[termek];
		  $cart = $cart; // Muszaj reactivity miatt
		  recalculate();
		  if (Object.keys($cart).length === 0) {
			 localStorage.removeItem('CartContent');
			 history.back()
		  }
	   }
	};
 
	function addAmount(termek) {
	   // * Elegge gusztustalan megoldas vegig loopolni es megtalalni a darabszamat a termeknek
	   let darab;
	   data.termekek.forEach(record => {
		  if (record.termek == termek) darab = record.darab
	   });
 
	   if ($cart[termek].darab < darab) {
		  let price = $cart[termek].ar / $cart[termek].darab;
 
		  $cart[termek].ar += price;
		  $cart[termek].darab++;
		  recalculate();
	   };
	};
 
	async function handleSubmit() {
		if (atveteliIdo === ''){
			alert("Nem adtál meg átvételi idot");
			confirmShow = false;
		} else if (atveteliIdo === 'Válassz egy átvételi időt'){
			alert("Nem adtál meg átvételi idot");
			confirmShow = false;
		}

	   const data = new FormData(this);
	   const response = await fetch(this.action, {
		  method: 'POST',
		  body: data
	   });
 
	   const result = deserialize(await response.text());
 
	   if (result.type == 'success') {
		  urites();
		  goto('/rendelesek');
	   } else {
			 alert(result.data.error);
			 delete $cart[result.data.sok];
			 $cart = $cart; // kell reactivity miatt
			 recalculate();
		 };
	};
</script>

<main class="h-screen w-screen overflow-x-hidden overflow-auto text-neutral-900 bg-white dark:text-white dark:bg-slate-900">

	<Topbar
	target={'Vissza'}
	targeturl={'/kosar'}
	text={'Kosár'}
	background={'none'}
	hideProfile={0}
	flyin={0}
	></Topbar>

	{#if confirmShow}
	<div class="h-screen w-screen fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
		<div class="flex justify-center items-center flex-col w-3/4 lg:w-2/6 bg-gray-100 dark:bg-neutral-800 rounded-lg p-4 text-black dark:text-white drop-shadow-xl select-none">
			<div class="flex w-full justify-center text-5xl m-2 drop-shadow-lg">
				<span class="fa-regular fa-circle-exclamation"></span>
			</div>
			<span class="m-2 text-lg font-bold text-center drop-shadow-lg">Biztosan leadod rendelésed?</span>
			<span class="m-0.5 text-center drop-shadow-lg">Átvétel: {atveteliIdo}</span>
			<p class="text-center text-red-500 text-sm font-bold my-2 drop-shadow-lg ">Rendelésedet köteles vagy átvenni, 3 nem átvett rendelés után kizárunk az app használatából!</p>
			<div class="flex w-full my-4 justify-center drop-shadow-lg">
				<button class=" dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:bg-gray-300 bg-gray-300 p-2 px-3 mr-2 rounded-lg" on:click={() => confirmShow = false}>Mégsem</button>
				<form method="POST" on:submit|preventDefault={handleSubmit}>
					<input hidden type="text" name="rendeles" value="{JSON.stringify($cart)}">
					<input hidden type="text" name="atveteliIdo" value="{atveteliIdo}">
					<input hidden type="text" name="paymentMethod" value="{paymentMethod}">
					<button class=" hover:bg-green-400 bg-green-500 p-2 px-3 rounded-lg font-bold text-white">Igen</button>
				</form>
			</div>
		</div>
	</div>
	{/if}
	 
	<div class="px-8">
		<h2 class="text-center text-3xl m-5">Rendelésed tartalma</h2>

		<div class=" bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mb-4">
			{#each Object.keys($cart) as termek, i (i)}
			<div href="#" class=" h-24 p-1 flex flex-row items-center justify-between bg-gray-100 dark:bg-slate-800">
				<img class="object-cover h-full" src="favicon.png" alt="">
				<span class="text-xl">{termek}</span>
				<div class="mr-2">
					{#key $cart[termek].ar}
						<div in:fade="{{duration: 50}}" class="text-center">{$cart[termek].darab} db</div>
					{/key}
					{#key termek.ar}
						<h2 class="text-center text-lg font-bold" in:fade="{{duration: 200}}">{$cart[termek].ar} Ft</h2>
					{/key}
				</div>
			</div>
			{/each}
		</div>

		{#if Object.keys($cart).length != 0}
		<div class="flex flex-col justify-center items-center w-full p-2 bg-neutral-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg mb-6 ">
			
			{#key $total}
			<div class="flex flex-col justify-center my-2">
				<span in:fade="{{duration: 50}}" class="text-center dark:text-white text-black text-lg ">{$total.darab} db termék</span>
				<span in:fade="{{duration: 50}}" class=" text-center dark:text-white text-black text-xl font-bold">Összesen: {$total.ar} Ft</span>
			</div>
			{/key}

			<div class="mb-2 w-full flex flex-col justify-center items-center" >
				<p class=" text-center mt-2">Fizetési mód:</p>
				<div class=" flex items-center justify-center mb-4">
					<div class="flex items-center justify-center bg-gray-200 dark:bg-slate-600 p-2 cursor-pointer rounded-lg mr-2" class:selectedpayment={paymentMethod == "Készpénz"} on:click={() => {paymentMethod = 'Készpénz'; console.log(paymentMethod);}}>
						<span>Készpénz</span>
					</div>
					{#if $total.ar < 500}
					<div class="flex items-center justify-center bg-gray-200 dark:bg-slate-600 p-2 cursor-not-allowed rounded-lg opacity-60">
						<span>Bankkártya</span>
					</div>
					{:else}
					<div class=" flex items-center justify-center bg-gray-200 dark:bg-slate-600 p-2 cursor-pointer rounded-lg" class:selectedpayment={paymentMethod == "Bankkártya"} on:click={() => {paymentMethod = 'Bankkártya'; console.log(paymentMethod);}}>
						<span>Bankkártya</span>
					</div>
					{/if}
				</div>
			</div>

			<div class="text-center">
				<p class="text-center">Átvételi idő:</p>
				<select bind:value={atveteliIdo} class=" placeholder-black w-full p-2 rounded-lg dark:bg-neutral-700 bg-gray-200 focus:outline focus:ring-0 focus:outline-cyan-500">
					<option class="w-full" disabled selected >Válassz egy átvételi időt</option>
					{#each data.atveteliOpciok as opcio}
						<option value={opcio.value}>{opcio.label}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-col w-full justify-center items-center mt-4 mb-3">
				{#if bufeClosedStatus = 0}
					<button class=" bg-cyan-500 text-white dark:bg-neutral-600 p-2 rounded-xl w-10/12" on:click={() => confirmShow = true}>Rendelés leadása</button>
				{:else if bufeClosedStatus = 1}
					<button disabled class=" bg-cyan-500 text-white dark:bg-neutral-600 p-2 rounded-xl w-10/12 opacity-60">Rendelés leadása</button>
				{/if}
			</div>
		</div>
		{/if}
	</div>
</main>
<style>
	.selectedpayment{
		@apply bg-cyan-500 text-white border-none transition scale-105 ease-in-out;
	}
</style>