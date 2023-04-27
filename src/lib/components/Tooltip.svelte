<script>
    export let tooltipText = "";
    let isVisible = false;
</script>
<div class="relative inline-block w-min-fit cursor-pointer" on:mouseenter={() => (isVisible = true)} on:mouseleave={() => (isVisible = false)}>
    <slot />
    {#if isVisible}
    <div class="fixed z-50 bg-slate-600 text-white text-xs rounded-lg px-2 py-1 translate-y-1">
        {tooltipText}
    </div>
    {/if}
  </div>
  