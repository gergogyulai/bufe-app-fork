<script>
   import { fly, slide } from 'svelte/transition';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import 'swiper/css';
   import { browser } from '$app/environment';
   import { cart, total } from '$lib/stores/Cart.js';
   import { navigation } from '$lib/stores/Navigation.js';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

   const darab = data.termekek.darab
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
				'Nasi': 0
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
			}
		}
		
	}
</script>

<main>

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Termékek'}
      background={'#252525'}
      flyin={{y: -200}}
      hideProfile={0}
   ></Topbar>

	<div class="flex justify-center mt-3">
		<div class="flex items-center m-1">
			<input placeholder="Kezdj el gépelni" class=" bg-gray-300 border-0 w-full rounded-lg p-1 px-2 outline" type="text" bind:value={searchWord} on:input={search}>
		</div>
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
			<div in:slide={{duration: 800}} class='list-grid'>
				<div class='grid-container'>
					{#each data.termekek as termek}
						{#if termek.kategoria == 'Étel'}
							<div class="inner-grid" class:opacity-40={termek.darab == 0}>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'><img src='favicon.png' alt=''></a>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.termek}</a>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.ar} Ft</a>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</SwiperSlide>

		<SwiperSlide>
			<div in:slide={{duration: 800}} class='list-grid'>
				<div class='grid-container'>
					{#each data.termekek as termek}
						{#if termek.kategoria == 'Ital'}
							<div class="inner-grid" class:opacity-50={termek.darab == 0}>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'><img src='favicon.png' alt=''></a>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.termek}</a>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.ar} Ft</a>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</SwiperSlide>

		<SwiperSlide>
			<div in:slide={{duration: 800}} class='list-grid'>
				<div class='grid-container'>
					{#each data.termekek as termek}
						{#if termek.kategoria == 'Nasi'}
							<div class="inner-grid" class:opacity-50={termek.darab == 0}>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'><img src='favicon.png' alt=''></a>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.termek}</a>
								<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.ar} Ft</a>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</SwiperSlide>
 	</Swiper>

 {#if cartshow}
 <div in:fly={{y: 100}} style='margin-bottom: 6.5vh;' class='nav'>
	 <div class='Étel' on:click={() => {navigate(0)}}><p class:active='{$navigation == 0}'>Étel</p></div>
	 <div class='Ital' on:click={() => {navigate(1)}}><p class:active='{$navigation == 1}'>Ital</p></div>
	 <div class='Nasi' on:click={() => {navigate(2)}}><p class:active='{$navigation == 2}'>Nasi</p></div>
 </div>
 
 <a data-sveltekit-noscroll href="kosar?referrer=/list">
	 <div in:fly={{y: 100, delay: 100}} class='cart'>
		 <div class="cart-grid">
			 <div class="cart-cell">
				 <img src="shopping-basket.png" alt=""> <b>{$total.ar} Ft</b><p>({$total.darab} db termék a kosárban.)</p>
			 </div>
		 </div>
	 </div>
 </a>
 
 {:else}
 <div in:fly={{y: 200}} class='nav'>
	 <div class='Étel' on:click={() => {navigate(0)}}><p class:active='{$navigation == 0}'>Étel</p></div>
	 <div class='Ital' on:click={() => {navigate(1)}}><p class:active='{$navigation == 1}'>Ital</p></div>
	 <div class='Nasi' on:click={() => {navigate(2)}}><p class:active='{$navigation == 2}'>Nasi</p></div>
 </div>
 {/if}

</main>

<style lang='scss'>

main {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      position: fixed;

      .list-grid {
         display: grid;

         .grid-container {
            margin: 3%;
            margin-bottom: 40%;
            display: grid;
            row-gap: .6vh;

               .inner-grid {
                  display: grid;
                  grid-template-columns: 25% 25% 25% 25%;
                  background-color: #252525;
                  border-radius: 1em;

                  &:nth-of-type(2n) {
                     background-color: #161616;
                  }

                  .grid-cell {
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     color: rgba(255, 255, 255, 0.9);
                     height: 90px;

                     &:nth-of-type(2n) {  // termek neve cell
                        grid-column-start: 2;
                        grid-column-end: 4;
                     }

                     img {
                        height: 100%;
                     }
                  }
               }
         }

      }

      .nav {
         display: flex;
         background-color: #252525ea;
         color: rgba(255, 255, 255, 0.877);
         height: 12vh;
         width: 100vw;
         position: fixed;
         bottom: 0;
         left: 0;
         z-index: 20;
         margin-bottom: 3vh;
         border-radius: 3em;
         transform: scale(60%);
         font-weight: bold;
         border: 1px solid rgba(255, 255, 255, 0.048);

         div {
            display: flex;
            flex: 33.3%;
            justify-content: center;
            align-items: center;
         }

         .active {
            padding: 2vh;
            background-color: var(--accent-color);
            border-radius: 20px;
            color: black;
            transition: all .25s ease-in-out;
         }
      }
      
      .cart {
         position: fixed;
         bottom: 0;
         left: 0;
         height: 3.5em;
         background-color: var(--accent-color);
         border-top-left-radius: 2.8em;
         border-top-right-radius: 2.8em;
         width: calc(98% - 2%); // * NAAAAGYON HACKY, de nem megy mashogy. Utálom a css-t
         margin-left: 2%;
         padding: .5ch 0;
			z-index: 20;

         .cart-grid {
            height: 100%;
            width: 100%;
            display: grid;

            .cart-cell {
               display: flex;
               align-items: center;
               justify-content: center;
               color: black;

               img {
                  width: 12%;
               }

               b {
                  font-size: large;
                  margin-right: 3%;
                  margin-left: 1%;
                  margin-top: 1%;
               }

               p {
                  margin-top: 1%;
               }
            }
         }
      }
	}
 </style>
