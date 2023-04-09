<script>
    import { fix_and_outro_and_destroy_block } from "svelte/internal";
    import { nyitasIdo, zarasIdo, bufeClosed } from "$lib/stores/Nyitvatartas.js";

    let tempNyitasOra = $nyitasIdo.hours;
    let tempNyitasPerc = $nyitasIdo.minutes;
    let tempZarasOra = $zarasIdo.hours;
    let tempZarasPerc = $zarasIdo.minutes;

    export let NyitvatartasModal;

    function reset() {
        nyitasIdo.update(() => ({ hours: tempNyitasOra, minutes: tempNyitasPerc }));
        zarasIdo.update(() => ({ hours: tempZarasOra, minutes: tempZarasPerc }));
        console.log($nyitasIdo, $zarasIdo)
    }

    function modify() {
        nyitasIdo.update(() => ({ hours: tempNyitasOra, minutes: tempNyitasPerc }));
        zarasIdo.update(() => ({ hours: tempZarasOra, minutes: tempZarasPerc }));
        console.log($nyitasIdo, $zarasIdo)
    }

    function log() {
        console.log("temp nyitas ora", tempNyitasOra)
        console.log("temp nyitas perc", tempNyitasPerc)
        console.log("temp zaras ora", tempZarasOra)
        console.log("temp zaras perc", tempZarasPerc)

    }
</script>

<dialog class="leiras-modal p-5" bind:this={NyitvatartasModal}>
    <div class="flex flex-row">
        <button class="bg-red-500 p-2 rounded-lg mr-2" on:click={() => {$bufeClosed=true;}}>Bezáras most</button>
        <button class="bg-green-500 p-2 rounded-lg" on:click={() => {$bufeClosed=true;}}>Nyitás</button>
    </div>

    <div class="mt-4">
        <span class="text-xl">Idopontok modositasa:</span>
        <div>
            <span class="text-lg">Nyitasi ido:</span>
            <div class="flex flex-row my-3">
                <div>
                    <span>Ora</span>
                    <input type="number" name="" id="" value="{tempNyitasOra}" on:input={e => tempNyitasOra = e.target.value} class=" w-10 text-black">
                </div>
                <div>
                    <span>Perc</span>
                    <input type="number" name="" id="Perc" value="{tempNyitasPerc}" on:input={e => tempNyitasPerc = e.target.value} class=" w-10 text-black">
                </div>
            </div>
        </div>
        <div>
            <span class="text-lg">Zarasi ido:</span>
            <div class="flex flex-row my-3">
                <div>
                    <span>Ora</span>
                    <input type="number" name="" id="" value="{tempZarasOra}" on:input={e => tempZarasOra = e.target.value} class=" w-10 text-black">
                </div>
                <div>
                    <span>Perc</span>
                    <input type="number" name="" id="Perc" value="{tempZarasPerc}" on:input={e => tempZarasPerc = e.target.value} class=" w-10 text-black">
                </div>
            </div>
        </div>
        <button class="bg-blue-500 p-2 rounded-lg my-2" on:click={modify}>Modositas</button>
    </div>
    <button class="bg-orange-500 p-2 rounded-lg my-2" on:click={reset()}>Visszaallitas az eredetire</button><br>
    <button class=" bg-neutral-700 text-white p-2 rounded-lg" on:click={NyitvatartasModal.close()}>Bezár</button>
    <!-- <button class=" bg-neutral-700 text-white p-2 rounded-lg" on:click={log}>log</button>
    <button class=" bg-neutral-700 text-white p-2 rounded-lg" on:click={console.log($nyitasIdo, $zarasIdo)}>log2</button> -->

 </dialog>

 <style lang="scss">
        dialog {
            margin: auto;
            background-color: rgb(31, 31, 31);
            color: white;
            border-radius: 1em;
            border: 1px solid white;

         &::backdrop {
            background: rgba(0, 0, 0, 0.800);;
         }
      }
 </style>