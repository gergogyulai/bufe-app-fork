<script>
   import { enhance } from '$app/forms'

   export let data
</script>

{#each Object.keys(data.currentUser.favs) as fav, i (i)}
   <div class="flex bg-slate-700 p-2 rounded-lg mb-2">
      <div class="basis-3/12">
         <img class="w-14 h-14 object-cover rounded-md" src="/api/termekfoto/?termek={data.currentUser.favs[fav].id}" alt="">
      </div>
      <div class="text-white basis-8/12 flex items-center justify-center text-xl">
         <span>{fav}</span>
      </div>
      <div class="flex items-center justify-end">
         <form 
            method="post"
            action="?/removeFav"
            use:enhance
         >
            <input hidden type="text" name="removedFav" value="{fav}">
            <button class=" bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-slate-500 text-white dark:bg-slate-600 p-2 w-9 h-9 rounded-lg text-center">
               <div class="flex justify-center items-center"><i class="fa-solid fa-star"></i></div>
            </button>
         </form>
      </div>
   </div>
{/each}
