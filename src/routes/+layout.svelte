<script>
   import PageTransition from '$lib/components/PageTransition.svelte';
   import ZarasErtesito from "$lib/components/ZarasErtesito.svelte";
   import { page } from '$app/stores';
	import { onMount } from 'svelte';
  	import { pwaInfo } from 'virtual:pwa-info';

   import "../app.css";

	const noKeyURLs = ['/admin','/rendelesek']

	onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({
        immediate: true,
        onRegistered(r) {
          // uncomment following code if you want check for updates
          // r && setInterval(() => {
          //    console.log('Checking for sw update')
          //    r.update()
          // }, 20000 /* 20s for testing purposes */)
          console.log(`SW Registered: ${r}`)
        },
        onRegisterError(error) {
          console.log('SW registration error', error)
        }
      })
    }
  })
  
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>
{#if !noKeyURLs.includes($page.url.pathname)}
   <PageTransition url={$page.url}>
      <slot />
   </PageTransition>
{:else}
   <slot />
{/if}
<ZarasErtesito></ZarasErtesito>

<svelte:head>
   <link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro-v6@44659d9/css/all.min.css" rel="stylesheet" type="text/css" />
   {@html webManifest}
</svelte:head>

<style lang="scss">
   :global(*) {
      font-family: 'Inter', sans-serif;
      -webkit-tap-highlight-color: transparent;
   }

	:global(body) {
		background-color: black;
      scrollbar-width: none;

      &::-webkit-scrollbar {
         width: 0;
         display: none;
      }
	}
</style>