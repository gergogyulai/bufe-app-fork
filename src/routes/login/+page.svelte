<script>
   import { fade } from "svelte/transition";

   export let form;

   let email = form?.email
   let password
</script>

<main class="flex items-center h-screen w-screen dark:bg-slate-900 bg-white">
   <div class="login dark:text-white text-cyan-600 text-center">
      <h1 class="m-2 text-4xl drop-shadow-lg">Kandó Büfé</h1>
      <h1 class="m-4 text-2xl drop-shadow-xl">Bejelentkezés</h1>
      <form class="drop-shadow-2xl" method="post">
         <input class=" dark:focus:bg-slate-700 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-800 bg-white rounded-xl w-60" placeholder="Kandós E-mail" name='email' bind:value={email} id="email-form" type="text"/><br />
         <input class=" dark:focus:bg-slate-700 focus:bg-gray-100 focus:outline-0 p-2 px-4 text-center my-2 dark:bg-slate-800 bg-white rounded-xl w-60" placeholder="Jelszó" name='password' bind:value={password} id="password-form" type="password"/> <br/>
         {#if email && password}
            <button class=" p-2 m-6 w-30 rounded-xl dark:bg-slate-800 dark:text-white focus:bg-slate-700 bg-cyan-600 shadow-lg shadow-cyan-500/50 text-white" in:fade={{duration: 300}}>Belépés</button>
         {/if}
         <br>
         {#if form?.error} 
            <p class=" font-semibold mb-4 text-red-500" id="error">{form?.error}</p>
         {/if}
      </form>
		<div class="drop-shadow-2xl leading-tight font-light w-screen">
			<h2 class="opacity-75">Nincs még fiókod?</h2><br/>
         <a class=" text-cyan-500 outline rounded-xl p-2 mt-10" href="/register">Regisztráció</a>
		</div>
   </div>   
</main>