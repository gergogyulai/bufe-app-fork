<script>
   import {toast, Toaster} from 'svelte-french-toast';
   import { fly, fade } from 'svelte/transition';
   import { enhance } from '$app/forms';
   //  export let data;
   export let avatarModal;

   let avatarForm;
   let avatarResetForm;
   const maxFileSize = 10 * 1024 * 1024; // 10 MB limit
   
   function handleFileUpload(event) {
       const file = event.target.files[0];
   
       if (file && file.size > maxFileSize) {
           toast.error("Túl nagy file! (max 10MB)")
           event.target.value = '';
           return;
       } else {
           toast.success("Profilkép sikeresen módosítva!")
           setTimeout(() => {
               avatarForm.submit()
               avatarModal.close()
           }, 1500);
      }
   }
    
   function handleAvatarReset() {
       toast.success("Profilkép sikeresen törölve!")
       setTimeout(() => {
           avatarResetForm.submit();
           avatarModal.close()
       }, 1500);
   }

   function showModal() {
       avatarModal.showModal();
   }
</script>

<dialog class="kategoria-modal" bind:this={avatarModal}>
   <Toaster />
   <div class="h-screen w-screen fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-40">
      <div class="flex justify-center items-center flex-col w-3/4 lg:w-2/6 bg-gray-100 dark:bg-slate-800 rounded-lg p-4 text-black dark:text-white drop-shadow-xl select-none">
         <span class="m-2 text-xl font-bold text-center drop-shadow-lg">Jelszó megváltoztatása</span>
         <form use:enhance bind:this={avatarForm} action="?/changeAvatar" method="POST" enctype="multipart/form-data">
            <label for="avatar">
               <div in:fly="{{ x: -200, duration: 800 }}" class="bg-slate-700 p-2 rounded-lg mb-2 text-white hover:bg-slate-600 cursor-pointer">
                  <i class="fa-solid fa-user"></i>
                  Kép feltöltése
               </div>
            </label>
            <input on:input={handleFileUpload} hidden type="file" name="avatar" id="avatar" value="" accept="image/*">
         </form>
         <form use:enhance bind:this={avatarResetForm} action="?/resetAvatar" method="POST">
            <button on:click={handleAvatarReset} in:fly="{{ x: -200, duration: 1000 }}" class="bg-slate-700 p-2 text-left rounded-lg mb-2 text-white transition-all ease-in-out hover:bg-slate-600 cursor-pointer w-full">
               <i class="fa-solid fa-trash-can"></i>
               Profilkép törlése
            </button>
         </form>
         <button on:click={avatarModal.close()} class="bg-slate-700 p-2 text-left rounded-lg mt-2 text-white transition-all ease-in-out hover:bg-slate-600 cursor-pointer">Bezárás</button>
      </div>
   </div>
 </dialog>