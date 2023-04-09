<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Termekek from '$lib/components/admin/Termekek.svelte';
	import Darab from '$lib/components/admin/Darab.svelte';
	import Arak from '$lib/components/admin/Arak.svelte';
	import Leiras from '$lib/components/admin/Leiras.svelte';
	import Feltet from '$lib/components/admin/Feltet.svelte';
	import Kategoria from '$lib/components/admin/Kategoria.svelte';
	import Nyitvatartas from '$lib/components/admin/Nyitvatartas.svelte'; 
	
	export let data;
	
	let darabModal;
	let termekModal;
	let arakModal;
	let leirasModal;
	let feltetModal;
	let kategoriaModal;
	let NyitvatartasModal;

	
	setInterval(async () => {
		invalidateAll()
	}, 8000);
	
	</script>
	
	<main>
		
	<div class="grid-container">
		<div class="grid-cell">
			<h1>Bejövő rendelések</h1>
				{#each data.rendelesek.fuggoben as rendeles, i (rendeles.id)}
					<div transition:fade={{duration: 300}} class="rendeles-kartya">
						<form use:enhance action="?/torles" method="POST">
							<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
							<button class="torles-gomb">❌</button>
						</form>
						<h1>#{Object.keys(data.rendelesek.fuggoben)[i]}</h1>
						<h3>{rendeles.name}</h3>
						{#each Object.keys(rendeles.termekek) as termek}
							<p><span style="color: chartreuse">{termek},</span> <span style="color: red;">{rendeles.termekek[termek].darab}</span> db, <span style="color: red;">{rendeles.termekek[termek].ar}</span> Ft</p>
							{#if Array.isArray(rendeles.termekek[termek].feltet)}
								{#each rendeles.termekek[termek].feltet as feltet}
									<p style="color: burlywood; text-align: start;">{feltet}</p>
								{/each}
							{/if}
						{/each}
						<form use:enhance action="?/kesz" method="POST">
							<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
							<button>Kész</button>
						</form>
					</div>
				{/each}
		</div>
	
		<div class="grid-cell">
			<h1>Kész rendelések</h1>
			{#each data.rendelesek.kesz as rendeles, i (rendeles.id)}
				<div transition:fade={{duration: 300}} class="rendeles-kartya rendeles-kartya-done">
					<form use:enhance action="?/torles" method="POST">
						<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
						<button class="torles-gomb">❌</button>
					</form>
					<h1>#{Object.keys(data.rendelesek.kesz)[i]}</h1>
					<h3>{rendeles.name}</h3>
					{#each Object.keys(rendeles.termekek) as termek}
						<p><span style="color: chartreuse">{termek},</span> <span style="color: red;">{rendeles.termekek[termek].darab}</span> db, <span style="color: red;">{rendeles.termekek[termek].ar}</span> Ft</p>
						{#if Array.isArray(rendeles.termekek[termek].feltet)}
							{#each rendeles.termekek[termek].feltet as feltet}
								<p style="color: burlywood; text-align: start;">{feltet}</p>
							{/each}
						{/if}
					{/each}
					<form use:enhance action="?/atadva" method="POST">
						<input hidden type="text" name="recordID" value="{JSON.stringify(rendeles.id)}">
						<button>Átadva</button>
					</form>
				</div>
			{/each}
		</div>
	 <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
		<div class="grid-cell">
			<div class="szerkesztes">
				<h1>Szerkesztés:</h1>
				<button on:click={termekModal.showModal()}>Termékek</button>
				<button on:click={darabModal.showModal()}>Darab</button>
				<button on:click={arakModal.showModal()}>Árak</button>
				<button on:click={leirasModal.showModal()}>Leirás</button>
				<button on:click={feltetModal.showModal()}>Feltét</button>
				<button on:click={kategoriaModal.showModal()}>Kategória</button>
				<button on:click={NyitvatartasModal.showModal()}>Nyitvatartas</button>
			</div>
		</div>
	</div>
	
	<!-- Modalok: -->
	
	<Termekek bind:termekModal data={data}></Termekek>
	<Darab bind:darabModal data={data}></Darab>
	<Arak bind:arakModal data={data}></Arak>
	<Leiras bind:leirasModal data={data}></Leiras>
	<Feltet bind:feltetModal data={data}></Feltet>
	<Kategoria bind:kategoriaModal data={data}></Kategoria>
	<Nyitvatartas bind:NyitvatartasModal data={data}></Nyitvatartas>
	
	</main>
	
	<style lang="scss">
		
		main {
			.grid-container {
				min-height: 100vh;
				grid-template-columns: auto 52% 20%;
				grid-template-rows: auto;
				display: grid;
	
				.grid-cell {
					color: white;
					outline: .1em solid white;
	
					h1 {
						text-align: center;
						margin-top: .5em;
						font-size: larger;
					}
	
					button {
						background-color: #222;
						color: white;
						font-size: larger;
						border-radius: 1em;
						margin: 0 auto;
					}
	
					.rendeles-kartya {
						text-align: center;
						border-radius: 1em;
						background-color: rgb(34, 34, 34);
						outline: .1em solid rgb(255, 255, 255);
						display: inline-block;
						margin: .5em;
						padding: .5em;
						padding-top: 0;
						position: relative;
	
						h1 {
							color: rgb(0, 174, 255);
							font-size: xx-large;
						}
	
						p {
							font-size: larger;
						}
	
						.torles-gomb {
							position: absolute;
							right: 1ch;
							top: .8ch;
							cursor: pointer;
							border: none;
							padding: 0;
							background-color: rgba(0, 0, 0, 0);
						}
	
						h3 {
							color: chocolate;
						}
	
						button {
							padding: .4em;
						}
					}
	
					.rendeles-kartya-done {
						background-color: #003500;
					}
	
					.szerkesztes {
						position: fixed;
						right: 1vw;
	
	
						button {
							display: block;
							margin-top: 1ch;
							padding: .5em;
						}
					}
	
				}
			}
		}
	</style>