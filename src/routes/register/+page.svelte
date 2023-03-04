<script>
   import { fade } from "svelte/transition";

   export let form;

   let name = form?.name;
   let email = form?.email.replace('@kkszki.hu', '')
   let password;
   let passwordConfirm;
</script>

<main class=" flex items-center h-screen w-screen dark:bg-slate-900 bg-white">
   <div class="dark:text-white text-cyan-600 text-center">
      <h1 class="m-2 text-4xl drop-shadow-lg">Kandó Büfé</h1>
      <h1 class="m-4 text-2xl drop-shadow-xl">Regisztráció</h1>
      <form class="drop-shadow-xl" method="post">
         <input class="  dark:focus:bg-slate-700 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-800 bg-white rounded-xl w-60" placeholder="Teljes név" name='name' bind:value={name} id="name-form" type="name" /><br />
         <input class="  dark:focus:bg-slate-700 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-800 bg-white rounded-xl w-60" placeholder="Kandós E-mail" name='email' bind:value={email} id="email-form" type="text" /><br />
         <input class="  dark:focus:bg-slate-700 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-800 bg-white rounded-xl w-60" placeholder="Jelszó" name='password' bind:value={password} id="password-form" type="password" /> <br>
         <input class="  dark:focus:bg-slate-700 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center mt-2 dark:bg-slate-800 bg-white rounded-xl w-60" placeholder="Jelszó újra"  name='passwordConfirm' bind:value={passwordConfirm} id="password-confirm-form" type="password" />
         {#if name && email && password && passwordConfirm && password == passwordConfirm}
         <br>
            <button class="p-2 mt-6 w-30 rounded-xl dark:bg-slate-800 dark:text-white focus:bg-slate-700 bg-cyan-600 shadow-lg shadow-cyan-500/50 text-white" in:fade={{duration: 300}}>Regisztráció</button>
         {/if}
         <br>
         {#if form?.error}
            <p class=" font-semibold my-3 text-red-500" id="error">{form?.error}</p>
         {/if}
      </form>
      <div class="drop-shadow-2xl leading-tight mt-6 font-light w-screen">
			<h2 class="opacity-75">Már van fiókod?</h2><br/>
         <a class=" text-cyan-500 outline rounded-xl p-2 mt-10" href="/login">Belépés</a>
		</div>
   </div>
</main>