<script>
   import { fly } from "svelte/transition";

   export let targeturl;
   export let target;
   export let text;
   export let background;
   export let flyin;
   export let hideProfile;
</script>

<div in:fly={flyin} class="w-full h-auto bg-gray-100 dark:bg-slate-800 p-1" style="background-color: {background};">
   <div class="header-content w-full grid p-1 text-center drop-shadow-xl">
      <div class="flex justify-center items-center">
         <a data-sveltekit-noscroll class=" text-cyan-500 dark:text-white flex items-center ml-2 mr-auto" href="{targeturl}"><span class="fa-solid fa-arrow-left pr-1"></span> {target}</a>
      </div>
      <div class="flex justify-center items-center">
         <h1>{text}</h1>
      </div>
      <div class=" flex justify-end items-center pr-1">
         <a data-sveltekit-noscroll class:hideProfile href="/profil"><img class="w-8 h-8 p-0.5 rounded-full ring-2 hover:opacity-75 ring-gray-300 dark:ring-gray-500" src="/api/avatar" alt="Avatar"></a>
      </div>
   </div>
</div>

<style lang="scss">
   .header-content { grid-template-columns: 33.33% 33.33% 33.33%;}
   .hideProfile { visibility: hidden; }
</style>