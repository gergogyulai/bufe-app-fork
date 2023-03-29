<script>
   import { fly } from "svelte/transition";
	import { cart, total } from "$lib/stores/Cart.js";

   export let targeturl;
   export let target;
   export let text;
   export let background;
   export let flyin;
   export let hideProfile;
   export let kosar = false;
</script>

<div in:fly={flyin} class="w-full h-auto bg-gray-100 dark:bg-slate-800 p-1 drop-shadow-xl" style="background-color: {background};">
   <div class="header-content w-full grid p-1 text-center drop-shadow-xl">
      <div class="flex justify-center items-center ">
         <a data-sveltekit-noscroll class=" drop-shadow-md text-cyan-600 hover:text-cyan-500 dark:text-white flex items-center ml-2 mr-auto" href="{targeturl}"><span class="fa-solid fa-arrow-left pr-1"></span> {target}</a>
      </div>
      <div class="flex justify-center items-center dark:text-white">
         <h1>{text}</h1>
      </div>
      <div class=" flex justify-end items-center pr-1">
         {#if kosar}
            <a class="group pr-1" href="/kosar">
               <div class=" flex justify-center items-center w-8 h-8 p-0.5 rounded-full hover:shadow-md hover:opacity-75 bg-gray-300 dark:bg-slate-700 ring-1 ring-gray-300 dark:ring-slate-700 mr-3">                
                  {#if $total.darab != 0}
                       <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold transition ease-in-out delay-75 text-white group-hover:bg-cyan-600 bg-red-600 border-2 border-white rounded-full -top-0.5 right-12 dark:border-gray-900">{$total.darab}</div>
                  {/if}
                  <i class=" dark:text-gray-300 text-neutral-800 fa-regular fa-cart-shopping"></i>
               </div>
            </a>
         {/if}
         <a data-sveltekit-noscroll class:hideProfile href="/profil"><img class="w-8 h-8 p-0.5 rounded-full ring-2 hover:opacity-75 ring-gray-300 dark:ring-gray-500" src="/api/avatar" alt="Avatar"></a>
      </div>
   </div>
</div>

<style lang="scss">
   .header-content { grid-template-columns: 33.33% 33.33% 33.33%;}
   .hideProfile { visibility: hidden; }
</style>