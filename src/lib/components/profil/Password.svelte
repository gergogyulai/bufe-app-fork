<script>
   import { fly, fade } from 'svelte/transition';
   import { enhance } from '$app/forms';
   //  export let data;
   export let passwordModal;

   let passwordForm

   let oldPassword='';
   let newPassword='';
   let newPasswordConfirm='';
   let oldpasswordVisible = false;
   let passwordVisible = false;

   function toggleOldPasswordVisibility() {
       oldpasswordVisible = !oldpasswordVisible;
   }    
   function togglePasswordVisibility() {
       passwordVisible = !passwordVisible;
   }

   $: showButtonnOld = oldPassword.length > 0;
   $: showButton = newPassword.length > 0;
</script>

<dialog class="kategoria-modal" bind:this={passwordModal}>
   <div class="h-screen w-screen fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div class="flex justify-center items-center flex-col w-3/4 lg:w-2/6 bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-black dark:text-white drop-shadow-xl select-none">
          <span class="m-2 text-xl font-bold text-center drop-shadow-lg">Jelszó megváltoztatása</span>
          <form use:enhance action="?/changePassword" method="POST" enctype="multipart/form-data">
              <div class="relative">
                  {#if !oldpasswordVisible}
                  <input bind:value={oldPassword} type="password" placeholder="Régi jelszó" class=" dark:focus:bg-slate-600 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-700 bg-white rounded-xl w-60" />
                  {:else}
                  <input bind:value={oldPassword} type="text" placeholder="Régi jelszó" class=" dark:focus:bg-slate-600 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-700 bg-white rounded-xl w-60" />
                  {/if}
                  {#if showButtonnOld}
                  <button type="button" class="absolute right-2 top-4 text-gray-200" on:click={toggleOldPasswordVisibility}>
                      {#if !oldpasswordVisible}
                          <span class="fa-solid fa-eye"></span>
                      {:else}
                          <span class="fa-solid fa-eye-slash"></span>
                      {/if}
                  </button>
                  {/if}
              </div>
              <div class="relative">
                  {#if !passwordVisible}
                  <input bind:value={newPassword} type="password" placeholder="Ùj jelszó" class=" dark:focus:bg-slate-600 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-700 bg-white rounded-xl w-60" />
                  {:else}
                  <input bind:value={newPassword} type="text" placeholder="Ùj jelszó" class=" dark:focus:bg-slate-600 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-700 bg-white rounded-xl w-60" />
                  {/if}
                  {#if showButton}
                  <button type="button" class="absolute right-2 top-4 text-gray-200" on:click={togglePasswordVisibility}>
                      {#if !passwordVisible}
                          <span class="fa-solid fa-eye"></span>
                      {:else}
                          <span class="fa-solid fa-eye-slash"></span>
                      {/if}
                  </button>
                  {/if}
              </div>
              <div class="relative">
                  {#if !passwordVisible}
                  <input bind:value={newPasswordConfirm} type="password" placeholder="Új jelszó megerősítése" class=" dark:focus:bg-slate-600 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-700 bg-white rounded-xl w-60" />
                  {:else}
                  <input bind:value={newPasswordConfirm} type="text" placeholder="Új jelszó megerősítése" class=" dark:focus:bg-slate-600 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-700 bg-white rounded-xl w-60" />
                  {/if}
                  {#if showButton}
                  <button type="button" class="absolute right-2 top-4 text-gray-200" on:click={togglePasswordVisibility}>
                      {#if !passwordVisible}
                          <span class="fa-solid fa-eye"></span>
                      {:else}
                          <span class="fa-solid fa-eye-slash"></span>
                      {/if}
                  </button>
                  {/if}
              </div>
              {#if oldPassword && newPassword && newPasswordConfirm && newPassword == newPasswordConfirm && newPasswordConfirm != oldPassword && newPassword != oldPassword}
                 <button class="p-2 mt-6 w-30 rounded-xl dark:bg-slate-800 dark:text-white focus:bg-slate-700 bg-cyan-600 shadow-lg shadow-cyan-500/50 text-white" in:fade={{duration: 300}}>Jelszó megváltoztatása</button>
              {/if}
              <br>
              {#if passwordForm?.error}
                 <p class=" font-semibold my-3 text-red-500" id="error">{passwordForm?.error}</p>
              {/if}
          </form>
          <button class="p-2 mt-6 w-30 rounded-xl dark:bg-slate-700 dark:text-white focus:bg-slate-600 hover:bg-slate-600 bg-cyan-600 text-white" on:click={passwordModal.close()} in:fade={{duration: 300}}>Bezárás</button>
      </div>
  </div>
 </dialog>