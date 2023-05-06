<script>
	import { cart, total } from "$lib/stores/Cart.js";

	let showConfirm = false
 
	if (localStorage.getItem('CartContent') != null) {
        $cart = JSON.parse(localStorage.getItem('CartContent'));
	    $total = JSON.parse(localStorage.getItem('Total'));
	};
	
	function urites() {
		localStorage.removeItem('CartContent', 'Total');
		$cart = {};
		$total = { 'ar': 0, 'darab': 0 };
	}
</script>
<div class=" flex w-full justify-center">
    <div class="urites">
        <button class="bg-red-500 transition ease-in-out focus:scale-105 hover:scale-105 font-bold text-white text-center p-2 w-40 m-2 rounded-xl" on:click={() => { showConfirm = true; }}>Kosár üritése</button>
    </div>
</div>

{#if showConfirm}
	<div class="h-screen w-screen fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
		<div class="flex justify-center items-center flex-col w-3/4 lg:w-2/6 bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-black dark:text-white drop-shadow-xl select-none">
			<div class="flex w-full justify-center text-5xl m-2 drop-shadow-lg">
				<span class="fa-regular fa-circle-exclamation"></span>
			</div>
			<span class="m-2 text-lg font-bold text-center drop-shadow-lg">Biztosan kiürited a kosarad?</span>
			<!-- <p class="text-center text-red-500 text-sm font-bold my-2 drop-shadow-lg ">Ezt nem lehet visszavonni!</p> -->
			<div class="flex w-full my-4 justify-center drop-shadow-lg">
				<button class=" dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-gray-300 bg-gray-300 p-2 px-3 mr-2 rounded-lg" on:click={() => { showConfirm = false; }}>Mégsem</button>
				<button class=" hover:bg-red-400 bg-red-500 p-2 px-3 rounded-lg font-bold text-white" on:click={() => urites()}>Igen</button>
			</div>
		</div>
	</div>	
{/if}