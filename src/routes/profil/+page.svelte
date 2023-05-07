<script>
   import { fly, fade } from 'svelte/transition';
   import { register } from 'swiper/element/bundle';
   import { Toaster } from 'svelte-french-toast';
   import { onMount } from 'svelte';
   import { daysSince, formatDate } from '$lib/utils'
   import { Tooltip, Topbar, ThemeToggle } from '$lib/components'
   import { Avatar, Favs, Password } from '$lib/components/profil';

   export let data;
   let avatarModal
   let passwordModal
   let swiper

   let nav = 0;

   function changeNav(clickedNav) {
      nav = clickedNav;
      swiper.swiper.slideTo(clickedNav)
   }

   onMount(() => {
      register();
   	swiper.addEventListener('slidechange', (e) => {
   		nav = e.detail[0].activeIndex;
   	});
   });
</script>
<main class="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-white dark:bg-slate-900 pb-10" in:fade={{duration: 180}}>
   <Toaster />

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Profil'}
      background={'none'}
      flyin={{y: -200}}
      hideProfile={1}
   />

   <div class="px-8">
      <div class="flex flex-col items-center mt-12 w-full">
         <div class=" bg-neutral-200 dark:bg-slate-800 flex flex-col justify-center items-center p-4  px-10 rounded-lg shadow-lg">
            <img class="rounded-full h-52 w-52 object-cover shadow-lg" src="/api/avatar" alt="avatar">
            <span class=" text-3xl mt-2 text-neutral-900 dark:text-white">{data.name}</span>
         </div>
      </div>

      <div class="flex justify-center w-full mt-8 mb-4 text-white">
         <div class="flex flex-row h-fit p-1 rounded-xl bg-neutral-200 dark:bg-slate-800">
           <div on:click={() => changeNav(0)} class=" nav-item p-1 w-24 text-center rounded-lg mr-1 cursor-pointer {nav === 0 ? 'bg-cyan-600' : 'bg-neutral-300 text-black dark:text-white dark:bg-slate-700'}">Opciók</div>
           <div on:click={() => changeNav(1)} class=" nav-item p-1 w-24 text-center rounded-lg cursor-pointer {nav === 1 ? 'bg-cyan-600' : 'bg-neutral-300 text-black dark:text-white dark:bg-slate-700'}" >Kedvencek</div>
         </div>
       </div>

      <div class="flex w-full justify-center">
         <swiper-container
         class=" bg-neutral-100 dark:bg-slate-800 h-96 w-full lg:w-6/12 w- rounded-lg"
         initial-slide={nav}
         resistance-ratio={'0.5'}
         speed={'370'}
         space-between={'20'}
         slides-per-view={'1'}
         bind:this={swiper}
         >
         <swiper-slide>
            <div class='p-4 drop-shadow-md'>
               <div class="lg:grid lg:grid-cols-2 lg:gap-2">
                  <div in:fly="{{ x: -200, duration: 600 }}" class="dark:bg-slate-700 bg-neutral-200 dark:text-white p-2 lg:h-20 lg:rounded-lg lg:flex lg:justify-center lg:items-center lg:mb-0 rounded-t-lg rounded-b mb-2 text-neutral-900">
                     <i class=" lg:mr-2 lg:text-2xl fa-solid fa-envelope"></i>
                     <div class="inline-flex">
                        <span>Email: <span class=" text-neutral-500 dark:text-gray-400">{data.currentUser.email}</span></span>
                        {#if data.currentUser.verified}
                           <Tooltip tooltipText="Megerősített email">
                              <i class="m-1 text-green-400 dark:text-green-300 fa-sharp fa-solid fa-badge-check"></i>
                           </Tooltip>
                        {/if}
                     </div>
                  </div>

                  <div in:fly="{{ x: -200, duration: 700 }}" class=" dark:bg-slate-700 bg-neutral-200 dark:text-white p-2 lg:h-20 lg:rounded-lg lg:flex lg:justify-center lg:items-center lg:mb-0 rounded-t rounded-b-lg mb-4 text-neutral-900">
                     <i class=" lg:mr-2 lg:text-2xl fa-solid fa-calendar-days"></i>
                     <span>Tag {formatDate(data.currentUser.created)} óta ({daysSince(data.currentUser.created)} napja)</span>
                  </div>

                  <div on:click={avatarModal.showModal()} in:fly="{{ x: -200, duration: 900 }}" class="dark:bg-slate-700 bg-neutral-200 dark:text-white p-2 lg:h-20 lg:rounded-lg lg:flex lg:justify-center lg:items-center lg:mb-0 rounded-t-lg rounded-b mb-2 text-neutral-900 hover:bg-neutral-300 dark:hover:bg-slate-600 cursor-pointer">
                     <i class=" lg:mr-2 lg:text-2xl fa-solid fa-user"></i>
                     Profilkép megváltoztatása
                  </div>
                  <Avatar bind:avatarModal />

                  <div on:click={passwordModal.showModal()} in:fly="{{ x: -200, duration: 900 }}" class="dark:bg-slate-700 bg-neutral-200 dark:text-white p-2 lg:h-20 lg:rounded-lg lg:flex lg:justify-center lg:items-center lg:mb-0 rounded mb-2 text-neutral-900 hover:bg-neutral-300 dark:hover:bg-slate-600 cursor-pointer">
                     <i class=" lg:mr-2 lg:text-2xl fa-solid fa-lock-keyhole"></i>
                     Jelszó megváltoztatása
                  </div>
                  <Password bind:passwordModal /> 

                  <ThemeToggle/>
               </div>

               <form method="POST" action="?/logout">
                  <button in:fly="{{ x: -200, duration: 1000 }}" class="dark:bg-slate-700 bg-neutral-200 dark:text-white p-2 text-left lg:flex lg:justify-center lg:items-center lg:mt-2 lg:rounded-lg lg:h-20 rounded-lg rounded-t mb-2 text-neutral-900 transition-all ease-in-out hover:bg-red-500 cursor-pointer w-full">
                     <i class=" lg:mr-2 lg:text-2xl fa-solid fa-right-from-bracket"></i>
                     Kijelentkezés
                  </button>
               </form>

               
               
            </div>
         </swiper-slide>
         <swiper-slide>
            <div class="p-4 max-h-full overflow-y-auto drop-shadow-md">
               <Favs data={data}/>
            </div>
         </swiper-slide>
         </swiper-container>
      </div>
   </div>
</main>
<style>
   .nav-item {
     transition: background-color 0.25s ease-in-out
   }
 </style>