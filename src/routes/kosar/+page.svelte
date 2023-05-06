<script>
	import { slide, fade } from "svelte/transition";
	import { cart, total } from "$lib/stores/Cart.js";
	import Topbar from '$lib/components/Topbar.svelte';
    import Urites from '$lib/components/kosar/Urites.svelte';
    
	export let data;

	if (localStorage.getItem('CartContent')) {
		$cart = JSON.parse(localStorage.getItem('CartContent'));
		$total = JSON.parse(localStorage.getItem('Total'));
	}

	function recalculate() {
		$total = { 'ar': 0, 'darab': 0 };
		Object.keys($cart).forEach(termek => {
			$cart[termek].forEach(x => {
				$total.ar += x.ar;
				$total.darab += x.darab;
			});
		});
		localStorage.setItem('CartContent',JSON.stringify($cart));
		localStorage.setItem('Total',JSON.stringify($total));
	}

	function subtractAmount(termek,i) {
		if ($cart[termek][i].darab > 1) {
			const price = $cart[termek][i].ar / $cart[termek][i].darab;

			$cart[termek][i].ar -= price;
			$cart[termek][i].darab--;

			recalculate();
		} else {
			$cart[termek].splice(i,1);
			if ($cart[termek].length === 0)
				delete $cart[termek];
			$cart = $cart; // Muszaj reactivity miatt
			recalculate();

			if (Object.keys($cart).length === 0) {
				localStorage.removeItem('CartContent');
				history.back();
			}
		}
	}
 
	function addAmount(termek,i) {
		let totalDarab = 0;
		const maxAmount = data.termekek.find(x => { return x.termek === termek; }).darab;

		$cart[termek].forEach(x => {
			totalDarab += x.darab;
		});

		if (totalDarab < maxAmount) {
			const price = $cart[termek][i].ar / $cart[termek][i].darab;

			$cart[termek][i].ar += price;
			$cart[termek][i].darab++;
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


    <div class="px-8">
        {#if Object.keys($cart).length != 0}
            <h2 class="text-center text-3xl m-5">Kosarad tartalma</h2>
        {/if}
         
        {#if Object.keys($cart).length < 1}
            <div class="flex justify-center text-center items-center h-96">
                <div in:fade="{{duration: 300}}">            
                    <h2 class="text-2xl m-2">Kosarad még üres :(</h2>
                    <h2 class="text-lg mb-4">Nézd meg a termékeket és rendelj még ma!</h2>
                    <a class=" bg-cyan-500 dark:bg-slate-800 font-bold text-white text-center p-3 w-40 rounded-xl" href="/list">Termékek megtekintése</a>
                </div>
            </div>
        {/if}


		{#each Object.keys($cart) as termek}
			{#each $cart[termek] as x, i (i)}
                <div class="flex flex-row items-start justify-start bg-gray-200 dark:bg-slate-800 rounded-xl drop-shadow-md text-center mb-4 outline outline-1 outline-slate-200 dark:outline-slate-700">
                    <div class="m-0.5">
                        <img class=" rounded-tl-xl rounded-bl-xl object-cover w-48 h-32" src="/api/termekfoto/?termek={x.id}" alt="{termek}_kep">
                    </div>
                    <div class=" w-4/5 flex flex-col justify-center items-center p-2">
                        <a href="/{termek}">
                            <h1 class=" text-lg text-center">{termek}</h1>
                        </a>
                        <div class="flex justify-center bg-gray-300 dark:bg-slate-700 p-1 m-1 rounded-full dark:highlight-white/5 shadow-highlight">
                            <div class="mx-2 rounded-full">
                                {#if x.darab > 1}
                                    <button class=" p-1 rounded-full dark:text-white text-cyan-500" on:click={() => {subtractAmount(termek,i);}}>
                                        <span class="fa-solid fa-minus"></span>
                                    </button>
                                {:else}
                                    <button class=" p-1 rounded-full dark:text-white text-cyan-500" on:click={() => {subtractAmount(termek,i);}}>
                                        <span class="fa-solid fa-trash-can text-red-500 font-bold"></span>
                                    </button>
                                {/if}
                            </div>

                            {#key x.darab}
                                <div class="mx-1 text-center p-1 rounded-full">{x.darab}</div>
                            {/key}

                            <div class="mx-2 rounded-full">
                                <button on:click="{() => {addAmount(termek,i)}}" class=" p-1 rounded-full dark:text-white text-cyan-500">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="text-center mt-2">
                            {#key x.ar}
                                <h2 class="text-center text-lg font-bold">{x.ar} Ft</h2>
                            {/key}
                        </div>
                    </div>
                </div>
            {/each}
        {/each}
         
        {#if Object.keys($cart).length != 0}
            <Urites></Urites>
        {/if}

        {#if Object.keys($cart).length != 0}
            <div class="fixed bottom-0 left-0 h-32 w-full p-2 bg-slate-100 dark:bg-slate-800">
                {#key $total}
                    <div class="flex flex-col justify-center">
                        <span class="text-center dark:text-white text-black text-lg ">{$total.darab} db termék</span>
                        <span class=" text-center dark:text-white text-black text-xl font-bold">Összesen: {$total.ar} Ft</span>
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