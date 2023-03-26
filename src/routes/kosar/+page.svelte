<script>
   import { slide, fade } from "svelte/transition";
	import { page } from '$app/stores';
   import { goto } from "$app/navigation"
   import { deserialize } from '$app/forms';
   import { cart, total } from "$lib/stores/Cart.js";
   import Topbar from '$lib/components/Topbar.svelte';
   import { space } from "svelte/internal";

   export let data;
   export let open = false;

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

   async function handleSubmit(event) {
      const data = new FormData(this);
      const response = await fetch(this.action, {
         method: 'POST',
         body: data
      })

      const result = deserialize(await response.text());

      if (result.type == 'success') {
         urites();
         goto('/rendelesek')
      } else {
			alert(result.data.error);
			delete $cart[result.data.sok];
			$cart = $cart; // kell reactivity miatt
			recalculate();
		}
   }
</script>

<main class="h-screen w-screen overflow-x-hidden overflow-auto text-black bg-white dark:text-white dark:bg-slate-900 pb-36" in:fade={{duration: 180}}>

   <Topbar
   target={'Vissza'}
   targeturl={'/'}
   text={'Kosár'}
   background={'none'}
   hideProfile={0}
   flyin={0}
   ></Topbar>

   <!-- $page.url.searchParams.get('referrer') -->
   {#if open}
      <div></div>
   {/if}
   <div class="px-8">
         {#if Object.keys($cart).length != 0}
            <h2 class="text-center text-3xl m-5">Kosarad tartalma</h2>
         {/if}
         
         {#if Object.keys($cart).length < 1}
         <div class="flex justify-center text-center items-center h-96">
            <div in:fade="{{duration: 300}}">            
               <h2 class="text-2xl m-2">Kosarad még üres :(</h2>
               <h2 class="text-lg mb-4">Nézd meg a termékeket és rendelj még ma!</h2>
               <a class=" bg-cyan-500 dark:bg-slate-800 font-bold text-gray-200 text-center p-3 w-40 rounded-xl" href="/list">Termékek megtekintése</a>
            </div>
         </div>
         {/if}


         {#each Object.keys($cart) as termek, i (i)}
         <div class="flex flex-row items-start justify-start bg-gray-200 dark:bg-slate-800 rounded-xl drop-shadow-md text-center mb-4 outline outline-1 outline-slate-200 dark:outline-slate-700">
            <div class="m-0.5">
               <img class=" rounded-tl-xl rounded-bl-xl object-cover h-32" src="hamburger.jpg" alt="">
            </div>
            <div class=" w-4/5 flex flex-col justify-center items-center p-2">
               <a href="/{termek}">
                  <h1 class=" text-lg text-center">{termek}</h1>
               </a>

               <div class="flex justify-center bg-gray-300 dark:bg-slate-700 p-1 m-1 rounded-3xl border border-slate-200 dark:border-slate-600">
                  <div class="mx-2 rounded-full">
                     {#if $cart[termek].darab > 1}
                        <button class=" p-1 rounded-full dark:text-white text-cyan-500" on:click="{() => {subtractAmount(termek)}}"><span class="fa-solid fa-minus" in:fade="{{duration: 200}}"></span></button>
                     {:else}
                        <button class=" p-1 rounded-full dark:text-white text-cyan-500" on:click="{() => {subtractAmount(termek)}}"><span class="fa-solid fa-x text-red-500 font-bold" in:fade="{{duration: 200}}"></span></button>
                     {/if}
                  </div>
                  {#key $cart[termek].ar}
                     <div in:fade="{{duration: 50}}" class="mx-1 text-center p-1 rounded-full">{$cart[termek].darab}</div>
                  {/key}
                  <div class="mx-2 rounded-full">
                     <button on:click="{() => {addAmount(termek)}}" class=" p-1 rounded-full dark:text-white text-cyan-500"><i class="fa-solid fa-plus"></i></button>
                  </div>
               </div>

               <div class="text-center mt-2">
                  {#key termek.ar}
                     <h2 class="text-center text-lg font-bold" in:fade="{{duration: 200}}">{$cart[termek].ar} Ft</h2>
                  {/key}
               </div>
            </div>
         </div>
         {/each}

         {#if Object.keys($cart).length != 0}
            <div class=" flex w-full justify-center">
               <div class="urites">
                  <button class="bg-red-500 font-bold text-white text-center p-2 w-40 m-2 rounded-xl" on:click={() => {urites(); }}>Kosár üritése</button>
               </div>
            </div>
         {/if}

         {#if Object.keys($cart).length != 0}
         <div class="fixed bottom-0 left-0 h-32 w-full p-2 bg-slate-100 dark:bg-slate-800">
            {#key $total}
            <div class="flex flex-col justify-center">
               <span in:fade="{{duration: 50}}" class="text-center dark:text-white text-black text-lg ">{$total.darab} db termék</span>
               <span in:fade="{{duration: 50}}" class=" text-center dark:text-white text-black text-xl font-bold">Összesen: {$total.ar} Ft</span>
            </div>
            {/key}
            <div class="flex w-full justify-center">
               <form class="flex w-full justify-center mt-2" action="/megrendeles">
                  <button class=" bg-cyan-500 text-white dark:bg-slate-600 p-2 rounded-xl w-10/12">Tovább</button>
               </form>
            </div>
         </div>
         {/if}
   </div>
</main>