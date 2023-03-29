<script>
    import { fly, slide } from 'svelte/transition';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import 'swiper/css';
    import { browser } from '$app/environment';
    import { cart, total } from '$lib/stores/Cart.js';
    import { navigation } from '$lib/stores/Navigation.js';
    import Topbar from '$lib/components/Topbar.svelte';

    export let data;

    let swiper;
    let cartshow = 0;

    if (browser) {
        if (localStorage.getItem('CartContent') != null) {
            cartshow = 1;
            $cart = JSON.parse(localStorage.getItem('CartContent'));
			$total = JSON.parse(localStorage.getItem('Total'));
        };
    };

	function navigate(i) {
		swiper.slideTo(i);
		$navigation = i
	}

	// Search Bar
	const originalData = structuredClone(data);
	let searchWord;

	function search() {
		data.termekek = originalData.termekek.filter(termek => termek.termek.toLowerCase().includes(searchWord.toLowerCase()))

		// Navigáljon arra a kategoriara amiben az a termek talalhato ahol a keresett szo a legtobbet elofordul.
		if (searchWord.length > 0) { // ha nincs itt ez az if, akkor mindig visszaugrik az Etel kategoriara, mivel ott fordul elo a legtobbet empty string.
			let kategoria = {
				'Étel': 0,
				'Ital': 0,
				'Nasi': 0,
                'Egyéb':0
			}

			data.termekek.forEach(termek => {
				kategoria[termek.kategoria] += termek.termek.toLowerCase().split(searchWord.toLowerCase()).length - 1
			});

			switch (Object.values(kategoria).sort().reverse()[0]) {
				case kategoria.Étel:
					navigate(0)
					break;
				case kategoria.Ital:
					navigate(1)
					break;
				case kategoria.Nasi:
					navigate(2)
                    break;
                case kategoria.Egyéb:
					navigate(3)
                break;
			}
		}
	}
</script>
<main class=" h-screen w-screen overflow-x-hidden overflow-y-scroll bg-gray-100 dark:bg-slate-900 pb-20">
   <Topbar
        target={'Menü'}
        targeturl={'/'}
        background={'none'}
        text={'Termékek'}
        flyin={{y: -200}}
        hideProfile={0}
        kosar={true}
   ></Topbar>

    <div class="flex justify-center items-center my-5 drop-shadow-lg">
        <label class="group" for="searchBar">
            <div class="flex focus-within:ring-1 focus-within:ring-blue-600 rounded-lg">
               <div class=" flex items-center justify-center rounded-l-lg border-none bg-gray-200">
                    <i class="group-focus-within:text-neutral-800 p-1 pl-2 text-neutral-500 fa-solid fa-magnifying-glass"></i>
                </div>
               <input placeholder="Keresés" id="searchBar" class="group-focus-within:placeholder-neutral-600 bg-gray-200 border-0 p-2 px-2 rounded-r-lg focus:outline-none w-20 group-focus-within:w-48 transition-[width] ease-in-out duration-150" type="text" bind:value={searchWord} on:input={search}>
            </div>
        </label>
    </div>

	<Swiper
	initialSlide={$navigation}
	resistanceRatio={0.5}
	speed={370}
	spaceBetween={20}
	slidesPerView={1}
	on:slideChange={e => {$navigation = e.detail[0].activeIndex}}
	on:swiper={e => {swiper = e.detail[0]}}
 	>
   
		<SwiperSlide>
		<div in:slide={{duration: 800}} class='px-8 drop-shadow-md'>
            <div class='flex flex-col w-full items-center'>
		    	{#each data.termekek as termek}
		    	{#if termek.kategoria == 'Étel'}
                    <div class="flex flex-row mb-4 w-full items-center rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-neutral-100 text-neutral-900" class:opacity-40={termek.darab == 0}>
                        <div class="mr-4">
                            <img class=" rounded-l-lg h-32 w-32 object-cover" src="favicon.png" alt="">
                        </div>
                        <a href="{termek.termek}?referrer=/list">
                            <div class="justify-self-end">
                                <div class="flex flex-col">
                                    <div class=" h-fit">
                                        <p class=" text-xl dark:text-blue-300">{termek.termek}</p>
                                        <p class="text-md">Elérhető: {termek.darab}db</p>
                                    </div>
                                    <div class="flex items-center">
                                        <p class="text-2xl">{termek.ar} Ft</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
		    	{/if}
		    	{/each}
		    </div>
		</div>
		</SwiperSlide>

		<SwiperSlide>
            <div in:slide={{duration: 800}} class='px-8 drop-shadow-md'>
                <div class='flex flex-col w-full items-center'>
                    {#each data.termekek as termek}
                    {#if termek.kategoria == 'Ital'}
                        <div class="flex flex-row mb-4 w-full items-center rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-neutral-100 text-neutral-900" class:opacity-40={termek.darab == 0}>
                            <div class="mr-4">
                                <img class=" rounded-l-lg h-32 w-32 object-cover" src="favicon.png" alt="">
                            </div>
                            <a href="{termek.termek}?referrer=/list">
                                <div class="justify-self-end">
                                    <div class="flex flex-col">
                                        <div class=" h-fit">
                                            <p class=" text-xl dark:text-blue-300">{termek.termek}</p>
                                            <p class="text-md">Elérhető: {termek.darab}db</p>
                                        </div>
                                        <div class="flex items-center">
                                            <p class="text-2xl">{termek.ar} Ft</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    {/if}
                    {/each}
                </div>
            </div>
		</SwiperSlide>

		<SwiperSlide>
            <div in:slide={{duration: 800}} class='px-8 drop-shadow-md'>
                <div class='flex flex-col w-full items-center'>
                    {#each data.termekek as termek}
                    {#if termek.kategoria == 'Nasi'}
                        <div class="flex flex-row mb-4 w-full items-center rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-neutral-100 text-neutral-900" class:opacity-40={termek.darab == 0}>
                            <div class="mr-4">
                                <img class=" rounded-l-lg h-32 w-32 object-cover" src="hamburger.jpg" alt="">
                            </div>
                            <a href="{termek.termek}?referrer=/list">
                                <div class="justify-self-end">
                                    <div class="flex flex-col">
                                        <div class=" h-fit">
                                            <p class=" text-xl dark:text-blue-300">{termek.termek}</p>
                                            <p class="text-md">Elérhető: {termek.darab}db</p>
                                        </div>
                                        <div class="flex items-center">
                                            <p class="text-2xl">{termek.ar} Ft</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    {/if}
                    {/each}
                </div>
            </div>
		</SwiperSlide>

      <SwiperSlide>
		<div in:slide={{duration: 800}} class='px-8 drop-shadow-md'>
            <div class='flex flex-col w-full items-center'>
		    	{#each data.termekek as termek}
		    	{#if termek.kategoria == 'Egyéb'}
                    <div class="flex flex-row mb-4 w-full items-center rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-neutral-100 text-neutral-900" class:opacity-40={termek.darab == 0}>
                        <div class="mr-4">
                            <img class=" rounded-l-lg h-32 w-32 object-cover" src="favicon.png" alt="">
                        </div>
                        <a href="{termek.termek}?referrer=/list">
                            <div class="justify-self-end">
                                <div class="flex flex-col">
                                    <div class=" h-fit">
                                        <p class=" text-xl dark:text-blue-300">{termek.termek}</p>
                                        <p class="text-md">Elérhető: {termek.darab}db</p>
                                    </div>
                                    <div class="flex items-center">
                                        <p class="text-2xl">{termek.ar} Ft</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
		    	{/if}
		    	{/each}
		    </div>
		</div>
		</SwiperSlide>
 	</Swiper>

    <div class=" fixed left-0 bottom-0 mb-7 flex flex-row items-center justify-center w-full z-50">
        <div in:fly={{y: 100}} class='flex justify-center items-center backdrop-blur-lg dark:backdrop-blur-xl bg-gray-300 dark:bg-slate-700 bg-opacity-40 dark:bg-opacity-50 text-neutral-800 dark:text-white h12 rounded-xl py-2 px-3'>
            <div class="Étel mr-2 p-1.5 rounded-lg" class:nav-active='{$navigation == 0}' on:click={() => {navigate(0)}}><span>Étel</span></div>
            <div class="Ital mr-2 p-1.5 rounded-lg" class:nav-active='{$navigation == 1}' on:click={() => {navigate(1)}}><span>Ital</span></div>
            <div class="Nasi mr-2 p-1.5 rounded-lg" class:nav-active='{$navigation == 2}' on:click={() => {navigate(2)}}><span>Nasi</span></div>
            <div class="Egyéb p-1.5 rounded-lg" class:nav-active='{$navigation == 3}' on:click={() => {navigate(3)}}><span>Egyéb</span></div>
        </div>
    </div>

    <div class="fixed left-0 -bottom-10 h-20 blur-xl w-screen">

    </div>
</main>
