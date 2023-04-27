<script>
   import { fly, fade } from 'svelte/transition';
   import { register } from 'swiper/element/bundle';
   import { Toaster } from 'svelte-french-toast';
   import { onMount } from 'svelte';
   import { daysSince, formatDate } from '$lib/utils'
   import { Tooltip } from '$lib/components'
   import { Topbar } from '$lib/components/';
   import { Avatar, Favs, Password } from '$lib/components/profil';

   export let data;
   let avatarModal
   let passwordModal
   let nav = 0;
   let swiper

   onMount(() => {
      register();
   	swiper.addEventListener('slidechange', (e) => {
   		nav = e.detail[0].activeIndex;
   	});
   });
</script>
<main class="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-gray-100 dark:bg-slate-900 pb-10" in:fade={{duration: 180}}>
   <Toaster />

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Profil'}
      background={'none'}
      flyin={{y: -200}}
      hideProfile={1}
   />

   <div class="px-10">
      <div class="flex flex-col items-center mt-12 w-full">
         <div class=" bg-slate-800 flex flex-col justify-center items-center p-4  px-10 rounded-lg shadow-lg">
            <img class="rounded-full h-52 w-52 object-cover shadow-lg" src="/api/avatar" alt="avatar">
            <span class=" text-3xl mt-2 text-white">{data.name}</span>
         </div>
      </div>
      <div class="flex justify-center w-full mt-8 mb-4 text-white">
         <div class="flex flex-row h-fit p-1 rounded-xl bg-slate-800">
            <div class:nav-active='{nav == 0}' on:click={() => {swiper.swiper.slideTo(0)}} class="bg-slate-700 p-1 w-24 text-center transition-all ease-in-out rounded-lg mr-1 cursor-pointer">Opciók</div>
            <div class:nav-active='{nav == 1}' on:click={() => {swiper.swiper.slideTo(1)}} class="bg-slate-700 p-1 w-24 text-center transition-all ease-in-out rounded-lg cursor-pointer">Kedvencek</div>
         </div>
      </div>

      <div class="flex w-full justify-center">
         <swiper-container
         class="bg-slate-800 h-96 w-full rounded-lg"
         initial-slide={nav}a
         resistance-ratio={'0.5'}
         speed={'370'}
         space-between={'20'}
         slides-per-view={'1'}
         bind:this={swiper}
         >
         <swiper-slide>
            <div class='p-4 drop-shadow-md'>
               <div in:fly="{{ x: -200, duration: 600 }}" class="bg-slate-700 p-2 rounded-lg mb-2 text-white">
                  <i class="fa-solid fa-envelope"></i>
                  <div class="inline-flex">
                     <span>Email: <span class=" text-gray-400">{data.currentUser.email}</span></span>
                     {#if data.currentUser.verified}
                        <Tooltip tooltipText="Megerősített email">
                           <i class="m-1 text-green-300 fa-sharp fa-solid fa-badge-check"></i>
                        </Tooltip>
                     {/if}
                  </div>
               </div>

               <div in:fly="{{ x: -200, duration: 700 }}" class="bg-slate-700 p-2 rounded-lg mb-4 text-white">
                  <i class="fa-solid fa-calendar-days"></i>
                  <span>Tag {formatDate(data.currentUser.created)} óta ({daysSince(data.currentUser.created)} napja)</span>        
               </div>

               <div on:click={avatarModal.showModal()} in:fly="{{ x: -200, duration: 900 }}" class="bg-slate-700 p-2 rounded-lg mb-2 text-white hover:bg-slate-600 cursor-pointer">
                  <i class="fa-solid fa-user"></i>
                  Profilkép megváltoztatása
               </div>
               <Avatar bind:avatarModal />

               <div on:click={passwordModal.showModal()} in:fly="{{ x: -200, duration: 900 }}" class="bg-slate-700 p-2 rounded-lg mb-2 text-white hover:bg-slate-600 cursor-pointer">
                  <i class="fa-solid fa-lock-keyhole"></i>
                  Jelszó megváltoztatása
               </div>
               <Password bind:passwordModal />


               <form method="POST" action="?/logout">
                  <button in:fly="{{ x: -200, duration: 1000 }}" class="bg-slate-700 p-2 text-left rounded-lg mb-2 text-white transition-all ease-in-out hover:bg-red-500 cursor-pointer w-full">
                     <i class="fa-solid fa-right-from-bracket"></i>
                     Kijelentkezés
                  </button>
               </form>
            </div>
         </swiper-slide>
            <swiper-slide>
               <Favs data={data}/>
            </swiper-slide>
         </swiper-container>
      </div>
   </div>
</main>