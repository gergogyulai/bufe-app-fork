<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    const theme = writable('auto');
  
    function applyTheme(newTheme) {
        document.documentElement.classList.remove('light', 'dark');
        if (newTheme !== 'auto') {
            document.documentElement.classList.add(newTheme);
        }
    }
  
    function setTheme(newTheme) {
        applyTheme(newTheme);
        theme.set(newTheme);
        localStorage.setItem('theme', newTheme);
    }
  
    function switchTheme() {
        if ($theme === 'light') {
            setTheme('dark');
        } else if ($theme === 'dark') {
            setTheme('auto');
            applyAutoTheme(darkModeMediaQuery);
        } else {
            setTheme('light');
        }
    }
  
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
    function applyAutoTheme(e) {
        if ($theme === 'auto') {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    }
  
    onMount(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('auto');
        }
      
        darkModeMediaQuery.addListener(applyAutoTheme);
        applyAutoTheme(darkModeMediaQuery);
    });
  </script>

<div on:click={switchTheme} class="dark:bg-slate-700 bg-neutral-200 dark:text-white p-2 lg:h-20 lg:rounded-lg lg:flex lg:justify-center lg:items-center lg:mb-0 rounded mb-2 text-neutral-900 hover:bg-neutral-300 dark:hover:bg-slate-600 cursor-pointer">
    {#if $theme === 'light'}
        <i class="lg:mr-2 lg:text-2xl fa-solid fa-sun"/>
        Világos mód
    {:else if $theme === 'dark'}
        <i class="lg:mr-2 lg:text-2xl fa-solid fa-moon"/>
        Sötét mód
    {:else}
        <i class="lg:mr-2 lg:text-2xl fa-solid fa-wand-magic-sparkles"/>
        Rendszer
    {/if}
</div>