<script>
	import { slide, fade } from 'svelte/transition';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Topbar from '$lib/components/Topbar.svelte';
	
	export let data;
	let lastOpenMenu;

	function openMenu(i, record) {
		if (lastOpenMenu == i) lastOpenMenu = undefined
		else if (record.status != 'folyamatban') lastOpenMenu = i
	}

	async function handleSubmit(event) {
		if (confirm('Biztos végleg törlöd a rendelést? A törölt rendelések nem számitanak bele az ár összesitésbe!')) {
			const data = new FormData(this);
      	const response = await fetch(this.action, {
				method: 'POST',
				body: data
			})

			const result = deserialize(await response.text());

			if (result.type == 'success') {
				openMenu(lastOpenMenu)
				invalidateAll()
			};
		}
   }
</script>

<main class="h-screen w-screen bg-white text-black dark:text-white dark:bg-slate-900" in:fade={{duration: 180}}>
   	<Topbar
      	target={'Menü'}
      	targeturl={'/'}
      	text={'Rendelések'}
      	background={'none'}
      	flyin={{y: -200}}
	  	hideProfile={0}
   	></Topbar>
	<div class="p-8">
		{#each data.elozmenyLista as record, i (record.id)}
			{#if record.status == 'fuggoben'}
				<h1 in:slide={{duration: 350}} class="status mt-6 mb-2 text-black dark:text-white text-center">Függőben</h1>
			{:else if record.status == 'folyamatban'}
				<h1 in:slide={{duration: 350}} class="status mt-6 mb-2 text-black dark:text-white text-center">Átvehető!</h1>
			{:else if record.status == 'kesz'}
				<h1 in:slide={{duration: 350}} class="status mt-6 mb-2 text-black dark:text-white text-center">{record.updated.slice(0, -8)}</h1>
			{:else}
				<h1 in:slide={{duration: 350}} class="status mt-6 mb-2 text-black dark:text-white text-center">Törölve</h1>
			{/if}
			<div on:click={() => {openMenu(i,record)}} out:slide|local={{duration: 350}} class=" rounded-xl text-center grid-container {record.status}" class:menu-grid-container={lastOpenMenu == i}>
				{#each Object.keys(record.termekek) as termek}
					<div class="grid-cell termek">{termek}</div>
					<div class="grid-cell darab">{record.termekek[termek].darab} db</div>
					<div class="grid-cell ar">{record.termekek[termek].ar} Ft</div>
				{/each}
			</div>
			{#if lastOpenMenu == i && record.status != 'folyamatban'}
				<div in:slide={{duration: 250}} out:slide|local={{duration: 350}} class="menu">
					<form method="POST" on:submit|preventDefault={handleSubmit}>
						<input hidden name="recordID" type="text" value="{JSON.stringify(record.id)}">
						<button>Törlés</button>
					</form>
				</div>
			{/if}
		{/each}
	</div>
</main>

<style lang="scss">
main {
	.grid-container {
		background-color: var(--main-color);
		display: grid;
		grid-template-columns: auto auto auto;
		margin: 0 5%;
		overflow: hidden;
		font-size: larger;
		transition: .18s .25s;
	}

	.fuggoben {
		opacity: 70%;
		outline: 2px solid white;
	}

	.folyamatban {
		outline: 2px solid var(--accent-color);
	}

	.torolve {
		text-decoration: line-through;
		opacity: 50%;
	}

	.menu-grid-container {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		transition: 0s;
		outline: 0;
	}

	.menu {
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		overflow: hidden;

		button {
			border: 0;
			padding: .5em;
			width: 100%;
			background-color: var(--accent-color);
		}
	}
}
</style>